# Trust badges: confirmation needed

The supplied project contains no evidence confirming insurance cover or a DBS check.
Shield and ID icons with the labels “Fully Insured” and “DBS Checked” are implemented, but hidden by default.
After the business owner confirms each claim is accurate and current, enable its corresponding boolean in `lib/site.ts` (`site.trust`). Each badge can be enabled independently.

Dog Days Out is a Coming Soon information card only. It is deliberately excluded from the enquiry service selector and existing booking validation.

All nine supplied originals are retained under `public/images/refresh`; responsive WebP derivatives preserve the full image and avoid unnecessary large downloads. The two additional photographs are retained for future use.
