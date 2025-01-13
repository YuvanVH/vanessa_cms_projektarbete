// src/app/lib/graphql.js

import { GraphQLClient } from 'graphql-request';

// console.log("CONTENTFUL_ACCESS_TOKEN:", process.env.CONTENTFUL_ACCESS_TOKEN);

// console.log(process.env);

const client = new GraphQLClient(
  'https://graphql.contentful.com/content/v1/spaces/dwkm02rqep4b',
  {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
  }
);


// Funktion för att hämta alla kategorier
export async function fetchCategories() {
  const query = `
    query GetCategories {
      categoryCollection {
        items {
          title
          slug
        }
      }
    }
  `;

  try {
    const data = await client.request(query);
    return data.categoryCollection.items || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

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
          category {
            ... on Category {
              title
              slug
            }
          }
        }
      }
    }
  `;

  try {
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
          projectImageCollection {
            items {
              url
              title
            }
          }
          category {
            ... on Category {
              title
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const variables = { slug };
    const data = await client.request(query, variables);
    return data.projectCollection.items[0] || null; // Return the first project or null if not found
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

// Hämta kategori baserat på slug
export async function fetchCategoryBySlug(slug) {
  const query = `
    query GetCategoryBySlug($slug: String!) {
      categoryCollection(where: {slug: $slug}) {
        items {
          title
          description
          projects {
            projectTitle
            slug
            shortDescription
          }
        }
      }
    }
  `;

  try {
    const data = await client.request(query, { slug });
    return data.categoryCollection.items[0] || null; // Returnera den första kategorin eller null
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
}
