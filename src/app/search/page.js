// src/app/search/page.js
"use client";

import { useRouter } from "next/navigation";
import { fetchProjects } from "../lib/graphql";
import ProjectsList from "../components/ProjectsList";

export default async function SearchPage({ searchParams }) {
  const router = useRouter();
  const searchTerm = searchParams?.search || ""; // Hämta sökparametern från URL

  // Hämta alla projekt
  const allProjects = await fetchProjects();

  // Filtrera projekten baserat på sökterm (både titel och beskrivning)
  const filteredProjects = allProjects.filter((project) => {
    const titleMatch = project.projectTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descriptionMatch = project.shortDescription
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return titleMatch || descriptionMatch; // Matchar både titel och beskrivning
  });

  return (
    <div>
      <h1>Search Results for: "{searchTerm}"</h1>
      {/* <ProjectsList projects={filteredProjects} /> */}
    </div>
  );
}
