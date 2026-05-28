import { useEffect } from "react";
import { X, Phone, MessageCircle } from "lucide-react";
import type { Product } from "@/lib/catalogue";
import { PHONE, whatsappLink } from "@/lib/catalogue";
import { CategoryIcon } from "./CategoryIcon";

export function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div
        className="bg-white max-w-4xl w-full my-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white border border-border p-2 hover:bg-[color:var(--brand-red)] hover:text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="aspect-square bg-[color:var(--brand-black)] relative flex items-center justify-center">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0 1px, transparent 1px 14px)" }} />
            <CategoryIcon category={product.category} size={140} className="text-[color:var(--brand-red)] relative z-10" />
          </div>

          <div className="p-6 md:p-8">
            <span className="inline-block bg-[color:var(--brand-red)] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
              {product.category}
            </span>
            <h2 className="mt-3 font-display font-black text-3xl leading-tight">{product.name}</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            <h3 className="mt-6 text-xs uppercase tracking-widest font-bold text-muted-foreground">Specifications</h3>
            <table className="mt-2 w-full text-sm border-t border-border">
              <tbody>
                {Object.entries(product.specs).map(([k, v]) => (
                  <tr key={k} className="border-b border-border">
                    <th className="text-left py-2 pr-3 font-semibold text-foreground w-2/5">{k}</th>
                    <td className="py-2 text-muted-foreground font-mono text-xs">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center justify-center gap-2 bg-[color:var(--brand-black)] hover:bg-black text-white text-sm font-bold uppercase tracking-wider py-3"
              >
                <Phone size={16} /> Call to Order
              </a>
              <a
                href={whatsappLink(product.name)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[color:var(--brand-red)] hover:bg-[color:var(--brand-red-dark)] text-white text-sm font-bold uppercase tracking-wider py-3"
              >
                <MessageCircle size={16} /> Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
