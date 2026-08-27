/**
 * Screenshots at a true device viewport.
 *
 *   node scripts/shot.mjs <url> <width> <height> <outfile> [--full]
 *
 * Uses CDP Emulation.setDeviceMetricsOverride rather than --window-size.
 * Edge/Chrome on Windows refuse to open a window narrower than ~500px, so
 * `--window-size=320,900 --screenshot` renders the page at ~500px wide and
 * then crops the image to 320 — which looks exactly like a layout overflow
 * bug and is not one. Device metrics override is the only honest way to see
 * a 320 or 390 viewport.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [, , URL_, W, H, OUT, ...rest] = process.argv;
const WIDTH = Number(W ?? 390);
const HEIGHT = Number(H ?? 844);
const FULL = rest.includes("--full");

const CANDIDATES = [
  `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env["ProgramFiles(x86)"]}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env.ProgramFiles}\\Microsoft\\Edge\\Application\\msedge.exe`,
  `${process.env["ProgramFiles(x86)"]}\\Microsoft\\Edge\\Application\\msedge.exe`,
];
const BROWSER = CANDIDATES.find((p) => p && existsSync(p));
if (!BROWSER) {
  console.error("No Chrome/Edge found.");
  process.exit(1);
}

const PORT = 9500 + (WIDTH % 300);
const profile = mkdtempSync(join(tmpdir(), "shot-"));
const proc = spawn(
  BROWSER,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--hide-scrollbars",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ],
  { stdio: "ignore" }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targetWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = tabs.find((t) => t.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  throw new Error("DevTools endpoint never came up");
}

const ws = new WebSocket(await targetWs());
let id = 0;
const pending = new Map();
const send = (method, params = {}) => {
  const msgId = ++id;
  ws.send(JSON.stringify({ id: msgId, method, params }));
  return new Promise((r) => pending.set(msgId, r));
};
ws.addEventListener("message", (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result);
    pending.delete(m.id);
  }
});
await new Promise((r) => ws.addEventListener("open", r));

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: WIDTH,
  height: HEIGHT,
  deviceScaleFactor: 2,
  mobile: WIDTH < 700,
});
await send("Page.navigate", { url: URL_ });
await sleep(2600);

// next/image lazy-loads everything below the fold. captureBeyondViewport
// renders the full height but never scrolls, so those images never enter the
// viewport and never load — the capture comes back full of empty frames that
// look exactly like broken images and are not. Scroll through first, then
// return to the top.
if (FULL) {
  await send("Runtime.evaluate", {
    expression: `(async () => {
      const step = window.innerHeight * 0.8;
      const end = document.body.scrollHeight;
      for (let y = 0; y < end; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 300));
    })()`,
    awaitPromise: true,
  });
  await sleep(900);
}

const shot = await send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: FULL,
  ...(FULL ? {} : { clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT, scale: 2 } }),
});

writeFileSync(OUT, Buffer.from(shot.data, "base64"));
console.log(`✓ ${OUT}  (${WIDTH}×${HEIGHT}${FULL ? ", full page" : ""})`);

ws.close();
proc.kill();
try {
  rmSync(profile, { recursive: true, force: true });
} catch {
  /* windows file locks */
}
