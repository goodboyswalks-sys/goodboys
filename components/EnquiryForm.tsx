"use client";
import { useState } from "react";
import { site } from "@/lib/site";
export default function EnquiryForm() {
 const [state,setState]=useState<"idle"|"sending"|"success"|"error">("idle");
 const [message,setMessage]=useState("");
 async function submit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault(); const form=e.currentTarget; setState("sending");
  try { const data=Object.fromEntries(new FormData(form)); const response=await fetch("/api/enquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}); const result=await response.json(); if(!response.ok) throw new Error(result.error || "We couldn’t send your request. Please try again."); setState("success"); form.reset(); }
  catch(e){setState("error");setMessage(e instanceof Error?e.message:"Please try again.");}
 }
 return <form onSubmit={submit} className="enquiry">
 <div className="form-grid"><label>Your name<input name="name" autoComplete="name" required maxLength={100}/></label><label>Email<input name="email" type="email" autoComplete="email" required maxLength={254}/></label><label>Dog’s name<input name="dog" required maxLength={100}/></label><label>Postcode / ZIP<input name="postcode" autoComplete="postal-code" required maxLength={20}/></label></div>
 <label>What are you looking for?<select name="service" required defaultValue=""><option value="" disabled>Choose a service</option>{site.services.map(s=><option key={s.id} value={s.id}>{s.type}</option>)}</select></label>
 <label>A little about your dog<textarea name="notes" rows={3} maxLength={2000} placeholder="Their personality, preferred days, and anything we should know."/></label>
 <div className="trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 <label className="consent"><input name="consent" type="checkbox" value="yes" required/>I agree to Goodboys using these details to reply to my enquiry. <a href="/privacy">Privacy notice</a></label>
 <button className="button" disabled={state==="sending"}>{state==="sending"?"Sending…":"Let’s meet your dog ↗"}</button>
 <p role="status" aria-live="polite">{state==="success"?"You’re on the list! Your enquiry has been received. This is a request, not a confirmed booking.":state==="error"?message:"No commitment. Just the start of a good thing."}</p>
 </form>;
}
