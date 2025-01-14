// src/app/projects/page.js
import Header from "../components/Header";
import ProjectsList from "../components/ProjectsList";
import SearchBar from "../components/SearchBar";
import { fetchPageHeader, fetchProjects } from "../lib/graphql"; // Korrekt import

export default async function ProjectsPage({ searchParams }) {
  const searchTerm = searchParams?.search || ""; // Hämta sökparametern eller sätt till en tom sträng om ingen finns.

  // Hämta sidhuvud och projektdata
  const pageHeader = await fetchPageHeader("My Projects");
  const allProjects = await fetchProjects();

  // Filtrera projekten baserat på sökterm
  const filteredProjects = allProjects.filter((project) =>
    project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const title = pageHeader?.title || "My Projects";
  const backgroundImage = pageHeader?.backgroundImage?.url || "/default-image.jpg";
  const logo = pageHeader?.logo?.url || "/default-logo.png";
  const slogan = pageHeader?.slogan
    ? pageHeader.slogan.json.content
      .map((block) =>
        block.content.map((innerBlock) => innerBlock.value).join("")
      )
      .join("\n")
    : "Default slogan";

  return (
    <div>
      <Header
        title={title}
        slogan={slogan}
        backgroundImage={backgroundImage}
        logo={logo}
      />
      <SearchBar />
      {/* Skicka den filtrerade projekten */}
      <ProjectsList projects={filteredProjects} />
    </div>
  );
}
