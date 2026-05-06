# ANTIGRAVITY AUTONOMOUS EXECUTION PROMPT
## Project: SAM Dossier — Validated Documents Module
## Mandate Reference: SAM-DOSSIER / VALIDATED-DOCS / V1.0
## Target Model: Claude Opus 4.6 (Antigravity IDE)
## Author: Whitemore Ngwira (CEO, Socinga Africa) / N.White Systems
## Issue Date: May 2026

---

## ROLE

You are operating as a Senior Full-Stack Engineer with Information Architect specialism, executing inside Antigravity IDE on a Windows 11 development workstation. You have full read/write access to the local filesystem, terminal access (PowerShell only), and Git push rights to the connected GitHub remote that Vercel auto-deploys from. You execute the entire mandate end-to-end without pausing for confirmation, only stopping if a destructive operation would damage existing work or if a phase gate fails validation.

---

## STRATEGIC CONTEXT

The Socinga Africa board has approved ten governance and strategy documents that currently sit on the principal's local desktop as fully-styled HTML files. Each file is a self-contained, browser-renderable artefact with embedded Tailwind CSS, Google Fonts, custom CSS, interactive `<canvas>` signature pads written in vanilla JavaScript, and full document copy approved by the board. These ten files are the canonical, signed-off-on source of truth — they are NOT to be regenerated, restyled, ported to React, or reformatted in any way during this mandate. The 10 currently in the https://sam-dossier.vercel.app/dashboard/validated-documents/ are all to be deleted 1st as they are wrong. And then you add the new from the desktop. My ecosytem comprises of github, git codespaces, vercel, supabase, etc, study it all. 

The SAM Dossier web application, deployed at `sam-dossier.vercel.app`, is the cloud-hosted dashboard through which board members, executives, and authorised investors will view, sign, and reference these approved documents. Today the `/dashboard/validated-documents/` route does not exist. Your task is to surgically add it, ingest the ten approved HTML files into the project as static assets, and build a dashboard layer that indexes them, displays them with 100% visual fidelity, and persists multi-party signatures across browser sessions.

The principal has explicitly emphasised: "I want them as they are please in their exact original state, they should leave there and load from there please, and function from there and be signed from there." Read this as a hard contract. The HTML files must not be modified on disk. Any signing persistence must be achieved by injecting a single bridge script at request-time, never by mutating the originals.

---

## THE LOCAL-TO-CLOUD BRIDGE (CRITICAL ARCHITECTURE NOTE)

The deployed Vercel app cannot read from the principal's Windows desktop — web servers have no view into client filesystems. You, Antigravity, are the bridge. You execute locally on the Windows machine, you can see both the desktop folder and the project repo, and your job in Phase 1 is to copy the source files from desktop into the repo's `public/` directory once. After that one-time ingestion and the subsequent `git push`, the documents live permanently in the cloud, served by Vercel's edge CDN. The desktop folder becomes irrelevant to runtime; it remains only as the principal's personal archive.

---

## SOURCE & TARGET PATHS

### Source (READ ONLY — do not modify these files)
```
C:\Users\User\Desktop\ANTIGRAVITY PROJECT FILES\socinga-africa-approved-documents\
├── Corporate_Services_Structure.html
├── Ecosystem_Organogram.html
├── Ecosystem_Policies.html
├── Establishment_Policy.html
├── Financial_Policy.html
├── Mining_Strategic_Policy.html
├── Mining_Strategy_Addendum.html
├── SAM-mission-centre-budget.html
├── Strategic_Business_Operations.html
└── Structural_Policy.html
```

