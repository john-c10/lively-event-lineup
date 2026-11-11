import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Layout } from "@/components/Layout";
import { EventCard } from "@/components/EventCard";
import { events, categories } from "@/data/events";

type S = { q?: string; cat?: string };
export const Route = createFileRoute("/events")({
  validateSearch: (s: Record<string, unknown>): S => ({ q: typeof s.q === "string" ? s.q : "", cat: typeof s.cat === "string" ? s.cat : "All" }),
  head: () => ({ meta: [
    { title: "All Events — Tiketi Zambia" },
    { name: "description", content: "Browse upcoming concerts, festivals, comedy shows and sports events in Zambia." },
    { property: "og:title", content: "All Events — Tiketi Zambia" },
    { property: "og:description", content: "Browse upcoming events across Zambia." },
  ] }),
  component: EventsPage,
});

function EventsPage() {
  const matches = useMatches();
  if (matches.some((m) => m.routeId === "/events/$id")) return <Outlet />;
  return <EventsList />;
}

function EventsList() {
  const { q = "", cat = "All" } = Route.useSearch();
  const nav = Route.useNavigate();
  const list = events.filter((e) => (cat === "All" || e.category === cat) &&
    `${e.title} ${e.venue} ${e.city}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <Layout>
      <section className="container-x pt-32">
        <p className="eyebrow animate-fade-up">Discover</p>
        <h1 className="section-title animate-fade-up">Upcoming events</h1>
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => nav({ search: { q, cat: c } })} className={`pill ${cat === c ? "pill-active" : ""}`}>{c}</button>
            ))}
          </div>
          <label className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 md:w-80">
            <Search size={18} className="text-muted-foreground" />
            <input value={q} onChange={(e) => nav({ search: { q: e.target.value, cat }, replace: true })} placeholder="Search…" className="w-full bg-transparent py-3 outline-none" />
          </label>
        </div>
        <div key={cat + q} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e, i) => <EventCard key={e.id} e={e} i={i} />)}
        </div>
        {list.length === 0 && <p className="mt-16 text-center text-muted-foreground">No events match your search.</p>}
      </section>
    </Layout>
  );
}
