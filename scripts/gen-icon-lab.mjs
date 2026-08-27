/**
 * Emits the icon lab from ONE definition per mark, so the navbar copy and the
 * favicon copy can never drift apart. They differ only in how colour is
 * resolved: the navbar copy inherits currentColor, the favicon copy cannot —
 * a favicon is an isolated document where currentColor is plain black — so it
 * carries explicit fills plus a prefers-color-scheme rule.
 */
import { writeFileSync } from "node:fs";

const OUT = "public/_iconlab";
const INK = "#15191a";
const GREEN = "#0a6136";

const MARKS = [
  {
    id: "s1",
    name: "ΤΟΜΗ — a cut in the ground",
    note: "A soft green tile with a smooth U bitten out of its top edge: a trench opened in the ground. Carries the trade and stays a clean shape at 16px.",
    solid: true,
    path: `<path fill-rule="evenodd" d="M14 2h36a12 12 0 0 1 12 12v36a12 12 0 0 1-12 12H14A12 12 0 0 1 2 50V14A12 12 0 0 1 14 2zm10 0h16v22a8 8 0 0 1-16 0z"/>`,
  },
  {
    id: "s2",
    name: "ΠΛΑΚΙΔΙΟ — rounded tile with Τ",
    note: "The same tile with his initial cut clean out of it. The most app-like, and the only one that carries the name.",
    solid: true,
    path: `<path fill-rule="evenodd" d="M14 2h36a12 12 0 0 1 12 12v36a12 12 0 0 1-12 12H14A12 12 0 0 1 2 50V14A12 12 0 0 1 14 2zm3 16a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h11v20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V28h11a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z"/>`,
  },
  {
    id: "s3",
    name: "ΣΩΡΟΣ — heap on a level line",
    note: "A smooth heap of earth resting on the level line the design system is already named after. The quietest of the four.",
    ink: `<path class="ink" d="M4 42C4 42 16 10 32 10s28 32 28 32a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/>`,
    accent: `<rect x="2" y="51" width="60" height="11" rx="5.5" fill="ACCENT"/>`,
  },
  {
    id: "s4",
    name: "ΚΟΥΒΑΣ — the scoop, smoothed",
    note: "One continuous curve, no teeth. Reads as a scoop rather than as machinery. Green throughout, so nothing competes inside it.",
    solid: true,
    path: `<path d="M12 10h40a4 4 0 0 1 4 4v14a24 24 0 0 1-48 0V14a4 4 0 0 1 4-4z"/>`,
  },
];

/**
 * One mark, two colour resolutions.
 *
 * A "solid" mark is a single green shape with its counter cut out, so it needs
 * no dark-mode flip — green reads on both grounds. Everything else is an ink
 * silhouette plus a green accent, and the ink has to invert on dark.
 *
 * The first version of this compared its argument against the string "ink"
 * while every caller passed a hex, so the green tiles silently rendered black.
 */
const body = (m, inkFill) =>
  m.solid
    ? m.path.replace("<path", `<path fill="${GREEN}"`)
    : m.ink.replace('class="ink"', `fill="${inkFill}"`) +
      m.accent.replace("ACCENT", GREEN);

/** Favicon: explicit fills, plus a rule so it survives a dark tab strip. */
for (const m of MARKS) {
  const inner = m.solid
    ? m.path.replace("<path", `<path fill="${GREEN}"`)
    : `<style>.ink{fill:${INK}}@media (prefers-color-scheme:dark){.ink{fill:#fff}}</style>` +
      m.ink +
      m.accent.replace("ACCENT", GREEN);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${inner}</svg>`;
  writeFileSync(`${OUT}/fav-${m.id}.svg`, svg);

  writeFileSync(
    `${OUT}/tab-${m.id}.html`,
    `<!doctype html><html lang="el"><head><meta charset="utf-8">
<link rel="icon" href="/_iconlab/fav-${m.id}.svg" type="image/svg+xml">
<title>${m.id.toUpperCase()} · ΤΣΟΠΟΥΡΟΓΛΟΥ</title>
<style>body{font:16px system-ui;margin:0;display:grid;place-items:center;min-height:100vh;text-align:center}
p{color:#434b4c;font-size:14px;max-width:44ch;margin:8px auto}a{color:#0a6136;padding:0 6px}</style>
</head><body><div>
<img src="/_iconlab/fav-${m.id}.svg" width="150" height="150" alt="">
<h1 style="font-size:19px;margin:16px 0 0">${m.name}</h1>
<p>${m.note}</p><p><b>Look at the browser tab.</b></p>
<p>${MARKS.map((x) => `<a href="/_iconlab/tab-${x.id}.html">${x.id}</a>`).join("·")}</p>
</div></body></html>`
  );
}

/** The comparison sheet. Inline SVG, so currentColor genuinely inherits. */
const sizes = [96, 48, 32, 16];
const cell = (m, px, col) =>
  `<div class="u"><svg viewBox="0 0 64 64" width="${px}" height="${px}">${body(m, col)}</svg><div class="cap">${px}px</div></div>`;

writeFileSync(
  `${OUT}/index.html`,
  `<!doctype html><html><head><meta charset="utf-8"><title>icons</title><style>
body{font:16px system-ui;margin:0;padding:28px;background:#fff;color:#15191a}
h2{font-size:15px;margin:30px 0 4px}.note{font-size:13px;color:#434b4c;margin:0 0 10px;max-width:70ch}
.row{display:flex;align-items:flex-end;gap:26px;padding:16px 20px;border:1px solid #dce0de}
.row.dark{background:#111716;border-color:#111716;color:#fff}
.cap{font-size:11px;color:#434b4c;text-align:center;margin-top:6px}.dark .cap{color:#e4e8e6}
.u{display:flex;flex-direction:column;align-items:center}
.nav{display:flex;align-items:center;gap:11px;padding:12px 20px;border:1px solid #dce0de;margin-top:8px}
.wm{font:900 19px system-ui}.tag{font-size:11px;letter-spacing:.1em;color:#434b4c}svg{display:block}
</style></head><body>` +
    MARKS.map(
      (m) => `<h2>${m.name}</h2><p class="note">${m.note}</p>
<div class="row">${sizes.map((s) => cell(m, s, INK)).join("")}</div>
<div class="row dark">${sizes.map((s) => cell(m, s, "#ffffff")).join("")}</div>
<div class="nav"><svg viewBox="0 0 64 64" width="34" height="34">${body(m, INK)}</svg>
<div><div class="wm">Γ. &amp; Ν. ΤΣΟΠΟΥΡΟΓΛΟΥ</div><div class="tag">ΧΩΜΑΤΟΥΡΓΙΚΑ · ΜΕΤΑΜΟΡΦΩΣΗ ΧΑΛΚΙΔΙΚΗΣ</div></div></div>`
    ).join("") +
    `</body></html>`
);

console.log(`wrote ${MARKS.length} marks + lab`);
