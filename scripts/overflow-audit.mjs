/**
 * Finds elements wider than the viewport, at a given width.
 *
 *   node scripts/overflow-audit.mjs <url> <width> [height]
 *
 * Drives an installed Edge/Chrome over the DevTools Protocol. Kept because
 * horizontal overflow on a phone is the single most common layout bug in a
 * mobile-first build, and eyeballing screenshots does not localise it.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL_ = process.argv[2] ?? "http://localhost:3112/";
const WIDTH = Number(process.argv[3] ?? 320);
const HEIGHT = Number(process.argv[4] ?? 900);

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

const PORT = 9222 + (WIDTH % 100);
const profile = mkdtempSync(join(tmpdir(), "overflow-"));
const proc = spawn(
  BROWSER,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--hide-scrollbars",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    `--window-size=${WIDTH},${HEIGHT}`,
    "about:blank",
  ],
  { stdio: "ignore" }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targetWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const tabs = await res.json();
      const page = tabs.find((t) => t.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  throw new Error("DevTools endpoint never came up");
}

const EXPR = `(() => {
  const vw = document.documentElement.clientWidth;
  const out = [];
  for (const el of document.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const overflowRight = Math.round(r.right - vw);
    if (r.width > vw + 0.5 || overflowRight > 0.5) {
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.getAttribute('class') || '').slice(0, 60),
        width: Math.round(r.width),
        right: Math.round(r.right),
        over: overflowRight,
        text: (el.textContent || '').trim().slice(0, 48),
      });
    }
  }
  return JSON.stringify({
    viewport: vw,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    offenders: out.slice(0, 40),
  });
})()`;

const wsUrl = await targetWs();
const ws = new WebSocket(wsUrl);
let id = 0;
const pending = new Map();

function send(method, params = {}) {
  const msgId = ++id;
  ws.send(JSON.stringify({ id: msgId, method, params }));
  return new Promise((resolve) => pending.set(msgId, resolve));
}

ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result);
    pending.delete(msg.id);
  }
});

await new Promise((r) => ws.addEventListener("open", r));

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: WIDTH,
  height: HEIGHT,
  deviceScaleFactor: 1,
  mobile: true,
});
await send("Page.navigate", { url: URL_ });
await sleep(2500);

const res = await send("Runtime.evaluate", {
  expression: EXPR,
  returnByValue: true,
});

const data = JSON.parse(res.result.value);
console.log(`\nviewport ${data.viewport}px · documentElement.scrollWidth ${data.scrollWidth}px · body.scrollWidth ${data.bodyScrollWidth}px`);
if (data.offenders.length === 0) {
  console.log("✓ no element exceeds the viewport\n");
} else {
  console.log(`\n✗ ${data.offenders.length} element(s) past the right edge:\n`);
  for (const o of data.offenders) {
    console.log(`  <${o.tag} class="${o.cls}">`);
    console.log(`     width ${o.width}  right ${o.right}  OVER BY ${o.over}px`);
    if (o.text) console.log(`     "${o.text}"`);
    console.log("");
  }
}

ws.close();
proc.kill();
try {
  rmSync(profile, { recursive: true, force: true });
} catch {
  /* windows file locks */
}
process.exit(data.offenders.length === 0 ? 0 : 1);
