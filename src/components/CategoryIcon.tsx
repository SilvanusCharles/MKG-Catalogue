import { Cable, Zap, Waves, CircleDashed, Pipette, Plug } from "lucide-react";
import type { Category } from "@/lib/catalogue";

const map: Record<Category, React.ComponentType<{ size?: number; className?: string }>> = {
  "Armoured Cable": Cable,
  "PVC/PVC Cable": Zap,
  "Flexible Cable": Waves,
  "Conduit": CircleDashed,
  "Pipes": Pipette,
  "Earthing Materials": Plug,
};

export function CategoryIcon({ category, size = 28, className }: { category: Category | string; size?: number; className?: string }) {
  const Icon = map[category as Category] ?? Cable;
  return <Icon size={size} className={className} />;
}
