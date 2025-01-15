// src/app/components/SearchBar.js
"use client";

import { useState, useEffect } from "react";

export default function SearchBar({ initialSearchTerm = "", onSearch }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm); // Skicka sökterm till föräldrakomponenten
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search projects..."
        onChange={handleSearch}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "100%",
          maxWidth: "400px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
    </div>
  );
}
