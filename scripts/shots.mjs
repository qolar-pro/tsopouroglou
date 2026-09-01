/**
 * Playwright screenshots, plus the measurements a screenshot cannot give you.
 *
 *   node scripts/shots.mjs <url> [outdir]
 *
 * The bespoke CDP shot tool takes a picture. This also reports, for every
 * image on the page, whether it actually FITS its own frame — the natural
 * aspect ratio against the rendered box, and whether the painted content
 * spills past its container.
 *
 * That distinction matters: an image squashed or overflowing inside a
 * correctly-sized container never trips the overflow audit, because the
 * document is not wider than the viewport. It only looks wrong.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const URL_ = process.argv[2] ?? "http://localhost:3000/";
const OUT = process.argv[3] ?? "shots";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844, mobile: true },
  { name: "tablet", width: 768, height: 1024, mobile: false },
  { name: "desktop", width: 1440, height: 900, mobile: false },
];

const browser = await chromium.launch();
let problems = 0;

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  });
  const page = await ctx.newPage();

  const consoleErrors = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  const failedRequests = [];
  page.on("requestfailed", (r) => failedRequests.push(r.url()));

  await page.goto(URL_, { waitUntil: "networkidle", timeout: 60000 });

  // Lazy images only load once scrolled into view; a full-page shot does not
  // scroll, so without this the capture is full of empty frames.
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 90);
        else {
          window.scrollTo(0, 0);
          setTimeout(resolve, 400);
        }
      };
      step();
    });
  });
  await page.waitForTimeout(600);

  const file = join(OUT, `${vp.name}.png`);
  await page.screenshot({ path: file, fullPage: true });

  /** Every image: does the rendered box match the file's real shape? */
  const imgs = await page.evaluate(() => {
    return [...document.querySelectorAll("img")].map((img) => {
      const r = img.getBoundingClientRect();
      const parent = img.parentElement;
      const pr = parent?.getBoundingClientRect();
      const cs = getComputedStyle(img);
      const natural = img.naturalWidth / img.naturalHeight;
      const rendered = r.width / r.height;
      return {
        alt: (img.getAttribute("alt") || "").slice(0, 38),
        loaded: img.complete && img.naturalWidth > 0,
        natural: Number(natural.toFixed(3)),
        rendered: Number(rendered.toFixed(3)),
        fit: cs.objectFit,
        w: Math.round(r.width),
        h: Math.round(r.height),
        // Painted wider or taller than the box that is meant to hold it.
        spillX: pr ? Math.round(r.right - pr.right) : 0,
        spillY: pr ? Math.round(r.bottom - pr.bottom) : 0,
      };
    });
  });

  console.log(`\n── ${vp.name} (${vp.width}px) → ${file}`);

  const broken = imgs.filter((i) => !i.loaded);
  // A ratio mismatch only distorts when object-fit is `fill`; with cover or
  // contain the browser handles it, so only `fill` counts as squashed.
  const squashed = imgs.filter(
    (i) =>
      i.loaded &&
      i.fit === "fill" &&
      Math.abs(i.natural - i.rendered) / i.natural > 0.06
  );
  const spilling = imgs.filter((i) => i.spillX > 2 || i.spillY > 2);

  console.log(`   images: ${imgs.length}`);
  if (broken.length) {
    problems += broken.length;
    console.log(`   ✗ ${broken.length} did not load:`);
    broken.forEach((i) => console.log(`       "${i.alt}"`));
  }
  if (squashed.length) {
    problems += squashed.length;
    console.log(`   ✗ ${squashed.length} distorted (object-fit:fill, wrong ratio):`);
    squashed.forEach((i) =>
      console.log(
        `       "${i.alt}"  file ${i.natural} vs box ${i.rendered}  (${i.w}×${i.h})`
      )
    );
  }
  if (spilling.length) {
    problems += spilling.length;
    console.log(`   ✗ ${spilling.length} spilling past their container:`);
    spilling.forEach((i) =>
      console.log(`       "${i.alt}"  right +${i.spillX}px  bottom +${i.spillY}px`)
    );
  }
  if (!broken.length && !squashed.length && !spilling.length) {
    console.log("   ✓ every image loaded, correctly shaped, inside its box");
  }

  if (failedRequests.length) {
    problems += failedRequests.length;
    console.log(`   ✗ ${failedRequests.length} failed request(s):`);
    failedRequests.slice(0, 5).forEach((u) => console.log(`       ${u.slice(0, 100)}`));
  }
  if (consoleErrors.length) {
    console.log(`   ! ${consoleErrors.length} console error(s):`);
    consoleErrors.slice(0, 3).forEach((e) => console.log(`       ${e.slice(0, 120)}`));
  }

  await ctx.close();
}

await browser.close();
console.log(
  problems === 0
    ? "\n✓ no image problems at any viewport\n"
    : `\n✗ ${problems} image problem(s) — see above\n`
);
process.exit(problems === 0 ? 0 : 1);
