import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Factory, Package, ShieldCheck } from "lucide-react";
import { CATEGORIES } from "@/lib/catalogue";
import { CategoryIcon } from "@/components/CategoryIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MKG Kabel — Premium Cables & Conduit, Lagos" },
      { name: "description", content: "Premium cables & conduit solutions. Trusted by contractors across Nigeria. Made in Turkey." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[color:var(--brand-black)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0 1px, transparent 1px 18px)" }} />
        <div className="absolute top-0 right-0 w-2/5 h-full bg-[color:var(--brand-red)] opacity-20 [clip-path:polygon(40%_0,100%_0,100%_100%,0%_100%)] hidden md:block" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 bg-[color:var(--brand-red)]" /> Lagos · Nigeria
            </div>
            <h1 className="mt-6 font-display font-black text-5xl sm:text-6xl md:text-7xl leading-[0.95] uppercase">
              Premium Cables<br />
              <span className="text-[color:var(--brand-red)]">&</span> Conduit Solutions
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/70 max-w-xl">
              Trusted by contractors and electricians across Nigeria — made in Turkey to international standards.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-[color:var(--brand-red)] hover:bg-[color:var(--brand-red-dark)] text-white px-6 py-3.5 font-bold uppercase tracking-wider text-sm"
              >
                View Our Catalogue <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white px-6 py-3.5 font-bold uppercase tracking-wider text-sm"
              >
                <Phone size={16} /> Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Factory, label: "Made in Turkey" },
            { icon: Package, label: "Bulk Orders Welcome" },
            { icon: ShieldCheck, label: "Trusted by Professionals" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="bg-[color:var(--brand-black)] text-[color:var(--brand-red)] p-3">
                <Icon size={24} />
              </div>
              <span className="font-display font-bold text-lg uppercase tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--brand-red)]">Catalogue</div>
              <h2 className="mt-2 font-display font-black text-4xl md:text-5xl uppercase">Browse by Category</h2>
            </div>
            <Link to="/products" className="text-sm font-bold uppercase tracking-wider border-b-2 border-[color:var(--brand-red)] pb-0.5">
              See all products →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to="/products"
                search={{ category: cat }}
                className="group bg-white border border-border hover:border-[color:var(--brand-red)] p-6 transition-all hover:-translate-y-1"
              >
                <div className="bg-[color:var(--brand-black)] text-[color:var(--brand-red)] w-14 h-14 flex items-center justify-center group-hover:bg-[color:var(--brand-red)] group-hover:text-white transition-colors">
                  <CategoryIcon category={cat} size={28} />
                </div>
                <h3 className="mt-4 font-display font-bold text-xl uppercase leading-tight">{cat}</h3>
                <div className="mt-3 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-[color:var(--brand-red)]">
                  View Range →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
