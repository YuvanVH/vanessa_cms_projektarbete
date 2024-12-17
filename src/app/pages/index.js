// src/app/pages/index.js

import { getProjects } from '../lib/api'; // Anpassa sökvägen om nödvändigt

// Denna funktion körs på byggtid och hämtar data från Contentful
export async function getStaticProps() {
  const projects = await getProjects();

  return {
    props: {
      projects, // Skicka projekten som props till komponenten
    },
    revalidate: 60, // sidor kan regenereras varje 60 sek
  };
}

export default function Home({ projects }) {
  return (
    <div>
      <h1>Min Portfolio</h1>
      <div>
        {projects.map((project) => (
          <div key={project.sys.id}>
            <h2>{project.fields.title}</h2>
            <p>{project.fields.description}</p>
            {project.fields.image && (
              <img
                src={project.fields.image.fields.file.url}
                alt={project.fields.title}
                width={500}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
