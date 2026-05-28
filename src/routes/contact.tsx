import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { PHONE, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/catalogue";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MKG Kabel" },
      { name: "description", content: "Contact MKG Kabel for cable orders, bulk pricing, and availability. Lagos, Nigeria." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <section className="bg-[color:var(--brand-black)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--brand-red)]">Contact</div>
          <h1 className="mt-2 font-display font-black text-4xl md:text-6xl uppercase">Get in touch</h1>
          <p className="mt-4 text-white/70 max-w-xl">
            Call or WhatsApp us for product availability, technical specs, and bulk order pricing.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-6">
          <a href={`tel:${PHONE}`} className="group bg-[color:var(--brand-black)] text-white p-8 hover:bg-[color:var(--brand-red)] transition-colors">
            <Phone size={32} className="text-[color:var(--brand-red)] group-hover:text-white" />
            <h2 className="mt-4 font-display font-bold text-xs uppercase tracking-widest text-white/60 group-hover:text-white/80">Call to Order</h2>
            <div className="mt-1 font-display font-black text-2xl md:text-3xl">{PHONE_DISPLAY}</div>
            <p className="mt-2 text-sm text-white/70 group-hover:text-white/90">Tap to dial — Mon–Sat, 8am–6pm</p>
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="group bg-[color:var(--brand-red)] text-white p-8 hover:bg-[color:var(--brand-red-dark)] transition-colors">
            <MessageCircle size={32} />
            <h2 className="mt-4 font-display font-bold text-xs uppercase tracking-widest text-white/80">WhatsApp</h2>
            <div className="mt-1 font-display font-black text-2xl md:text-3xl">Chat with us</div>
            <p className="mt-2 text-sm text-white/90">Quick replies for quotes & availability</p>
          </a>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16 grid sm:grid-cols-2 gap-4">
          <div className="border border-border p-6">
            <MapPin className="text-[color:var(--brand-red)]" size={22} />
            <h3 className="mt-3 font-display font-bold uppercase">Location</h3>
            <p className="text-sm text-muted-foreground mt-1">Lagos, Nigeria — serving contractors nationwide.</p>
          </div>
          <div className="border border-border p-6">
            <Clock className="text-[color:var(--brand-red)]" size={22} />
            <h3 className="mt-3 font-display font-bold uppercase">Hours</h3>
            <p className="text-sm text-muted-foreground mt-1">Mon–Fri: 8:00 – 18:00 · Sat: 9:00 – 15:00</p>
          </div>
        </div>
      </section>
    </>
  );
}
