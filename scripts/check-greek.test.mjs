const R = /[Α-ΩΪΫ][ΆΈΉΊΌΎΏ]|[ΆΈΉΊΌΎΏ][Α-ΩΪΫ]/;
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
let fail = 0;
for (const [s, expected, note] of cases) {
  const got = R.test(s);
  const ok = got === expected;
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${String(got).padEnd(5)} (want ${String(expected).padEnd(5)})  ${s}  — ${note}`);
}
process.exit(fail ? 1 : 0);
