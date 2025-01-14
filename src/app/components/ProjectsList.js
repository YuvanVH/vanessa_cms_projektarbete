//src/app/components/ProjectsList.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectsList({ projects }) {
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Uppdatera filteredProjects när props.projects ändras
  useEffect(() => {
    console.log("Received projects:", projects); // Logga för att se om data skickas in korrekt
    setFilteredProjects(projects);
  }, [projects]);

  const handleCategoryChange = (selectedCategories) => {
    console.log("Selected Categories:", selectedCategories);
    // Filtrera projekten baserat på de valda kategorierna
    const filtered = projects.filter((project) =>
      selectedCategories.every((categorySlug) =>
        project.categoryCollection.items.some((category) => category.slug === categorySlug)
      )
    );
    setFilteredProjects(filtered);
  };

  return (
    <div>
      <div id="projects-list">
        {filteredProjects.length === 0 ? (
          <p>No projects found.</p> // Meddelande om inga projekt finns
        ) : (
          filteredProjects.map((project) => (
            <div key={project.sys.id}>
              <h2>{project.projectTitle || "Untitled Project"}</h2>
              <p>{project.shortDescription || "No description available"}</p>

              {/* Lägg till kategori-länk */}
              {project.categoryCollection?.items && (
                <p>
                  Category:{" "}
                  {project.categoryCollection.items.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="text-blue-500 underline"
                    >
                      {category.title}
                    </Link>
                  ))}
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
          ))
        )}
      </div>
    </div>
  );
}
