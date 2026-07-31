# 05 — Integrations & Data

## Backend API

Base host: **`https://loginapi.svlots.com`** — an external service (not in this repo). It appears
to be shared across several SV Lots / TechnoNova properties, hence the `projectName` discriminator
on auth calls.

| Method | Endpoint | Called from | Purpose |
| --- | --- | --- | --- |
| POST | `/api/Auth/login` | [auth.service.ts](../src/app/auth.service.ts) | Login; body `{ email, password, projectName: 'SVLots' }` |
| POST | `/api/Auth/register` | `AuthService.register` | `{ name, PhoneNumber, email }` — no UI wired up |
| POST | `/api/Auth/forgot-password` | `AuthService.forgotPassword` | no UI wired up |
| POST | `/api/Auth/reset-password` | `AuthService.resetPassword` | `{ token, email, password }` — no UI |
| POST | `/api/Auth/validate-token` | `AuthService.validateToken` | no UI |
| GET | `/api/SVLots/GetProjects` | [projectcards](../src/app/projectcards/projectcards.component.ts) | Public project catalogue |
| POST | `/api/SVLots/AddProject` | [projectform](../src/app/projectform/projectform.component.ts) | Create project (`responseType: 'text'`) |
| POST | `/api/SVLots/AddServiceRequest` | [services](../src/app/services/services.component.ts) | Call-back lead (`responseType: 'text'`) |
| POST | `/api/SVLots/SubmitContactForm` | [contactus](../src/app/contactus/contactus.component.ts) | ⚠️ hardcoded to `https://localhost:7192` |
| GET | `/GetAmazons3CredentialsS3AccessKey` | [shared.service.ts](../src/app/shared.service.ts) | AES-encrypted AWS access key |
| GET | `/GetAmazons3CredentialsS3SecretKey` | `SharedService.initS3` | AES-encrypted AWS secret key |

All URLs are inline string literals. There is **no `environment.ts`**, so switching environments
means editing source. Several call sites keep the historical URLs as comments:
`https://localhost:7192/...` and `https://external.balajitransports.in/...`.

### Response contracts (as consumed)

**Login** — `LoginResponse`:
```ts
{ message: string, email: string, role?: string, name?: string,
  status: number, projectName: string, projectNames?: string[] }
```
Success is determined by **string comparison** on `message === 'Login successful.'` (plus
`status === 1` inside `AuthService`), and authorisation by
`projectNames.includes('SVLots')`. `role?.toLowerCase() === 'admin'` sets the admin flag.
Note `AuthService` and `LoginComponent` declare two separate copies of this interface with
different fields — `AuthService`'s version omits `projectNames`, which is exactly the field the
component relies on.

**Projects** — `GET /GetProjects` returns an array; the code reads
`title`, `description`, `location`, `type`, `externalLink`, and `fileName` (S3 key). `imageUrl` and
`loading` are added client-side. A `Project` interface exists but `projects` is typed `any[]`, so
it isn't enforced.

**Service request / Add project** — plain-text responses. Success for service requests is detected
by matching the exact string `'Service request added successfully.'`; anything else surfaces as an
error even on HTTP 200.

## AWS S3

- **Bucket:** `spropertydetails`, region `ap-south-1`.
- **SDK:** `aws-sdk` v2 browser build. `index.html` includes a `global = window` shim to make it
  load.
- **Credential flow:** `SharedService.initS3()` → GET both encrypted key strings (as `text`) →
  AES-128-CBC decrypt with key `NLKpQsoPaeoZ55ul` and IV `RbeqxtNXxucHI123`, **both hardcoded in
  the client bundle** → `AWS.config.update({ accessKeyId, secretAccessKey, region })` → `new AWS.S3()`.
- **Reads:** `projectcards` calls `s3.getObject` per project, builds a `Blob` from the body,
  `URL.createObjectURL`, then `DomSanitizer.bypassSecurityTrustResourceUrl`.
- **Writes:** `projectform` calls `s3.upload` with `Key: file.name` — the raw filename, so two
  uploads with the same name overwrite each other and there is no content-type or size validation.
- **Unused:** `generatePresignedUrl()` exists and would be the correct way to render project
  images (`<img [src]>` against a signed URL) instead of downloading blobs.

### Security note
Because the decryption key and IV ship in the JavaScript bundle, the "encryption" is obfuscation
only — anyone can retrieve and decrypt live AWS credentials from the browser, then use them
directly against the bucket with whatever permissions that IAM user holds. There is also a
commented-out plaintext access key/secret pair left in
[projectcards.component.ts](../src/app/projectcards/projectcards.component.ts) (~line 216); if
those credentials were ever real, treat them as compromised and rotate them.

The correct shape is: keep AWS credentials server-side, and have the API return short-lived
**presigned URLs** for reads and presigned POST policies for uploads. `generatePresignedUrl` is
already half of that pattern.

## Authentication & session

- No token is issued or stored — `localStorage` holds `userEmail`, `userName`, and `isAdmin`
  (`logout()` also clears `userToken`, which is never set).
- `isAdmin` is read straight from `localStorage`, so a user can grant themselves admin from the
  browser console. Nothing on the client depends on it today except a branch in
  `navigateToCorrectComponent()` whose two arms are identical.
- **No `HttpInterceptor`** — no request carries credentials.
- **No route guards** — `/projectform` is fully reachable by URL without logging in. Whether that
  matters depends on whether the API authorises `AddProject` server-side; from the client's side it
  does not appear to.

## Forms

| Form | Style | Validation | Feedback |
| --- | --- | --- | --- |
| Contact Us | Reactive | required; phone `^[0-9]+$`; email; message ≤180 | SweetAlert2 + `window.location.reload()` |
| Service call-back | `ngModel` | manual truthiness check on 4 fields | SweetAlert2 |
| Add Project | Reactive | all required + file must be selected | SweetAlert2, resets form and file input |
| Login | `ngModel` | manual empty check | SweetAlert2 |
| Calculator | Reactive | all 24 controls required (never surfaced) | inline disabled output fields |

Common gaps across all of them: no field-level inline error text (everything goes to a modal), no
disabled/spinner state on the submit button (`ContactusComponent` has a `loading` flag and a
`showLoadingPopup()` that is never called), no honeypot/captcha on public lead forms, and no
success page — the contact form full-page-reloads instead.

## Outbound / third-party

| Target | Purpose |
| --- | --- |
| `sathyananda.balajitransports.in` | Sibling product — Revenue/Agricultural model, "Get Access" |
| `layout.balajitransports.in` | Sibling product — Layout model |
| `rentalproperty.balajitransports.in` | Sibling product — Rental model |
| `svlots.com/knowmore` | Absolute links back to the production site (6 occurrences) |
| `cdnjs.cloudflare.com` | Font Awesome 6 CSS (two different builds) |
| `fonts.googleapis.com` / `fonts.gstatic.com` | Roboto + Material Icons |
| `www.google.com/maps/place/Chirantana` | Office location link |
| `images.unsplash.com`, `www.transparenttextures.com` | One remote hero image and one background texture |

`http://localhost:4200/knowmore` appears 5 times in
[products.component.html](../src/app/products/products.component.html) — dev-machine links that
would break in production if that page were linked from the navbar.
