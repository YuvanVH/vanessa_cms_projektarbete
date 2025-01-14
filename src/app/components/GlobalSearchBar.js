// src/app/components/GlobalSearchBar.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GlobalSearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Uppdatera URL med sökparametern utan att ladda om sidan
    const url = new URL(window.location.href);
    url.searchParams.set("search", newSearchTerm);
    router.push(url.pathname + url.search, { shallow: true });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Navigera till sökresultatsidan när användaren trycker på Enter
      const url = new URL(window.location.href);
      url.pathname = "/search"; // Navigera till search-sidan
      url.searchParams.set("search", searchTerm); // Lägg till sökparametern
      router.push(url.pathname + url.search); // Navigera till sökresultatsidan
    }
  };

  return (
    <input
      type="text"
      value={searchTerm}
      placeholder="Search across the site..."
      onChange={handleSearch}
      onKeyDown={handleKeyPress} // Lägg till denna för att hantera Enter-tangenten
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
