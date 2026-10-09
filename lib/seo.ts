import { site } from '@/lib/site';
export const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL || 'https://goodboysuk.com').replace(/\/$/,'');
export const isPreview=process.env.VERCEL_ENV==='preview'||process.env.VERCEL_ENV==='development';
export const serviceArea=site.area && site.area!=='Your neighbourhood'?site.area:'';
export const seoTitle=serviceArea?`Dog Walking in ${serviceArea} | Goodboys`:'Dog Walking & Home Visits | Goodboys';
export const seoDescription=serviceArea?`Goodboys offers small group dog walks, solo walks and home visits in ${serviceArea}. Tell us about your dog and enquire about a meet-and-greet.`:'Small group dog walks, one-to-one walks and home visits from Goodboys. Find the right routine for your dog and enquire about a meet-and-greet.';
export function businessSchema(){
 const id=`${siteUrl}/#business`;
 return {'@context':'https://schema.org','@graph':[
  {'@type':'Organization','@id':id,name:site.name,url:siteUrl,logo:`${siteUrl}/images/logo.png`,description:seoDescription,...(site.email?{email:site.email}:{}),...(serviceArea?{areaServed:{'@type':'Place',name:serviceArea}}:{})},
  {'@type':'WebSite','@id':`${siteUrl}/#website`,url:siteUrl,name:site.name,publisher:{'@id':id},inLanguage:'en-GB'},
  ...site.services.map(s=>({'@type':'Service','@id':`${siteUrl}/#service-${s.id}`,name:s.type,serviceType:s.type,description:s.description,provider:{'@id':id},url:`${siteUrl}/#walks`,...(serviceArea?{areaServed:{'@type':'Place',name:serviceArea}}:{})}))
 ]};
}
