import client from '../lib/contentfulClient';

export const fetchMenuItems = async () => {
  try {
    const res = await client.getEntries({ content_type: 'mainMenu' });
    return res.items;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
};
