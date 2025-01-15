// src/app/components/SearchBar.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ initialSearchTerm = "", resultCount }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setTyping(true);

    // Rensa tidigare timeout för att undvika överflödiga URL-uppdateringar
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Skapa en ny timeout för att uppdatera URL när användaren slutar skriva
    const timeout = setTimeout(() => {
      const url = new URL(window.location.href);
      if (newSearchTerm) {
        url.searchParams.set("search", newSearchTerm);
      } else {
        url.searchParams.delete("search");
      }
      router.push(url.pathname + url.search, { shallow: true });
      setTyping(false);
    }, 500); // Vänta 500 ms efter sista tangenttryckningen innan URL uppdateras

    setTypingTimeout(timeout);
  };

  const clearSearch = () => {
    setSearchTerm("");
    const url = new URL(window.location.href);
    url.searchParams.delete("search");
    router.push(url.pathname, { shallow: true });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search projects..."
          onChange={handleSearch}
          style={{
            padding: "10px 35px 10px 10px",
            fontSize: "16px",
            width: "100%",
            maxWidth: "400px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              color: "#999",
            }}
          >
            &#x2715;
          </button>
        )}
      </div>
      {searchTerm && !typing && (
        <p style={{ marginTop: "10px", color: "#555" }}>
          {resultCount > 0
            ? `Found ${resultCount} results`
            : "No results found"}
        </p>
      )}
    </div>
  );
}
