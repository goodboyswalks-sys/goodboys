export const site = {
  name: "Goodboys",
  area: "Cardiff & the Vale of Glamorgan",
  phone: "07594 400581",
  phoneHref: "+447594400581",
  hours: "Monday–Friday, 6am–8pm. Closed weekends.",
  coverage: ["Lisvane", "Cyncoed", "Radyr", "Llandaff", "Pontcanna", "Penylan", "Rhiwbina", "Penarth", "Dinas Powys", "Sully", "Cowbridge"],
  email: "", // Add your real contact email
  owner: "Your name", // Replace before launch
  intro: "Goodboys is a new dog-walking business, built around a simple idea: dogs deserve a good day out. We’re welcoming enquiries for our first walking routines, with time to get to know each dog and what suits them. Tell us about your best friend, and let’s talk about a good day together.",
  services: [
    { id: "group", name: "The good gang", type: "Small group walks", duration: "60 minutes", price: "Ask for a quote", description: "A little company. A lot of exploring. A walk with compatible pals, paced around the dogs in the group.", image: "friends.jpg" },
    { id: "solo", name: "Main character energy", type: "Solo walks", duration: "30 or 60 minutes", price: "Ask for a quote", description: "All the attention, at their own pace. One-to-one time for dogs who prefer a quieter adventure.", image: "hero.jpg" },
    { id: "visit", name: "A little check-in", type: "Home visits", duration: "30 minutes", price: "Ask for a quote", description: "A friendly face to break up the day. A toilet break, fresh water and a little company at home.", image: "ride.jpg" }
  ]
};
export function asset(name: string) {
  const base = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.replace(/\/$/, "");
  return base ? `${base}/${name}` : `/images/${name}`;
}
