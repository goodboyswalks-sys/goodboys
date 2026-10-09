import type {MetadataRoute} from 'next';
import {siteUrl,isPreview} from '@/lib/seo';
export default function sitemap():MetadataRoute.Sitemap{return isPreview?[]:[{url:siteUrl+'/'},{url:siteUrl+'/privacy'}];}
