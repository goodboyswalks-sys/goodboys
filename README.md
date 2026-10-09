# Add 20 photos to Meet Joe

All 20 supplied photos are appended to the existing album. The original web pic 1–4 stay first. This is 32 photos total, with responsive WebP variants and lazy loading.

## GitHub website upload (simplest)
Upload the included components/MeetJoe.tsx and public/images/joe/ files into the matching folders of your existing repository, replacing MeetJoe.tsx. Keep the existing joe-01 to joe-12 images. Commit the upload so Vercel redeploys. Do not upload the .patch or this README into the site.

## Command-line alternative
From your project root:

git apply --check /path/to/goodboys-extra-photos.patch
git apply /path/to/goodboys-extra-photos.patch

Then copy the included public/images/joe files into your existing public/images/joe folder, commit and push. Use one method, not both.

No Supabase or environment changes. This update does not include the earlier layout fix; apply that separately if you have not done so already.
