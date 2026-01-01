"use client";
import { Heart } from "lucide-react";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type FavoriteButtonProps = {
  cureId: string;
  initialIsFavorite: boolean;
  size?: "small" | "large";
};

export default function FavoriteButton({
  cureId,
  initialIsFavorite,
  size = "small",
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const supabase = createSupabaseBrowserClient();

  const toggleFavorite = async () => {
    if (loading) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // Visa toast istället för redirect
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Döljs efter 3 sekunder
      return;
    }

    setLoading(true);

    const next = !isFavorite;
    setIsFavorite(next); // Optimistic update

    if (next) {
      const { error } = await supabase
        .from("favorites")
        .upsert(
          { user_id: user.id, cure_id: cureId },
          { onConflict: "user_id,cure_id" }
        );

      if (error) {
        setIsFavorite(false); // Återställ vid fel
      }
    } else {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("cure_id", cureId);

      if (error) {
        setIsFavorite(true); // Återställ vid fel
      }
    }

    setLoading(false);
  };

  const containerSize = size === "large" ? "w-14 h-14" : "w-10 h-10";
  const iconSize = size === "large" ? "w-10 h-10" : "w-6 h-6";

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleFavorite}
        disabled={loading}
        className={`relative ${containerSize} rounded-full flex items-center justify-center transition-all duration-200
        ${
          isFavorite
            ? "bg-red-100 hover:bg-red-200"
            : "bg-gray-100 hover:bg-gray-200"
        }
        ${loading ? "opacity-70 cursor-wait" : "cursor-pointer"}
      `}
      >
        <Heart
          className={`${iconSize} transition-all duration-300 ${
            isFavorite ? "fill-red-600 text-red-600" : "text-gray-600"
          }`}
        />
      </button>

      {showToast && (
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap z-50">
          <div className="bg-gray-900 text-white text-sm px-4 py-3 rounded-lg shadow-lg">
            Logga in för att spara favoriter.
          </div>
          <div
            className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 
      border-y-8 border-l-8 border-r-0 border-transparent border-l-gray-900"
          />
        </div>
      )}
    </div>
  );
}
