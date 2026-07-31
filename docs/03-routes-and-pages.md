# 03 — Routes & Pages

Route table: [src/app/app-routing.module.ts](../src/app/app-routing.module.ts)

## Route map

| Path | Component | In navbar? | Notes |
| --- | --- | --- | --- |
| `''` | → redirect to `/main` | — | `pathMatch: 'full'` |
| `/main` | [MainComponent](../src/app/main/main.component.ts) | Home | Carousel + value props + CTA |
| `/about-us` | [AboutusComponent](../src/app/aboutus/aboutus.component.ts) | About Us | Largest page (862-line template) |
| `/services` | [ServicesComponent](../src/app/services/services.component.ts) | Services | 9 service cards + call-back form |
| `/projects` | [ProjectsComponent](../src/app/projects/projects.component.ts) | ✗ | Prestige Group showcase — **orphaned**, navbar "Projects" points to `/projectcards` |
| `/projectcards` | [ProjectcardsComponent](../src/app/projectcards/projectcards.component.ts) | Projects | API-driven catalogue with filters |
| `/products` | [ProductsComponent](../src/app/products/products.component.ts) | ✗ | 218-line model tile grid — **orphaned** |
| `/products/flyers` | [FlyersComponent](../src/app/flyers/flyers.component.ts) | Products ▸ Models | Flyer/model detail page |
| `/products/data-collection` | [DatacollectionComponent](../src/app/datacollection/datacollection.component.ts) | ✗ | **Stub** — `<p>datacollection works!</p>` |
| `/calculator` | [CalculatorComponent](../src/app/calculator/calculator.component.ts) | Products ▸ Tools ▸ Calculator | Land-area calculator |
| `/blog` | [BlogComponent](../src/app/blog/blog.component.ts) | Blog | 3 articles |
| `/gallery` | [GalleryComponent](../src/app/gallery/gallery.component.ts) | Gallery | Grouped image galleries |
| `/contactus` | [ContactusComponent](../src/app/contactus/contactus.component.ts) | Contact Us | Lead form + office details |
| `/knowmore` | [KnowmoreComponent](../src/app/knowmore/knowmore.component.ts) | ✗ | Deep-dive on the models; linked from flyer CTAs |
| `/projectform` | [ProjectformComponent](../src/app/projectform/projectform.component.ts) | ✗ | Admin "Add New Project" — **no route guard** |
| `/loginmodule/login` | [LoginComponent](../src/app/loginmodule/login/login.component.ts) | Login *(broken link)* | Navbar links to `/login`, which is not a route |

There is **no `**` wildcard route**, so any bad URL leaves the user on a blank `router-outlet`
with the shell still rendered.

### Broken / dangling navigation

- Navbar **Login** → `routerLink="/login"` — no such route. The real path is `/loginmodule/login`.
- `AuthService.logout()` → `/login` — same dead path.
- `LoginComponent.handleRegister()` → `/register`, `handleForgotPassword()` → `/forgot-password` —
  neither route nor (for forgot-password) component exists.
- [products.component.html](../src/app/products/products.component.html) tiles link to
  `/projects/sites-plot` and `/projects/building-structural` — not routes — and five "Know More"
  links are hardcoded to `http://localhost:4200/knowmore`.
- All internal links in `products.component.html` and `flyers.component.html` use plain `href`,
  not `routerLink`, so they trigger a **full page reload** instead of client-side navigation.

## Page-by-page

### `/main` — Home
[main.component.html](../src/app/main/main.component.html) · 451 lines

1. **Carousel** — `.carousel-container` with 3 `.carousel-slide` images. Note slides 1 and 3 both
   use `assets/carousel3.png`, so the rotation visibly repeats.
2. **"Our Records"** stat block — written but commented out.
3. **"Who are we" / "SV Lots"** intro, revealed with a `slide-in` class.
4. **"Why SV Lots"** — 4 horizontal cards: Secure Documentation, Strategic Locations, Easy
   Accessibility, Sustainable Developments (`zoom-in` reveal).
5. **CTA band** — "Count on us for your real estate needs" → `routerLink="/contactus"`.

`MainComponent` drives the carousel with `setInterval` (3 s) and imperative
`style.transform = translateX(-n * 100%)`. `nextSlide`, `prevSlide`, and `showSlide` each
re-query the DOM and use slightly different selectors (`#carousel` vs `.carousel`) and different
wrap-around logic — the source of the occasional jump at the boundary.

