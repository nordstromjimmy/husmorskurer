"use client";
import { useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (isSignUp) {
      // SKAPA KONTO + LOGGA IN DIREKT
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`, // Viktigt: går tillbaka till startsidan efter eventuell bekräftelse
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (data.user && data.session) {
        // Användaren är redan inloggad (Supabase loggar in direkt vid signUp om confirm email är avstängd)
        router.push("/");
        router.refresh();
      } else {
        // Om e-postbekräftelse är på – visa vänligt meddelande
        setErrorMessage("Kontrollera din e-post för att bekräfta kontot!");
      }
    } else {
      // LOGGA IN
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        router.push("/");
        router.refresh();
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-amber-50 to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-amber-900 text-center mb-8">
          {isSignUp ? "Skapa konto" : "Logga in"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="E-postadress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-xl border border-amber-300 focus:border-amber-600 focus:outline-none text-amber-900"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Lösenord (minst 6 tecken)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-5 py-4 rounded-xl border border-amber-300 focus:border-amber-600 focus:outline-none text-amber-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-medium py-4 rounded-xl transition cursor-pointer"
          >
            {loading
              ? "Laddar..."
              : isSignUp
              ? "Skapa konto och logga in"
              : "Logga in"}
          </button>
        </form>

        {errorMessage && (
          <p
            className={`mt-6 text-center ${
              errorMessage.includes("bekräfta") ||
              errorMessage.includes("Kontrollera")
                ? "text-green-700"
                : "text-red-600"
            } font-medium`}
          >
            {errorMessage}
          </p>
        )}

        <p className="mt-8 text-center text-amber-800">
          {isSignUp ? "Har du redan ett konto?" : "Inget konto än?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMessage("");
            }}
            className="font-medium text-amber-700 hover:text-amber-900 underline cursor-pointer"
          >
            {isSignUp ? "Logga in" : "Skapa konto"}
          </button>
        </p>
      </div>
    </div>
  );
}
