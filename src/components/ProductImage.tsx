import { CategoryIcon } from "./CategoryIcon";
import type { Product } from "@/lib/catalogue";

export function ProductImage({
  product,
  size = 72,
  className = "",
}: {
  product: Pick<Product, "category" | "image_url" | "name">;
  size?: number;
  className?: string;
}) {
  if (product.image_url) {
    return (
      <img
        src={product.image_url}
        alt={product.name}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
      />
    );
  }
  return (
    <>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, white 0 1px, transparent 1px 12px)",
        }}
      />
      <CategoryIcon
        category={product.category}
        size={size}
        className={`text-[color:var(--brand-red)] relative z-10 ${className}`}
      />
    </>
  );
}
