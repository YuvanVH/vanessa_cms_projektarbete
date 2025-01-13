import Header from '../components/Header';
import ProjectsList from '../components/ProjectsList';
import SearchBar from '../components/SearchBar'; // Client Component
import { fetchPageHeader, fetchProjects } from '../lib/graphql';

export default async function ProjectsPage() {
  const pageHeader = await fetchPageHeader('My Projects');
  const projects = await fetchProjects();

  const title = pageHeader?.title || "My Projects";
  const backgroundImage = pageHeader?.backgroundImage?.url || '/default-image.jpg';
  const logo = pageHeader?.logo?.url || '/default-logo.png';
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
      <SearchBar projects={projects} /> {/* Pass projects to SearchBar */}
    </div>
  );
}
