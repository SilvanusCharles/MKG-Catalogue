import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AdminSession = {
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
};

export function useAdminSession(): AdminSession {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const checkAdmin = async (s: Session | null) => {
      if (!s) {
        if (!cancelled) {
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", s.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!cancelled) {
        setIsAdmin(!!data);
        setLoading(false);
      }
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(true);
      // Defer DB call to avoid deadlock inside callback
      setTimeout(() => checkAdmin(s), 0);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      checkAdmin(data.session);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, isAdmin, loading };
}
