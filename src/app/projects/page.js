// src/app/projects/page.js
import { fetchPageHeader, fetchProjects } from '../lib/graphql';
import Header from '../components/Header';

export default async function ProjectsPage() {
  const pageHeader = await fetchPageHeader('My Projects'); // Hämta headerdata för projektsidan
  const projects = await fetchProjects(); // Hämta alla projekt

  // Logga projekten för att validera data
  console.log('Fetched projects:', projects);

  // Default-värden om något saknas
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
      {/* Header-komponenten */}
      <Header
        title={pageHeader?.title || "Projects"} // Dynamisk titel för projektsidan
        slogan={slogan} // Dynamisk slogan
        backgroundImage={backgroundImage} // Dynamisk bakgrundsbild
        logo={logo} // Dynamisk logotyp
      />

      {/* Projekten */}
      <div className="projects-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {projects.map((project, index) => (
          <div key={project.sys.id || index} className="project-item shadow-lg rounded-lg">
            <h2 className="text-xl font-bold">{project.projectTitle || 'Untitled Project'}</h2>
            <p className="text-gray-600">{project.shortDescription || 'No description available'}</p>
            {project.projectImageCollection?.items?.[0]?.url && (
              <img
                src={project.projectImageCollection.items[0].url}
                alt={project.projectImageCollection.items[0].title || 'Project Image'}
                style={{
                  width: '50%',
                  maxHeight: '300px',
                  objectFit: 'cover',
                }}
              />
            )}
            <a href={project.projectLink}>View Github
            </a>
            <a href={`/projects/${project.slug}`} className="project-link text-blue-500 hover:underline mt-4 block">
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
