# 06 — Development Guide

## Prerequisites

- **Node.js** — Angular 16 supports Node 16.14+ / 18.10+. Node 20+ generally works; Node 22+ may
  warn. (`@types/node` is pinned to `^22`.)
- **Angular CLI 16.2** — `npx ng` uses the local copy; a global CLI on v17+ will complain.

## Setup & commands

```bash
npm install
npm start          # ng serve → http://localhost:4200 (development configuration)
npm run build      # ng build → dist/svlots (production is the default configuration)
npm run watch      # ng build --watch --configuration development
npm test           # ng test → Karma + Chrome
```

`npm test` runs the CLI-generated spec stubs only — each is a `should create` smoke test, and
several will fail as written because the specs don't provide `HttpClientTestingModule`,
`RouterTestingModule`, or `ReactiveFormsModule` for the components that need them. Treat the
suite as a scaffold, not a safety net.

## Deployment

There is no deploy script, Dockerfile, or CI config in the repo. What a host needs:

1. Serve the contents of `dist/svlots/`.
2. **Rewrite all unmatched paths to `/index.html`** — the router uses `useHash: false`, so
   `/gallery`, `/about-us`, etc. will 404 on a plain static host without this.
3. `<base href="/">` in `index.html` assumes the app is served from the domain root. Serving from
   a subpath requires `ng build --base-href /subpath/`.

The production build allows an initial bundle up to 5 MB before erroring (warning at 500 kB), and
copies **all of `src/assets` — about 85 MB** into the output. Expect a large deployment artifact.

## Before you change anything

Two things to know that will otherwise surprise you:

1. **CSS is not scoped.** Almost every component's CSS lives in a `<style>` block inside its
   *HTML template*, not in its `.component.css`. Angular only applies view encapsulation to
   `styleUrls`/`styles` — CSS written inside a template is global. So a rule you add on the blog
   page can restyle the gallery. If you move a block into the (empty) `.component.css` file to fix
   this, expect other pages to change appearance, because they may be depending on the leak.

2. **There is no environment config.** API hosts are inline literals. Changing the backend means
   grepping:
   ```bash
   grep -rn "loginapi.svlots.com\|localhost:7192\|balajitransports" src/
   ```

## Where to change what

| I want to… | File |
| --- | --- |
| Add/rename a page | [app-routing.module.ts](../src/app/app-routing.module.ts) + declare in [app.module.ts](../src/app/app.module.ts) |
| Edit the navbar or footer | [app.component.html](../src/app/app.component.html) (markup at the bottom, CSS in the `<style>` block at the top) |
| Change the home hero/carousel | [main.component.html](../src/app/main/main.component.html) + [main.component.ts](../src/app/main/main.component.ts) |
| Edit service offerings | [services.component.html](../src/app/services/services.component.html) — cards are hardcoded markup |
| Change an API endpoint | the component that calls it; there is no central config |
| Change S3 bucket/region | [shared.service.ts](../src/app/shared.service.ts) (`spropertydetails`, `ap-south-1`) — also appears in `projectcards.component.ts` |
| Adjust the area calculator | [calculator.component.ts](../src/app/calculator/calculator.component.ts) (`calculateAreas`, `calculateTriangleArea`) |
| Add an image | drop it in [src/assets/](../src/assets/) and reference `assets/<name>` — **compress it first** |

## Conventions observed in the codebase

Follow these to stay consistent, even where they aren't ideal (doc 07 lists what to migrate away
from):

- **Naming** — `kebab-case` folders, `PascalCase` classes, `app-` selector prefix. All standard
  Angular CLI output.
- **Feedback** — always `Swal.fire(title, text, 'success' | 'error' | 'warning')`; never
  `alert()` or inline banners.
- **Reveal animations** — copy the `ngAfterViewInit` + `IntersectionObserver` block from
  [main.component.ts](../src/app/main/main.component.ts) and add your section's selector; the CSS
  class toggled is `visible`.
- **Home links** — components expose `goToHome()` → `this.router.navigate(['/main'])`.
- **Internal navigation** — use `routerLink`, not `href`. (`products` and `flyers` templates use
  `href` for internal paths; that's a bug, not the pattern.)
- **Old endpoints** — the codebase keeps superseded URLs as comments above the live one. Consider
  deleting rather than continuing this.

## Repo hygiene

- **Git history is a single commit** (`init: load original project`) — there is no prior context
  to consult. Whatever you can't infer from the code isn't recorded anywhere.
- `.gitignore` covers the standard Angular set; `package-lock.json` is committed (528 kB).
- **Committed but unused:** `@angular/material`, `@angular/cdk`, `primeng`, the
  `services.service.ts` stub, ~46 unreferenced asset files, and the `register` component.
- `angular.json` contains a CLI analytics UUID — harmless, but it identifies the original author's
  machine.
