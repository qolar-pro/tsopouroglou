/**
 * Greek copy guard. Run with `npm run check`.
 *
 * Catches the class of mistake that is invisible in review but ends up in
 * meta tags, JSON-LD and the <title>:
 *
 *   1. Χαλκίδα / ΧΑΛΚΙΔΑΣ — a different city, in Evia. Not Χαλκιδική.
 *   2. Accented Greek capitals (ΜΕΤΑΜΌΡΦΩΣΗ) — wrong in Greek orthography.
 *   3. text-transform: uppercase on anything — Greek caps are authored
 *      literally so tonos-dropping and final sigma are never left to the
 *      browser.
 *   4. A stated number of years ("39 χρόνια") — goes stale every January.
 *      Only "από το 1987".
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["src", "app"];
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".md", ".json"]);

/**
 * Tonos-accented Greek capitals, but ONLY inside an all-caps run.
 *
 * Two things this must not catch:
 *  - Ϊ / Ϋ at all: dialytika IS retained on capitals (ΑΫΛΟΣ), unlike tonos.
 *  - A word-initial accented capital in title case: "Έργα" and "Άγιος" are
 *    correct Greek. The tonos is dropped only when the whole word is
 *    uppercase — ΜΕΤΑΜΟΡΦΩΣΗ, not ΜΕΤΑΜΌΡΦΩΣΗ.
 *
 * So the accented capital only counts as wrong when an uppercase Greek
 * letter sits directly beside it.
 */
const ACCENTED_CAPS = /[Α-ΩΪΫ][ΆΈΉΊΌΎΏ]|[ΆΈΉΊΌΎΏ][Α-ΩΪΫ]/;

const RULES = [
  {
    id: "chalkida",
    test: /Χαλκίδα|ΧΑΛΚΙΔΑ|Χαλκίδας|ΧΑΛΚΙΔΑΣ|ΧΑΛΚΙΔΗΣ|Χαλκίδης/,
    msg: "Wrong city. Χαλκίδα is in Evia. Use Χαλκιδική / Χαλκιδικής / ΧΑΛΚΙΔΙΚΗΣ.",
  },
  {
    id: "accented-caps",
    test: ACCENTED_CAPS,
    msg: "Accented Greek capital. Greek drops the tonos in uppercase.",
  },
  {
    id: "text-transform",
    test: /text-transform\s*:\s*(uppercase|capitalize)/i,
    msg: "text-transform on Greek is unreliable (tonos, final sigma). Author the uppercase string literally in content/site.ts.",
  },
  {
    id: "year-count",
    // No word-boundary anchor here. JS word boundaries are ASCII-only and
    // never match after a Greek letter, so the original pattern silently
    // passed "30 χρόνια" — this rule did nothing from gate 2 until a quoted
    // review exposed it.
    test: /\d{1,3}\s*(χρόνια|χρόνων|χρονια|ΧΡΟΝΙΑ|ετών|έτη|ετη)/,
    msg: 'Never state a number of years — it goes stale. Use "από το 1987". If this is inside a quoted review, add greek-guard-ok to the line.',
  },
];

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (name === "node_modules" || name === ".next" || name === ".git") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXTS.has(extname(full))) out.push(full);
  }
  return out;
}

const files = ROOTS.flatMap((r) => walk(r));
const failures = [];

for (const file of files) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const rule of RULES) {
      // The guard itself contains every pattern it looks for.
      if (file.includes("check-greek")) continue;
      // Escape hatch for lines that legitimately name a banned string,
      // e.g. the rule documentation in content/site.ts.
      if (line.includes("greek-guard-ok")) continue;
      if (rule.test.test(line)) {
        failures.push({ file, line: i + 1, rule: rule.id, msg: rule.msg, text: line.trim() });
      }
    }
  });
}

if (failures.length === 0) {
  console.log(`✓ Greek copy guard: ${files.length} files clean.`);
  process.exit(0);
}

console.error(`✗ Greek copy guard: ${failures.length} problem(s).\n`);
for (const f of failures) {
  console.error(`  ${f.file}:${f.line}  [${f.rule}]`);
  console.error(`    ${f.msg}`);
  console.error(`    > ${f.text.slice(0, 120)}\n`);
}
process.exit(1);
