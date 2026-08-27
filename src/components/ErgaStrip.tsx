import { ergaFeatured } from "@/content/media";
import Band from "./Band";
import Photo from "./Photo";
import ArrowIcon from "./ArrowIcon";

/**
 * Έργα — a swipeable rail of real jobs, each with what the job actually was.
 *
 * Single photographs rather than before/after pairs, because none of the
 * photographs we have is a pair: you only get those by shooting the "before"
 * before starting, which is the easy thing to forget on a live job. Worth
 * fixing on future jobs — see PLACEHOLDER_MEDIA.md — but not worth faking.
 *
 * Native scroll-snap, not an autoplaying carousel: it swipes on a phone,
 * needs no JavaScript, and never moves on its own.
 */
export default function ErgaStrip() {
  return (
    <Band label="ΕΡΓΑ" id="erga">
      <h2 className="h2">Δουλειές μας</h2>
      <p className="lede">
        <span className="measure-prose">
          Φωτογραφίες από δικά μας εργοτάξια — όχι από το ίντερνετ. Σύρετε για
          να τις δείτε.
        </span>
      </p>

      <ul className="rail">
        {ergaFeatured.map((project) => (
          <li key={project.id} className="rail-item">
            <article className="project">
              <Photo
                img={project.img}
                sizes="(min-width: 760px) 26vw, 80vw"
                frame="css"
              />
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
            </article>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: "var(--s-5)" }}>
        <a className="btn-quiet" href="/ypiresies#erga">
          Όλα τα έργα
          <ArrowIcon />
        </a>
      </p>
    </Band>
  );
}
