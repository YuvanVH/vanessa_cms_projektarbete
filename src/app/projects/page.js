// src/app/projects/page.js
import Header from "../components/Header";
import ProjectsClient from "../components/ProjectsClient";
import { fetchPageHeader, fetchProjects } from "../lib/graphql";

export default async function ProjectsPage(props) {
  const searchParams = props.searchParams || {};
  const searchTerm = searchParams.search || "";

  // Hämta data för sidhuvud och projekt
  const pageHeader = await fetchPageHeader("My Projects");
  const allProjects = await fetchProjects();

  // Skapa en lista över alla unika kategorier från projekten
  const allCategories = Array.from(
    new Set(
      allProjects.flatMap((project) =>
        project.categoryCollection.items.map((category) => ({
          title: category.title,
          slug: category.slug,
        }))
      )
    )
  );

  return (
    <div>
      {/* Rendera sidhuvudet */}
      <Header
        title={pageHeader?.title || "My Projects"}
        slogan={
          pageHeader?.slogan
            ? pageHeader.slogan.json.content
              .map((block) =>
                block.content.map((innerBlock) => innerBlock.value).join("")
              )
              .join("\n")
            : "Default slogan"
        }
        backgroundImage={pageHeader?.backgroundImage?.url || "/default-image.jpg"}
        logo={pageHeader?.logo?.url || "/default-logo.png"}
      />

      {/* Skicka data till klientkomponenten */}
      <ProjectsClient
        allProjects={allProjects}
        allCategories={allCategories}
        initialSearchTerm={searchTerm}
      />
    </div>
  );
}
