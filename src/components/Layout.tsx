import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Ticket } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/organizers", label: "Organizers" },
  { to: "/contact", label: "Contact" },
] as const;

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent"}`}>
        <div className="container-x flex h-18 items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl font-extrabold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-primary-foreground animate-wiggle"><Ticket size={18} /></span>
            Tiketi<span className="text-primary">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
                className="nav-link" activeProps={{ className: "nav-link nav-link-active" }}>{n.label}</Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Link to="/events" className="btn-primary">Get Tickets</Link>
          </div>
          <button aria-label="Menu" className="md:hidden p-2" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-up">
            <div className="container-x flex flex-col py-4 gap-1">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-lg font-semibold hover:bg-secondary">{n.label}</Link>
              ))}
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border mt-24">
        <div className="container-x grid gap-10 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-2xl font-extrabold">Tiketi<span className="text-primary">.</span></p>
            <p className="mt-3 max-w-sm text-muted-foreground">Zambia's home for concerts, festivals, comedy and sport. Book in seconds, pay with mobile money or card.</p>
          </div>
          <div><p className="font-semibold mb-3">Explore</p>
            {nav.map((n) => <Link key={n.to} to={n.to} className="block py-1 text-muted-foreground hover:text-primary">{n.label}</Link>)}</div>
          <div><p className="font-semibold mb-3">Payments</p>
            <p className="text-muted-foreground">Airtel Money · MTN MoMo · Zamtel Kwacha · Visa · Mastercard</p></div>
        </div>
        <p className="container-x pb-8 text-sm text-muted-foreground">© 2026 Tiketi Zambia. All rights reserved.</p>
      </footer>
    </div>
  );
}
