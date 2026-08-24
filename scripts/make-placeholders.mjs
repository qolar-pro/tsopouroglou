/**
 * Generates the dummy images called for in CLAUDE.md §6b.
 *
 *   npm run placeholders
 *
 * DELIBERATELY NOT PHOTOGRAPHS. §6b's rule is that the gallery and fleet
 * never show stock as his work, and its instruction is "3 obvious dummy
 * images" — obvious being the point. These state in Greek exactly which
 * photograph belongs in the slot, at the aspect ratio a phone actually
 * produces, so the layout can be judged without anything that could be
 * mistaken for a job he did.
 *
 * Swapping in real photos means dropping files into /public/erga (or
 * /public/exoplismos) and editing ONE file, src/content/media.ts.
 */
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = "public/placeholder";
mkdirSync(OUT, { recursive: true });

// Palette, kept in step with globals.css.
const STONE = "#e4e8e6";
const RAISED = "#f1f3f1";
const LINE = "#7c8583";
const INK = "#15191a";
const ACCENT = "#0a6136";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * @param {string} file
 * @param {number} w  aspect width
 * @param {number} h  aspect height
 * @param {string} title  what photograph belongs here
 * @param {string} note   extra guidance for whoever takes it
 */
function make(file, w, h, title, note) {
  const W = w * 100;
  const H = h * 100;
  const wrap = (text, per) => {
    const words = text.split(" ");
    const lines = [];
    let cur = "";
    for (const word of words) {
      if ((cur + " " + word).trim().length > per) {
        lines.push(cur.trim());
        cur = word;
      } else cur += " " + word;
    }
    if (cur.trim()) lines.push(cur.trim());
    return lines;
  };

  const titleLines = wrap(title, Math.round(w * 7.5));
  const fs = Math.round(Math.min(W, H) * 0.075);
  const startY = H / 2 - ((titleLines.length - 1) * fs * 1.3) / 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(title)}">
  <defs>
    <pattern id="h" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="24" stroke="${LINE}" stroke-width="1.5" opacity="0.28"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="${STONE}"/>
  <rect width="${W}" height="${H}" fill="url(#h)"/>
  <rect x="10" y="10" width="${W - 20}" height="${H - 20}" fill="none" stroke="${LINE}" stroke-width="3" stroke-dasharray="14 10"/>
  <rect x="${W - Math.round(W * 0.3)}" y="0" width="${Math.round(W * 0.3)}" height="${Math.round(fs * 1.5)}" fill="${ACCENT}"/>
  <text x="${W - Math.round(W * 0.15)}" y="${Math.round(fs * 1.05)}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${Math.round(fs * 0.62)}" font-weight="700" letter-spacing="2" fill="#ffffff">ΔΕΙΓΜΑ</text>
${titleLines
  .map(
    (line, i) =>
      `  <text x="50%" y="${Math.round(startY + i * fs * 1.3)}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${fs}" font-weight="700" fill="${INK}">${esc(line)}</text>`
  )
  .join("\n")}
  <text x="50%" y="${Math.round(H - fs * 1.6)}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${Math.round(fs * 0.6)}" fill="${INK}" opacity="0.75">${esc(note)}</text>
  <text x="50%" y="${Math.round(H - fs * 0.6)}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${Math.round(fs * 0.55)}" fill="${INK}" opacity="0.55">${w}:${h} · ΘΕΣΗ ΓΙΑ ΠΡΑΓΜΑΤΙΚΗ ΦΩΤΟΓΡΑΦΙΑ</text>
</svg>
`;
  writeFileSync(`${OUT}/${file}.svg`, svg);
  return `${file}.svg`;
}

const made = [];

// --- Έργα: before/after pairs. The primary gallery format; no competitor
//     has them, and they are the most persuasive thing an earthworks
//     business can show.
const ERGA = [
  ["oikopedo", "Καθαρισμός οικοπέδου", "Μεταμόρφωση"],
  ["themelia", "Εκσκαφή θεμελίων", "Οικισμός Δασκάλων"],
  ["avli", "Στρώσιμο χώματος σε αυλή", "Ψακούδια"],
  ["vothros", "Κατασκευή βόθρου", "Νικήτη"],
  ["paralia", "Καθαρισμός παραλίας", "Βατοπέδι"],
  ["vrachos", "Εκβραχισμός σε οικόπεδο", "Μεταμόρφωση"],
];
for (const [slug, label, place] of ERGA) {
  made.push(make(`erga-${slug}-prin`, 4, 3, `ΠΡΙΝ — ${label}`, place));
  made.push(make(`erga-${slug}-meta`, 4, 3, `ΜΕΤΑ — ${label}`, place));
}

// --- Στόλος: one per confirmed machine. Nothing here is a machine he
//     didn't tell us he owns.
const MACHINES = [
  ["tsapa-megali", "Τσάπα μεγάλη"],
  ["tsapa-mesaia", "Τσάπα μεσαία"],
  ["tsapa-mikri", "Τσάπα μικρή"],
  ["fortotis", "Φορτωτής"],
  ["fortiga", "Φορτηγά"],
  ["jcb", "JCB"],
  ["diavolaki", "Διαβολάκι"],
  ["trakter", "Τρακτέρ"],
];
for (const [slug, label] of MACHINES) {
  made.push(make(`stolos-${slug}`, 4, 3, label, "Φωτογραφία μηχανήματος"));
}

// --- One portrait slot for the company page. Phone photos are often 3:4.
made.push(
  make("etaireia-adelfia", 3, 4, "Γρηγόρης και Νικόλαος", "Στο εργοτάξιο")
);

console.log(`✓ ${made.length} placeholders written to ${OUT}/`);
