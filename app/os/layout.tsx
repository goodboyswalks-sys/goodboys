import type { Viewport } from "next";
import "./os.css";
export const viewport: Viewport={width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#395442"};
export default function Layout({children}:{children:React.ReactNode}){return children;}
