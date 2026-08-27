/**
 * The mark — a heap of earth on a level line, inside a rounded tile.
 *
 * PROPOSAL, not a final logo. They have no logo at all; this is offered for
 * approval and can be replaced by editing this one file plus icon.svg and
 * apple-icon.png, which carry the identical geometry.
 *
 * The heap and the line are drawn ON the tile in white rather than cut out of
 * it. A cut-out shows whatever is behind, which means the mark inverts to
 * black on a dark tab strip and stops being the same object; painting them
 * keeps it identical everywhere it appears.
 *
 * "Level" is the design system's own name — ΣΤΑΘΜΗ — so the line is not
 * decoration: it is the thing the whole trade is measured against.
 */
export default function Mark({ size = 34 }: { size?: number }) {
  return (
    <svg
      className="mark"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="var(--color-accent)"
        d="M14 2h36a12 12 0 0 1 12 12v36a12 12 0 0 1-12 12H14A12 12 0 0 1 2 50V14A12 12 0 0 1 14 2z"
      />
      <path
        fill="#ffffff"
        d="M15 38C15 38 21 15 32 15s17 23 17 23a2 2 0 0 1-2 2H17a2 2 0 0 1-2-2z"
      />
      <path fill="#ffffff" d="M15 44h34a3 3 0 0 1 0 6H15a3 3 0 0 1 0-6z" />
    </svg>
  );
}
