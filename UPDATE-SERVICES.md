# Services update
Solo walks have been removed from public service cards, the FAQ, SEO descriptions, structured data, the enquiry dropdown and new OS walk bookings. The available services are small group walks and home visits.

Deploy the source update. Run supabase/remove-solo.sql once in Supabase SQL Editor after the original schema/OS migrations to prevent new retired-service records at database level. Existing records are kept and labelled Previously booked service in the OS; their original service value remains in the database so their history is not rewritten.

If your repository has further edits, apply the changes to lib/site.ts, lib/seo.ts, lib/validation.mjs, app/page.tsx, components/OS.tsx and the final .cards CSS rule rather than replace your own customisations. Keep your actual business contact details, credentials and content. The Google Business description in GOOGLE-BUSINESS-SETUP.md now lists only group walks and home visits; update any already-published Google profile manually too.
