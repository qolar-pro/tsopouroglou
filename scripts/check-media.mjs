/**
 * Stops dummy images reaching a live site.
 *
 * CLAUDE.md §6b is unambiguous: the site does not go live with stock or dummy
 * photography standing in for his work. It would be a lie to his customers,
 * in a village where a competitor would notice. The flags make previewing
 * easy, so this makes shipping the preview hard.
 *
 * Fails when SHOW_PLACEHOLDER_MEDIA is true AND the build is a production
 * deploy (VERCEL_ENV=production, or CHECK_MEDIA_STRICT=1 locally).
 */
import { readFileSync } from "node:fs";

const media = readFileSync("src/content/media.ts", "utf8");
const site = readFileSync("src/content/site.ts", "utf8");

const showPlaceholders = /SHOW_PLACEHOLDER_MEDIA\s*=\s*true/.test(media);
const hasRealPhotos = /HAS_REAL_PHOTOS\s*=\s*true/.test(site);
const isProd =
  process.env.VERCEL_ENV === "production" ||
  process.env.CHECK_MEDIA_STRICT === "1";

if (showPlaceholders && hasRealPhotos) {
  console.error(
    "\n✗ media: SHOW_PLACEHOLDER_MEDIA and HAS_REAL_PHOTOS are both true.\n" +
      "  Real photos are in, so turn the dummies off.\n"
  );
  process.exit(1);
}

if (showPlaceholders && isProd) {
  console.error(
    "\n✗ media: SHOW_PLACEHOLDER_MEDIA is true in a PRODUCTION build.\n" +
      "  Dummy images must never reach the live site (CLAUDE.md §6b).\n" +
      "  Set SHOW_PLACEHOLDER_MEDIA = false in src/content/media.ts.\n"
  );
  process.exit(1);
}

if (showPlaceholders) {
  console.log(
    "⚠ media: placeholder preview is ON. Fine locally; this build must not " +
      "be promoted to production."
  );
} else {
  console.log(
    `✓ media: placeholders off${hasRealPhotos ? ", real photos on" : ""}.`
  );
}
