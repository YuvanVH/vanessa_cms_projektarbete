//src/app/components/ProjectDetail.js
import { fetchProjectBySlug } from '../../lib/graphql';
import Header from '../../components/Header';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default async function ProjectDetail({ params }) {
  const { slug } = params; // Vänta tills `params` är tillgänglig

  // Hämta projektdata
  const project = await fetchProjectBySlug(slug);

  // Om projektet inte finns, visa en felmeddelande eller en fallback
  if (!project) {
    return <div>Project not found</div>;
  }

  const backgroundImage = project?.projectImageCollection?.items?.length
    ? project.projectImageCollection.items[1]?.url // tar bild nr 2 som bakgrund från contentful
    : '/default-image.jpg';

  // Rendera full beskrivning
  const renderFullDescription = project?.fullDescription?.json
    ? documentToReactComponents(project.fullDescription.json)
    : "No description available";

  return (
    <div>
      <Header
        title={project?.projectTitle || "Project Details"}
        slogan="Discover the project details"
        backgroundImage={backgroundImage}
        logo="/default-logo.png"
      />

      <div>
        <h1>{project?.projectTitle}</h1>

        {/* Rendera full beskrivning */}
        <div>{renderFullDescription}</div>

        {/* Visa kategori */}
        {Array.isArray(project?.categoryCollection?.items) ? (
          project.categoryCollection.items.map((category) => (
            <p key={category.slug} className="text-sm text-gray-500">
              Category: {category.title}
            </p>
          ))
        ) : (
          <p className="text-sm text-gray-500">No categories available</p>
        )}

        {/* Visa projektlänk */}
        {project?.projectLink && (
          <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
            Visit Project
          </a>
        )}

        {/* Visa bilder */}
        <div className="image-gallery">
          {project?.projectImageCollection?.items?.map((image, index) => (
            <div key={index} className="image-item">
              <img
                src={image.url}
                // alt={image.title || "Project Image"}
                title={image.title || "Project Image"}
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
