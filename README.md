# GOODBOYS

**Includes Goodboys OS at `/os`. Start with [OS-SETUP.md](OS-SETUP.md) for owner login, enquiries, clients, calendar, business figures and your phone home-screen shortcut.**
A Next.js App Router + TypeScript website designed for GitHub and Vercel, with private Supabase enquiries and optional Supabase image storage.

## Start locally
Requires Node 22 or later. Unzip, open this folder and run:
```sh
npm install
cp .env.example .env.local
npm run dev
```
The website renders without Supabase. The form honestly reports that enquiries are not connected until environment variables and SQL are configured. Never add `.env.local` to GitHub.

## Make it yours first
Edit `lib/site.ts`: neighbourhood, owner, introduction, services, durations, real contact email and prices. The starter uses quote requests rather than invented rates. Replace temporary mood-board photos in `public/images/` with your own licensed photos before public launch. The logo is cropped from your supplied original. All colours/layout are in `app/globals.css`. The owner field is reserved for your bio; write your real introduction in `intro`.

## Supabase
1. Create a Supabase project.
2. Run `supabase/schema.sql` in SQL Editor once.
3. Set `SUPABASE_URL` to the project URL and `SUPABASE_SERVICE_ROLE_KEY` to the server secret/service role key. This key must NEVER use a NEXT_PUBLIC prefix.
4. View enquiries in Table Editor → enquiries. Set status to contacted/closed as you handle them. No email notifications or calendar booking are included; review this inbox manually.
5. Optionally upload the images from `public/images` into Storage → site-images using the Supabase dashboard. Set `NEXT_PUBLIC_ASSET_BASE_URL` to `https://PROJECT.supabase.co/storage/v1/object/public/site-images`. The logo stays local. No anonymous uploads are permitted. Do not upload private client photographs or records to this public bucket.

## GitHub + Vercel
Create an empty GitHub repository, then from this project folder:
```sh
git init
git add .
git commit -m "Build Goodboys website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/goodboys.git
git push -u origin main
```
Import that repository into Vercel. Framework: Next.js. Root directory: this folder (repository root if you upload the folder contents). Build command: npm run build. Node: 22 or newer. Add the Supabase variables and set NEXT_PUBLIC_SITE_URL to your actual https URL. Deploy, then add your domain in Vercel Settings → Domains. Update NEXT_PUBLIC_SITE_URL and redeploy when your domain changes. Add environment variables separately to Production and Preview as needed; use a separate Supabase project for previews if you want to keep test enquiries out of production.

## Verify
```sh
npm run test
npm run typecheck
npm run build
```
Test the form in a deployed preview with Supabase configured: one real test enquiry should appear in the table, anonymous database reads should be blocked, and the fourth submission from the same email in an hour should receive 429. Delete test entries afterward. Test mobile layouts and keyboard navigation. The endpoint checks origin, validates input, limits payload size, uses a honeypot and rate limits by email in Postgres. For a public high-traffic launch add a verified CAPTCHA and edge rate limiting; email-only throttling is not a comprehensive spam defence.

## Before accepting customers
Complete business area/contact details, final pricing, your real bio, handling/weather/cancellation policies and the privacy notice (including retention and any legally required details for your location). Verify insurance/qualifications yourself before adding claims. No invented ratings, reviews or accreditations are displayed.

## Structure
- app/page.tsx: responsive homepage
- components/EnquiryForm.tsx: accessible enquiry form
- app/api/enquiries/route.ts: private server persistence
- lib/site.ts: editable business content and asset routing
- supabase/schema.sql: database, permissions, throttle, storage bucket
- DESIGN-NOTES.md: research and mood-board interpretation

Supabase credentials, GitHub publishing and Vercel deployment remain yours to configure. This archive contains the complete source, not a deployed service.

## Validation performed
Input validation tests and TypeScript checks passed. Next.js 16.4 production compilation and static generation passed in the supplied workspace with a temporary process-memory reporting workaround outside the project. Live Supabase persistence was not tested because account credentials were not supplied.
