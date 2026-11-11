import hero from "@/assets/hero.jpg";
import festival from "@/assets/festival.jpg";
import comedy from "@/assets/comedy.jpg";
import sports from "@/assets/sports.jpg";

export type Tier = { name: string; price: number; perks: string };
export type EventItem = {
  id: string; title: string; category: "Music" | "Festival" | "Comedy" | "Sports";
  date: string; time: string; venue: string; city: string; image: string;
  description: string; tiers: Tier[]; featured?: boolean;
};

export const categories = ["All", "Music", "Festival", "Comedy", "Sports"] as const;

export const events: EventItem[] = [
  { id: "lusaka-live", title: "Lusaka Live Concert", category: "Music", date: "2026-12-05", time: "18:00", venue: "Heroes Stadium", city: "Lusaka", image: hero, featured: true,
    description: "The biggest night of Zambian music returns with headline acts, live bands and a stage show you won't forget.",
    tiers: [{ name: "General", price: 250, perks: "Standing access" }, { name: "VIP", price: 750, perks: "Front zone + lounge" }, { name: "VVIP", price: 1500, perks: "Backstage + drinks" }] },
  { id: "sunset-fest", title: "Sunset Sounds Festival", category: "Festival", date: "2026-12-19", time: "14:00", venue: "Kalimba Farm", city: "Lusaka", image: festival, featured: true,
    description: "A full day of afro-beats, food trucks, art and sunsets under the open Zambian sky.",
    tiers: [{ name: "Day Pass", price: 350, perks: "All stages" }, { name: "VIP", price: 900, perks: "Shaded deck + bar" }] },
  { id: "laugh-out", title: "Laugh Out Loud Comedy Night", category: "Comedy", date: "2026-11-28", time: "19:30", venue: "Taj Pamodzi Hall", city: "Lusaka", image: comedy,
    description: "Zambia's funniest comedians take the mic for a night of non-stop laughter.",
    tiers: [{ name: "Standard", price: 200, perks: "Reserved seating" }, { name: "Table of 6", price: 1100, perks: "Front table + snacks" }] },
  { id: "chipolopolo", title: "Chipolopolo vs. Rivals", category: "Sports", date: "2027-01-10", time: "15:00", venue: "Levy Mwanawasa Stadium", city: "Ndola", image: sports, featured: true,
    description: "Cheer on the national team in this electric international friendly.",
    tiers: [{ name: "Terraces", price: 50, perks: "Open stands" }, { name: "Grand Stand", price: 200, perks: "Covered seats" }, { name: "VIP Box", price: 800, perks: "Hospitality suite" }] },
  { id: "jazz-copperbelt", title: "Copperbelt Jazz Evening", category: "Music", date: "2026-12-12", time: "19:00", venue: "Copperbelt Arts Centre", city: "Kitwe", image: hero,
    description: "Smooth jazz, fine dining and soulful vocals in an intimate setting.",
    tiers: [{ name: "Standard", price: 300, perks: "Seating" }, { name: "Dinner", price: 650, perks: "3-course meal" }] },
  { id: "vic-falls-fest", title: "Victoria Falls Carnival", category: "Festival", date: "2027-02-14", time: "12:00", venue: "Mosi-oa-Tunya Grounds", city: "Livingstone", image: festival,
    description: "Parades, dance troupes and DJs beside one of the world's natural wonders.",
    tiers: [{ name: "Weekend", price: 500, perks: "2 days" }, { name: "VIP Weekend", price: 1200, perks: "Lounge + shuttle" }] },
];

export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
export const minPrice = (e: EventItem) => Math.min(...e.tiers.map((t) => t.price));
