import type { Metadata, Viewport } from 'next';
import {siteUrl,isPreview,seoTitle,seoDescription} from '@/lib/seo';
import './globals.css';
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#faf8f1" };
export const metadata:Metadata={
 metadataBase:new URL(siteUrl),
 title:{default:seoTitle,template:'%s | Goodboys'},
 description:seoDescription,
 robots:isPreview?{index:false,follow:false}:{index:true,follow:true},
 openGraph:{type:'website',siteName:'Goodboys',locale:'en_GB',title:seoTitle,description:seoDescription,images:[{url:'/images/hero.jpg',width:360,height:450,alt:'Happy dog exploring outdoors with Goodboys'}]},
 twitter:{card:'summary_large_image',title:seoTitle,description:seoDescription,images:['/images/hero.jpg']},
 ...(process.env.GOOGLE_SITE_VERIFICATION?{verification:{google:process.env.GOOGLE_SITE_VERIFICATION}}:{})
};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en-GB"><body>{children}</body></html>;}
