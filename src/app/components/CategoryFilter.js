// src/app/components/CategoryFilter.js
"use client";

import { useState } from "react";

export default function CategoryFilter({ categories, onCategoryChange }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSelectCategory = (slug) => {
    if (!selectedCategories.includes(slug)) {
      const updated = [...selectedCategories, slug];
      setSelectedCategories(updated);
      onCategoryChange(updated); // Skicka till föräldrakomponenten
    }
  };

  const handleRemoveCategory = (slug) => {
    const updated = selectedCategories.filter((category) => category !== slug);
    setSelectedCategories(updated);
    onCategoryChange(updated); // Skicka till föräldrakomponenten
  };

  return (
    <div>
      <select
        onChange={(e) => handleSelectCategory(e.target.value)}
        defaultValue=""
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.title}
          </option>
        ))}
      </select>

      <div style={{ marginTop: "10px" }}>
        {selectedCategories.map((slug) => (
          <span
            key={slug}
            style={{
              display: "inline-block",
              backgroundColor: "#e0e0e0",
              borderRadius: "15px",
              padding: "5px 10px",
              margin: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleRemoveCategory(slug)}
          >
            {categories.find((cat) => cat.slug === slug)?.title}
            <span style={{ marginLeft: "10px", color: "red" }}>✕</span>
          </span>
        ))}
      </div>
    </div>
  );
}
