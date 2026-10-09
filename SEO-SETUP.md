# Goodboys SEO — first pass

## Included
- Descriptive homepage title and description for group dog walking and home visits.
- Canonical URLs defaulting to https://goodboysuk.com (override NEXT_PUBLIC_SITE_URL if you use www as the primary domain).
- /sitemap.xml with homepage and privacy page; no private OS or API URLs.
- /robots.txt pointing to the sitemap. API paths are excluded. The OS uses noindex/nofollow; it remains crawlable so search engines can see that instruction. Authentication and database permissions protect private data, not robots.txt.
- Vercel Preview/Development builds get noindex/nofollow and disallow-all robots. Production is indexable.
- Organization, WebSite and Service JSON-LD describing the visible services. No invented reviews, pricing, credentials or address. Organization markup does not claim eligibility for Google's LocalBusiness rich result (which requires additional verified business information).
- Open Graph/Twitter share metadata and image dimensions.
- Optional Google Search Console verification through GOOGLE_SITE_VERIFICATION.

## Deploy without losing your edits
This archive includes the complete website and OS. If you already customised your repository, copy only these SEO changes rather than overwrite it:
- lib/seo.ts (new)
- app/robots.ts and app/sitemap.ts (new)
- app/layout.tsx (metadata update)
- app/page.tsx (homepage metadata, JSON-LD, optional area line and image dimensions)
- app/privacy/page.tsx (page metadata)
- app/os/page.tsx (absolute OS title)
- app/globals.css (only the .hero-area rule at the end is new)
- .env.example (documentation only)
Keep your own lib/site.ts, photos, content, custom code and real environment values. This SEO change needs no SQL migration.

## Local search content — needs your actual area
Set `area` in lib/site.ts to your real coverage, e.g. a town or a short list of neighbouring areas. The title, description, homepage area line, FAQ and schema then share the same service area. Avoid a long list stuffed into the title. If many areas are served, use the main town here and add genuine, detailed coverage content separately.
The starter still has 'Your neighbourhood' until you confirm your area. Replace that visible placeholder before launch. Add your real contact email and founder introduction. Replace mood-board images with photographs you have rights to use before public launch.
Do not create near-identical pages for every postcode. Future service/area pages should have useful, specific content supported by the services actually offered.

## Google Search Console
1. Add a Domain property for goodboysuk.com at https://search.google.com/search-console.
2. Copy Google's TXT verification record to the authoritative DNS provider (Vercel only if its nameservers manage the domain).
3. Verify, then submit https://goodboysuk.com/sitemap.xml under Sitemaps.
4. Inspect the homepage URL and request indexing. Check that Google can fetch the production homepage.
If choosing Google's URL-prefix/HTML-tag verification instead, paste only the content value into GOOGLE_SITE_VERIFICATION in Vercel and redeploy.

## Google Business Profile
Create or complete a genuine service-area Business Profile at https://www.google.com/business/. Use Goodboys, your actual service areas, real business phone/hours and https://goodboysuk.com. Follow Google's current eligibility and service-area rules; hide your residential address if customers are not served there. Ask real customers for honest reviews once you have customers. Never invent review counts or ratings.

## Verify after deploying
Check /robots.txt and /sitemap.xml. Homepage HTML should have its canonical, title and JSON-LD. /os should contain noindex. Confirm the primary domain in Vercel and use that same domain in NEXT_PUBLIC_SITE_URL. Review Search Console indexing and search queries over time. Adding metadata does not guarantee indexing or rankings.

Primary guidance: Google Search Central's Organization/LocalBusiness structured data and Build and Submit a Sitemap documentation. Live-site retrieval was unavailable during this pass, so this is a source-code update, not a confirmed audit of your current deployment.
