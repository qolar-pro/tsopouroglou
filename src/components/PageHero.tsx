import type { ReactNode } from "react";
import { business } from "@/content/site";
import type { Img } from "@/content/media";
import Photo from "./Photo";

/**
 * Every route opens the same way.
 *
 * Inner pages used to start with a plain heading and a line of copy, so only
 * the homepage read as having a top; a service page opened like the middle of
 * a document. They all get the same dark panel now — eyebrow, h1, one line,
 * the phone, and a photograph when there is an honest one to use.
 *
 * Dark because it is also the conversion moment: the phone number is the
 * point of the whole site, and putting it in the one inverted block on the
 * page means a thumb lands on it before anything is read.
 *
 * `photo` is optional on purpose. Seven routes still have no photograph of
 * their own (see PLACEHOLDER_MEDIA.md) and the hero has to work without one
 * rather than reserve an empty frame.
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
  return (
    <section className="band band--panel band--ink page-hero">
      <div className="wrap">
        <div className="panel">
          <div className="panel-title">
            <span className="band-label">{label}</span>
            <span className="panel-index">{index}</span>
          </div>
          <div className="panel-body band-body">
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

            {children}

            {photo && (
              <div className="hero-media">
                <Photo
                  img={photo}
                  sizes="(min-width: 1200px) 1100px, 100vw"
                  frame="css"
                  priority={priority}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
