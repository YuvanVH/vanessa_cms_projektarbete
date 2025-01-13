//src/app/components/ProjectsList.js
"use client";

import { useEffect, useState } from "react";
import { fetchCategories } from "../lib/graphql";
import CategoryFilter from "./CategoryFilter";
import Link from "next/link";

export default function ProjectsList({ projects }) {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  const handleCategoryChange = (selectedCategories) => {
    console.log("Selected Categories:", selectedCategories);
    // Filtrera projekten baserat på de valda kategorierna
    const filtered = projects.filter((project) =>
      selectedCategories.every((categorySlug) =>
        project.category.some((category) => category.slug === categorySlug)
      )
    );
    setFilteredProjects(filtered);
  };

  return (
    <div>
      <CategoryFilter categories={categories} onCategoryChange={handleCategoryChange} />
      <div id="projects-list">
        {filteredProjects.map((project) => (
          <div key={project.sys.id}>
            <h2>{project.projectTitle || "Untitled Project"}</h2>
            <p>{project.shortDescription || "No description available"}</p>

            {/* Lägg till kategori-länk */}
            {project.category && (
              <p>
                Category:{" "}
                <Link
                  href={`/category/${project.category.slug}`}
                  className="text-blue-500 underline"
                >
                  {project.category.title}
                </Link>
              </p>
            )}

            {/* Visa projekt-länk */}
            <Link href={`/projects/${project.slug}`} className="text-blue-500 underline">
              View Project
            </Link>

            {project.projectImageCollection?.items?.[0]?.url && (
              <img
                src={project.projectImageCollection.items[0].url}
                alt={project.projectImageCollection.items[0].title || "Project Image"}
                style={{
                  width: "50%",
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
              />
            )}
            <Link href={project.projectLink}>View Github</Link>
            <Link href={`/projects/${project.slug}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
