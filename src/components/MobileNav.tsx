"use client";

import { useEffect, useRef, useState } from "react";
import { visibleNav, business } from "@/content/site";

/**
 * Full-screen navigation panel.
 *
 * A horizontal bar cannot hold these routes at any mobile width — Greek
 * labels like "Στόλος & εξοπλισμός" are long, and the audience needs large
 * tap targets, so the panel is the layout rather than a fallback.
 *
 * The only client component on the site. Escape closes it, focus moves into
 * the panel on open and back to the trigger on close, and the page behind is
 * locked from scrolling.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the panel so keyboard and screen-reader users land
    // where the dialog is, not where the page still is.
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="nav-trigger"
        aria-expanded={open}
        aria-controls="site-nav-panel"
        onClick={() => setOpen(true)}
      >
        <span className="nav-trigger-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="nav-trigger-text">ΜΕΝΟΥ</span>
      </button>

      {open && (
        <div
          id="site-nav-panel"
          ref={panelRef}
          className="nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Πλοήγηση"
        >
          <div className="wrap nav-panel-head">
            <span className="nav-panel-title">ΠΛΟΗΓΗΣΗ</span>
            <button
              type="button"
              className="nav-close"
              onClick={() => setOpen(false)}
            >
              ΚΛΕΙΣΙΜΟ
            </button>
          </div>

          <nav className="wrap">
            <ul className="nav-list">
              {visibleNav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="wrap nav-panel-foot">
            <a className="btn btn-call btn-block" href={business.phone.href}>
              ΤΗΛΕΦΩΝΟ <span className="num">{business.phone.display}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
