"use client";
import { useState } from "react";
import SiteIcon from "@/components/SiteIcon";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="website-header">
    <a href="#" aria-label="Goodboys home" onClick={() => setOpen(false)}><img className="logo" src="/images/refresh/wordmark.webp" width={2048} height={682} alt="Goodboys" /></a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="website-nav" onClick={() => setOpen(!open)}>{open ? "Close ×" : "Menu ☰"}</button>
    <nav id="website-nav" className={open ? "site-nav is-open" : "site-nav"} aria-label="Main navigation">
      <a href="#walks" onClick={() => setOpen(false)}><SiteIcon name="walk"/>The Walks</a>
      <a href="#meet-joe" onClick={() => setOpen(false)}><SiteIcon name="meet"/>Meet Joe</a>
      <a href="#faq" onClick={() => setOpen(false)}><SiteIcon name="faq"/>FAQs</a>
      <a className="nav-enquiry" href="#join" onClick={() => setOpen(false)}><SiteIcon name="enquire"/>Enquire About Your Dog</a>
    </nav>
    <a className="header-badge" href="#meet-joe" aria-label="Meet the Goodboys walking buddy"><img src="/images/refresh/dog-badge.webp" width={1254} height={1254} alt=""/></a>
  </header>;
}
