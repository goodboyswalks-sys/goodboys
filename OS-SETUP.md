# Goodboys OS — the simple essentials

This archive contains your complete website plus its private OS at `/os`. Deploy the folder contents to the same GitHub repo / Vercel project as before. Your website and OS share the existing enquiry table; website submissions appear in the enquiry inbox after Refresh, or when you return to the app. No second website or separate dashboard service is required.

## Four screens
- **Today:** today's walks, new enquiries, active clients, monthly completed walk fees, unpaid completed walk fees and follow-ups due.
- **Enquiries:** read website enquiries, add private notes, set a follow-up date, change status, email the customer, and convert an enquiry into a client. Repeated conversion returns the same client.
- **Calendar:** monthly overview and daily schedule. Add and edit individual walks, mark completed/cancelled, record the fee and whether paid. One booking per dog; group dogs may share a start time.
- **Clients:** owner contact information, dog name, pickup/address details, care notes, active/archive status and walk history.

Analytics are operational figures from your records. Completed fees are not profit, bank reconciliations or website visitor analytics. There are no recurring bookings, invoices, payments, staff roles, marketing automations or calendar synchronisation in this first version.

## 1. Database and owner login
1. If starting fresh, run `supabase/schema.sql` first. If you deployed the original site, keep that database and skip this step.
2. Run `supabase/os.sql` **once** in Supabase SQL Editor. This adds tables and columns without wiping enquiries.
3. In Authentication → Users, create your owner user with your email and a strong password. Confirm its email if required. There is no public registration screen.
4. Copy its actual user UUID and run:
   ```sql
   insert into public.os_owners(user_id) values ('YOUR-AUTH-USER-UUID');
   ```
5. Disable new user signups in Supabase Auth settings if this project is only for your business. Use Supabase user management to reset your owner password if needed.

Row Level Security limits reads and writes to users explicitly listed in `os_owners`. A signed-in account without membership cannot read client, walk or enquiry data. The service-role key stays server-only. Browser authentication uses the public anon/publishable key and Supabase checks permissions on every request.

## 2. Vercel environment variables
Keep the original `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`, and add:

| Variable | Value |
| --- | --- |
| NEXT_PUBLIC_SUPABASE_URL | Same Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Anon key or publishable key, never the service-role key |
| NEXT_PUBLIC_BUSINESS_CURRENCY | Your currency code, e.g. GBP or USD (defaults to GBP) |

Redeploy after changing public variables. Open `https://your-domain/os` and sign in with the owner user. These are setup placeholders; no account or password is included in the source.

## 3. Reply directly from the OS (optional)
Connect Resend to send plain-text enquiry replies:
1. Create a Resend account and verify a sending domain you own using their DNS instructions.
2. Add server-only Vercel variables:
   - `RESEND_API_KEY`: your sending API key.
   - `EMAIL_FROM`: `Goodboys <hello@your-verified-domain.com>`.
   - `EMAIL_REPLY_TO`: your real, monitored business inbox.
3. Redeploy. Open an enquiry, write a message, and press **Send reply**. This is a real send. Successful sends are logged in the enquiry and mark it contacted.

Customer replies land in your normal business inbox, not the OS. This first version logs outbound messages only. If you prefer no email service yet, **Open email** starts a draft in your phone's mail app; manually mark contacted and record notes afterward. There are no automatic replies or campaigns.

If sending times out, check the provider's sent log before retrying. Sent history indicates provider acceptance, not confirmed delivery. The UI reports if an email was sent but its history could not be saved.

## 4. Add to your home screen
Use the deployed HTTPS address:
- iPhone/iPad: open `/os` in Safari → Share → Add to Home Screen → Add.
- Android: open `/os` in Chrome → menu → Add to Home screen (or Install, depending on browser).

The shortcut opens directly into Goodboys OS in standalone mode where supported. It needs an internet connection; it does not cache private records for offline use and has no push notifications. You can stay signed in on your own phone. Sign out on shared devices. Times and day boundaries follow your device timezone; use the business's local timezone on your phone.

## 5. Check before using real customer data
1. Submit a test enquiry through the public site, then Refresh the OS and confirm it appears.
2. Save notes and a follow-up date. Convert it into a client twice; confirm only one client is created.
3. Add a walk. Check it appears on the correct local date and in Today. Complete it and mark paid; confirm the numbers update.
4. Log in with a test user not listed in `os_owners`; confirm there is no access. Check anonymous database reads are blocked.
5. If email is connected, send one reply to your own test address and check delivery and sent history.
6. Remove test records in Supabase, and complete the public site's business and privacy details. Private client contact/care data is not in the public image bucket.

## Validation in this build
Run `npm test`, `npm run typecheck`, and `npm run build`. Live authentication, SQL execution and email delivery require your accounts and must be checked after configuration.

## Updating your existing deployment
Replace the source files in the existing repository, run the OS migration once, set the new variables and redeploy. Keep your own customised `lib/site.ts`, logo, photos and contact/privacy text if you already edited them. Do not rerun the original schema in place of the OS migration, and never commit your `.env.local`.

Build checks passed: five automated tests, TypeScript and production build (Webpack). HTTP checks confirmed the OS, manifest and icons serve, foreign origins are rejected, missing server configuration reports 503, and malformed enquiries report 400. Visual browser checks were unavailable in the workspace. Live Supabase/Auth/Resend checks remain for your configured deployment. The temporary workspace process-memory workaround was not included in the source.
