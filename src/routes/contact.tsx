import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact — Tiketi Zambia" },
    { name: "description", content: "Get in touch with the Tiketi team for support or to list your event." },
    { property: "og:title", content: "Contact — Tiketi Zambia" },
    { property: "og:description", content: "Questions? We're here to help." },
  ] }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <section className="container-x pt-36 grid gap-12 lg:grid-cols-2">
        <div className="animate-fade-up">
          <p className="eyebrow">Contact</p>
          <h1 className="section-title">Let's talk.</h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">Need help with a ticket or want to list your event? Reach out.</p>
          <div className="mt-8 space-y-4">
            {[{ i: Mail, v: "hello@tiketi.co.zm" }, { i: Phone, v: "+260 97 000 0000" }, { i: MapPin, v: "Cairo Road, Lusaka" }].map(({ i: I, v }) => (
              <p key={v} className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary"><I size={18} /></span>{v}</p>
            ))}
          </div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="feature space-y-4 animate-fade-up">
          {sent ? <p className="py-16 text-center font-display text-2xl font-bold animate-pop">Thanks! We'll be in touch. 🙌</p> : (<>
            <input required placeholder="Your name" className="field" />
            <input required type="email" placeholder="Email" className="field" />
            <textarea required rows={5} placeholder="Message" className="field" />
            <button className="btn-primary w-full justify-center">Send message</button>
          </>)}
        </form>
      </section>
    </Layout>
  );
}
