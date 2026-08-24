import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // There is an unrelated package-lock.json in D:\apps. Without this, Next
  // infers the parent as the workspace root and warns on every build.
  turbopack: { root: __dirname },

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
    ];
  },
};

export default nextConfig;
