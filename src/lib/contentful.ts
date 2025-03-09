import { createClient } from 'contentful';
import { env } from './env';

export const contentfulClient = createClient({
  space: env.CONTENTFUL_SPACE_ID,
  accessToken: env.CONTENTFUL_ACCESS_TOKEN,
});

// Generic function to fetch entries from Contentful
export async function fetchEntries<T>({ 
  content_type, 
  limit = 10, 
  skip = 0,
  order = '-sys.createdAt',
  locale = 'en-US', // Default locale is English
  query = {} 
}: { 
  content_type: string, 
  limit?: number, 
  skip?: number,
  order?: string,
  locale?: string,
  query?: any 
}): Promise<T[]> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type,
      limit,
      skip,
      order,
      locale, // Pass the locale to the API
      ...query,
    });
    console.log(entries);
    const mapEntry = (item: any): any => {
      const fields = { ...item.fields };
      
      // Recursively map nested entries
      for (const key in fields) {
        if (fields[key]?.sys?.type === 'Entry' || fields[key]?.sys?.type === 'Asset') {
          fields[key] = mapEntry(fields[key]);
        } else if (Array.isArray(fields[key])) {
          fields[key] = fields[key].map((field: any) => {
            if (field?.sys?.type === 'Entry' || field?.sys?.type === 'Asset') {
              return mapEntry(field);
            }
            return field;
          });
        }
      }

      return {
        ...fields,
        id: item.sys.id
      };
    };

    return entries.items.map(mapEntry) as T[];
  } catch (error) {
    console.error('Error fetching entries from Contentful:', error);
    return [];
  }
}

// Fetch a single entry by ID
export async function fetchEntryById<T>(entryId: string, locale = 'en-US'): Promise<T | null> {
  try {
    const entry = await contentfulClient.getEntry(entryId, { locale });
    return {
      ...entry.fields,
      id: entry.sys.id,
    } as T;
  } catch (error) {
    console.error(`Error fetching entry ${entryId} from Contentful:`, error);
    return null;
  }
} 