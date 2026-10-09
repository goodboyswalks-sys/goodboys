export function dayKey(value) { const d=new Date(value);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
export function overview(enquiries, clients, walks, now=new Date()) {
 const today=dayKey(now);const month=today.slice(0,7);
 const completed=walks.filter(w=>w.status==='completed'&&dayKey(w.starts_at).slice(0,7)===month);
 return {newEnquiries:enquiries.filter(e=>e.status==='new').length,activeClients:clients.filter(c=>c.active).length,today:walks.filter(w=>dayKey(w.starts_at)===today&&w.status!=='cancelled').sort((a,b)=>new Date(a.starts_at)-new Date(b.starts_at)),completed:completed.length,earned:completed.reduce((s,w)=>s+Number(w.fee),0),unpaid:walks.filter(w=>w.status==='completed'&&!w.paid).reduce((s,w)=>s+Number(w.fee),0)};
}
