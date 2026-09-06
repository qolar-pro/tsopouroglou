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

/** The class string every <html> element needs. */
export const fontVars = `${alegreyaSans.variable} ${alegreyaDisplay.variable}`;
