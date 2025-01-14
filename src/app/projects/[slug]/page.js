// src/app/projects/[slug]/page.js
import { fetchProjectBySlug } from '../../lib/graphql';
import Header from '../../components/Header';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';

export default async function ProjectDetail({ params }) {
  const { slug } = params;

  // Hämta projektdata
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  const backgroundImage = project?.projectImageCollection?.items?.[0]?.url || '/default-image.jpg';
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

        {/* Klickbar kategori */}
        {project?.categoryCollection?.items?.length > 0 && (
          <p className="text-sm text-gray-500">
            Category:{" "}
            <Link
              href={`/category/${project.categoryCollection.items[0].slug}`}
              className="text-blue-500 underline">
              {project.categoryCollection.items[0].title}
            </Link>
          </p>
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
