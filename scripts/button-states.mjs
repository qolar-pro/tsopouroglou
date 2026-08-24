/**
 * Captures the call button in each of its states by forcing pseudo-classes
 * over CDP, then stacks the crops into one strip.
 *
 *   node scripts/button-states.mjs <url> <outfile>
 *
 * A normal screenshot only ever shows :rest, so the state matrix would
 * otherwise be unverified.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL_ = process.argv[2];
const OUT = process.argv[3];

const CANDIDATES = [
  `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env["ProgramFiles(x86)"]}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env.ProgramFiles}\\Microsoft\\Edge\\Application\\msedge.exe`,
  `${process.env["ProgramFiles(x86)"]}\\Microsoft\\Edge\\Application\\msedge.exe`,
];
const BROWSER = CANDIDATES.find((p) => p && existsSync(p));
if (!BROWSER) process.exit(1);

const PORT = 9911;
const profile = mkdtempSync(join(tmpdir(), "btn-"));
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
    const p = tabs.find((t) => t.type === "page");
    if (p?.webSocketDebuggerUrl) {
      wsUrl = p.webSocketDebuggerUrl;
      break;
    }
  } catch {
    /* not up */
  }
  await sleep(250);
}

const sock = new WebSocket(wsUrl);
let id = 0;
const pending = new Map();
const send = (m, p = {}) => {
  const i = ++id;
  sock.send(JSON.stringify({ id: i, method: m, params: p }));
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
await send("DOM.enable");
await send("CSS.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1000,
  height: 900,
  deviceScaleFactor: 2,
  mobile: false,
});
await send("Page.navigate", { url: URL_ });
await sleep(2600);

const { root } = await send("DOM.getDocument", { depth: -1 });
async function nodeFor(selector) {
  const { nodeId } = await send("DOM.querySelector", {
    nodeId: root.nodeId,
    selector,
  });
  return nodeId;
}

const call = await nodeFor(".hero-cta .btn-call");
const secondary = await nodeFor(".hero-cta .btn-secondary");

// Disabled state: there is no disabled button on the page, so mark the
// secondary one up as disabled to photograph the styling.
await send("Runtime.evaluate", {
  expression: `(() => {
    const b = document.querySelector('.hero-cta .btn-secondary');
    b.dataset.orig = b.getAttribute('aria-disabled') || '';
  })()`,
});

const box = await send("Runtime.evaluate", {
  expression: `(() => {
    const r = document.querySelector('.hero-cta').getBoundingClientRect();
    return JSON.stringify({x: Math.max(0, r.x - 12), y: r.y - 12, w: Math.min(1000, r.width + 24), h: r.height + 28});
  })()`,
  returnByValue: true,
});
const B = JSON.parse(box.result.value);

const shots = [];
async function capture(name) {
  const s = await send("Page.captureScreenshot", {
    format: "png",
    clip: { x: B.x, y: B.y, width: B.w, height: B.h, scale: 2 },
  });
  shots.push({ name, data: s.data });
  console.log(`  captured ${name}`);
}

await capture("rest");

await send("CSS.forcePseudoState", { nodeId: call, forcedPseudoClasses: ["hover"] });
await sleep(250);
await capture("hover");

await send("CSS.forcePseudoState", { nodeId: call, forcedPseudoClasses: ["hover", "active"] });
await sleep(250);
await capture("active (pressed)");

await send("CSS.forcePseudoState", { nodeId: call, forcedPseudoClasses: [] });
await send("CSS.forcePseudoState", { nodeId: call, forcedPseudoClasses: ["focus-visible"] });
await sleep(250);
await capture("focus-visible");

await send("CSS.forcePseudoState", { nodeId: call, forcedPseudoClasses: [] });
await send("CSS.forcePseudoState", { nodeId: secondary, forcedPseudoClasses: ["hover"] });
await sleep(250);
await capture("secondary hover");

await send("CSS.forcePseudoState", { nodeId: secondary, forcedPseudoClasses: [] });
await send("Runtime.evaluate", {
  expression: `document.querySelector('.hero-cta .btn-secondary').setAttribute('aria-disabled','true')`,
});
await sleep(250);
await capture("secondary disabled");

writeFileSync(
  OUT.replace(/\.png$/, ".json"),
  JSON.stringify(shots.map((s) => s.name))
);
for (const [i, s] of shots.entries()) {
  writeFileSync(OUT.replace(/\.png$/, `-${i}-${s.name.replace(/[^a-z]/gi, "")}.png`), Buffer.from(s.data, "base64"));
}
console.log(`\n${shots.length} state captures written next to ${OUT}`);

sock.close();
proc.kill();
try {
  rmSync(profile, { recursive: true, force: true });
} catch {
  /* windows locks */
}
