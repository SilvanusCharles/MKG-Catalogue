import { Phone, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { PHONE, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/catalogue";

export function Footer() {
  return (
    <footer className="bg-[color:var(--brand-black)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <Logo className="text-white" />
          <p className="mt-4 text-sm text-white/70 max-w-xs">
            Professional cable & conduit supplier. Made in Turkey. 185 Adeniji Adele Road, beside Wema Bank, Lagos Island, Lagos.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-white/50 font-bold">Contact</h4>
          <div className="mt-4 space-y-3">
            <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-sm hover:text-[color:var(--brand-red)]">
              <Phone size={16} /> {PHONE_DISPLAY}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[color:var(--brand-red)] hover:bg-[color:var(--brand-red-dark)] text-white px-4 py-2 text-sm font-bold uppercase tracking-wider"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-white/50 font-bold">Sister Brand</h4>
          <p className="mt-4 text-sm text-white/70">
            Looking for lighting & electrical fittings?
          </p>
          <a
            href="#"
            className="mt-2 inline-block text-sm font-bold uppercase tracking-wider border-b-2 border-[color:var(--brand-red)] pb-0.5 hover:text-[color:var(--brand-red)]"
          >
            Visit Silver Gate →
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-xs text-white/50 flex justify-between">
          <span>© {new Date().getFullYear()} MKG Kabel. All rights reserved.</span>
          <span>185 Adeniji Adele Rd, Lagos Island, Lagos</span>
        </div>
      </div>
    </footer>
  );
}
