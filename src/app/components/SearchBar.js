// src/app/components/SearchBar.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Hämta sökparametern från URL:en och sanera den
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");

    // Sanera parametrarna (t.ex. tillåta endast bokstäver och siffror)
    if (searchQuery && /^[a-zA-Z0-9\s]*$/.test(searchQuery)) {
      setSearchTerm(searchQuery);
    }
  }, []);

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Uppdatera URL:en utan omladdning
    const url = new URL(window.location.href);
    url.searchParams.set("search", newSearchTerm);
    router.push(url.pathname + url.search, { shallow: true });
  };

  return (
    <input
      type="text"
      value={searchTerm}
      placeholder="Search projects..."
      onChange={handleSearch}
      style={{
        margin: "20px",
        padding: "10px",
        fontSize: "16px",
        width: "100%",
        maxWidth: "400px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    />
  );
}
