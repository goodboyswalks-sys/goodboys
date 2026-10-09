import { NextRequest,NextResponse } from "next/server";
import {sameOrigin} from "@/lib/request-origin.mjs";
import {createClient} from "@supabase/supabase-js";
export async function POST(req:NextRequest){
 if(!sameOrigin(req.headers.get("origin"),req.headers.get("host")))return NextResponse.json({error:"Request not allowed"},{status:403});
 const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return NextResponse.json({error:"Supabase isn’t connected."},{status:503});
 const token=req.headers.get("authorization")?.replace(/^Bearer /,"");if(!token)return NextResponse.json({error:"Sign in first."},{status:401});
 const db=createClient(url,key,{auth:{persistSession:false}});
 const {data:{user},error:authError}=await db.auth.getUser(token);if(authError||!user)return NextResponse.json({error:"Sign in again."},{status:401});
 const {data:owner}=await db.from("os_owners").select("user_id").eq("user_id",user.id).maybeSingle();if(!owner)return NextResponse.json({error:"Owner access required."},{status:403});
 const raw=await req.text();if(raw.length>10000)return NextResponse.json({error:"Message too long."},{status:413});
 let body;try{body=JSON.parse(raw);}catch{return NextResponse.json({error:"Invalid message."},{status:400});}
 if(typeof body.body!=="string"||!body.body.trim()||body.body.length>5000||typeof body.enquiry_id!=="string")return NextResponse.json({error:"Enter a message (up to 5,000 characters)."},{status:400});
 const {data:e}=await db.from("enquiries").select("id,email,dog").eq("id",body.enquiry_id).maybeSingle();if(!e)return NextResponse.json({error:"Enquiry not found."},{status:404});
 if(!process.env.RESEND_API_KEY||!process.env.EMAIL_FROM||!process.env.EMAIL_REPLY_TO)return NextResponse.json({error:"Email isn’t connected yet. Use Open email instead."},{status:503});
 const {count}=await db.from("enquiry_replies").select("id",{count:"exact",head:true}).eq("enquiry_id",e.id).gte("created_at",new Date(Date.now()-3600000).toISOString());
 if((count||0)>=10)return NextResponse.json({error:"Too many replies to this enquiry. Try later."},{status:429});
 try{
 const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.EMAIL_FROM,to:[e.email],reply_to:process.env.EMAIL_REPLY_TO,subject:`Goodboys — ${e.dog.slice(0,100)}`,text:body.body.trim()}),signal:AbortSignal.timeout(15000)});
 const result=await response.json();if(!response.ok)return NextResponse.json({error:"Email provider couldn’t send this reply. Check your email configuration."},{status:502});
 const {error}=await db.from("enquiry_replies").insert({enquiry_id:e.id,body:body.body.trim(),provider_id:result.id});
 await db.from("enquiries").update({status:"contacted"}).eq("id",e.id);
 return NextResponse.json({ok:true,warning:error?"Email sent, but history couldn’t be saved. Don’t send it again.":null});
 }catch{return NextResponse.json({error:"Sending could not be confirmed. Check your email provider’s sent log before retrying."},{status:502});}
}
