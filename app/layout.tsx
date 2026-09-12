import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { OrganisationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import "./globals.css";

/** Neutralises the reveal primitives' initial hidden state. */
const MOTION_FALLBACK_CSS =
  '[data-motion="reveal"]{opacity:1!important;transform:none!important;filter:none!important}';

/* Self-hosted by next/font — no request to Google, no layout shift.
   The Angular site loaded Roboto from the Google CDN then overrode it with
   eleven different font stacks; the webfont was actually used once. */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  keywords: [
    "SV Lots",
    "open plots Tumkur",
    "land surveying Tumkur",
    "property valuation Karnataka",
    "layout development Tumkur",
    "real estate Tumkur",
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  // Unset until real tokens are added to the environment — a site can't be
  // verified in Search Console or Bing Webmaster Tools (and therefore has no
  // indexing/query data) without one. Add GOOGLE_SITE_VERIFICATION /
  // BING_SITE_VERIFICATION to .env.local and Vercel's project env once the
  // properties are created.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION && {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    }),
    ...(process.env.BING_SITE_VERIFICATION && {
      other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION },
    }),
  },
};

export const viewport: Viewport = {
  themeColor: "#131b25",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Scroll-reveal primitives render an inline opacity:0 on the server.
            Without JS that state would never clear, hiding the page content.
            <noscript> is only parsed when scripting is unavailable. */}
        <noscript>
          <style
            // biome-ignore lint/security/noDangerouslySetInnerHtml: static literal, no interpolation
            dangerouslySetInnerHTML={{
              __html: MOTION_FALLBACK_CSS,
            }}
          />
        </noscript>
        {/* <noscript> only covers scripting being unavailable. If scripting is
            enabled but an app chunk fails to load, hydration never runs and the
            reveal primitives stay at opacity 0 — a blank page. This inline
            script cannot itself fail to load, so it clears those states unless
            hydration reports in. */}
        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static literal, no interpolation
          dangerouslySetInnerHTML={{
            __html: `[data-motion-fallback] ${MOTION_FALLBACK_CSS}`,
          }}
        />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static literal, no interpolation
          dangerouslySetInnerHTML={{
            __html:
              "window.__svlotsHydrated=false;setTimeout(function(){if(!window.__svlotsHydrated){document.documentElement.setAttribute('data-motion-fallback','')}},3000)",
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-surface pb-16 antialiased lg:pb-0">
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-pill focus:bg-gold-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink-950"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <OrganisationJsonLd />
        <WebSiteJsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
