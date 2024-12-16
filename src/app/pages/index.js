// pages/index.js
import { getProjects } from '../lib/api';

export async function getStaticProps() {
  const projects = await getProjects(); // Hämta projekten från Contentful

  return {
    props: {
      projects,
    },
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
            <img
              src={project.fields.image.fields.file.url}
              alt={project.fields.title}
              width={500}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
