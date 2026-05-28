import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import productsData from "@/data/products.json";
import { CATEGORIES, type Category, type Product } from "@/lib/catalogue";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";

const searchSchema = z.object({
  category: z.enum(CATEGORIES).optional(),
});

export const Route = createFileRoute("/products")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Products — MKG Kabel Catalogue" },
      { name: "description", content: "Browse the full MKG Kabel catalogue — armoured cable, PVC, flexible cable, conduit, pipes and earthing materials." },
    ],
  }),
  component: ProductsPage,
});

const products = productsData as Product[];

function ProductsPage() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [active, setActive] = useState<Product | null>(null);

  const filtered = useMemo(
    () => (category ? products.filter((p) => p.category === category) : products),
    [category],
  );

  const setCat = (c: Category | undefined) =>
    navigate({ search: c ? { category: c } : {} });

  return (
    <>
      <section className="bg-[color:var(--brand-black)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--brand-red)]">Catalogue</div>
          <h1 className="mt-2 font-display font-black text-4xl md:text-5xl uppercase">Our Products</h1>
          <p className="mt-3 text-white/70 max-w-2xl text-sm md:text-base">
            {filtered.length} products available. Contact us for bulk pricing and availability.
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-border sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto">
          <FilterPill active={!category} onClick={() => setCat(undefined)}>All</FilterPill>
          {CATEGORIES.map((c) => (
            <FilterPill key={c} active={category === c} onClick={() => setCat(c)}>{c}</FilterPill>
          ))}
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No products in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onView={setActive} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${
        active
          ? "bg-[color:var(--brand-red)] text-white border-[color:var(--brand-red)]"
          : "bg-white text-foreground border-border hover:border-[color:var(--brand-red)]"
      }`}
    >
      {children}
    </button>
  );
}
