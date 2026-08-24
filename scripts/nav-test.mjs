/**
 * Exercises the navigation panel — the only interactive component on the
 * site — over CDP, so its accessibility behaviour is verified rather than
 * assumed.
 *
 *   node scripts/nav-test.mjs <url> [screenshot-out]
 *
 * Checks: aria-expanded flips, the panel mounts with role/aria-modal, body
 * scroll locks, focus moves into the panel, Escape closes it, scroll
 * unlocks, and focus returns to the trigger.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL_ = process.argv[2] ?? "http://localhost:3123/";
const OUT = process.argv[3];

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

const PORT = 9777;
const profile = mkdtempSync(join(tmpdir(), "nav-"));
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

let wsUrl;
for (let i = 0; i < 60; i++) {
  try {
    const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    const page = tabs.find((t) => t.type === "page");
    if (page?.webSocketDebuggerUrl) {
      wsUrl = page.webSocketDebuggerUrl;
      break;
    }
  } catch {
    /* not up yet */
  }
  await sleep(250);
}

const sock = new WebSocket(wsUrl);
let id = 0;
const pending = new Map();
const send = (method, params = {}) => {
  const i = ++id;
  sock.send(JSON.stringify({ id: i, method, params }));
  return new Promise((r) => pending.set(i, r));
};
sock.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result);
    pending.delete(m.id);
  }
});
await new Promise((r) => sock.addEventListener("open", r));

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 2,
  mobile: true,
});
await send("Page.navigate", { url: URL_ });
await sleep(2800);

const ev = async (expr) =>
  (await send("Runtime.evaluate", { expression: expr, returnByValue: true }))
    .result.value;

const results = [];
const check = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  results.push(ok);
  console.log(
    `  ${ok ? "PASS" : "FAIL"}  ${name.padEnd(34)} ${JSON.stringify(got)}`
  );
};

console.log("\nCLOSED:");
check(
  "aria-expanded",
  await ev(`document.querySelector('.nav-trigger').getAttribute('aria-expanded')`),
  "false"
);
check("panel not in DOM", await ev(`!!document.querySelector('.nav-panel')`), false);
check("body scroll free", await ev(`document.body.style.overflow`), "");

await ev(`document.querySelector('.nav-trigger').click()`);
await sleep(600);

console.log("\nOPEN:");
check(
  "aria-expanded",
  await ev(`document.querySelector('.nav-trigger').getAttribute('aria-expanded')`),
  "true"
);
check("panel in DOM", await ev(`!!document.querySelector('.nav-panel')`), true);
check(
  "role + aria-modal",
  await ev(
    `(()=>{const p=document.querySelector('.nav-panel');return p.getAttribute('role')+'/'+p.getAttribute('aria-modal')})()`
  ),
  "dialog/true"
);
check("body scroll locked", await ev(`document.body.style.overflow`), "hidden");
check(
  "focus inside panel",
  await ev(`document.querySelector('.nav-panel').contains(document.activeElement)`),
  true
);
console.log(
  `        focused: ${JSON.stringify(await ev(`document.activeElement.textContent.trim().slice(0,30)`))}`
);
console.log(
  `        links:   ${await ev(`JSON.stringify([...document.querySelectorAll('.nav-list a')].map(a=>a.textContent))`)}`
);

if (OUT) {
  const shot = await send("Page.captureScreenshot", {
    format: "png",
    clip: { x: 0, y: 0, width: 390, height: 844, scale: 2 },
  });
  writeFileSync(OUT, Buffer.from(shot.data, "base64"));
  console.log(`        screenshot: ${OUT}`);
}

await send("Input.dispatchKeyEvent", {
  type: "keyDown",
  key: "Escape",
  code: "Escape",
  windowsVirtualKeyCode: 27,
});
await send("Input.dispatchKeyEvent", {
  type: "keyUp",
  key: "Escape",
  code: "Escape",
  windowsVirtualKeyCode: 27,
});

await sleep(600);

console.log("\nAFTER ESCAPE:");
check("panel removed", await ev(`!!document.querySelector('.nav-panel')`), false);
check("body scroll restored", await ev(`document.body.style.overflow`), "");
check(
  "focus back on trigger",
  await ev(`document.activeElement===document.querySelector('.nav-trigger')`),
  true
);

const failed = results.filter((r) => !r).length;
console.log(
  `\n${failed === 0 ? "✓" : "✗"} ${results.length - failed}/${results.length} checks passed\n`
);

sock.close();
proc.kill();
try {
  rmSync(profile, { recursive: true, force: true });
} catch {
  /* windows file locks */
}
process.exit(failed === 0 ? 0 : 1);
