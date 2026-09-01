/**
 * Contrast audit — reads the real tokens out of globals.css and asserts every
 * pair the design depends on.
 *
 *   npm run contrast
 *
 * Exists because the ratios quoted in DESIGN_PLAN.md were computed in
 * throwaway scripts. That made them correct but unreproducible, and nothing
 * caught a token edit that broke AAA. Contrast is a stated non-negotiable
 * (CLAUDE.md §7): the audience is 40-70, often outdoors in Chalkidiki sun on
 * a phone, so body text is held to AAA and muted text to AAA as well —
 * stricter than the spec, because muted text is what fails first in daylight.
 *
 * Parsing the stylesheet rather than duplicating the hex values is the point:
 * a copy would drift from what actually ships.
 */
import { readFileSync } from "node:fs";

const css = readFileSync("src/app/globals.css", "utf8");

/** Pull `--color-name: #hex;` declarations out of the @theme block. */
function readTokens() {
  const out = {};
  const re = /--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g;
  let m;
  while ((m = re.exec(css))) out[m[1]] = m[2];
  return out;
}

const T = readTokens();

function lin(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
function L(hex) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function ratio(a, b) {
  const [la, lb] = [L(a), L(b)];
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const WHITE = "#ffffff";

/** [label, foreground, background, minimum, why] */
const CHECKS = [
  // Body text — AAA on all three light surfaces.
  ["body ink on field", "ink", "field", 7.0, "AAA body"],
  ["body ink on raised", "ink", "raised", 7.0, "AAA body"],
  ["body ink on stone", "ink", "stone", 7.0, "AAA body"],

  // Muted text — deliberately held to AAA too, for daylight.
  ["muted on field", "ink-muted", "field", 7.0, "AAA (stricter than spec)"],
  ["muted on raised", "ink-muted", "raised", 7.0, "AAA (stricter than spec)"],
  ["muted on stone", "ink-muted", "stone", 7.0, "AAA (stricter than spec)"],

  // Accent as text.
  ["accent on field", "accent", "field", 4.5, "AA link"],
  ["accent on raised", "accent", "raised", 4.5, "AA link"],

  // Functional lines must be perceivable boundaries.
  ["line on field", "line", "field", 3.0, "UI boundary"],
  ["line on raised", "line", "raised", 3.0, "UI boundary"],
  ["line on stone", "line", "stone", 3.0, "UI boundary"],

  // The call CTA — one colour on every surface, white label everywhere.
  ["white label on accent", WHITE, "accent", 4.5, "AA button"],
  ["white label on accent-hover", WHITE, "accent-hover", 4.5, "AA button"],
  ["white label on accent-press", WHITE, "accent-press", 4.5, "AA button"],
  ["accent fill vs field", "accent", "field", 3.0, "button edge"],
  ["accent fill vs raised", "accent", "raised", 3.0, "button edge"],

  // Inverted — the footer and the closing contact band.
  ["raised text on deep", "raised", "deep", 7.0, "AAA inverted"],
  ["field text on deep", "field", "deep", 7.0, "AAA inverted"],
  // Muted copy inside the dark band. Held to AAA like its light-ground
  // counterpart: this is read outdoors in sun, on a phone.
  ["stone text on deep", "stone", "deep", 7.0, "AAA inverted muted"],
  // The breadcrumb inside a dark hero. It inherited ink-muted — tuned for the
  // light surfaces — and shipped at about 1.9:1 on the dark ground. Pinned so
  // the same inheritance mistake cannot pass again.
  ["breadcrumb on deep", "stone", "deep", 7.0, "AAA inverted link"],

  // On dark the CTA keeps its fill and gains a ring, rather than taking a
  // second colour whose label would fail. The ring must read on both sides.
  ["CTA ring vs deep", "field", "deep", 3.0, "ring on dark ground"],
  ["CTA ring vs accent fill", "field", "accent", 3.0, "ring on its own fill"],

  // Focus, both grounds.
  ["focus ring on field", "ink", "field", 3.0, "focus"],
  ["focus ring on deep", "field", "deep", 3.0, "focus"],
];

/**
 * Tokens that must NEVER be used as text on a light surface, with the ratio
 * that proves why. Asserted as an upper bound so nobody "fixes" the palette
 * by lightening ink-muted into the danger zone.
 */
const FORBIDDEN = [["line as body text on field", "line", "field", 4.5]];

let failed = 0;
const missing = [];

console.log(`\nTokens read from globals.css: ${Object.keys(T).length}\n`);

for (const [label, fg, bg, min, why] of CHECKS) {
  const f = T[fg] ?? (fg.startsWith("#") ? fg : null);
  const b = T[bg] ?? (bg.startsWith("#") ? bg : null);
  if (!f || !b) {
    missing.push(`${label} (missing token: ${!f ? fg : bg})`);
    failed++;
    continue;
  }
  const r = ratio(f, b);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(
    `  ${ok ? "ok  " : "FAIL"}  ${r.toFixed(2).padStart(6)}  (min ${String(min).padStart(4)})  ${label.padEnd(30)} ${why}`
  );
}

for (const [label, fg, bg, mustBeUnder] of FORBIDDEN) {
  const r = ratio(T[fg], T[bg]);
  const ok = r < mustBeUnder;
  if (!ok) failed++;
  console.log(
    `  ${ok ? "ok  " : "FAIL"}  ${r.toFixed(2).padStart(6)}  (< ${mustBeUnder})     ${label.padEnd(30)} must stay decorative`
  );
}

if (missing.length) {
  console.error("\nMissing tokens:\n  " + missing.join("\n  "));
}

console.log(
  failed === 0
    ? `\n✓ Contrast audit: ${CHECKS.length + FORBIDDEN.length} pairs pass.\n`
    : `\n✗ Contrast audit: ${failed} failure(s).\n`
);
process.exit(failed === 0 ? 0 : 1);
