//src/app/projects/[slug]/page.js
import { fetchProjectBySlug } from '../../lib/graphql';
import Header from '../../components/Header';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';
import styles from './projectDetail.module.css';

export default async function ProjectDetail(props) {
  const params = await props.params;
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
      <div className={styles.container}>
        <h1 className={styles.title}>{project?.projectTitle}</h1>

        {/* Klickbar kategori */}
        {project?.categoryCollection?.items?.length > 0 && (
          <p className="text-sm text-gray-500"><strong>
            Category:{" "}
            <Link
              href={`/category/${project.categoryCollection.items[0].slug}`}
              className={styles.categoryLink}>
              {project.categoryCollection.items[0].title}
            </Link>
          </strong>
          </p>
        )}

        {/* Rendera full beskrivning */}
        <div className={styles.description}>{renderFullDescription}
        </div>

        {/* Visa projektlänk */}
        {project?.projectLink && (
          <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
            Visit Project
          </a>
        )}

        {/* Visa bilder */}
        <div className={styles.imageGallery}>
          {project?.projectImageCollection?.items?.map((image, index) => (
            <div key={index} className={styles.imageItem}>
              <img
                src={image.url}
                alt={image.title}
                title={image.title}
                className="rounded-lg"
                style={{ padding: '1vh', width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
