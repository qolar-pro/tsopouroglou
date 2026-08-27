import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // There is an unrelated package-lock.json in D:\apps. Without this, Next
  // infers the parent as the workspace root and warns on every build.
  turbopack: { root: __dirname },

  /**
   * Hosts allowed to request dev-only assets.
   *
   * `next dev` blocks cross-origin requests to /_next/* by default. Opening
   * the site on a phone over the LAN therefore serves the HTML perfectly —
   * it is server-rendered — while every client chunk is refused, React never
   * hydrates, and the page looks finished but is completely dead to touch.
   * The nav panel is the only interactive component, so that is where it
   * shows up.
   *
   * DEVELOPMENT ONLY. Next ignores this in a production build, so it grants
   * nothing to the deployed site.
   *
   * Wildcards cover the private ranges a home router hands out, so this does
   * not need editing every time DHCP moves the machine.
   */
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "172.17.*.*",
    "172.18.*.*",
    "172.19.*.*",
    "172.2*.*.*",
    "172.30.*.*",
    "172.31.*.*",
    "*.local",
  ],

  // NOTE: deliberately NOT `output: "export"`.
  // A static export cannot host the Resend route handler, and the API key
  // must stay server-side. Every content page is still prerendered at build,
  // so delivery is identical. Ruled on at gate 1.

  async redirects() {
    return [
      {
        // Δασκάλων is operationally identical to Μεταμόρφωση, so honest copy
        // would have been a duplicate. It folds into the Μεταμόρφωση page;
        // the slug from the brief still resolves rather than 404ing.
        source: "/perioxes/oikismos-daskalon",
        destination: "/perioxes/metamorfosi",
        // Explicit 301 rather than `permanent: true`, which Next emits as
        // 308. Google treats them identically; 301 is what was specced and
        // what every SEO tool reports on.
        statusCode: 301,
      },
      {
        // Έργα merged into /ypiresies: the photographs are the proof of the
        // services, so one page carries both.
        source: "/erga",
        destination: "/ypiresies",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
