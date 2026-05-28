import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Ship, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MKG Kabel" },
      { name: "description", content: "MKG Kabel is a professional electrical cable supplier in Lagos serving contractors and developers across Nigeria." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="bg-[color:var(--brand-black)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--brand-red)]">About</div>
          <h1 className="mt-2 font-display font-black text-4xl md:text-6xl uppercase max-w-3xl leading-[0.95]">
            Built for <span className="text-[color:var(--brand-red)]">professionals.</span>
          </h1>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-6 text-base md:text-lg leading-relaxed">
          <p>
            <strong>MKG Kabel</strong> is a professional electrical cable supplier serving contractors, electricians, and developers across Nigeria. From small residential jobs to large commercial projects, we provide the cables and accessories the country's tradespeople rely on every day.
          </p>
          <p>
            Our products are imported directly from <strong>Turkey</strong>, a recognised global hub for high-quality cable manufacturing. This direct supply chain ensures every cable, conduit and accessory we stock meets international quality standards — and reaches our customers at competitive bulk pricing.
          </p>
          <p>
            Based in <strong>Lagos</strong>, we work with site teams, project managers, and bulk buyers nationwide. We don't sell hype — we sell dependable materials, with the technical specs you need to make confident decisions.
          </p>
          <div className="border-l-4 border-[color:var(--brand-red)] pl-5 my-8 bg-muted py-5">
            <h3 className="font-display font-bold uppercase tracking-wider text-sm">Sister Brand — Silver Gate</h3>
            <p className="mt-2 text-base">
              Looking for lighting fixtures and electrical fittings? Visit our sister brand{" "}
              <a href="#" className="font-bold text-[color:var(--brand-red)] underline">Silver Gate</a> for a full range of complementary products.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid sm:grid-cols-3 gap-6">
          {[
            { icon: MapPin, t: "Based in Lagos", d: "Serving contractors across Nigeria" },
            { icon: Ship, t: "Direct from Turkey", d: "International quality standards" },
            { icon: Users, t: "B2B Focused", d: "Bulk orders & trade pricing" },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="bg-white p-6 border border-border">
              <div className="bg-[color:var(--brand-black)] text-[color:var(--brand-red)] w-12 h-12 flex items-center justify-center">
                <Icon size={22} />
              </div>
              <h3 className="mt-4 font-display font-bold text-xl uppercase">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 text-center">
          <Link to="/products" className="inline-block bg-[color:var(--brand-red)] hover:bg-[color:var(--brand-red-dark)] text-white px-8 py-4 font-bold uppercase tracking-wider text-sm">
            Browse Catalogue
          </Link>
        </div>
      </section>
    </>
  );
}
