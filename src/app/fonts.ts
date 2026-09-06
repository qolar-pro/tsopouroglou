import { Alegreya_Sans } from "next/font/google";

/**
 * Shared by BOTH root layouts — (el) and (intl).
 *
 * next/font must be called at module scope, and calling it twice (once per
 * layout) would generate two independent font instances with different class
 * names and two sets of preload tags for the same files. One module, imported
 * by both, keeps it to a single instance.
 *
 * WHY TWO INSTANCES OF ONE FAMILY: purely to control what gets preloaded.
 * Measured: the latin subset is ~16.9KB per weight, greek only ~5.3KB — latin
 * is the expensive one. And ASCII digits live in the LATIN subset (its
 * unicode-range starts U+0000–00FF), so dropping latin entirely would make
 * "1987" at 208px — the LCP element — render in a fallback and swap.
 *
 * So: weight 900 keeps latin preloaded, because that is the year and the
 * wordmark. Weights 400 and 700 preload greek only; their latin glyphs (the
 * email, "JCB", small digits) load on demand, and next/font's metric-matched
 * fallback keeps the swap from shifting layout.
 *
 * 8 preloaded files / 87KB  →  4 preloaded files / 32.5KB.
 *
 * NOTE ON THE TRANSLATED PAGES: /en and /sr are mostly latin text set in
 * weights 400 and 700, whose latin subset is deliberately NOT preloaded. That
 * is the right trade — those two routes are a small fraction of traffic, the
 * metric-matched fallback means no layout shift, and preloading latin for
 * every Greek visitor to spare two pages a swap would be backwards.
 */
export const alegreyaDisplay = Alegreya_Sans({
  variable: "--font-alegreya-display",
  subsets: ["greek", "latin"],
  weight: ["900"],
  display: "swap",
});

export const alegreyaSans = Alegreya_Sans({
  variable: "--font-alegreya",
  subsets: ["greek"],
  weight: ["400", "700"],
  display: "swap",
});

/**
 * CYRILLIC, for the Macedonian pages.
 *
 * Neither instance above carries Cyrillic, so every glyph on /mk was falling
 * back to whatever sans-serif the visitor's OS supplies — the one language on
 * the site not actually set in the typeface the site is designed in. The
 * computed font-family still said "Alegreya Sans", which is why this is
 * invisible in review: the CSS is correct and the glyphs simply are not in
 * the file.
 *
 * A SEPARATE INSTANCE, not another subset on the two above. next/font
 * preloads every subset it is given, so adding "cyrillic" there would push a
 * Cyrillic font file at every Greek visitor for a language they will never
 * read. This one is `preload: false`: the @font-face exists, so the glyphs
 * resolve, but the file is fetched only by a browser that actually meets
 * Cyrillic text on the page.
 *
 * It reaches the type through the font-family FALLBACK CHAIN in globals.css
 * — `var(--font-alegreya), var(--font-alegreya-cyrillic), …`. next/font gives
 * each instance its own generated family name, so the browser resolves per
 * glyph: Greek and Latin from the first, Cyrillic from the second.
 */
export const alegreyaCyrillic = Alegreya_Sans({
  variable: "--font-alegreya-cyrillic",
  subsets: ["cyrillic"],
  weight: ["400", "700", "900"],
  display: "swap",
  preload: false,
});

/** The class string every <html> element needs. */
export const fontVars = `${alegreyaSans.variable} ${alegreyaDisplay.variable} ${alegreyaCyrillic.variable}`;
