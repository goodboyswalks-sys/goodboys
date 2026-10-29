export const site = {
  name: "Goodboys",
  area: "Cardiff & the Vale of Glamorgan",
  phone: "07594 400581",
  phoneHref: "+447594400581",
  hours: "Monday–Friday, 6am–8pm. Closed weekends.",
  coverage: ["Lisvane", "Cyncoed", "Radyr", "Llandaff", "Pontcanna", "Penylan", "Rhiwbina", "Penarth", "Dinas Powys", "Sully", "Cowbridge"],
  email: "", // Add your real contact email
  owner: "Your name", // Replace before launch
  intro: "Goodboys is built around a simple idea: dogs deserve a good day out. Fresh air, time to sniff and care that fits their personality. Tell us about your dog and we’ll find the right routine together.",
  // Set to true only after the business owner confirms the current cover/check.
  trust: { fullyInsured: false, dbsChecked: false },
  services: [
    { id: "group", name: "The Good Gang", type: "Small group walks", duration: "60 minutes", price: "Ask for a quote", description: "A little company. A lot of exploring. A walk with compatible pals, paced around the dogs in the group.", image: "good-gang" },
    { id: "visit", name: "A Little Check In", type: "Home visits", duration: "30 minutes", price: "Ask for a quote", description: "A friendly face to break up the day. A toilet break, fresh water and a little company at home.", image: "check-in" }
  ]
};
export function asset(name: string) {
  const base = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.replace(/\/$/, "");
  return base ? `${base}/${name}` : `/images/${name}`;
}
