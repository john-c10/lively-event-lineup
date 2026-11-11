import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin, Clock, Minus, Plus, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { events, formatDate } from "@/data/events";

export const Route = createFileRoute("/events/$id")({
  loader: ({ params }) => { const e = events.find((x) => x.id === params.id); if (!e) throw notFound(); return e; },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `${loaderData.title} — Tiketi` : "Event — Tiketi" },
    { name: "description", content: loaderData?.description ?? "Event details" },
    { property: "og:title", content: loaderData?.title ?? "Event" },
    { property: "og:description", content: loaderData?.description ?? "Event details" },
  ] }),
  component: Detail,
});

function Detail() {
  const e = Route.useLoaderData();
  const [qty, setQty] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const total = e.tiers.reduce((s, t) => s + (qty[t.name] ?? 0) * t.price, 0);
  const count = Object.values(qty).reduce((a, b) => a + b, 0);
  const set = (n: string, d: number) => setQty((q) => ({ ...q, [n]: Math.max(0, Math.min(10, (q[n] ?? 0) + d)) }));
  return (
    <Layout>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={e.image} alt={e.title} className="absolute inset-0 h-full w-full object-cover animate-slow-zoom" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container-x relative flex h-full flex-col justify-end pb-12">
          <Link to="/events" search={{ q: "", cat: "All" }} className="mb-6 inline-flex w-fit items-center gap-2 text-muted-foreground hover:text-primary"><ArrowLeft size={16} /> All events</Link>
          <span className="chip w-fit animate-fade-up">{e.category}</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-6xl animate-fade-up">{e.title}</h1>
        </div>
      </section>
      <section className="container-x mt-12 grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="animate-fade-up">
          <div className="grid gap-4 sm:grid-cols-3">
            {[{ i: Calendar, v: formatDate(e.date) }, { i: Clock, v: e.time }, { i: MapPin, v: `${e.venue}, ${e.city}` }].map(({ i: I, v }) => (
              <div key={v} className="feature !p-5 flex items-center gap-3"><I className="text-primary shrink-0" size={20} /><span className="font-medium">{v}</span></div>
            ))}
          </div>
          <h2 className="mt-10 font-display text-2xl font-bold">About this event</h2>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{e.description}</p>
        </div>
        <aside className="feature h-fit lg:sticky lg:top-24 animate-fade-up">
          {done ? (
            <div className="py-8 text-center">
              <CheckCircle2 size={56} className="mx-auto text-primary animate-pop" />
              <h3 className="mt-4 font-display text-2xl font-bold">You're going! 🎉</h3>
              <p className="mt-2 text-muted-foreground">{count} ticket(s) reserved. This is a demo — no payment taken.</p>
              <button onClick={() => { setDone(false); setQty({}); }} className="btn-primary mt-6">Book more</button>
            </div>
          ) : (<>
            <h3 className="font-display text-2xl font-bold">Select tickets</h3>
            <div className="mt-5 space-y-3">
              {e.tiers.map((t) => (
                <div key={t.name} className="flex items-center justify-between rounded-xl border border-border p-4 transition-colors hover:border-primary">
                  <div><p className="font-semibold">{t.name}</p><p className="text-sm text-muted-foreground">{t.perks}</p><p className="mt-1 font-bold text-primary">K{t.price}</p></div>
                  <div className="flex items-center gap-3">
                    <button aria-label="Less" onClick={() => set(t.name, -1)} className="qty-btn"><Minus size={14} /></button>
                    <span className="w-5 text-center font-bold">{qty[t.name] ?? 0}</span>
                    <button aria-label="More" onClick={() => set(t.name, 1)} className="qty-btn"><Plus size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
              <span className="text-muted-foreground">Total</span>
              <span key={total} className="font-display text-3xl font-extrabold animate-pop">K{total}</span>
            </div>
            <button disabled={!count} onClick={() => setDone(true)} className="btn-primary mt-5 w-full justify-center disabled:opacity-40 disabled:pointer-events-none">Checkout</button>
          </>)}
        </aside>
      </section>
    </Layout>
  );
}
