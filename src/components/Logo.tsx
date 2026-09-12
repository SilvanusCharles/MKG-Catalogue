import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`font-display font-black text-2xl tracking-tight leading-none ${className}`}
    >
      <span>MKG</span>
      <span className="text-[color:var(--brand-red)]">.</span>
      <span>KABEL</span>
    </Link>
  );
}
