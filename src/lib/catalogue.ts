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
  category: Category;
  description: string;
  image: string;
  specs: Record<string, string>;
}

export const PHONE = "+2348033009217";
export const PHONE_DISPLAY = "+234 803 300 9217";
export const WHATSAPP_NUMBER = "2348033009217";

export const whatsappLink = (productName: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi MKG Kabel, I'm interested in ${productName}. Please share availability and pricing.`,
  )}`;
