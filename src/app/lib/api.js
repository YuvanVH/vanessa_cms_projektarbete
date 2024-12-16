// lib/api.js
import { createClient } from 'contentful';

// Skapa Contentful-klient med miljövariabler
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getProjects = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'portfolioProject',
    });
    return response.items;
  } catch (error) {
    console.error('Error fetching data from Contentful:', error);
    return [];
  }
};
