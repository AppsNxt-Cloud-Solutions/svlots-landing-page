# SV Lots Landing Page — Documentation

Marketing / lead-generation website for **SV Lots India Pvt Ltd**, a Tumkur-based real estate
and land-services company ("Elevating Value of Property"). Built as a single Angular 16
application that combines brochure-style marketing pages with a small set of interactive
tools (area calculator, project catalogue, lead-capture forms) and a minimal admin flow for
publishing projects.

## Contents

| Doc | What's in it |
| --- | --- |
| [01 — Project Overview](01-project-overview.md) | What the product is, who it's for, feature inventory |
| [02 — Architecture](02-architecture.md) | Angular structure, modules, services, build config |
| [03 — Routes & Pages](03-routes-and-pages.md) | Every route, its component, and what the page contains |
| [04 — Design System (as-built)](04-design-system.md) | Colors, type, layout, motion, responsive behaviour |
| [05 — Integrations & Data](05-integrations-and-data.md) | Backend API, AWS S3, forms, auth |
| [06 — Development Guide](06-development-guide.md) | Setup, commands, conventions, where to change things |
| [07 — Findings & Recommendations](07-findings-and-recommendations.md) | Bugs, UX gaps, performance and SEO issues, prioritised |

## Fast facts

- **Framework:** Angular 16.2 (NgModule-based, not standalone), TypeScript 5.1
- **Styling:** hand-written CSS, almost entirely inside `<style>` blocks in component templates
- **Backend:** `https://loginapi.svlots.com` (.NET-style REST API, external repo)
- **Media:** AWS S3 bucket `spropertydetails` (ap-south-1) for project images
- **Pages:** 15 routed views, 16 components, ~6,300 lines of component code/markup
- **Local assets:** ~85 MB of images/video in [src/assets/](../src/assets/)
- **Tests:** default CLI spec stubs only — no meaningful coverage
- **Git history:** single commit (`init: load original project`) — this is an imported codebase

## Start here

If you're picking this up cold: read [01](01-project-overview.md) and
[03](03-routes-and-pages.md) to understand the site, then go straight to
[07](07-findings-and-recommendations.md) — there are several user-visible breakages
(a dead "Login" link, a form posting to `localhost`) worth fixing before any redesign work.
