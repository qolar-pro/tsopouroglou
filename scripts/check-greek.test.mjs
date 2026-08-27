const R = /[Α-ΩΪΫ][ΆΈΉΊΌΎΏ]|[ΆΈΉΊΌΎΏ][Α-ΩΪΫ]/;
// The year-count rule. Deliberately has no : JavaScript's  is ASCII-only
// and never matches after a Greek letter, which is how the original pattern
// silently did nothing for several gates.
const Y = /\d{1,3}\s*(χρόνια|χρόνων|χρονια|ΧΡΟΝΙΑ|ετών|έτη|ετη)/;
const cases = [
  ["Έργα", false, "title case, correct Greek"],
  ["Άγιος Νικόλαος", false, "title case"],
  ["ΜΕΤΑΜΌΡΦΩΣΗ", true, "all-caps with tonos — WRONG"],
  ["ΆΓΙΟΣ", true, "all-caps leading tonos — WRONG"],
  ["ΜΕΤΑΜΟΡΦΩΣΗ", false, "all-caps correct"],
  ["ΧΑΛΚΙΔΙΚΗΣ", false, "all-caps correct"],
  ["ΑΫΛΟΣ", false, "dialytika on capital is correct"],
  ["Ψακούδια", false, "title case, accent on lowercase"],
  ["ΕΚΒΡΑΧΙΣΜΟΊ", true, "all-caps trailing tonos — WRONG"],
];
const yearCases = [
  ["πάνω από 30 χρόνια προϋπηρεσίας", true, "year count — must be caught"],
  ["39 χρόνια στη δουλειά", true, "year count — must be caught"],
  ["εδώ και 12 χρόνων", true, "year count — must be caught"],
  ["5 έτη", true, "year count — must be caught"],
  ["από το 1987", false, "founding year is fine"],
  ["όλο το 24ωρο", false, "24ωρο is not a year count"],
  ["Πτυχίο χειριστή από το 1990", false, "licence year is fine"],
];

let fail = 0;
for (const [s, expected, note] of yearCases) {
  const got = Y.test(s);
  const ok = got === expected;
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${String(got).padEnd(5)} (want ${String(expected).padEnd(5)})  ${s}  — ${note}`);
}
for (const [s, expected, note] of cases) {
  const got = R.test(s);
  const ok = got === expected;
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${String(got).padEnd(5)} (want ${String(expected).padEnd(5)})  ${s}  — ${note}`);
}
process.exit(fail ? 1 : 0);
