// src/app/components/ProjectsClient.js

"use client";

import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import ProjectsList from "./ProjectsList";

export default function ProjectsClient({ allProjects, allCategories, initialSearchTerm }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || "");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filtrera projekt baserat på sökterm och vald kategori
  const [filteredProjects, setFilteredProjects] = useState(allProjects);

  useEffect(() => {
    let filtered = allProjects;

    // Filtrera efter sökterm
    if (searchTerm) {
      filtered = filtered.filter((project) => {
        const inTitle = project.projectTitle
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const inDescription = project.shortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const inCategories = project.categoryCollection.items.some((category) =>
          category.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return inTitle || inDescription || inCategories;
      });
    }

    // Filtrera efter vald kategori
    if (selectedCategory) {
      filtered = filtered.filter((project) =>
        project.categoryCollection.items.some(
          (category) => category.slug === selectedCategory
        )
      );
    }

    setFilteredProjects(filtered);
  }, [allProjects, searchTerm, selectedCategory]);

  return (
    <div>
      {/* Sökruta */}
      <SearchBar
        initialSearchTerm={searchTerm}
        onSearch={(term) => setSearchTerm(term)}
      />

      {/* Kategorifilter */}
      <CategoryFilter
        categories={allCategories}
        onCategoryChange={(category) => setSelectedCategory(category)}
      />

      {/* Projektlista */}
      <ProjectsList projects={filteredProjects} />
    </div>
  );
}
