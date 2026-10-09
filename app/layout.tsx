import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Goodboys — Good walks. Great dogs.", description: "Personal dog walking and home visits. Find your dog's next favourite adventure with Goodboys.", metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"), openGraph: { title: "Goodboys — Good walks. Great dogs.", description: "Fresh air. New friends. Happy dogs.", images: ["/images/hero.jpg"] } };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
