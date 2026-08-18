# 01 — Project Overview

## The business

**SV Lots India Pvt Ltd** — Tumkur, Karnataka (`"Omkara" 5th cross SIT Extension, Tumkur - 572102`,
`info@svlots.com`). Tagline used in the header: *"Elevating Value of Property"*.

The company positions itself as a full-service property partner rather than a broker: land
surveying, infrastructure consultancy, valuation, Vastu consultancy, insurance, and a family of
"property models" (Revenue, Layout, Sites/Plot, Building, Rental) that are sold as data products
to landowners and investors.

The footer credits **AppsNxt Cloud Solutions** as the developer; copyright reads 2024.

## What this codebase is

A **marketing site with a thin app layer**. Three distinct jobs are mixed into one Angular
application:

1. **Brochure** — Home, About Us, Services, Projects, Blog, Gallery, Products/Models. Static
   copy and imagery, scroll-reveal animations, no data fetching.
2. **Lead capture** — Contact Us form, "Request a Call Back" form on Services. Both POST to the
   SV Lots API and confirm via SweetAlert2 modals.
3. **Light CMS / tooling** — a public project catalogue backed by the API + S3, an area
   calculator for irregular land parcels, and a login-gated form for adding new projects.

## Feature inventory

### Marketing content
- **Hero carousel** on the home page — 3 slides, auto-advancing every 3s, manual prev/next.
- **"Who are we" / "Why SV Lots"** value-prop sections with scroll-triggered reveal animations.
- **About Us** (862 lines — the largest template): company story, "Meet Our Visionary Managing
  Director", CEO & Founder, Chief Mentor (Ram Murthy), Vision and Mission panels.
- **Services** — 9 service cards: Precision Land Surveying, Infrastructure Consultants,
  Supervision, Property Valuation, Technical Vastu Consultants, Real Estate Solutions, Smart
  Technology Integration, Technical Consultancy, General Insurance. Each card opens an inline
  call-back form pre-filled with the service name.
- **Projects / Prestige Group showcase** — "Our Latest Project – PRESTIGE GROUP" with
  Extraordinary Living / Exhilarating Panorama / Exclusively Private / Expansive Greens sections,
  fed by a 61 MB brochure image set.
- **Gallery** — grouped image galleries (Prestige Raintree Park, Euphoria).
- **Blog** — 3 hand-written articles on Tumkur open plots and Hyderabad real estate returns.
- **Flyers / Models** — Agricultural, Layout, Rental flyers with "Know More" and "Get Access"
  CTAs that link out to sibling products on `*.balajitransports.in`.

### Interactive
- **Area Calculator** (`/calculator`) — Heron's-formula area computation for a triangle, an
  irregular quadrilateral (split into 2 triangles), and an irregular trapezium (3 triangles).
  Live-recalculates on every keystroke via `valueChanges`.
- **Project cards** (`/projectcards`) — fetches projects from the API, lazy-loads each project's
  image from S3 as a blob, offers Location and Type dropdown filters, "View More" opens the
  project's external link in a new tab.
- **Contact Us** (`/contactus`) — reactive form: name, phone (digits only), email, message
  (≤180 chars), plus corporate-office details and a Google Maps link.
- **Login** (`/loginmodule/login`) — email/password against the shared SV Lots auth API,
  scoped to `projectName: 'SVLots'`; stores email/name/admin flag in `localStorage`.
- **Add Project** (`/projectform`) — post-login form that uploads an image to S3 then POSTs the
  project metadata to the API.

### Stubs / unfinished
- `/products/data-collection` — template is still `<p>datacollection works!</p>`.
- `register` component — template is still `<p>register works!</p>`, and no route reaches it.
- Home page "Our Records" stat block — fully written but commented out.

## Intended audience & journeys

| Audience | Journey the site supports |
| --- | --- |
| Landowner / seller | Home → Services → "Request a Call Back" on the relevant service |
| Plot buyer / investor | Home → Projects → Project cards → filter → View More (external site) |
| Researcher / lead | Blog / Gallery → Contact Us |
| Internal staff (admin) | Login → Add Project (publishes to the public project catalogue) |

The primary conversion actions are the **Contact Us form** and the **per-service call-back form**.
Everything else is trust-building content.
