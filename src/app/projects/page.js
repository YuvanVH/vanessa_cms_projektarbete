// src/app/projects/page.js
import Header from "../components/Header";
import ProjectsList from "../components/ProjectsList";
import SearchBar from "../components/SearchBar";
import { fetchPageHeader, fetchProjects } from "../lib/graphql";

export default async function ProjectsPage(props) {
  const searchParams = props.searchParams || {};
  const searchTerm = searchParams.search || "";

  // Hämta sidhuvud och projektdata
  const pageHeader = await fetchPageHeader("My Projects");
  const allProjects = await fetchProjects();

  // Filtrera projekten baserat på sökterm (inklusive kategori)
  const filteredProjects = allProjects.filter((project) => {
    const searchInCategories = project.categoryCollection.items.some((category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const searchInTitleOrDescription =
      project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

    return searchInTitleOrDescription || searchInCategories;
  });

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
      <SearchBar initialSearchTerm={searchTerm} resultCount={filteredProjects.length} />
      {/* Skicka de filtrerade projekten */}
      <ProjectsList projects={filteredProjects} />
    </div>
  );
}
