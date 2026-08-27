/**
 * Taps the nav trigger the way a phone does, and reports console errors.
 *
 *   node scripts/touch-nav-test.mjs [url]
 *
 * nav-test.mjs drives the panel with element.click(), which is a synthetic
 * event that fires regardless of hydration, pointer support, or anything
 * sitting on top of the button. It passed 11/11 while the panel would not
 * open on a real phone. This dispatches real touch input at the trigger's
 * actual screen coordinates under mobile emulation, and surfaces any
 * console error or unhandled rejection — which is what a hydration failure
 * looks like from the outside.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL_ = process.argv[2] ?? "http://localhost:3000/";

// Forward slashes: existsSync accepts them on Windows, and they survive
// every layer of shell/heredoc escaping that backslashes do not.
const CANDIDATES = [
  `${process.env.ProgramFiles}/Google/Chrome/Application/chrome.exe`,
  `${process.env["ProgramFiles(x86)"]}/Google/Chrome/Application/chrome.exe`,
  `${process.env.ProgramFiles}/Microsoft/Edge/Application/msedge.exe`,
  `${process.env["ProgramFiles(x86)"]}/Microsoft/Edge/Application/msedge.exe`,
];
const BROWSER = CANDIDATES.find((p) => p && existsSync(p));
if (!BROWSER) {
  console.error("No Chrome/Edge found.");
  process.exit(1);
}

const PORT = 9781;
const profile = mkdtempSync(join(tmpdir(), "touchnav-"));
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
    if (page?.webSocketDebuggerUrl) { wsUrl = page.webSocketDebuggerUrl; break; }
  } catch { /* not up yet */ }
  await sleep(250);
}
if (!wsUrl) { console.error("Browser never exposed a debug target."); process.exit(1); }

const { WebSocket } = await import("node:worker_threads").then(() => globalThis);
const sock = new WebSocket(wsUrl);
await new Promise((r) => (sock.onopen = r));

let id = 0;
const pending = new Map();
const logs = [];
sock.onmessage = (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result);
    pending.delete(msg.id);
  }
  if (msg.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(msg.params.type)) {
    logs.push(`console.${msg.params.type}: ` + msg.params.args.map((a) => a.value ?? a.description ?? "").join(" "));
  }
  if (msg.method === "Runtime.exceptionThrown") {
    logs.push("exception: " + (msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text));
  }
};
const send = (method, params = {}) =>
  new Promise((r) => { const i = ++id; pending.set(i, r); sock.send(JSON.stringify({ id: i, method, params })); });

await send("Runtime.enable");
await send("Page.enable");
// A real phone: touch-capable, 390px, 3x DPR, no mouse.
await send("Emulation.setDeviceMetricsOverride", {
  width: 390, height: 844, deviceScaleFactor: 3, mobile: true,
});
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
await send("Emulation.setEmitTouchEventsForMouse", { enabled: true, configuration: "mobile" });

await send("Page.navigate", { url: URL_ });
await sleep(3500);

const ev = async (expr) =>
  (await send("Runtime.evaluate", { expression: expr, returnByValue: true })).result.value;

if (!(await ev(`!!document.querySelector("main") && !!document.title`))) {
  console.error(`\n\u2717 ${URL_} did not load a page from this site.\n`);
  process.exit(1);
}

const box = await ev(`(() => {
  const b = document.querySelector(".nav-trigger");
  if (!b) return null;
  const r = b.getBoundingClientRect();
  return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width, h: r.height });
})()`);

if (!box) { console.error("\n\u2717 .nav-trigger is not in the DOM at 390px.\n"); process.exit(1); }
const { x, y, w, h } = JSON.parse(box);

// What is actually on top at the tap point? A transparent overlay covering
// the button is invisible in a screenshot and swallows every real tap.
const topEl = await ev(`(() => {
  const el = document.elementFromPoint(${x}, ${y});
  if (!el) return "(nothing)";
  return el.tagName.toLowerCase() + (el.className ? "." + String(el.className).split(" ").join(".") : "");
})()`);
const insideTrigger = await ev(
  `!!document.elementFromPoint(${x}, ${y})?.closest(".nav-trigger")`
);

console.log(`\ntrigger box   ${Math.round(w)}\u00d7${Math.round(h)} at (${Math.round(x)}, ${Math.round(y)})`);
console.log(`topmost here  <${topEl}>`);
console.log(`hit-tests to trigger  ${insideTrigger ? "yes" : "NO \u2014 something is covering it"}`);

// A real tap: touchstart -> touchend at the same point.
await send("Input.dispatchTouchEvent", {
  type: "touchStart",
  touchPoints: [{ x, y, radiusX: 12, radiusY: 12, force: 1 }],
});
await sleep(60);
await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
await sleep(700);

const opened = await ev(`!!document.getElementById("site-nav-panel")`);
const expanded = await ev(`document.querySelector(".nav-trigger")?.getAttribute("aria-expanded")`);
const panelVisible = await ev(`(() => {
  const p = document.getElementById("site-nav-panel");
  if (!p) return "(absent)";
  const s = getComputedStyle(p);
  const r = p.getBoundingClientRect();
  return JSON.stringify({ display: s.display, visibility: s.visibility, opacity: s.opacity,
    zIndex: s.zIndex, position: s.position, w: Math.round(r.width), h: Math.round(r.height) });
})()`);

console.log(`\nAFTER REAL TAP:`);
console.log(`  panel in DOM        ${opened}`);
console.log(`  aria-expanded       ${expanded}`);
console.log(`  panel box/style     ${panelVisible}`);

if (logs.length) {
  console.log(`\nCONSOLE (${logs.length}):`);
  for (const l of logs.slice(0, 12)) console.log("  " + l.slice(0, 300));
} else {
  console.log(`\nCONSOLE: clean`);
}

console.log(
  opened ? `\n\u2713 the panel opens on a real touch tap\n`
         : `\n\u2717 a real touch tap does NOT open the panel\n`
);

sock.close();
proc.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch {}
process.exit(opened ? 0 : 1);
