import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "./catalogue";

type Row = {
  id: string;
  name: string;
  category: string;
  description: string;
  image_url: string | null;
  specs: unknown;
  sort_order: number;
};

const rowToProduct = (r: Row): Product => ({
  id: r.id,
  name: r.name,
  category: r.category,
  description: r.description,
  image_url: r.image_url,
  specs: (r.specs && typeof r.specs === "object" ? (r.specs as Record<string, string>) : {}),
});

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, category, description, image_url, specs, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data as Row[]).map(rowToProduct);
}

export function useProducts() {
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  // Realtime: refresh when products change.
  useEffect(() => {
    const channel = supabase
      .channel("products-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => {
        qc.invalidateQueries({ queryKey: ["products"] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  return query;
}
