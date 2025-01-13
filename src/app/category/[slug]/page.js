//src/app/category/[slug]/page.js

import Header from "../../components/Header";
import ProjectsList from "../../components/ProjectsList";
import { fetchPageHeader, fetchProjects } from "../../lib/graphql";

export default async function CategoryPage({ params }) {
  const { slug } = params; // Hämta slugen för kategorin

  const pageHeader = await fetchPageHeader("Category"); // Hämta sidhuvudets data
  const allProjects = await fetchProjects(); // Hämta alla projekt

  // Filtrera projekten baserat på kategorislugen
  const filteredProjects = allProjects.filter(
    (project) => project.category?.slug === slug
  );

  // Skapa värden för headern
  const title = pageHeader?.title || "Category";
  const backgroundImage = pageHeader?.backgroundImage?.url || "/default-image.jpg";
  const logo = pageHeader?.logo?.url || "/default-logo.png";

  return (
    <div>
      <Header
        title={title}
        slogan={`Projects under category: ${slug}`}
        backgroundImage={backgroundImage}
        logo={logo}
      />

      {/* Rendera filtrerade projekt */}
      <ProjectsList projects={filteredProjects} />
    </div>
  );
}



// import Header from "../../components/Header";
// import ProjectsList from "../../components/ProjectsList";
// import SearchBar from "../../components/SearchBar";
// import { fetchPageHeader, fetchProjects } from "../../lib/graphql";

// TODO: hämta från project
// gör som projectlist men gör om kategori slugs till länk
// renderar endast ut projekten med slugs-kategori på den länken

// Nu använder man `searchParams` från `props` för att filtrera projekt
// export default async function ProjectsPage({ searchParams }) {
//   const pageHeader = await fetchPageHeader("My Projects"); // Hämta headerdata för projektsidan
//   const allProjects = await fetchProjects(); // Hämta alla projekt

//   // Hämta söksträngen från URL:en via `searchParams`
//   const searchTerm = searchParams?.search || ""; // Om inget sökord finns, sätt till en tom sträng

//   // Filtrera projekten baserat på söksträngen
//   const filteredProjects = allProjects.filter((project) =>
//     project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Skapa värden för headern
//   const title = pageHeader?.title || "My Projects";
//   const backgroundImage = pageHeader?.backgroundImage?.url || "/default-image.jpg";
//   const logo = pageHeader?.logo?.url || "/default-logo.png";
//   const slogan = pageHeader?.slogan
//     ? pageHeader.slogan.json.content
//       .map((block) =>
//         block.content.map((innerBlock) => innerBlock.value).join("")
//       )
//       .join("\n")
//     : "Default slogan";

//   return (
//     <div>
//       <Header
//         title={title}
//         slogan={slogan}
//         backgroundImage={backgroundImage}
//         logo={logo}
//       />
//       <SearchBar /> {/* Bara visa sökfältet utan att hantera sökningen här */}
//       <ProjectsList projects={filteredProjects} />
//     </div>
//   );
// }
