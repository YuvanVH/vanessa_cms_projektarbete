// app/lib/api.js
import client from '../lib/contentfulClient';

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
