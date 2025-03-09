import { createClient } from 'contentful';
import { env } from './env';

export const contentfulClient = createClient({
  space: env.CONTENTFUL_SPACE_ID,
  accessToken: env.CONTENTFUL_ACCESS_TOKEN,
});

// Define types for query parameters
interface ContentfulQueryParams {
  content_type: string;
  limit?: number;
  skip?: number;
  order?: string;
  locale?: string;
  query?: Record<string, unknown>;
}

// Interface for contentful entries
interface ContentfulEntry {
  fields: Record<string, unknown>;
  sys: {
    id: string;
    type: string;
  };
}

// Generic function to fetch entries from Contentful
export async function fetchEntries<T>({ 
  content_type, 
  limit = 10, 
  skip = 0,
  order = '-sys.createdAt',
  locale = 'en-US', // Default locale is English
  query = {} 
}: ContentfulQueryParams): Promise<T[]> {
  try {
    // Create a params object with types that match the contentful client
    const params: Record<string, unknown> = {
      content_type,
      limit,
      skip,
      order,
      locale,
      ...query,
    };

    const entries = await contentfulClient.getEntries(params);
    
    // Define a more compatible function to process entries
    function mapEntry(item: unknown): Record<string, unknown> {
      if (!item || typeof item !== 'object' || !('fields' in item) || !('sys' in item)) {
        return item as Record<string, unknown>;
      }
      
      const entry = item as ContentfulEntry;
      const fields = { ...entry.fields };
      
      // Process fields
      Object.keys(fields).forEach(key => {
        const value = fields[key];
        
        if (value && typeof value === 'object' && 'sys' in value) {
          fields[key] = mapEntry(value);
        } else if (Array.isArray(value)) {
          fields[key] = value.map(field => {
            if (field && typeof field === 'object' && 'sys' in field) {
              return mapEntry(field);
            }
            return field;
          });
        }
      });

      return {
        ...fields,
        id: entry.sys.id
      };
    };

    return (entries.items.map(entry => mapEntry(entry)) as unknown[]) as T[];
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