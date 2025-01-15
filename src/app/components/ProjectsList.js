//src/app/components/ProjectsList.js
"use client";

import Link from "next/link";

// Komponent för att lista och filtrera projekt
export default function ProjectsList({ projects }) {
  return (
    <div>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.sys.id}>
            <h3>{project.projectTitle || "Untitled Project"}</h3>
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

            {/* Visa projekt-länk */}
            <Link href={`/projects/${project.slug}`} className="text-blue-500 underline">
              View Project
            </Link>
          </div>
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}
