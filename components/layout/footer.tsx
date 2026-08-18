import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/brand/logo.png";
import { footerNav, formattedAddress, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
        {/* Company */}
        <div>
          <Image
            src={logo}
            alt={`${site.legalName} logo`}
            width={96}
            height={114}
            className="h-20 w-auto"
          />
          <p className="mt-6 font-display text-xl text-white">{site.legalName}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-400">
            A dedicated real estate platform committed to serving the value of property in
            a way that benefits both buyers and sellers — helping clients maximise returns
            through comprehensive property solutions.
          </p>
        </div>

        <FooterColumn title="Company" links={footerNav.company} />
        <FooterColumn title="Explore" links={footerNav.explore} />

        {/* Contact */}
        <div>
          <FooterHeading>Office</FooterHeading>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-gold-500"
              />
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="leading-relaxed text-ink-400 transition-colors hover:text-white"
              >
                {formattedAddress}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-500" />
              <a
                href={`mailto:${site.email}`}
                className="text-ink-400 transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </li>
            {/* Rendered only once a number is confirmed — see lib/site.ts */}
            {site.phone && (
              <li className="flex gap-3">
                <Phone
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-gold-500"
                />
                <a
                  href={`tel:${site.phone}`}
                  className="text-ink-400 transition-colors hover:text-white"
                >
                  {site.phone}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-ink-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            Developed by <span className="text-ink-400">{site.developer.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold tracking-[0.2em] text-gold-500 uppercase">
      {children}
    </h2>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <FooterHeading>{title}</FooterHeading>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-ink-400 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
