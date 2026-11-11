import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Smartphone, ShieldCheck, Zap, ArrowRight, Music, PartyPopper, Laugh, Trophy } from "lucide-react";
import { Layout } from "@/components/Layout";
import { EventCard } from "@/components/EventCard";
import { events } from "@/data/events";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Tiketi — Event Tickets in Zambia" },
    { name: "description", content: "Discover and book tickets for concerts, festivals, comedy and sports across Zambia." },
    { property: "og:title", content: "Tiketi — Event Tickets in Zambia" },
    { property: "og:description", content: "Discover and book tickets for the best events in Zambia." },
  ] }),
  component: Index,
});

const cats = [
  { name: "Music", icon: Music }, { name: "Festival", icon: PartyPopper },
  { name: "Comedy", icon: Laugh }, { name: "Sports", icon: Trophy },
];

function Index() {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  return (
    <Layout>
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img src={hero} alt="Concert crowd in Lusaka" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover animate-slow-zoom" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="blob left-[-10%] top-1/4" />
        <div className="container-x relative pt-28 pb-16">
          <span className="chip animate-fade-up">🇿🇲 Zambia's #1 ticket marketplace</span>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[0.95] sm:text-7xl lg:text-8xl animate-fade-up [animation-delay:100ms]">
            Live the <span className="text-gradient">moment.</span><br />Skip the queue.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground animate-fade-up [animation-delay:200ms]">Concerts, festivals, comedy and football — book in seconds with mobile money.</p>
          <form onSubmit={(e) => { e.preventDefault(); nav({ to: "/events", search: { q, cat: "All" } }); }}
            className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-border bg-card/70 p-2 backdrop-blur-xl animate-fade-up [animation-delay:300ms]">
            <Search className="ml-3 text-muted-foreground" size={20} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events, artists, venues…" className="flex-1 bg-transparent px-2 py-3 outline-none placeholder:text-muted-foreground" />
            <button className="btn-primary">Search</button>
          </form>
        </div>
      </section>

      <div className="border-y border-border bg-secondary/40 overflow-hidden py-4">
        <div className="marquee font-display text-2xl font-bold text-muted-foreground">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 gap-12 pr-12">
              {["Lusaka", "Ndola", "Kitwe", "Livingstone", "Kabwe", "Chipata", "Solwezi", "Kasama"].map((c) => <span key={c}>{c} <span className="text-primary">✦</span></span>)}
            </div>
          ))}
        </div>
      </div>

      <section className="container-x mt-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {cats.map(({ name, icon: Icon }, i) => (
            <Link key={name} to="/events" search={{ q: "", cat: name }} className="cat-tile reveal" style={{ animationDelay: `${i * 80}ms` }}>
              <Icon size={28} className="text-primary transition-transform group-hover:scale-125" />
              <span className="mt-4 font-display text-xl font-bold">{name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x mt-24">
        <div className="flex items-end justify-between gap-4">
          <div><p className="eyebrow">Trending now</p><h2 className="section-title">Featured events</h2></div>
          <Link to="/events" search={{ q: "", cat: "All" }} className="hidden sm:flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all">View all <ArrowRight size={18} /></Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.filter((e) => e.featured).map((e, i) => <EventCard key={e.id} e={e} i={i} />)}
        </div>
      </section>

      <section className="container-x mt-24 grid gap-6 md:grid-cols-3">
        {[{ icon: Zap, t: "Instant e-tickets", d: "QR tickets delivered to your phone and email in seconds." },
          { icon: Smartphone, t: "Mobile money", d: "Pay with Airtel, MTN, Zamtel or any card." },
          { icon: ShieldCheck, t: "100% secure", d: "Verified organizers and fraud-proof scanning at the gate." }].map(({ icon: Icon, t, d }, i) => (
          <div key={t} className="feature reveal" style={{ animationDelay: `${i * 100}ms` }}>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary"><Icon /></span>
            <h3 className="mt-5 font-display text-xl font-bold">{t}</h3>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <section className="container-x mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-10 md:p-16 text-primary-foreground">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-background/10 animate-float" />
          <h2 className="relative font-display text-4xl font-extrabold md:text-5xl max-w-2xl">Hosting an event? Sell out faster.</h2>
          <p className="relative mt-4 max-w-lg opacity-90">Create your event page, sell tickets and track sales in real time.</p>
          <Link to="/organizers" className="relative mt-8 inline-flex btn-dark">Start selling <ArrowRight size={18} /></Link>
        </div>
      </section>
    </Layout>
  );
}
