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
