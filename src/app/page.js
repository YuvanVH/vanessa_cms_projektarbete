// src/app/page.js
import Image from "next/image";
import styles from "./styles/page.module.css";

export default function Home() {
  return (
    <div>
      <h1>My Portfolio</h1>
      {/* <div>
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
      </div> */}
    </div>);
}
