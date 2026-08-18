import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { site } from "@/lib/site";
import "./globals.css";

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
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
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
              __html:
                '[data-motion="reveal"]{opacity:1!important;transform:none!important;filter:none!important}',
            }}
          />
        </noscript>
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
      </body>
    </html>
  );
}
