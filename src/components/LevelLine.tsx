/**
 * «Η στάθμη» — the level line.
 *
 * The section-boundary form of the hero's cut: a 2px hairline with a short
 * accent segment at its left, like a laser level's mark across a plot.
 * Purely decorative; the tonal change between surfaces is subtle by design
 * and this is what actually reads as a boundary.
 */
export default function LevelLine() {
  return <span className="level" aria-hidden="true" />;
}
