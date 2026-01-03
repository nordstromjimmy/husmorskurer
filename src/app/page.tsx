import { createSupabaseServerClient } from "@/lib/supabase/server";
import HomeClient from "./components/HomeClient";

export default async function HomePage() {
  // Hämta all data på servern – supersnabbt och SEO-vänligt
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: cures, error } = await supabase
    .from("cures")
    .select("id, title, slug, short_description, image_url, categories, tags")
    .order("created_at", { ascending: false });

  let favorites: string[] = [];
  if (user) {
    const { data: favs } = await supabase
      .from("favorites")
      .select("cure_id")
      .eq("user_id", user.id);
    favorites = favs?.map((f) => f.cure_id) || [];
  }

  const curesWithFavorite =
    cures?.map((cure) => ({
      ...cure,
      isFavorite: favorites.includes(cure.id),
    })) || [];

  // Extrahera unika kategorier på servern
  const allCategories = new Set<string>();

  if (curesWithFavorite) {
    for (const cure of curesWithFavorite) {
      for (const cat of cure.categories) {
        allCategories.add(cat);
      }
    }
  }

  const categories = Array.from(allCategories).sort();

  // Skicka datan till Client Component
  return (
    <HomeClient initialCures={curesWithFavorite} categories={categories} />
  );
}
