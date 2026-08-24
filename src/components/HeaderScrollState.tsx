"use client";

import { useEffect, useRef } from "react";

/**
 * Motion moment 1 of 3: the header's rule appears only once the page has
 * scrolled past the top. At rest the header has no bottom border at all,
 * which is what keeps the top of the page feeling open.
 *
 * IntersectionObserver on a sentinel rather than a scroll listener — no
 * per-frame work, and nothing to throttle. Renders nothing visible.
 */
export default function HeaderScrollState() {
  const sentinel = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    const header = document.querySelector(".site-header");
    if (!el || !header) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        header.setAttribute("data-scrolled", String(!entry.isIntersecting));
      },
      { rootMargin: "0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <span ref={sentinel} aria-hidden="true" style={{ display: "block" }} />;
}
