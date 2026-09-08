/**
 * Reads the real pixel dimensions of every photograph in /public and writes
 * them to src/content/image-dimensions.ts.
 *
 *   node scripts/image-dimensions.mjs
 *
 * WHY THIS EXISTS. `next/image` needs to know an image's intrinsic size to
 * emit a srcset and reserve the right box. The masonry gallery deliberately
 * lets each photograph keep its own shape — his phone photos are a mix of
 * portrait and landscape and cropping them all to one ratio was the thing the
 * columns layout was built to avoid — so `fill` is not an option there and
 * explicit width/height is.
 *
 * Hand-typing twenty pairs of numbers would be wrong within a week of the
 * first photograph being replaced. This reads them from the files, so
 * swapping a photo is still "drop the file in and rerun the script".
 *
 * Parses the JPEG SOF marker directly rather than pulling in a dependency:
 * every file here is a phone JPEG, and this is about thirty lines.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const PUBLIC_DIR = "public";
const OUT = "src/content/image-dimensions.ts";

/** Width and height from a JPEG's start-of-frame marker. */
function jpegSize(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null; // not a JPEG
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    // SOF0–SOF15 carry the frame size. C4 (DHT), C8 (JPG) and CC (DAC) sit in
    // the same numeric range but are not frame headers.
    if (
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc
    ) {
      return {
        h: buf.readUInt16BE(i + 5),
        w: buf.readUInt16BE(i + 7),
      };
    }
    // Otherwise skip this segment by its declared length.
    const len = buf.readUInt16BE(i + 2);
    if (!len) break;
    i += 2 + len;
  }
  return null;
}

const entries = [];
const failures = [];

/** Every image directory directly under /public. */
for (const dir of readdirSync(PUBLIC_DIR, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  for (const file of readdirSync(join(PUBLIC_DIR, dir.name))) {
    if (!/\.jpe?g$/i.test(file)) continue;
    const path = join(PUBLIC_DIR, dir.name, file);
    const size = jpegSize(readFileSync(path));
    const url = `/${dir.name}/${file}`;
    if (!size) {
      failures.push(url);
      continue;
    }
    entries.push([url, size]);
  }
}

if (failures.length) {
  console.error(`\n✗ could not read dimensions for:\n  ${failures.join("\n  ")}\n`);
  process.exit(1);
}

entries.sort((a, b) => a[0].localeCompare(b[0]));

const body = entries
  .map(([url, { w, h }]) => `  "${url}": { w: ${w}, h: ${h} },`)
  .join("\n");

writeFileSync(
  OUT,
  `/**
 * GENERATED — do not edit by hand.
 *
 *   npm run dimensions
 *
 * Real pixel dimensions of every photograph in /public, so \`next/image\` can
 * emit a srcset and reserve the right box for images the masonry renders at
 * their natural shape. Rerun after adding or replacing a photograph; the
 * media check fails if a file here has no entry.
 */
export const IMAGE_DIMENSIONS: Record<string, { w: number; h: number }> = {
${body}
};
`
);

console.log(`✓ dimensions: ${entries.length} images → ${OUT}`);
