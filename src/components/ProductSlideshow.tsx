import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/catalogue";
import { productImages } from "@/lib/catalogue";
import { ProductImage } from "./ProductImage";

export function ProductSlideshow({
  product,
  size = 140,
  autoPlay = false,
  intervalMs = 4000,
  showThumbs = false,
}: {
  product: Pick<Product, "category" | "image_url" | "image_urls" | "name">;
  size?: number;
  autoPlay?: boolean;
  intervalMs?: number;
  showThumbs?: boolean;
}) {
  const images = productImages(product);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx >= images.length) setIdx(0);
  }, [images.length, idx]);

  useEffect(() => {
    if (!autoPlay || images.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(t);
  }, [autoPlay, intervalMs, images.length]);

  if (images.length <= 1) {
    return <ProductImage product={product} size={size} />;
  }

  const go = (dir: 1 | -1) => setIdx((i) => (i + dir + images.length) % images.length);

  return (
    <>
      <img
        src={images[idx]}
        alt={`${product.name} — image ${idx + 1}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-[color:var(--brand-red)] text-white p-2"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        aria-label="Next image"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-[color:var(--brand-red)] text-white p-2"
      >
        <ChevronRight size={16} />
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to image ${i + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              setIdx(i);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-[color:var(--brand-red)]" : "bg-white/60 hover:bg-white"}`}
          />
        ))}
      </div>
      {showThumbs && (
        <div className="absolute bottom-8 left-0 right-0 z-20 px-2 flex gap-1.5 justify-center overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIdx(i);
              }}
              className={`w-12 h-12 border-2 shrink-0 ${i === idx ? "border-[color:var(--brand-red)]" : "border-white/40"}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
