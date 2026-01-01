"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(currentQuery);

  // Synka input med URL när sidan laddas eller q ändras
  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    } else {
      // Rensa sökning
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("q");
      router.push(`/?${newParams.toString()}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative mb-12">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-3xl" />
      <div className="relative flex items-center bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50">
        <Search className="w-7 h-7 text-amber-700 ml-6" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Sök.."
          className="w-full py-5 pl-4 pr-12 text-lg bg-transparent focus:outline-none placeholder:text-amber-600 text-amber-900"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.delete("q");
              router.push(`/?${newParams.toString()}`);
            }}
            className="absolute right-4 text-amber-600 hover:text-amber-800"
          >
            ✕
          </button>
        )}
      </div>
    </form>
  );
}
