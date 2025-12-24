import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";

export default function AuthConfirmPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    document.title = "Accesso Dashboard | IdrauliciSubito";
  }, []);

  useEffect(() => {
    const token_hash = params.get("token_hash");
    const type = params.get("type");
    const next = params.get("next") || "/dashboard";

    if (!token_hash || !type) {
      navigate("/auth?mode=login", { replace: true });
      return;
    }

    let cancelled = false;

    (async () => {
      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as any,
      });

      if (cancelled) return;

      if (error) {
        console.error("Auth confirm error:", error);
        toast.error("Link non valido o scaduto. Accedi di nuovo.");
        navigate("/auth?mode=login", { replace: true });
        return;
      }

      navigate(next, { replace: true });
    })();

    return () => {
      cancelled = true;
    };
  }, [navigate, params]);

  return (
    <Layout>
      <main className="container mx-auto px-4 py-16">
        <section className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-semibold text-foreground">Accesso in corso...</h1>
          <p className="mt-2 text-muted-foreground">
            Ti stiamo portando direttamente alla tua dashboard.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </section>
      </main>
    </Layout>
  );
}
