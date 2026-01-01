export const dynamic = "force-dynamic";
export const revalidate = 0;

import FavoriteButton from "@/app/components/FavoriteButton";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Cure } from "@/types/cure";
import { Leaf, AlertTriangle, Clock, Heart } from "lucide-react";
import { notFound } from "next/navigation";

export default async function CurePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("Test");
  const supabase = await createSupabaseServerClient();

  const { data: cure, error } = await supabase
    .from("cures")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !cure) {
    notFound();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("server user:", user?.id);
  let isFavorite = false;

  if (user) {
    const { data: fav } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("cure_id", cure.id)
      .maybeSingle();

    isFavorite = !!fav;
    console.log(cure.id);
    console.log("Test");
  }

  const typedCure = cure as Cure;

  const evidenceIcon =
    {
      folklore: "🌿",
      some_research: "🔬",
      well_researched: "✅",
    }[typedCure.evidence_level] || "🌿";

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-amber-50 to-orange-50 py-12">
      <article className="max-w-4xl mx-auto px-4">
        {/* Huvudbild */}
        {typedCure.image_url ? (
          <img
            src={typedCure.image_url}
            alt={typedCure.alt_text || typedCure.title}
            className="w-full h-96 object-cover rounded-lg shadow-2xl mb-10"
          />
        ) : (
          <div className="w-full h-96 bg-gradient-to-br from-amber-100 to-green-100 rounded-3xl shadow-2xl mb-10 flex items-center justify-center">
            <Leaf className="w-32 h-32 text-amber-600" />
          </div>
        )}

        {/* Titel och metadata */}

        <div className="flex items-start justify-between mb-8">
          <h1 className="text-3xl md:text-3xl font-bold text-amber-900">
            {typedCure.title}
          </h1>

          <FavoriteButton
            cureId={typedCure.id}
            initialIsFavorite={isFavorite}
            size="large"
          />
        </div>

        <div className="flex flex-wrap items-center gap-6 text-amber-700 mb-8">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{typedCure.prep_time || "10 minuter"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Svårighetsgrad:</span>
            <span>{typedCure.difficulty || "Enkel"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{evidenceIcon} Traditionell kunskap</span>
          </div>
        </div>

        {/* Varningar – alltid högt upp */}
        {typedCure.warnings && typedCure.warnings.length > 0 && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-2xl p-6 mb-10 flex gap-4">
            <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-yellow-900 mb-2">
                Viktigt att veta:
              </p>
              <ul className="list-disc list-inside text-yellow-800 space-y-1">
                {typedCure.warnings.map((warning: string, i: number) => (
                  <li key={i}>{warning}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Beskrivning */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-10">
          <p className="text-lg text-amber-800 leading-relaxed">
            {typedCure.full_description}
          </p>
        </section>

        {/* Ingredienser */}
        <section className="grid md:grid-cols-2 gap-10 mb-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">
              Ingredienser
            </h2>
            <ul className="space-y-3">
              {typedCure.ingredients.map((ing: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-amber-600 mt-1">•</span>
                  <span className="text-amber-800">{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instruktioner */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">
              Så här gör du
            </h2>
            <ol className="space-y-4">
              {typedCure.instructions.map((step: string, i: number) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <span className="text-amber-800 pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Kategorier & tags */}
        <div className="flex flex-wrap gap-3 mb-10">
          {Array.from(
            new Set([...typedCure.categories, ...typedCure.tags])
          ).map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="bg-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-medium"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}
