import React, { useState } from "react";
import { loadHubspot } from "../lib/hubspotLoader";

export default function NewsletterSubscribe(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const PORTAL_ID = "147364865";
  const FORM_ID = "cfbc55fc-7e92-44c9-ba70-5ab3eed9742e";
  const REGION = "eu1";
  const TARGET_ID = "newsletter-hs-form";

  async function handleOpen() {
    setOpen(true);
    setLoading(true);
    try {
      await loadHubspot({
        portalId: PORTAL_ID,
        formId: FORM_ID,
        region: REGION,
        targetSelector: `#${TARGET_ID}`,
      });
    } catch {
      // optional: handle/log error
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="h-14 px-8 relative overflow-hidden group bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
        aria-expanded={open}
        aria-controls="newsletter-modal"
      >
        <span className="relative z-10">Subscribe to Newsletter</span>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-md"
          style={{ background: "var(--gradient-silver)" }}
        />
      </button>

      {open && (
        <div
          id="newsletter-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/60" onClick={handleClose} />

          <div className="relative z-10 w-full max-w-md rounded-md bg-card p-6">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-muted-foreground"
              aria-label="Close"
            >
              ×
            </button>

            <div
              id={TARGET_ID}
              className="hs-form-frame"
              data-region={REGION}
              data-form-id={FORM_ID}
              data-portal-id={PORTAL_ID}
            >
              {loading && <div className="py-8 text-center text-sm text-muted-foreground">Loading…</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}