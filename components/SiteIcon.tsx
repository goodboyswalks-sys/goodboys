type IconName = "walk" | "meet" | "faq" | "enquire" | "shield" | "id";
const paths: Record<IconName, React.ReactNode> = {
 walk: <><path d="m4 18 5-5 4 3 7-10M15 6h5v5"/><path d="M4 7h4M6 5v4"/></>,
 meet: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2"/></>,
 faq: <><path d="M21 11a9 9 0 0 1-9 9H4l-2 2v-11a9 9 0 0 1 19 0Z"/><path d="M9 8a3 3 0 0 1 6 0c0 2-3 2-3 4M12 16h.01"/></>,
 enquire: <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/></>,
 shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/></>,
 id: <><rect x="3" y="5" width="18" height="15" rx="3"/><circle cx="9" cy="11" r="2"/><path d="M6 17a3 3 0 0 1 6 0M15 10h3M15 14h3M9 3v3M15 3v3"/></>,
};
export default function SiteIcon({name}: {name: IconName}) {
 return <svg className="site-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}
