import { fetchProjectBySlug } from '../../lib/graphql';
import Header from '../../components/Header';

export default async function ProjectDetail({ params }) {
  const project = await fetchProjectBySlug(params.slug);

  const backgroundImage = project.projectImage
    ? project.projectImage[0]?.file.url
    : '/default-image.jpg';

  return (
    <div>
      <Header
        title={project.title}
        slogan="Discover the project details"
        backgroundImage={backgroundImage}
        logo="/default-logo.png"
      />

      <div>
        <h1>{project.title}</h1>
        <p>{project.fullDescription.json}</p>
        <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
          Visit Project
        </a>
      </div>
    </div>
  );
}
