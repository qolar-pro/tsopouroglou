/**
 * Reads computed styles for a handful of layout-critical selectors at a
 * given viewport, so responsive rules are verified rather than inferred.
 *
 *   node scripts/layout-probe.mjs <url> <width>
 *
 * Exists because equal-specificity CSS declared after a media block wins on
 * source order and silently kills it. That has bitten three times in this
 * stylesheet; eyeballing a screenshot does not reliably catch it.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL_ = process.argv[2];
const WIDTH = Number(process.argv[3] ?? 1280);

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

const PORT = 9800 + (WIDTH % 150);
const profile = mkdtempSync(join(tmpdir(), "probe-"));
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
await send("Emulation.setDeviceMetricsOverride", {
  width: WIDTH,
  height: 900,
  deviceScaleFactor: 1,
  mobile: WIDTH < 700,
});
await send("Page.navigate", { url: URL_ });
await sleep(2500);

const PROBES = [
  // The rail is the whole redesign — verify it folds and unfolds.
  [".band-grid", "gridTemplateColumns"],
  [".band-body", "minWidth"],
  [".wrap", "paddingLeft"],
  // Section layouts.
  [".items", "gridTemplateColumns"],
  [".facts", "gridTemplateColumns"],
  [".place", "gridTemplateColumns"],
  [".reviews", "columnCount"],
  [".rail", "gridAutoColumns"],
  [".hero-meta", "gridTemplateColumns"],
  [".contact-grid", "gridTemplateColumns"],
  [".creds", "gridTemplateColumns"],
  [".footer-cols", "gridTemplateColumns"],
  // Chrome that swaps at the 940px nav breakpoint.
  [".sticky-call", "display"],
  [".nav-trigger", "display"],
  [".desk-nav", "display"],
  ["body", "paddingBottom"],
  // Tokens that must survive the cascade.
  [".btn-call", "backgroundColor"],
  [".hero-year", "fontSize"],
];

const expr = `JSON.stringify(${JSON.stringify(PROBES)}.map(([sel, prop]) => {
  const el = document.querySelector(sel);
  if (!el) return [sel, prop, "(absent)"];
  const v = getComputedStyle(el)[prop];
  return [sel, prop, v];
}))`;

const res = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
const rows = JSON.parse(res.result.value);

console.log(`\nviewport ${WIDTH}px`);
// A selector that is absent means the probe list has drifted away from the
// stylesheet — the tool then silently stops checking whatever it was for.
const absent = rows.filter(([, , v]) => v === "(absent)").map(([s]) => s);
for (const [sel, prop, val] of rows) {
  const cols = prop === "gridTemplateColumns" && val.includes(" ")
    ? ` (${val.split(" ").length} cols)`
    : "";
  console.log(`  ${sel.padEnd(16)} ${prop.padEnd(20)} ${val}${cols}`);
}

if (absent.length) {
  console.log(
    `
! ${absent.length} probe selector(s) not on this page: ${absent.join(", ")}` +
      `
  Either the page does not use them, or the probe list is stale.
`
  );
}

sock.close();
proc.kill();
try {
  rmSync(profile, { recursive: true, force: true });
} catch {
  /* windows locks */
}
