"use client";
import { useState, useEffect } from "react";
import { Leaf, Filter, X, Heart, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CurePreview } from "@/types/cure";
import SearchBar from "./SearchBar";

type HomeClientProps = {
  initialCures: CurePreview[];
  categories: string[];
};

export default function HomeClient({
  initialCures,
  categories,
}: HomeClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get("category");
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  const [filteredCures, setFilteredCures] =
    useState<CurePreview[]>(initialCures);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDesktopCategories, setShowDesktopCategories] = useState(true);

  // Filtrera client-side när kategori ändras
  useEffect(() => {
    let filtered = initialCures;

    // Filtrera på kategori
    if (selectedCategory) {
      filtered = filtered.filter((cure) =>
        cure.categories.includes(selectedCategory)
      );
    }

    // Filtrera på sökterm
    if (searchQuery) {
      filtered = filtered.filter(
        (cure) =>
          cure.title.toLowerCase().includes(searchQuery) ||
          cure.short_description.toLowerCase().includes(searchQuery) ||
          cure.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
      );
    }

    setFilteredCures(filtered);
  }, [selectedCategory, searchQuery, initialCures]);

  const handleCategoryClick = (cat: string) => {
    const newParams = new URLSearchParams();

    if (selectedCategory === cat) {
      router.push("/");
    } else {
      newParams.set("category", cat);
      // Rensa eventuell q (sökterm) för att undvika tomma resultat
      router.push(`/?${newParams.toString()}`);
    }
    setShowFilterModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-amber-50 to-orange-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-50/80" />
        <div className="relative max-w-4xl mx-auto px-4 py-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-amber-900">
            Husmorskurer
          </h2>

          <p className="text-xl md:text-2xl text-amber-800 mb-2 mt-4 max-w-lg mx-auto">
            Upptäck traditionella svenska huskurer <br />
            för naturlig vardagshälsa.
          </p>
        </div>
      </section>

      {/* Sök + Filter + Kurer */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        {/* Sökfält */}
        <SearchBar />

        {/* Rubrik med antal träffar */}
        <div className="flex items-center justify-between mb-6">
          {/* Mobil filter-knapp */}
          <button
            onClick={() => setShowFilterModal(true)}
            className="md:hidden flex items-center gap-2 bg-amber-600 text-white px-5 py-3 rounded-xl shadow-lg"
          >
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Desktop filter */}
        <div className="mb-8">
          <button
            onClick={() => setShowDesktopCategories(!showDesktopCategories)}
            className="hidden md:flex items-center gap-3 text-amber-900 font-semibold text-xl mb-4 hover:text-amber-700 transition cursor-pointer"
          >
            <span>Kategorier</span>
            <ChevronDown
              className={`w-6 h-6 transition-transform ${
                showDesktopCategories ? "rotate-180" : ""
              }`}
            />
          </button>
          <h2 className="text-lg text-amber-900 text-center md:text-left mb-4">
            {searchQuery
              ? `Sökresultat för "${searchQuery}"`
              : selectedCategory
              ? selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)
              : "Alla huskurer"}{" "}
            ({filteredCures.length})
          </h2>

          {showDesktopCategories && (
            <div className="hidden md:flex flex-wrap gap-3 animate-fadeIn">
              <button
                onClick={() => router.push("/")}
                className={`px-5 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                  !selectedCategory
                    ? "bg-amber-600 text-white"
                    : "bg-white/80 text-amber-800 border border-amber-300"
                }`}
              >
                Alla
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-5 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-amber-600 text-white"
                      : "bg-white/80 text-amber-800 border border-amber-300"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Kur-kort */}
        {filteredCures.length === 0 ? (
          <p className="text-center text-amber-700 text-lg py-20">
            {searchQuery ? (
              <>
                Inga huskurer matchar sökningen "{searchQuery}"
                <br />
                Prova en annan sökterm.
              </>
            ) : (
              <>Inga kurer i denna kategori än</>
            )}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {filteredCures.map((cure) => (
              <Link
                key={cure.id}
                href={`/kur/${cure.slug}`}
                className="block bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden border border-amber-100 relative"
              >
                {/* Favorit-indikator – bara om isFavorite */}
                {cure.isFavorite && (
                  <div className="absolute top-3 right-3 z-10">
                    <Heart className="w-7 h-7 fill-red-600 text-red-600 drop-shadow-md" />
                  </div>
                )}

                {cure.image_url ? (
                  <img
                    src={cure.image_url}
                    alt={cure.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-green-100 flex items-center justify-center">
                    <Leaf className="w-16 h-16 text-amber-600" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-amber-900 mb-2 line-clamp-2">
                    {cure.title}
                  </h3>
                  <p className="text-amber-700 mb-4 line-clamp-3">
                    {cure.short_description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cure.categories.slice(0, 3).map((cat) => (
                      <span
                        key={`${cat}-${cure.id}`}
                        className="text-xs bg-amber-200 text-amber-800 px-3 py-1 rounded-full"
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Mobil Filter Modal */}
      {showFilterModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setShowFilterModal(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-amber-900">
                Välj kategori
              </h3>
              <button onClick={() => setShowFilterModal(false)}>
                <X className="w-8 h-8 text-amber-700" />
              </button>
            </div>

            <button
              onClick={() => {
                router.push("/");
                setShowFilterModal(false);
              }}
              className={`w-full text-left px-5 py-4 rounded-xl mb-3 font-medium transition-all ${
                !selectedCategory
                  ? "bg-amber-600 text-white"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              Alla huskurer
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`w-full text-left px-5 py-4 rounded-xl mb-3 font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-600 text-white"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
