import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, QrCode, Wallet, Megaphone } from "lucide-react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/organizers")({
  head: () => ({ meta: [
    { title: "Sell Tickets — Tiketi for Organizers" },
    { name: "description", content: "Create events, sell tickets with mobile money and scan guests at the gate." },
    { property: "og:title", content: "Sell Tickets — Tiketi for Organizers" },
    { property: "og:description", content: "Everything you need to sell out your event in Zambia." },
  ] }),
  component: Org,
});

const steps = [
  { i: Megaphone, t: "Create your event", d: "Set up a beautiful event page in minutes." },
  { i: Wallet, t: "Get paid fast", d: "Mobile money and card payouts straight to you." },
  { i: QrCode, t: "Scan at the gate", d: "Free scanner app checks every QR ticket." },
  { i: BarChart3, t: "Track sales live", d: "Real-time dashboard of tickets and revenue." },
];

function Org() {
  return (
    <Layout>
      <section className="container-x pt-36 text-center">
        <p className="eyebrow animate-fade-up">For organizers</p>
        <h1 className="mx-auto max-w-3xl font-display text-5xl font-extrabold sm:text-6xl animate-fade-up">Sell out your next event with <span className="text-gradient">Tiketi</span></h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground animate-fade-up">Low fees, fast payouts and tools built for Zambian events.</p>
        <Link to="/contact" className="btn-primary mt-8 inline-flex animate-fade-up">Talk to us</Link>
      </section>
      <section className="container-x mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ i: I, t, d }, k) => (
          <div key={t} className="feature reveal" style={{ animationDelay: `${k * 100}ms` }}>
            <span className="font-display text-5xl font-extrabold text-primary/30">0{k + 1}</span>
            <I className="mt-4 text-primary" />
            <h3 className="mt-3 font-display text-xl font-bold">{t}</h3>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <section className="container-x mt-20 grid gap-6 text-center sm:grid-cols-3">
        {[["500+", "Events hosted"], ["120K", "Tickets sold"], ["24h", "Payout time"]].map(([n, l]) => (
          <div key={l} className="feature"><p className="font-display text-5xl font-extrabold text-gradient">{n}</p><p className="mt-2 text-muted-foreground">{l}</p></div>
        ))}
      </section>
    </Layout>
  );
}
