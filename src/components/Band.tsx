import type { ReactNode } from "react";

/**
 * A section, in one of two frames.
 *
 * The editorial rail this replaces parked a label column on the left, so
 * every section started 224px in and still ended flush at the container's
 * right edge — content that read as having slid sideways rather than as
 * composed. Both frames here are symmetric.
 *
 *   "rule"   the label sits INSET INTO a full-width hairline, heading and
 *            lede centred beneath it. The divider does the design work, so
 *            the label stops being an eyebrow repeated above every heading.
 *
 *   "panel"  a bordered sheet with a title block across the top — label at
 *            one edge, sheet number at the other — and the head centred
 *            inside. The left/right becomes part of a frame instead of a
 *            margin, which is what makes it read as deliberate.
 *
 * Panel is for the anchors: the page hero and the closing call. Rule is for
 * everything else, because eight framed sheets stacked read as heavy.
 */
export default function Band({
  label,
  index,
  frame = "rule",
  tone,
  id,
  children,
}: {
  label?: string;
  /** Sheet number in the panel's title block, e.g. "02". Panel frame only. */
  index?: string;
  frame?: "rule" | "panel";
  /** "tone" = gravel ground, "ink" = dark. Used sparingly, never alternating. */
  tone?: "tone" | "ink";
  id?: string;
  children: ReactNode;
}) {
  const cls = [
    "band",
    frame === "panel" ? "band--panel" : "",
    tone ? `band--${tone}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (frame === "panel") {
    return (
      <section className={cls} id={id}>
        <div className="wrap">
          <div className="panel">
            {(label || index) && (
              <div className="panel-title">
                <span className="band-label">{label}</span>
                {index && <span className="panel-index">{index}</span>}
              </div>
            )}
            <div className="panel-body band-body">{children}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cls} id={id}>
      <div className="wrap">
        {label && (
          <p className="band-rule">
            <span className="band-label">{label}</span>
          </p>
        )}
        <div className="band-body">{children}</div>
      </div>
    </section>
  );
}
