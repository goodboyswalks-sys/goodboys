import type { Metadata } from "next";
import OS from "@/components/OS";
export const metadata: Metadata={title:"Goodboys OS",robots:{index:false,follow:false},manifest:"/os/manifest.webmanifest",appleWebApp:{capable:true,title:"Goodboys",statusBarStyle:"default"},icons:{apple:"/os-icon-192.png"}};
export default function Page(){return <OS/>;}
