//src/app/components/ProjectsList.js
"use client";

import Link from "next/link";
import styles from '../styles/projectList.module.css'; // Importera CSS-modulen

// Komponent för att lista och filtrera projekt
export default function ProjectsList({ projects }) {
  return (
    <div>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.sys.id} className={styles.projectContainer}>
            <div className={styles.projectContent}>
              {/* Bilden */}
              {project.projectImageCollection?.items?.[0]?.url && (
                <div className={styles.projectImage}>
                  <Link href={`/projects/${project.slug}`}>
                    <img
                      src={project.projectImageCollection.items[0].url}
                      alt={project.projectImageCollection.items[0].title || "Project Image"}
                      className={styles.image}
                    />
                  </Link>
                </div>
              )}

              {/* Text och länk */}
              <div className={styles.projectText}>
                <h3 className={styles.projectTitle}>
                  {project.projectTitle || "Untitled Project"}
                </h3>
                <p className={styles.projectDescription}>
                  {project.shortDescription || "No description available"}
                </p>

                {/* Kategorilänk */}
                {project.categoryCollection?.items && (
                  <p className="text-sm text-gray-500">
                    Category:{" "}
                    {project.categoryCollection.items.map((category, index) => (
                      <span key={category.slug} className="text-blue-500 underline">
                        <Link href={`/category/${category.slug}`}>
                          <strong>
                            {category.title}
                          </strong>
                        </Link>
                        {/* Mellanslag mellan kategorier */}
                        {index < project.categoryCollection.items.length - 1 && ' '}
                      </span>
                    ))}
                  </p>
                )}

                {project.projectLink && (
                  <div>
                    <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      View in GitHub
                    </a>
                  </div>
                )}

                {/* Projektlänk */}
                <Link href={`/projects/${project.slug}`} className={styles.link}>
                  View Project
                </Link>

              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No projects where found.</p>
      )}
    </div>
  );
}
