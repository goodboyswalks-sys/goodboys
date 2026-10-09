"use client";
import { useState } from "react";
import type { Enquiry, Client, Walk } from "@/lib/os-types";
import { dayKey } from "@/lib/os-data.mjs";
const money = (amount: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: process.env.NEXT_PUBLIC_BUSINESS_CURRENCY || "GBP" }).format(amount);
const total = (items: Walk[]) => items.reduce((sum, walk) => sum + Number(walk.fee), 0);
const monthLabel = (key: string) => new Date(`${key}-01T12:00:00`).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
export default function Analytics({ enquiries, clients, walks }: { enquiries: Enquiry[]; clients: Client[]; walks: Walk[] }) {
  const [month, setMonth] = useState(dayKey(new Date()).slice(0, 7));
  const monthWalks = walks.filter(w => dayKey(w.starts_at).slice(0, 7) === month);
  const completed = monthWalks.filter(w => w.status === "completed");
  const paid = completed.filter(w => w.paid);
  const unpaid = completed.filter(w => !w.paid);
  const scheduled = monthWalks.filter(w => w.status === "scheduled");
  const leads = enquiries.filter(e => dayKey(e.created_at).slice(0, 7) === month);
  const converted = leads.filter(e => e.client_id);
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(`${month}-01T12:00:00`); date.setMonth(date.getMonth() - 5 + i);
    const key = dayKey(date).slice(0, 7);
    const done = walks.filter(w => w.status === "completed" && dayKey(w.starts_at).slice(0, 7) === key);
    return { key, done, leads: enquiries.filter(e => dayKey(e.created_at).slice(0, 7) === key).length };
  });
  return <div className="os-analytics">
    <div className="os-toolbar"><label>Review month<input type="month" value={month} onChange={e => { if (e.target.value) setMonth(e.target.value); }} /></label></div>
    <div className="os-metrics">{[[money(total(completed)), "Completed booking fees"], [money(total(paid)), "Paid completed fees"], [money(total(unpaid)), "Unpaid completed fees"], [leads.length, "Enquiries received"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    <div className="os-columns">
      <section className="os-panel"><h2>Bookings · {monthLabel(month)}</h2><dl className="os-stat-list">
        <div><dt>Completed bookings</dt><dd>{completed.length}</dd></div>
        <div><dt>Scheduled bookings</dt><dd>{scheduled.length}</dd></div>
        <div><dt>Scheduled fees</dt><dd>{money(total(scheduled))}</dd></div>
        <div><dt>Cancelled bookings</dt><dd>{monthWalks.filter(w => w.status === "cancelled").length}</dd></div>
        <div><dt>Group walks completed</dt><dd>{completed.filter(w => w.service === "group").length}</dd></div>
        <div><dt>Home visits completed</dt><dd>{completed.filter(w => w.service === "visit").length}</dd></div>
      </dl><p className="os-muted">Each booking represents one dog. Cancelled bookings are excluded from fee totals.</p></section>
      <section className="os-panel"><h2>Enquiries &amp; clients</h2><dl className="os-stat-list">
        <div><dt>New enquiries this month</dt><dd>{leads.filter(e => e.status === "new").length}</dd></div>
        <div><dt>Contacted this month's enquiries</dt><dd>{leads.filter(e => e.status === "contacted").length}</dd></div>
        <div><dt>Added to clients</dt><dd>{converted.length}</dd></div>
        <div><dt>Enquiry conversion</dt><dd>{leads.length ? `${Math.round(converted.length / leads.length * 100)}%` : "—"}</dd></div>
        <div><dt>Active clients now</dt><dd>{clients.filter(c => c.active).length}</dd></div>
      </dl><p className="os-muted">Conversion uses enquiries received in the selected month and whether they have been added to clients. Active clients is your current total.</p></section>
    </div>
    <section className="os-panel"><h2>Six-month overview</h2><div className="os-table-scroll" tabIndex={0} role="region" aria-label="Six-month business totals, scroll horizontally on smaller screens"><table className="os-analytics-table"><thead><tr><th scope="col">Month</th><th scope="col">Enquiries</th><th scope="col">Completed</th><th scope="col">Fees</th><th scope="col">Paid fees</th></tr></thead><tbody>{months.map(({ key, done, leads }) => <tr key={key}><th scope="row">{monthLabel(key)}</th><td>{leads}</td><td>{done.length}</td><td>{money(total(done))}</td><td>{money(total(done.filter(w => w.paid)))}</td></tr>)}</tbody></table></div></section>
    <p className="os-muted">Figures come from your saved enquiries and booking records. Fees are attributed to the booking month; payment dates, expenses and website visitor counts are not tracked here.</p>
  </div>;
}
