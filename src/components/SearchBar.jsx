"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export default function BookingSearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // 🔹 Debounce for smoother typing
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch?.(query.trim());
    }, 400);
    return () => clearTimeout(delay);
  }, [query, onSearch]);

  const clearSearch = () => {
    setQuery("");
    onSearch?.("");
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search bookings by name, email, or ID..."
          className="pl-9 pr-8"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <X
            onClick={clearSearch}
            className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600"
          />
        )}
      </div>
      <Button
        variant="outline"
        onClick={() => onSearch?.(query.trim())}
        className="flex items-center gap-1"
      >
        <Search size={16} /> Search
      </Button>
    </div>
  );
}