### Target (WRITE)
The SAM Dossier project repository on the local Windows workstation. You must locate this yourself — it is the Next.js project that deploys to `sam-dossier.vercel.app`. If you cannot find it after a reasonable search of standard locations (e.g. `C:\Users\User\` subfolders, common dev folders), STOP and ask the principal for the absolute path before proceeding.

Within the project, your write paths are:
```
public/documents/socinga-africa/                 ← byte-for-byte copies of the 10 HTML files
public/signing-bridge.js                          ← persistence shim (~80 lines, you author this)
app/dashboard/validated-documents/page.tsx        ← server component (index)
app/dashboard/validated-documents/[slug]/page.tsx ← per-document viewer
app/api/validated-documents/[slug]/render/route.ts        ← HTML proxy + bridge injection
app/api/validated-documents/[slug]/signatures/route.ts    ← signature CRUD endpoint
src/lib/validated-documents/registry.ts           ← typed metadata for all 10 docs
src/lib/validated-documents/supabase-schema.sql   ← database migration
```

---

## TECH STACK CONSTRAINTS (HARD)

- Next.js 15 App Router, TypeScript strict mode, no `any`
- Tailwind CSS v3.4 (NOT v4 — confirm `tailwind.config.ts` matches)
- Framer Motion with **mandatory** `useReducedMotion()` guards on every animated component
- Supabase JS client (already wired in the project — locate the existing client and reuse it; do NOT install a second copy)
- All terminal commands in **Windows PowerShell syntax exclusively** (`;` not `&&`, forward-slash paths fine inside Node strings, `New-Item -ItemType Directory -Force` for mkdir, etc.)
- All copy in **flawless British English** (organised, recognised, authorised, signed off, programme, defence). Property names in TypeScript and JSON keys remain as the API requires them; only human-readable copy is British.
- Mobile-first at 375px viewport. Test the dashboard cards collapse to single column gracefully.
- Files exceeding 150 lines are delivered as completed files committed to the repo, never as paste-into-this snippets.

---

## DESIGN SYSTEM — THE ARCHIVAL INDEX (HARD)

| Token              | Value      |
|--------------------|------------|
| Deep Space Navy    | `#0A1128`  |
| Onyx               | `#121212`  |
| Gold               | `#D4AF37`  |
| Headings font      | Clash Display |
| Body font          | Inter      |
| Border radius      | `0` (zero, all corners square) |
| Surface treatment  | Glassmorphism via `backdrop-blur-xl` over translucent navy |
| Grid               | 8-point spacing scale |
| Content/visual ratio | 70% visual / 30% text on dashboard surfaces |

Benchmarks for visual reference: Vista Equity Partners, Aker ASA. The dashboard index page should feel like an investor data room: dense, hierarchical, gold-accented, no rounded corners anywhere, no playful curves.

---

## EXECUTION PHASES

### Phase 0 — Reconnaissance (no writes)

Locate the SAM Dossier project repository on the local filesystem. Verify it is the correct project by confirming `package.json` references `next@15.x` and that the deployed URL matches `sam-dossier.vercel.app` (check `vercel.json`, `.vercel/project.json`, or the Vercel CLI link). Read the existing `app/dashboard/layout.tsx` to understand the current dashboard chrome, navigation, and authentication guards. Locate the Supabase client at its existing path. Note the existing route structure under `app/dashboard/`. Output a one-page reconnaissance summary in the chat before proceeding.

If the project is not currently using Supabase or the auth layer is unclear, STOP and ask before Phase 5.

### Phase 1 — Document ingestion

Create the target directory `public/documents/socinga-africa/` if it does not exist. Copy all ten HTML files from the source desktop path to this directory using PowerShell `Copy-Item` with `-Force`. Do **not** use any text-processing tool that might alter line endings, smart quotes, or character encoding. Verify byte-level equality post-copy using `Get-FileHash -Algorithm SHA256` against both source and destination — log all ten hash pairs to the chat for human verification. If any pair mismatches, STOP.

The originals on the desktop remain untouched; the principal keeps that folder as their personal archive.

### Phase 2 — Document registry

Create `src/lib/validated-documents/registry.ts` containing a typed array of metadata for all ten documents. Each entry has the following shape:

```typescript
export type SigningRole = 'managing-director' | 'cfo' | 'ceo' | 'chairperson';

export interface ValidatedDocument {
  slug: string;                    // url-safe kebab-case
  filename: string;                 // exact source filename
  title: string;                    // human title for the dashboard card
  reference?: string;               // policy ref no. where applicable
  category: 'governance' | 'financial' | 'mining' | 'structural' | 'strategic';
  pillar?: 'insurance' | 'creative' | 'mining' | 'foundation' | 'group';
  description: string;              // 1-2 sentence summary for the card
  requiredSigningRoles: SigningRole[]; // canvas pad IDs we expect
  canvasPadMap: Record<string, SigningRole>; // pad-id → role
  paperFormat: 'A4-portrait' | 'A4-landscape' | 'A3-landscape';
}
```

Populate it by reading each HTML file's `<title>`, scanning its DOM for `<canvas id="...">` elements to determine the pad-to-role mapping, and matching the metadata against the principal's known structure (Ms Jabulile Dladla = Managing Director, Mr Mike Dotsey = CFO, Mr Whitemore Ngwira = CEO, Mr Tsekane Lukie Tshabalala = Chair).

Use these slugs (kebab-case from filenames, no extension):

```
corporate-services-structure
ecosystem-organogram
ecosystem-policies
establishment-policy
financial-policy
mining-strategic-policy
mining-strategy-addendum
sam-mission-centre-budget
strategic-business-operations
structural-policy
```

Reference numbers known from the documents: Establishment Policy is `01/0000/2026`. Financial Policy gives effect to it. Structural Policy references `01/0000/26` in its body. Capture any others you find by scanning the HTML.

### Phase 3 — Signing-bridge script

Author `public/signing-bridge.js`. This is a self-contained vanilla JavaScript file (no module bundling, served as a static asset) with the following responsibilities:

1. On `DOMContentLoaded`, scan the document for every `<canvas>` element with an `id` attribute.
2. For each canvas, attach a `mouseup` and `touchend` listener. When the listener fires, capture `canvas.toDataURL('image/png')` and POST it to `/api/validated-documents/{slug}/signatures` with body `{ padId, dataUrl }`. The slug is read from the `data-document-slug` attribute on `<body>`, which the render route adds during injection.
3. On load, GET `/api/validated-documents/{slug}/signatures` and for every returned signature, locate the canvas by pad ID and paint the dataURL onto it via an `Image` element drawn into the 2D context.
4. Show a small fixed-position toast (Deep Space Navy background, Gold text, square corners, bottom-right) confirming "Signature saved" or "Signature loaded" so the user has feedback.
5. Be defensive: if the API returns 401, do nothing silently (the user is on the public preview, not signed in).
6. Use no external libraries, no ES modules, only browser-globals. ES2020 syntax is fine — Vercel's edge serves this as-is.

Keep this file tight: target under 120 lines, fully commented in British English, with one clear top-of-file docstring explaining the contract with the host HTML.

### Phase 4 — HTML render route with injection

Create `app/api/validated-documents/[slug]/render/route.ts`. This is a Next.js Route Handler that handles `GET` requests. Its logic:

1. Read the slug from params. Look up the document in the registry. If not found, return 404.
2. Resolve the absolute path of the source HTML inside `public/documents/socinga-africa/{filename}` using `path.join(process.cwd(), 'public', ...)`.
3. Read the file as UTF-8 text via `fs/promises`.
4. Inject the following two modifications, both via simple string replacement on the HTML text (do NOT parse the DOM — keep it dumb and reliable):
   - Add `data-document-slug="{slug}"` as an attribute on the opening `<body>` tag. Use a regex that matches `<body` and the following whitespace/attributes up to the first `>`, preserving any existing attributes.
   - Insert `<script src="/signing-bridge.js" defer></script>` immediately before the closing `</body>` tag.
5. Set the response Content-Type to `text/html; charset=utf-8` and the cache headers to `Cache-Control: private, no-store` (signatures are user-specific so we cannot cache).
6. Stream the modified HTML as the response body.

The original file on disk is never written to. Every request reads it fresh from disk and emits a per-request modified version. This is intentional: it guarantees the source of truth on disk remains pristine and auditable.

### Phase 5 — Supabase schema and signatures API

Create `src/lib/validated-documents/supabase-schema.sql`:

```sql
-- Validated document signatures
create table public.document_signatures (
  id uuid primary key default gen_random_uuid(),
  document_slug text not null,
  pad_id text not null,
  signature_role text not null,            -- e.g. 'managing-director'
  signature_data_url text not null,         -- PNG data URL
  signed_by_user_id uuid not null references auth.users(id) on delete restrict,
  signed_at timestamptz not null default now(),
  signed_ip inet,
  signed_user_agent text,
  unique (document_slug, pad_id, signed_by_user_id)
);

create index document_signatures_slug_idx
  on public.document_signatures (document_slug);

alter table public.document_signatures enable row level security;

-- Authenticated users can read all signatures (board needs to see who has signed)
create policy "authenticated read"
  on public.document_signatures for select
  to authenticated
  using (true);

-- Authenticated users can insert their own signatures
create policy "authenticated insert own"
  on public.document_signatures for insert
  to authenticated
  with check (auth.uid() = signed_by_user_id);

-- Only the original signer can delete their own signature (within 24h)
create policy "authenticated delete own recent"
  on public.document_signatures for delete
  to authenticated
  using (
    auth.uid() = signed_by_user_id
    and signed_at > now() - interval '24 hours'
  );
```

The principal will run this against the SAM Dossier Supabase project. Do NOT auto-execute the migration — output the SQL clearly with PowerShell instructions for applying it via the Supabase dashboard SQL editor.

Create `app/api/validated-documents/[slug]/signatures/route.ts` exposing:

- `GET`: returns all signatures for the slug (authenticated only).
- `POST`: body `{ padId, dataUrl }`. Validates the slug exists in the registry, validates the padId exists in `canvasPadMap`, derives the role from the map, captures `signed_ip` from `request.headers.get('x-forwarded-for')` (Vercel-aware), and upserts via the unique constraint on `(document_slug, pad_id, signed_by_user_id)`. So a user re-signing simply updates their own signature.
- `DELETE`: body `{ padId }`. Removes the calling user's signature for that pad.

All routes must use the existing server-side Supabase client with cookie-based auth so RLS is enforced by user identity, not service role.

### Phase 6 — Dashboard index page

Create `app/dashboard/validated-documents/page.tsx`. This is a Server Component that:

1. Fetches the registry array.
2. Queries Supabase server-side for the count of signatures per slug, grouped by role, and joins it onto each registry entry to compute `signedCount` and `requiredCount` per document.
3. Renders the page chrome (within the existing dashboard layout) with a page title "Validated Documents", a subtitle in Inter italic explaining "Board-approved governance, strategy, and operational documents. Sign each in your authorised capacity.", and a grid of cards.
4. Each card is a glassmorphism panel: `backdrop-blur-xl bg-[#0A1128]/40 border border-[#D4AF37]/20`, square corners, padding on the 8-point grid (24px / 32px), Clash Display title, Inter body, and a thin gold progress bar showing signing completeness (signedCount / requiredCount). Below the progress bar a row of small role chips (MD, CFO, CEO, CHAIR) coloured gold when signed, slate-400 outlined when unsigned. The card link goes to `/dashboard/validated-documents/{slug}`.

Use Framer Motion only for one staggered fade-in on grid mount, with `useReducedMotion()` early-return falling back to no animation. Server Component for the page, with one Client Component child only for the animated grid container.

The grid: 1 column on mobile (375px), 2 columns from `md:`, 3 columns from `xl:`. Mind the 70/30 ratio — the cards are dense but not crowded.

Honour the principal's existing dashboard navigation. Add an entry "Validated Documents" to the dashboard sidebar/nav if and only if such a navigation primitive already exists in the project; otherwise leave navigation untouched and let the route be discoverable via direct link.

### Phase 7 — Per-document viewer page

Create `app/dashboard/validated-documents/[slug]/page.tsx`. Layout:

1. Top breadcrumb bar: Dashboard › Validated Documents › {document title}.
2. Document header card: Clash Display title, reference number badge in gold, category and pillar pills, signing-progress strip, list of signers with timestamps fetched from Supabase.
3. Action toolbar: "Open in new tab" (links to `/api/validated-documents/{slug}/render`), "Download PDF" (calls `iframe.contentWindow.print()` after attaching a `@media print` style override), "Clear my signature" (calls DELETE on the signatures API for the current user).
4. The document itself rendered inside an `<iframe>` whose `src` points to the render route. The iframe is full-width, with height computed dynamically by listening for a `postMessage` from the bridge script reporting the document's `scrollHeight`. Initial height defaults to `1100px`. Apply `loading="eager"` and `referrerPolicy="same-origin"`.

The viewer page is a Server Component that reads metadata, with one small Client Component for the iframe height management and the toolbar interactions.

For the wider-than-A4 documents (Corporate Services Structure, Ecosystem Organogram, SAM Mission Centre Budget per the registry's `paperFormat` field), the iframe is allowed to scroll horizontally on smaller viewports rather than zooming the content — preserving the original layout's intent.

### Phase 8 — Bridge script enhancement for iframe height

Augment `public/signing-bridge.js` to additionally `postMessage` the document's `scrollHeight` to its parent on load and on `ResizeObserver` updates, with message shape `{ source: 'sam-dossier-bridge', type: 'resize', height: number, slug: string }`. The viewer page's Client Component listens for this and adjusts the iframe height. Origin checks must be strict — only accept messages from the same origin.

### Phase 9 — Validation gates

Run all of these and report results before declaring the mandate complete:

1. `pnpm tsc --noEmit` (or `npm run typecheck`) — zero TypeScript errors.
2. `pnpm lint` — zero ESLint errors. Warnings tolerable only if pre-existing.
3. `pnpm build` (full Next.js production build) — must succeed.
4. Byte-level integrity check: re-run `Get-FileHash` on all ten files in `public/documents/socinga-africa/` against the desktop sources. Hashes must still match (proves Phase 1 ingestion was clean and no later phase touched them).
5. Smoke test locally: `pnpm dev`, navigate to `http://localhost:3000/dashboard/validated-documents/`, confirm all ten cards render, click into three different documents (one A4 portrait, one A4 landscape, one A3 landscape), confirm the iframe loads the document with full styling intact, confirm the canvas signature pads are functional.
6. Sign one canvas while logged in, refresh the page, confirm the signature persists on reload.
7. Open the deployed site after push to confirm Vercel build succeeded and the route is live.

### Phase 10 — Commit and push

Commit message format (Conventional Commits, British English):
```
feat(dashboard): add validated-documents module with persistent multi-party signing

- Ingest 10 board-approved Socinga Africa governance documents as static assets
- Add /dashboard/validated-documents index with signing-progress cards
- Add per-document viewer with iframe-isolated original HTML rendering
- Add signing-bridge script for canvas signature persistence to Supabase
- Add document_signatures table with RLS policies (apply via SQL migration)
- Original HTML files served byte-for-byte from public/, modifications injected per-request
```

Push to the default branch the project is configured for (likely `main`). Wait for the Vercel deployment, then output the live URL of the new route.

---

## NON-NEGOTIABLE RULES (RESTATED)

1. The ten HTML files in `public/documents/socinga-africa/` must remain byte-for-byte identical to the desktop sources. SHA256 hashes must match before and after every phase. If any phase touches them by mistake, halt and revert.
2. No copy in any document is to be edited, summarised, paraphrased, shortened, or "improved". Every word the board approved stays as the board approved it.
3. The dashboard layer is purely additive — do not refactor existing routes, do not "tidy up" adjacent code, do not change `tailwind.config.ts`, `next.config.js`, or any shared layout file beyond adding the one optional nav entry described in Phase 6.
4. PowerShell syntax only in any terminal command shown to the principal or executed.
5. British English in all UI copy and code comments.
6. Files over 150 lines are delivered as completed files in the repo. The principal does not paste line-by-line edits.
7. Beginner-developer protocol applies. When a step requires the principal to do something themselves (e.g. apply the SQL migration in Supabase), provide the exact click-by-click path: "1. Open https://supabase.com/dashboard, 2. Select the SAM Dossier project, 3. Click SQL Editor in the left sidebar, 4. ..."

---

## EXECUTION COMMAND

Begin Phase 0 immediately. Do not ask for clarification on anything that is specified above. If something genuinely ambiguous arises that is NOT covered (e.g. the project repo is in an unexpected location, or a file you need to import does not exist where expected), stop only at that specific point, ask one precise question, and resume on receiving the answer.

When the mandate is complete, output a final summary report containing: the live deployed URL of `/dashboard/validated-documents/`, the Supabase migration SQL the principal still needs to apply, the SHA256 hash table proving file integrity, and a screenshot-ready checklist of the seven validation gates with each marked PASS or FAIL.

End of mandate.