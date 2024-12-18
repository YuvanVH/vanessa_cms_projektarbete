import { GraphQLClient } from 'graphql-request';

// GraphQL-query för att hämta PageHeader data
const query = `
  query($pageName: String!) {
    pageHeaderCollection(where: { pageName: $pageName }, limit: 1) {
      items {
        title
        slogan
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

const client = new GraphQLClient('https://graphql.contentful.com/content/v1/spaces/dwkm02rqep4b', {
  headers: {
    Authorization: 'Bearer 7hLXOJToRmAWDEWy6Y0IdyJfdwUqmS1h01k5ojGRrgo',
  },
});


export async function fetchPageHeader(pageName) {
  const variables = { pageName };
  const data = await client.request(query, variables);
  return data.pageHeaderCollection.items[0];
}
