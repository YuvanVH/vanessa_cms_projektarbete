//src/app/projects/[slug]/page.js
import { fetchProjectBySlug } from '../../lib/graphql';
import Header from '../../components/Header';

export default async function ProjectDetail({ params }) {
  const project = await fetchProjectBySlug(params.slug);

  const backgroundImage = project.projectImageCollection?.items?.length
    ? project.projectImageCollection.items[0]?.url
    : '/default-image.jpg';

  return (
    <div>
      <Header
        title={project.projectTitle}
        slogan="Discover the project details"
        backgroundImage={backgroundImage}
        logo="/default-logo.png"
      />

      <div>
        <h1>{project.projectTitle}</h1>

        {/* Visa full beskrivning */}
        <p>{project.fullDescription ? project.fullDescription.json : "No description available"}</p>

        {/* Visa kategori */}
        {project.category && project.category.title && (
          <p className="text-sm text-gray-500">Category: {project.category.title}</p>
        )}

        {/* Visa projektlänk */}
        {project.projectLink && (
          <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
            Visit Project
          </a>
        )}

        {/* Visa bilder */}
        <div className="image-gallery">
          {project.projectImageCollection.items.map((image, index) => (
            <div key={index} className="image-item">
              <img
                src={image.url}
                alt={image.title}
                title={image.title}
                className="rounded-lg"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
