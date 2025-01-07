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

export async function fetchProjects() {
  const query = `
    query {
      projectCollection {
        items {
          sys {
            id
          }
          title
          slug
          shortDescription
          fullDescription {
            json
          }
          category {
            title
          }
          projectLink
          projectImage {
            title
            file {
              url
              fileName
            }
          }
        }
      }
    }
  `;

  try {
    const data = await client.request(query);
    return data.projectCollection.items; // Returnera alla projekt
  } catch (error) {
    console.error('Error fetching projects:', error.response ? error.response.errors : error);
    return []; // Returnera en tom array om något går fel
  }
}