### `/about-us`
Sections (each observed for scroll-reveal): `.about-section`, `.why-section`,
`.visionary-section`, `.mentor-section`, `.vision-section`, `.mission-section`. Content: company
story, "Why SV Lots", Managing Director profile, CEO & Founder, Chief Mentor (Ram Murthy), Our
Vision, Our Mission. Nine `alt` attributes — the best-annotated page in the app.

### `/services`
Nine service cards. Clicking one calls `showForm(serviceHeading)`, which sets
`selectedService` and reveals an inline `ngModel` form (first name, email, phone, city) with the
service name carried as `serviceHeading`. Submit → `POST /api/SVLots/AddServiceRequest`; success
is detected by string-matching the response body `'Service request added successfully.'`.

### `/projectcards`
`ngOnInit` → `GET /api/SVLots/GetProjects`. For each project with a `fileName`, it calls
`initS3()` then `s3.getObject`, wraps the body in a `Blob`, creates an object URL, and passes it
through `DomSanitizer.bypassSecurityTrustResourceUrl`. A per-card `loading` flag drives a spinner.
Location and Type filter dropdowns are derived from the fetched data via `getUniqueValues`.
`viewMore(link)` prefixes `https://` if missing and `window.open(..., '_blank')`.

Note: object URLs are never `revokeObjectURL`'d, and images are downloaded as blobs rather than
served via presigned URLs — see doc 07.

### `/calculator`
One `FormGroup` holding **three** independent calculators (24 controls total):

| Calculator | Inputs | Outputs |
| --- | --- | --- |
| Triangle | `sideA/B/C` | `calculatedArea` |
| Irregular quadrilateral | `T1a, T1b, T1Diag`, `T2a, T2b, T2Diag` | `AreaT1`, `AreaT2`, `TotalQuadArea` |
| Irregular trapezium | `A1a..A1c`, `A2a..A2c`, `A3a..A3c` | `Area1..Area3`, `TotalArea` |

`calculateTriangleArea` is Heron's formula, returning `0` for non-positive sides or `NaN`
(i.e. for side lengths that can't form a triangle — a silent `0.00` rather than a message).
All 24 inputs are `Validators.required`, and every keystroke recomputes all three calculators.

### `/contactus`
Reactive form — `firstName`, `phone` (`^[0-9]+$`), `email`, `message` (max 180). Also renders
Corporate Office and Quick Contact panels and a Google Maps link ("Chirantana"). **The POST URL
is `https://localhost:7192/api/SVLots/SubmitContactForm`** — this form cannot work in
production. Its error handler also treats 2xx-in-the-error-branch as success and shows
"Data Added Successfully", so failures can look like wins.

### `/gallery`
Two grouped galleries: Prestige Raintree Park brochure pages and Euphoria. Full-resolution
originals are used inline (several are 3–4 MB each).

### `/blog`
Three articles: "Discover the Best Open Plots in Tumkur", and two near-duplicate "Navigating the
Surge" pieces (one for SV Lots, one for "T Homes" — likely copy that wasn't rebranded).

### `/products` and `/products/flyers`
Tiles for the five property models — Revenue, Layout, Sites (Plot), Building (Structural),
Rental — with "Know More" and "Get Access" CTAs. "Get Access" links out to the sibling apps
`sathyananda.balajitransports.in`, `layout.balajitransports.in`,
`rentalproperty.balajitransports.in`; the Sites and Building tiles are deliberately disabled
(`pointer-events: none; opacity: 0.5`).

### `/knowmore`
Long-form explanation of the models, with Agricultural / Layout / Rental flyer sections and the
same scroll-reveal treatment.

### `/loginmodule/login` and `/projectform`
Login posts to the shared auth API and requires `SVLots` to appear in the response's
`projectNames` array. On success it always routes to `/projectform` (the admin and non-admin
branches in `navigateToCorrectComponent()` are identical). `/projectform` collects title,
description, location, type, external link and an image file; the image goes to S3 first, then
`POST /api/SVLots/AddProject` with `imageUrl` + `fileName`. Because `/projectform` has no guard,
it is reachable by URL without logging in.
