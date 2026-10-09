import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { validateEnquiry } from "@/lib/validation.mjs";
export async function POST(request: NextRequest) {
 const origin=request.headers.get("origin");
 if(!origin || origin!==request.nextUrl.origin) return NextResponse.json({error:"Request not allowed."},{status:403});
 if(!request.headers.get("content-type")?.includes("application/json"))return NextResponse.json({error:"JSON required."},{status:415});
 const raw=await request.text(); if(new TextEncoder().encode(raw).length>12000)return NextResponse.json({error:"Request too large."},{status:413});
 let data;try{data=JSON.parse(raw);}catch{return NextResponse.json({error:"Invalid request."},{status:400});}
 if(typeof data?.website==="string"&&data.website)return NextResponse.json({ok:true});
 const valid=validateEnquiry(data);if(!valid)return NextResponse.json({error:"Please check your details and consent."},{status:400});
 const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return NextResponse.json({error:"Enquiries aren’t connected yet. Please try again later."},{status:503});
 try {
 const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {error}=await db.rpc("submit_enquiry",{payload:valid});
 if(error){console.error("Enquiry persistence error:",error.code);return NextResponse.json({error:error.message.includes("rate_limit")?"You’ve sent a few requests. Please try again in an hour.":"We couldn’t save your enquiry. Please try again."},{status:error.message.includes("rate_limit")?429:500});}
 return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:"We couldn’t save your enquiry. Please try again."},{status:500});}
}
