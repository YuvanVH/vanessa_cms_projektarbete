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
    query GetProjects($limit: Int) {
      projectCollection(limit: $limit) {
        items {
          sys {
            id
          }
          projectTitle
          slug
          shortDescription
          projectLink
          projectImageCollection(limit: 1) {
            items {
              url
              title
            }
          }
          categoryCollection {
            items {
              ... on Category {
                title
                slug
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    limit: 5, // Justera detta beroende på hur många projekt du vill hämta
  };

  try {
    const data = await client.request(query, variables);
    return data.projectCollection.items || []; // Returnera projekten om de finns
  } catch (error) {
    console.error("Error fetching projects:", error);
    return []; // Returnera en tom array vid fel
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
          projectImageCollection(limit: 4) {
            items {
              url
              title
            }
          }
          categoryCollection {
            items {
              ... on Category {
                title
                slug
              }
            }
          }
        }
      }
    }
  `;

  const variables = { slug };  // Skicka med variabeln slug här

  try {
    const data = await client.request(query, variables);  // Passera variabler som ett objekt
    return data.projectCollection.items[0] || null; // Returnera första projektet eller null
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}


// Hämta kategori baserat på slug
export async function fetchCategoryBySlug(slug) {
  const query = `
    query GetCategoryBySlug($slug: String!) {
      categoryCollection(where: { slug: $slug }, limit: 2) {
        items {
          title
          slug
          backgroundImage {
            url
          }
        }
      }
    }
  `;

  try {
    const data = await client.request(query, { slug });
    if (!data.categoryCollection.items.length) {
      console.error(`No category found for slug: ${slug}`);
      return null;
    }
    return data.categoryCollection.items[0];
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export async function filterProjectsByCategory(categorySlug) {
  const query = `
    query GetProjectsByCategory($categorySlug: String!) {
      projectCollection(where: { categoryCollection_some: { slug: $categorySlug } }) {
        items {
          sys {
            id
          }
          projectTitle
          slug
          shortDescription
          projectLink
          projectImageCollection(limit: 1) {
            items {
              url
              title
            }
          }
          categoryCollection {
            items {
              title
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const data = await client.request(query, { categorySlug });
    return data.projectCollection.items || [];
  } catch (error) {
    console.error("Error filtering projects:", error);
    return [];
  }
}

export async function fetchErrorPage() {
  const query = `
    query {
      errorPageCollection(limit: 1) {
        items {
          title
          errorMessage {
            json
          }
          errorImage {
            url
          }
          cta
          backgroundImage {
            url
          }
          logo {
            url
          }
          slogan {
            json
          }
        }
      }
    }
  `;

  try {
    const data = await client.request(query);
    return data.errorPageCollection.items[0] || null; // Returnera första error-sidan
  } catch (error) {
    console.error('Error fetching error page:', error);
    return null; // Hantera fel
  }
}
