"use client";
import Link from "next/link";
import { LogIn, LogOut, Menu, X, User, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-amber-50/90 backdrop-blur-md border-b-4 border-amber-600 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logga / Titel */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="p-1 rounded-full group-hover:bg-amber-100 transition">
            <img src="/logo.png" width={46} height={46} />
          </div>
          <h1 className="text-2xl md:text-3xl text-amber-900">
            Husmorskurer.se
          </h1>
        </Link>

        {/* Desktop: Knappar */}
        <nav className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/profil"
                className="flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-900 px-4 py-2 rounded-xl transition cursor-pointer"
              >
                <User className="w-5 h-5" />
                Profil
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-xl transition cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                Logga ut
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-xl transition shadow-md cursor-pointer"
            >
              <LogIn className="w-5 h-5" />
              Logga in
            </Link>
          )}
        </nav>

        {/* Mobil: Hamburgermeny */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-amber-900"
        >
          {mobileMenuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* Mobil dropdown-meny */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-amber-50/95 backdrop-blur-md border-b-4 border-amber-600 shadow-lg">
          <nav className="px-4 py-6 space-y-3">
            <Link
              href="/"
              className="flex items-center gap-3 text-amber-900 hover:bg-amber-200 px-4 py-3 rounded-xl transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="w-6 h-6" />
              Startsida
            </Link>

            {user ? (
              <>
                <Link
                  href="/profil"
                  className="flex items-center gap-3 text-amber-900 hover:bg-amber-200 px-4 py-3 rounded-xl transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-6 h-6" />
                  Profil
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 text-amber-900 hover:bg-amber-200 px-4 py-3 rounded-xl transition text-left"
                >
                  <LogOut className="w-6 h-6" />
                  Logga ut
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-xl transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="w-6 h-6" />
                Logga in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
