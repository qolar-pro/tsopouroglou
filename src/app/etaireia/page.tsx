import { pageAlternates } from "@/content/site-config";
import type { Metadata } from "next";
import { etaireia } from "@/content/pages";
import Band from "@/components/Band";
import PageHero from "@/components/PageHero";
import CallBand from "@/components/CallBand";
import Reviews from "@/components/Reviews";
import Photo from "@/components/Photo";
import { etaireiaPhoto } from "@/content/media";

export const metadata: Metadata = {
  title: etaireia.metaTitle,
  description: etaireia.metaDescription,
  alternates: pageAlternates("/etaireia"),
};

export default function Etaireia() {
  return (
    <main>
      <PageHero
        label={etaireia.eyebrow}
        title={<h1 className="h1">{etaireia.h1}</h1>}
        lede={etaireia.lede}
        photo={etaireiaPhoto}
        priority
      />

      <Band label="Η ΙΣΤΟΡΙΑ">
        <div className="detail-cols">
          {etaireia.blocks.map((b) => (
            <div key={b.heading}>
              <h2 className="h3">{b.heading}</h2>
              <p className="detail-body">{b.body}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* Κριτικές merged in from the homepage: what people say about them
          belongs with who they are, and it shortens the nav. */}
      <Reviews />

      <CallBand />
    </main>
  );
}
