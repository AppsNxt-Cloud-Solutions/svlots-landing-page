import { formattedAddress, site } from "@/lib/site";

/**
 * Structured data. The Angular site emitted none, so search engines had no
 * machine-readable record of the business, its location or its services.
 *
 * `<` is escaped per the Next.js guidance so the JSON cannot break out of the
 * script element.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required to emit ld+json; value is serialised JSON with < escaped
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const ORGANISATION_ID = `${site.url}/#organisation`;

/** Emitted once, from the root layout. */
export function OrganisationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": ORGANISATION_ID,
        name: site.legalName,
        alternateName: site.name,
        url: site.url,
        email: site.email,
        telephone: site.phone.e164,
        slogan: site.tagline,
        description: site.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.line1,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Tumkur district, Karnataka" },
          { "@type": "City", name: "Bengaluru" },
        ],
        hasMap: site.mapsUrl,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:30",
          closes: "18:30",
        },
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: site.url,
        name: site.name,
        publisher: { "@id": ORGANISATION_ID },
      }}
    />
  );
}

export function ServiceListJsonLd({
  services,
}: {
  services: { slug: string; title: string; summary: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Services offered by ${site.legalName}`,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.summary,
            provider: { "@id": ORGANISATION_ID },
            areaServed: formattedAddress,
            url: `${site.url}/services`,
          },
        })),
      }}
    />
  );
}

export function ProjectJsonLd({
  title,
  description,
  location,
  image,
  url,
}: {
  title: string;
  description: string;
  location: string;
  image?: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Residence",
        name: title,
        description,
        url,
        ...(image ? { image: `${site.url}${image}` } : {}),
        ...(location
          ? {
              address: {
                "@type": "PostalAddress",
                addressLocality: location,
                addressCountry: "IN",
              },
            }
          : {}),
        containedInPlace: { "@id": ORGANISATION_ID },
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  date,
  slug,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished: date,
        dateModified: date,
        author: { "@id": ORGANISATION_ID },
        publisher: { "@id": ORGANISATION_ID },
        mainEntityOfPage: `${site.url}/insights/${slug}`,
      }}
    />
  );
}

export function BreadcrumbJsonLd({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: `${site.url}${crumb.path}`,
        })),
      }}
    />
  );
}
