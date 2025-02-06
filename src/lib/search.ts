import { Client } from '@elastic/elasticsearch';

const client = new Client({
  cloud: {
    id: import.meta.env.ELASTICSEARCH_CLOUD_ID
  },
  auth: {
    apiKey: import.meta.env.ELASTICSEARCH_API_KEY
  }
});

export async function searchBusinesses(query: string, category: string, page = 1) {
  const result = await client.search({
    index: 'businesses',
    body: {
      from: (page - 1) * 24,
      size: 24,
      query: {
        bool: {
          must: [
            query ? {
              multi_match: {
                query,
                fields: ['name', 'description']
              }
            } : { match_all: {} },
            category !== 'all' ? {
              match: { category }
            } : { match_all: {} }
          ]
        }
      }
    }
  });

  return result.hits;
} 