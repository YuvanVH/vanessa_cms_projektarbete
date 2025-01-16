// src/app/components/CategoryFilter.js
"use client";

import { useState } from "react";

// Komponent för att filtrera projekt baserat på valda kategorier
export default function CategoryFilter({ categories, onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  // Hantera val av kategori
  const handleCategoryChange = (event) => {
    const category = event.target.value; // Hämta vald kategori
    setSelectedCategory(category); // Uppdatera den valda kategorin i state
    onCategoryChange(category); // Skicka den valda kategorin till föräldrakomp.
  };

  // Skapa en lista med unika kategorier (utan dubbletter)
  const uniqueCategories = [
    ...new Map(categories.map((category) => [category.slug, category])).values(),
  ];

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      {/* Dropdown-meny för att välja kategori */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        style={{
          padding: "10px",
          margin: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width: "200px",
          // backgroundColor: "#f9f9f9",
          // color: "#333",
        }}
      >
        <option value="">All Categories</option>
        {uniqueCategories.map((category, index) => (
          <option key={`${category.slug}-${index}`} value={category.slug}>
            {category.title}
          </option>
        ))}
      </select>
    </div>
  );
}
