"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, User, Heart, Calendar } from "lucide-react";

type FavoriteCure = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  image_url?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<FavoriteCure[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  useEffect(() => {
    async function fetchProfileData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);

      // Hämta användarens favoriter
      const { data: favs, error } = await supabase
        .from("favorites")
        .select("cure_id")
        .eq("user_id", user.id);

      if (error) {
        console.error("Fel vid hämtning av favoriter:", error);
      } else if (favs && favs.length > 0) {
        const cureIds = favs.map((f) => f.cure_id);

        const { data: cures } = await supabase
          .from("cures")
          .select("id, title, slug, short_description, image_url")
          .in("id", cureIds);

        setFavorites(cures || []);
      }

      setLoading(false);
    }

    fetchProfileData();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-amber-50 to-orange-50 flex items-center justify-center">
        <p className="text-amber-900 text-xl">Laddar profil...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Omdirigeras till login
  }

  const createdDate = new Date(user.created_at).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-amber-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profil-header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-10 text-center">
          <div className="w-24 h-24 bg-amber-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <User className="w-12 h-12 text-amber-800" />
          </div>
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Min profil</h1>
          <p className="text-amber-800 text-lg">{user.email}</p>

          <div className="flex items-center justify-center gap-2 mt-4 text-amber-700">
            <Calendar className="w-5 h-5" />
            <span>Medlem sedan {createdDate}</span>
          </div>
        </div>

        {/* Favoriter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-bold text-amber-900">
              Mina favoriter ({favorites.length})
            </h2>
          </div>

          {favorites.length === 0 ? (
            <p className="text-center text-amber-700 py-10">
              Du har inga sparade favoriter än.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favorites.map((cure) => (
                <Link
                  key={cure.id}
                  href={`/kur/${cure.slug}`}
                  className="bg-amber-50 hover:bg-amber-100 rounded-2xl p-5 flex gap-4 transition shadow-md"
                >
                  {cure.image_url ? (
                    <img
                      src={cure.image_url}
                      alt={cure.title}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-amber-200 rounded-xl flex items-center justify-center">
                      <Heart className="w-10 h-10 text-amber-700" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-900 line-clamp-2">
                      {cure.title}
                    </h3>
                    <p className="text-amber-700 text-sm mt-1 line-clamp-2">
                      {cure.short_description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
