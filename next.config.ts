import type { NextConfig } from "next";

/**
 * Legacy Angular routes → new Next.js IA.
 * The old site linked to `svlots.com/knowmore` in 6 places and was indexed
 * under /main, /about-us, /contactus, etc. These keep inbound links alive.
 */
const legacyRedirects = [
  { source: "/main", destination: "/" },
  { source: "/about-us", destination: "/about" },
  { source: "/contactus", destination: "/contact" },
  { source: "/projectcards", destination: "/projects" },
  { source: "/blog", destination: "/insights" },
  { source: "/knowmore", destination: "/property-models" },
  { source: "/products", destination: "/property-models" },
  { source: "/products/flyers", destination: "/property-models" },
  { source: "/products/data-collection", destination: "/property-models" },
  { source: "/calculator", destination: "/tools/area-calculator" },
  { source: "/projectform", destination: "/admin/projects" },
  { source: "/loginmodule/login", destination: "/login" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    // Next 16 restricts `qualities` to [75] by default; we serve a couple of tiers.
    qualities: [70, 75, 85],
    formats: ["image/avif", "image/webp"],
    // Project images stream through /api/media (the S3 bucket is private), so
    // they are same-origin local paths and need no remotePatterns.
  },

  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
