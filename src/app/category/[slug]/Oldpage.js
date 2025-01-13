// src/app/category/[slug]/page.js
import { fetchProjectBySlug, fetchCategoryBySlug } from '../../lib/graphql';

export default async function SlugPage({ params }) {
  const { slug } = params; // Hämta slug från URL

  // Försök att hämta data för både projekt och kategori
  const project = await fetchProjectBySlug(slug);
  const category = await fetchCategoryBySlug(slug);

  // Om slugen matchar ett projekt
  if (project) {
    return (
      <div>
        <h1>{project.projectTitle}</h1>
        <p>{project.fullDescription?.json || 'No description available'}</p>
        {/* Rendera projektets data */}
      </div>
    );
  }

  // Om slugen matchar en kategori
  if (category) {
    return (
      <div>
        <h1>{category.title}</h1>
        <p>{category.description || 'No description available'}</p>
        {/* Rendera projekten som är kopplade till denna kategori */}
        <div>
          {category.projects.map((project) => (
            <div key={project.id}>
              <h2>{project.projectTitle}</h2>
              <p>{project.shortDescription}</p>
              <a href={`/projects/${project.slug}`}>View Project</a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Om inget hittas, visa 404-sidan
  return <div>Page not found</div>;
}
