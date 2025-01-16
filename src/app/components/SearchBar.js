// src/app/components/SearchBar.js
"use client";

import { useState } from "react";

export default function SearchBar({ initialSearchTerm, onSearch }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || "");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Skicka termen till ProjectsClient
  };

  const handleClearSearch = () => {
    setSearchTerm(""); // Töm fältet
    onSearch(""); // Återställ sökresultat
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search projects..."
          style={{
            margin: "10px",
            padding: "10px 40px 10px 10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "300px",
          }}
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            style={{
              position: "absolute",
              right: "25px",
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "16px",
              color: "#888",
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
