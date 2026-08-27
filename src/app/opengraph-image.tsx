import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { business, seo } from "@/content/site";

/**
 * The share card — 1200×630, rendered at build by next/og (Satori).
 *
 * The brief singles this out: OG tags matter here "so it previews properly
 * when shared on Viber/WhatsApp — this is how a village business actually
 * gets shared." Until now the site declared `twitter:card:
 * summary_large_image` and supplied no image at all, which is worse than
 * declaring nothing: the client reserves a large image slot and renders it
 * empty.
 *
 * Using the file convention rather than hand-written metadata, so Next
 * populates BOTH og:image and twitter:image on every route from one place.
 *
 * GREEK IS THE WHOLE PROBLEM HERE. Satori's built-in font is Latin-only, so
 * a Greek string renders as tofu — which is exactly why the reference build
 * this was modelled on kept its card text-only Latin. Alegreya Sans is
 * therefore passed in explicitly. It has to be TTF/WOFF: Satori cannot read
 * WOFF2, which is the only format next/font caches, so these are committed
 * as their own files rather than reused from the font pipeline.
 *
 * The background is one of his own job photos, for the same reason the rest
 * of the site uses no stock: this is the first thing a stranger sees of the
 * business, and it should be his machines on his site.
 */
export const alt = seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (file: string) => join(process.cwd(), "src/assets", file);

export default async function OpengraphImage() {
  const [regular, black, photo] = [
    readFileSync(asset("fonts/AlegreyaSans-Regular.ttf")),
    readFileSync(asset("fonts/AlegreyaSans-Black.ttf")),
    readFileSync(asset("og-base.jpg")),
  ];

  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#111716",
          fontFamily: "Alegreya Sans",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", top: 0, left: 0 }}
        />

        {/* A scrim, not a wash. The left has to be near-solid, not merely
            tinted: a share card is judged at thumbnail size in a chat list,
            and Greek at 68px over sunlit sand is unreadable there. The
            falloff clears by 88% so the machines still read on the right. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            backgroundImage:
              "linear-gradient(90deg, rgba(17,23,22,0.97) 0%, rgba(17,23,22,0.96) 40%, rgba(17,23,22,0.72) 62%, rgba(17,23,22,0.10) 88%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "68px 72px",
            width: 820,
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              letterSpacing: 3,
              color: "#e4e8e6",
            }}
          >
            ΧΩΜΑΤΟΥΡΓΙΚΕΣ ΕΡΓΑΣΙΕΣ · ΧΑΛΚΙΔΙΚΗ
          </div>

          <div
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.05,
              marginTop: 18,
            }}
          >
            ΤΣΟΠΟΥΡΟΓΛΟΥ
          </div>

          {/* 1987 is the thesis of the site; it is the thesis of the card.
              flex-end plus a padded small span, not alignItems:"baseline" —
              Satori's baseline alignment breaks down across a 34px/116px size
              gap and dropped "από το" onto its own line below the year. */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginTop: 10,
            }}
          >
            <span
              style={{
                fontSize: 34,
                fontWeight: 400,
                color: "#e4e8e6",
                paddingBottom: 22,
              }}
            >
              από το
            </span>
            <span
              style={{
                fontSize: 116,
                fontWeight: 900,
                color: "#ffffff",
                marginLeft: 18,
                letterSpacing: -3,
              }}
            >
              1987
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 34,
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "#0a6136",
                color: "#ffffff",
                fontSize: 38,
                fontWeight: 900,
                padding: "14px 28px",
              }}
            >
              {business.phone.display}
            </div>
            <span
              style={{
                fontSize: 26,
                fontWeight: 400,
                color: "#e4e8e6",
                marginLeft: 24,
              }}
            >
              Μεταμόρφωση Χαλκιδικής
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Alegreya Sans", data: regular, weight: 400, style: "normal" },
        { name: "Alegreya Sans", data: black, weight: 900, style: "normal" },
      ],
    }
  );
}
