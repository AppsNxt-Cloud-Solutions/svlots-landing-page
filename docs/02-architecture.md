# 02 — Architecture

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Angular **16.2** — classic `NgModule` architecture, no standalone components |
| Language | TypeScript 5.1, `strict: true` |
| Router | `RouterModule.forRoot(routes, { useHash: false })` — path-based URLs, needs server rewrite |
| Forms | Mixed: `ReactiveFormsModule` (contact, calculator, project form) and `ngModel` (services, login) |
| HTTP | `HttpClientModule` + RxJS 7.8 |
| Styling | Hand-written CSS, mostly inline `<style>` in templates. Global [src/styles.css](../src/styles.css) is 4 lines |
| Dialogs | `sweetalert2` for all success/error/validation feedback |
| Storage/media | `aws-sdk` v2 (browser build) talking directly to S3 |
| Crypto | `crypto-js` — AES-CBC decryption of S3 credentials fetched from the API |
| Tests | Karma + Jasmine, CLI-generated stubs only |

### Declared but unused
`@angular/material`, `@angular/cdk`, and `primeng` are all in `package.json`, and the Material
`indigo-pink` prebuilt theme is loaded in [angular.json](../angular.json), but **no `<mat-*>` or
`<p-*>` component appears anywhere in `src/`**. The only Material footprint is the
`mat-typography` class on `<body>`. `CUSTOM_ELEMENTS_SCHEMA` is set on `AppModule`, which
suppresses unknown-element errors — a likely leftover from an abandoned PrimeNG attempt.

## Source layout

```
src/
├── index.html            # title "SVlots", Roboto + Material Icons, a global=window shim for aws-sdk
├── main.ts               # bootstraps AppModule
├── styles.css            # 4 lines: html/body height, body margin/font
├── assets/               # ~85 MB of images + 1 mp4; "Prestige Group/" subfolder is 61 MB
└── app/
    ├── app.module.ts             # declares 15 components, imports LoginmoduleModule eagerly
    ├── app-routing.module.ts     # all 15 routes
    ├── app.component.{ts,html}   # shell: navbar + router-outlet + footer (CSS inline in HTML)
    ├── auth.service.ts           # login / register / forgot & reset password / admin flag
    ├── shared.service.ts         # S3 init, credential decryption, upload, presigned URLs
    ├── services.service.ts       # empty stub
    ├── main/                     # home page
    ├── aboutus/  services/  projects/  projectcards/  projectform/
    ├── products/ flyers/  datacollection/  knowmore/
    ├── blog/  gallery/  contactus/  calculator/
    └── loginmodule/              # lazy-loaded feature module
        ├── login/                # functional
        └── register/             # stub template, no route
```

## Application shell

[app.component.html](../src/app/app.component.html) is the whole chrome and is ~930 lines, of
which ~820 are an inline `<style>` block. It contains:

1. **Fixed navbar** (120 px tall, `rgb(55, 65, 81)` slate) — logo, blinking "Elevating Value of
   Property" text, and the nav: Home, About Us, Services, Projects, Products ▾, Contact Us, Blog,
   Gallery, Login. The Products dropdown has a nested "Tools → Calculator" level.
2. **`<router-outlet>`** inside `.main-content` (pushed down with `margin-top: 130px`).
3. **Company info band** — logo, company blurb, Useful Links, Office Location.
4. **Footer** — privacy/terms text (not links), copyright, "Developed by TechnoNova Pvt Ltd."

`AppComponent` holds three booleans — `isMenuOpen`, `isDropdownOpen`, `isToolsOpen` — driving the
mobile overlay menu and the dropdowns, plus an `isDesktop()` helper that reads
`window.innerWidth > 768` (currently unused by the template).

## Modules

- **`AppModule`** — declares all 15 non-login components; imports `BrowserModule`,
  `AppRoutingModule`, `FormsModule`, `ReactiveFormsModule`, `BrowserAnimationsModule`,
  `HttpClientModule`, and `LoginmoduleModule`.
- **`LoginmoduleModule`** — declares `LoginComponent` and `RegisterComponent`. It is *both*
  lazy-loaded via `loadChildren` in the route table **and** eagerly imported by `AppModule`, so
  the lazy boundary is defeated and the module ships in the main bundle.

## Services

### `AuthService` ([src/app/auth.service.ts](../src/app/auth.service.ts))
Base URL `https://loginapi.svlots.com/api/Auth`. Multi-tenant: every login sends a hardcoded
`projectName: 'SVLots'`.

- `login(email, password)` → on `status === 1 && message === 'Login successful.'`, stores
  `userEmail`, `userName`, and `isAdmin` in `localStorage` and pushes to two `BehaviorSubject`s
  (`currentUser$`, `isAdmin$`).
- `register`, `forgotPassword`, `resetPassword`, `validateToken` — implemented but unreachable
  from the UI (no routes/components wired up).
- `logout()` clears storage and navigates to `/login` (a route that does not exist — see doc 07).
- Session state is **localStorage only** — no JWT is stored or attached to requests, and no route
  guard protects `/projectform`.

### `SharedService` ([src/app/shared.service.ts](../src/app/shared.service.ts))
S3 access layer.

- `initS3()` fetches two AES-encrypted strings from `GetAmazons3CredentialsS3AccessKey` /
  `…SecretKey`, decrypts them with an **AES-128-CBC key and IV hardcoded in the client**, then
  configures the global `AWS.config` for region `ap-south-1`. Guarded by an `initialized` flag.
- `uploadFile(file)` → `s3.upload` into bucket `spropertydetails`, keyed by raw filename.
- `generatePresignedUrl(key, expires = 600)` — defined but not called anywhere.

This design puts long-lived AWS credentials in the browser; see doc 07 for the security note.

### `ServicesService`
Empty generated stub. Safe to delete.

## Cross-cutting patterns

- **Scroll-reveal animation** — `main`, `aboutus`, `projects`, `blog`, `knowmore` each implement
  the *same* `ngAfterViewInit` block: query some section selectors, create an
  `IntersectionObserver` at `threshold: 0.1`, add/remove a `visible` class. Five near-identical
  copies; a directive would collapse them.
- **Direct DOM manipulation** — the home carousel uses `document.querySelectorAll` and mutates
  `style.transform` imperatively rather than binding through the template.
- **`goToHome()`** — `router.navigate(['/main'])`, duplicated in six components.
- **Feedback** — every form outcome goes through `Swal.fire(...)`; several handlers also
  `window.location.reload()` on success.
- **Endpoint history in comments** — most HTTP calls carry commented-out `localhost:7192` and
  `external.balajitransports.in` variants above the live `loginapi.svlots.com` URL. There is no
  `environment.ts`; URLs are inline string literals.

## Build & tooling

From [angular.json](../angular.json):

- Project name `SVlots`, output `dist/svlots`, `defaultConfiguration: production`.
- Production: `outputHashing: all`, initial-bundle budget warn 500 kB / error 5 MB,
  per-component-style warn 2 kB / error 4 kB.
- Styles: Material `indigo-pink` theme + `src/styles.css`.
- Assets: the entire `src/assets` folder is copied verbatim (all 85 MB).
- No `environments/`, no linter config, no CI, no Dockerfile, no deploy script.

Because the router uses HTML5 (non-hash) URLs, the host **must** rewrite unknown paths to
`index.html`, or deep links like `/gallery` will 404.
