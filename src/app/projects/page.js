// src/app/projects/[slug]/page.js
import { fetchPageHeader, fetchProjects } from '../lib/graphql';
import Header from '../components/Header';

export default async function ProjectsPage() {
  const pageHeader = await fetchPageHeader('My Projects'); // Hämta headerdata för projektsidan
  const projects = await fetchProjects(); // Hämta alla projekt

  const backgroundImage = pageHeader.backgroundImage
    ? pageHeader.backgroundImage.url
    : '/default-image.jpg';
  const logo = pageHeader.logo ? pageHeader.logo.url : '/default-logo.png';
  const slogan = pageHeader.slogan
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
        title={pageHeader.title} // Dynamisk titel för projektsidan
        slogan={slogan} // Dynamisk slogan
        backgroundImage={backgroundImage} // Dynamisk bakgrundsbild
        logo={logo} // Dynamisk logotyp
      />

      {/* Projekten */}
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.sys.id} className="project-item">
            <h2>{project.title}</h2>
            <p>{project.shortDescription}</p>
            {project.projectImage && (
              <img
                src={project.projectImage[0]?.file.url}
                alt={project.projectImage[0]?.title}
                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
              />
            )}
            <a href={`/projects/${project.slug}`} className="project-link">
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
