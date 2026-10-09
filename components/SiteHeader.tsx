"use client";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="website-header">
    <a href="#" aria-label="Goodboys home" onClick={() => setOpen(false)}><img className="logo" src="/images/logo.png" alt="Goodboys" /></a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="website-nav" onClick={() => setOpen(!open)}>{open ? "Close ×" : "Menu ☰"}</button>
    <nav id="website-nav" className={open ? "site-nav is-open" : "site-nav"} aria-label="Main navigation">
      <a href="#walks" onClick={() => setOpen(false)}>The walks</a>
      <a href="#meet-joe" onClick={() => setOpen(false)}>Meet Joe</a>
      <a href="#faq" onClick={() => setOpen(false)}>FAQs</a>
      <a className="mobile-nav-enquiry" href="#join" onClick={() => setOpen(false)}>Enquire about your dog ↗</a>
    </nav>
    <a className="button small header-enquiry" href="#join">Join the gang ↗</a>
  </header>;
}
