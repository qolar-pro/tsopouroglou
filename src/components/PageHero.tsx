import type { ReactNode } from "react";
import { business } from "@/content/site";
import type { Img } from "@/content/media";

/**
 * Every inner route opens the same way.
 *
 * Two forms, chosen by whether there is an honest photograph to use:
 *
 *   WITH a photo   full bleed, matching the homepage. Eight service pages,
 *                  Ποιοι είμαστε and Στόλος all qualify.
 *   WITHOUT        the dark panel. A full-bleed hero with nothing to bleed
 *                  is just a dark box, and seven routes still have no
 *                  photograph of their own — the four areas, contact, the
 *                  privacy page and the 404.
 *
 * Dark either way, because this is also the conversion moment: the phone
 * number is the point of the site, and it lands before anything is read.
 *
 * Inner heroes are shorter than the homepage's. The visitor has already
 * committed by the time they are here, and a full viewport of hero on every
 * page turns into an obstacle rather than an opening.
 */
export default function PageHero({
  label,
  index = "01",
  title,
  lede,
  photo,
  priority = false,
  children,
}: {
  label: string;
  index?: string;
  title: ReactNode;
  lede?: ReactNode;
  photo?: Img;
  priority?: boolean;
  children?: ReactNode;
}) {
  const body = (
    <>
      {children}
      {title}
      {lede && <p className="lede">{lede}</p>}
      <div className="band-cta">
        <a className="btn btn-call" href={business.phone.href}>
          ΤΗΛΕΦΩΝΟ <span className="num">{business.phone.display}</span>
        </a>
        <a className="btn btn-secondary" href="/epikoinonia">
          Ζητήστε προσφορά
        </a>
      </div>
    </>
  );

  if (photo) {
    return (
      <section className="bleed bleed--inner page-hero">
        <div className="bleed-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            fetchPriority={priority ? "high" : "auto"}
          />
        </div>
        <div className="bleed-scrim" aria-hidden="true" />
        <div className="bleed-inner">
          <div className="wrap">
            <p className="label">{label}</p>
            {body}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="band band--panel band--ink page-hero">
      <div className="wrap">
        <div className="panel">
          <div className="panel-title">
            <span className="band-label">{label}</span>
            <span className="panel-index">{index}</span>
          </div>
          <div className="panel-body band-body">{body}</div>
        </div>
      </div>
    </section>
  );
}
