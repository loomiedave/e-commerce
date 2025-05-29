// components/SearchDropdown.tsx
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SearchDropdown({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 0) {
        fetch(`/api/search-products?q=${query}`)
          .then(res => res.json())
          .then(data => setResults(data));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative top-10 right-0 bg-white shadow-lg rounded w-72 p-3 z-50">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search Outfits..."
        className="w-full p-2 border rounded mb-2"
        autoFocus
      />

      {results.length > 0 && (
        <ul className="max-h-60 overflow-auto text-sm">
          {results.map(product => (
            <li key={product.id} className="px-2 py-1 hover:bg-gray-100">
              <Link href={`/products/${product.id}`} onClick={onClose}>
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
