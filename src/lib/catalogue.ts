export const CATEGORIES = [
  "Armoured Cable",
  "PVC Cable",
  "Flexible Cable",
  "Conduit",
  "Pipes",
  "Earthing Materials",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image_url: string | null;
  image_urls: string[];
  specs: Record<string, string>;
}

/** Combined ordered list of all images for a product (legacy single first, then gallery). */
export function productImages(p: Pick<Product, "image_url" | "image_urls">): string[] {
  const list = [...(p.image_urls ?? [])];
  if (p.image_url && !list.includes(p.image_url)) list.unshift(p.image_url);
  return list;
}

export const PHONE = "+2348033009217";
export const PHONE_DISPLAY = "+234 803 300 9217";
export const WHATSAPP_NUMBER = "2348033009217";

export const whatsappLink = (productName: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi MKG Kabel, I'm interested in ${productName}. Please share availability and pricing.`,
  )}`;
