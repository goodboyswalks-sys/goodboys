# Joe photo captions

Adds the supplied captions and alt text to 29 photos. Removes photos 07, 23 and 30 from the website gallery. Remaining photos retain their original numbers and order.

## GitHub browser upload
Upload the included components/MeetJoe.tsx and app/globals.css into matching folders of your existing project, replacing the two files. Commit to deploy on Vercel. This CSS includes the latest mobile and Meet Joe layout fixes.

## Command-line alternative
From the project root run:
git apply --check /path/to/goodboys-photo-captions.patch
git apply /path/to/goodboys-photo-captions.patch
Then commit and push. This diff expects the latest layout fix and the 32-photo update from this conversation.

No new images or Supabase changes. Photos 07, 23 and 30 are no longer rendered. To also remove their files from your repository, delete joe-07.webp, joe-07-480.webp, joe-07-800.webp and the corresponding three files for 23 and 30 under public/images/joe. Original uploaded photographs are unchanged.
