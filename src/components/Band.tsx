import type { ReactNode } from "react";

/**
 * A section, in the editorial-rail system.
 *
 * Every section is a two-column grid: a narrow label column on the left and
 * the content beside it. Running that rail down the whole page gives the site
 * one continuous vertical structure instead of a stack of separately-styled
 * blocks, and it puts the section name where the eye already is when
 * scanning — the left edge.
 *
 * The label used to be an eyebrow stacked above every heading, which read as
 * repetition. In the rail it does structural work instead.
 *
 * Sections are divided by a hairline on one continuous white ground rather
 * than by alternating background colours. Stripes made the page read as a
 * pile of unrelated blocks; one ground with rules reads as a document. `tone`
 * and `ink` therefore exist to be used twice each on the whole site, not
 * alternately — see ContactBlock for what the dark one is for.
 *
 * Below 1000px the rail folds and the label sits above the content, which is
 * the same reading order without the horizontal room.
 */
export default function Band({
  label,
  tone,
  head = false,
  id,
  children,
}: {
  label?: string;
  /** "tone" = gravel ground, "ink" = dark. Used sparingly, not alternating. */
  tone?: "tone" | "ink";
  /** The first band on an inner page: no dividing rule above it. */
  head?: boolean;
  id?: string;
  children: ReactNode;
}) {
  const cls = [
    "band",
    tone ? `band--${tone}` : "",
    head ? "band--head" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={cls} id={id}>
      <div className="wrap band-grid">
        {label ? (
          <p className="band-label">{label}</p>
        ) : (
          <span aria-hidden="true" />
        )}
        <div className="band-body">{children}</div>
      </div>
    </section>
  );
}
