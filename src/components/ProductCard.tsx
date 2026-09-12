import { ProductSlideshow } from "./ProductSlideshow";
import type { Product } from "@/lib/catalogue";

export function ProductCard({
  product,
  onView,
}: {
  product: Product;
  onView: (p: Product) => void;
}) {
  const keySpec =
    product.specs["Size / Gauge"] ?? product.specs["Size"] ?? product.specs["Diameter"] ?? "—";
  return (
    <article className="group bg-card border border-border hover:border-[color:var(--brand-red)] transition-colors flex flex-col">
      <div className="aspect-square bg-[color:var(--brand-black)] relative overflow-hidden flex items-center justify-center">
        <ProductSlideshow product={product} size={72} />
        <span className="absolute top-3 left-3 z-10 bg-[color:var(--brand-red)] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
          {product.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-bold text-lg leading-tight">{product.name}</h3>
        <dl className="mt-2 text-xs text-muted-foreground flex gap-2">
          <dt className="font-semibold uppercase tracking-wider">Spec:</dt>
          <dd className="font-mono">{keySpec}</dd>
        </dl>
        <button
          onClick={() => onView(product)}
          className="mt-4 w-full bg-[color:var(--brand-black)] hover:bg-[color:var(--brand-red)] text-white text-sm font-bold uppercase tracking-wider py-2.5 transition-colors"
        >
          View Details
        </button>
      </div>
    </article>
  );
}
