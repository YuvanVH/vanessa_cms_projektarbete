// src/app/lib/graphql.js
import { GraphQLClient } from 'graphql-request';

// Contentful GraphQL endpoint
const client = new GraphQLClient(
  'https://graphql.contentful.com/content/v1/spaces/dwkm02rqep4b',
  {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
  }
);

export async function fetchPageHeader(pageSlug) {
  const query = `
    query {
      pageHeaderCollection(limit: 100) {
        items {
          title
          slogan {
            json
          }
          backgroundImage {
            url
          }
          logo {
            url
          }
        }
      }
    }
  `;

  try {
    const data = await client.request(query);
    const pageHeader = data.pageHeaderCollection.items.find(
      (item) => item.title.toLowerCase() === pageSlug.toLowerCase()
    );

    if (pageHeader) {
      return pageHeader;
    } else {
      console.error('No data found for the provided pageSlug:', pageSlug);
      return {};
    }
  } catch (error) {
    console.error('Error fetching page header data:', error);
    return {};
  }
}

// Hämtar projekt
export async function fetchProjects() {
  const query = `
    query GetProjects {
      projectCollection {
        items {
          sys {
            id
          }
          projectTitle
          slug
          shortDescription
          projectLink
          projectImageCollection {
            items {
              url
              title
            }
          }
        }
      }
    }
  `;

  try {
    // Använd samma klient som i fetchPageHeader
    const data = await client.request(query);
    console.log("Fetched projects data:", data);
    return data.projectCollection.items || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function fetchProjectBySlug(slug) {
  const query = `
  query GetProjectBySlug($slug: String!) {
    projectCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys {
          id
        }
        projectTitle
        slug
        fullDescription {
          json
        }
        projectLink
        category {
          ... on Category {
            projectTitle
          }
        }
        projectImageCollection {
          items {
            url
            title
          }
        }
      }
    }
  }
  `;

  // Här skickar variabeln slug när man gör förfrågan
  try {
    const variables = { slug }; // Variabeln skickas med här
    const data = await client.request(query, variables); // Förfrågan med variabeln
    console.log("Fetched project by slug:", data);
    return data.projectCollection.items[0] || null; // Returnera projektet om det finns
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}
