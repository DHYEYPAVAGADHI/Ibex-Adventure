# Ibex Adventure

Premium experiential-travel website for **Ibex Adventure** — *Travel. Experience. Learn.*

- **Public site** — a single-page experience at `/` (header links scroll-spy to each
  section) plus deep-dive routes for journeys, destinations, experiences and policies.
- **Admin CMS** — `/admin` (dark theme). Manage journeys, categories, destinations,
  attractions, the homepage hero & cards, contact info, site settings, memories, media
  and enquiries.

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) · React 19 |
| Styling | Tailwind CSS v4 (`app/globals.css` `@theme` tokens) · Archivo / Hanken Grotesk / EB Garamond |
| Data | Prisma 7 + PostgreSQL (Supabase) via `@prisma/adapter-pg` |
| Media | Supabase Storage (uploads) — `lib/storage/` |
| Email | Nodemailer (contact form → `Enquiry` + SMTP) |
| Motion | framer-motion |

## Run locally

```bash
npm install
cp .env.example .env            # fill in DATABASE_URL, ADMIN_*, JWT_SECRET
npm run db:push                 # sync schema to the database
npm run db:seed                 # categories, 6 flagship journeys, hero, contact, cards, destinations…
node scripts/fix-images.mjs     # HEAD-check every stored image URL, repair any 404s (optional)
npm run dev                     # http://localhost:3000  (PORT=3100 npm run dev to use another port)
```

### Admin

Sign in at `/admin/login` with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from your `.env`.
If `ADMIN_PASSWORD` is empty the app falls back to `ibexadmin2024` (dev only).

> **Note:** `.env.local` overrides `.env`. If admin login fails, check that
> `ADMIN_PASSWORD` isn't set to an empty string in `.env.local`.

## Scripts

| Command | |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | `prisma generate && next build` |
| `npm run db:push` | Push `prisma/schema.prisma` to the DB |
| `npm run db:seed` | Idempotent content seed (`prisma/seed.ts`) |
| `npm run db:studio` | Prisma Studio |
| `node scripts/fix-images.mjs` | Replace any dead image URLs in the DB with working ones |
| `node scripts/fix-packages.mjs` | One-off: flesh out stub packages + assign missing thumbnails |

## Deploy (Vercel)

The project is linked to the Vercel project **ibex-adventure**.

1. Set these Environment Variables in the Vercel dashboard (Production + Preview):
   `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`,
   `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`,
   `FROM_EMAIL`, `CONTACT_EMAIL`,
   `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
   `NEXT_PUBLIC_WHATSAPP_NUMBER`.
2. `vercel --prod` (or push to the connected branch).
3. Run the seed once against the production DB if it's empty.

## Content model (`prisma/schema.prisma`)

`Package` (journeys) · `AdventureCategory` / `Activity` (categories) · `Destination` ·
`Attraction` (experiences) · `HeroSection` · `HomepageAdventureCard` ·
`ContactInformation` · `WebsiteSetting` · `Memory` · `MediaAsset` · `Enquiry`.

JSON-encoded fields (`highlights`, `itinerary`, `inclusions`, `gallery`, …) are parsed
defensively at render time.
