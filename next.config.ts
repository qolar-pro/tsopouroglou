import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // There is an unrelated package-lock.json in D:\apps. Without this, Next
  // infers the parent as the workspace root and warns on every build.
  turbopack: { root: __dirname },

  // NOTE: deliberately NOT `output: "export"`.
  // A static export cannot host the Resend route handler, and the API key
  // must stay server-side. Every content page is still prerendered at build
  // (see the ○ markers in `next build`), so delivery is identical.
  // Ruled on at gate 1.
};

export default nextConfig;
