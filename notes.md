vanessa@MacBook-Pro---VH app % ls
about                   contact                 instruktioner.md        lib                     projects
components              favicon.ico             layout.js               page.js                 styles
vanessa@MacBook-Pro---VH app %

vanessa@MacBook-Pro---VH components % ls
Footer.js       Header.js

vanessa@MacBook-Pro---VH lib % ls
graphql.js

vanessa@MacBook-Pro---VH projects % ls
[slug].js

vanessa@MacBook-Pro---VH styles % ls
globals.css             header.module.css       page.module.css
_________________
Contentful

content modeler jag har hittils:
Category -
name (short text)
description (short text)

Page -
title (entry title short text)
slogan (rich text)
image (media)

PageHeader
title (entry title short text)
slogan (rich text)
backgroundImage (media)
logo (media)

i pageHeader gjorde jag content
-	Welcome to My Portfolio
- About Me
- Contact

Project -
title (entry title short text)
shortDescription (Short text)
fullDescription (Rich text)
images (Media, many files)
category (Reference)
projectLink (Short text)

___________
och hur är det med denna filen?

// src/app/projects/page.js
import { fetchPageHeader, fetchProjects } from '../lib/graphql';
import Header from '../components/Header';

export default async function ProjectsPage() {
  const pageHeader = await fetchPageHeader('My Projects'); // Hämta headerdata för projektsidan
  const projects = await fetchProjects(); // Hämta alla projekt

  // Default-värden om något saknas
  const backgroundImage = pageHeader?.backgroundImage?.url || '/default-image.jpg';
  const logo = pageHeader?.logo?.url || '/default-logo.png';
  const slogan = pageHeader?.slogan
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
        title={pageHeader?.title || "Projects"} // Dynamisk titel för projektsidan
        slogan={slogan} // Dynamisk slogan
        backgroundImage={backgroundImage} // Dynamisk bakgrundsbild
        logo={logo} // Dynamisk logotyp
      />

      {/* Projekten */}
      <div className="projects-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {projects.map((project) => (
          <div key={project.sys.id} className="project-item shadow-lg rounded-lg">
            <h2 className="text-xl font-bold">{project.projectTitle}</h2>
            <p className="text-gray-600">{project.shortDescription}</p>
            {project.projectImage && project.projectImage.length > 0 && (
              <img
                src={project.projectImage[0]?.file.url}
                alt={project.projectImage[0]?.title || 'Project Image'}
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'cover',
                }}
              />
            )}
            <a href={`/projects/${project.slug}`} className="project-link text-blue-500 hover:underline mt-4 block">
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
________________
project

 <div className="projects-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {projects.map((project) => (
          <div key={project.sys.id} className="project-item shadow-lg rounded-lg">
            <h2 className="text-xl font-bold">{project.projectTitle}</h2>
            <p className="text-gray-600">{project.shortDescription}</p>
            {project.projectImageCollection?.items?.length > 0 && (
              <img
                src={project.projectImageCollection.items[0]?.url}
                alt={project.projectImageCollection.items[0]?.title || 'Project Image'}
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'cover',
                }}
              />
            )}
            <p className="text-gray-500 mt-2">Category: {project.category?.projectTitle}</p> {/* Visar projektkategori */}
            <a href={`/projects/${project.slug}`} className="project-link text-blue-500 hover:underline mt-4 block">
              View Details
            </a>
          </div>
        ))}
      </div>
