import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { toast } from "sonner";

const credSchema = z.object({
  email: z.string().trim().email("Ogiltig e-postadress").max(255),
  password: z.string().min(8, "Minst 8 tecken").max(128),
});

export default function AdminAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin", { replace: true });
      else setChecking(false);
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = credSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/admin", { replace: true });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Konto skapat. Be en befintlig admin tilldela behörighet.");
        setMode("login");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Något gick fel";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (checking) return null;

  return (
    <section className="pt-28 md:pt-40 pb-32 container-narrow max-w-sm">
      <p className="eyebrow mb-5">Admin</p>
      <h1 className="heading-section heading-h2 mb-10">
        {mode === "login" ? <>Logga <span className="italic text-primary">in.</span></> : <>Nytt <span className="italic text-primary">konto.</span></>}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block eyebrow mb-2">E-post</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="du@klinik.se"
          />
        </div>
        <div>
          <label className="block eyebrow mb-2">Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-3 text-xs uppercase tracking-[0.24em] hover:bg-accent-deep transition-colors disabled:opacity-50"
        >
          {loading ? "..." : mode === "login" ? "Logga in" : "Skapa konto"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="w-full text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors pt-2"
        >
          {mode === "login" ? "Skapa nytt konto" : "Tillbaka till inloggning"}
        </button>
      </form>
    </section>
  );
}
