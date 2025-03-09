import { fetchEntries } from './contentful';
import { 
  HeroSection, 
  AboutSection, 
  SkillCategory, 
  Project, 
  BlogPost, 
  ContactInfo,
  SiteConfig 
} from '../types/contentful';

// Fetch site configuration
export const fetchSiteConfig = async (locale = 'en-US'): Promise<SiteConfig | null> => {
  try {
    const configs = await fetchEntries<SiteConfig>({ 
      content_type: 'siteConfig',
      limit: 1,
      locale
    });
    return configs[0] || null;
  } catch (error) {
    console.error('Error fetching site configuration:', error);
    return null;
  }
};

// Fetch hero section data
export const fetchHeroSection = async (locale = 'en-US'): Promise<HeroSection | null> => {
  try {
    const heroSections = await fetchEntries<HeroSection>({ 
      content_type: 'heroSection',
      limit: 1,
      locale
    });
    return heroSections[0] || null;
  } catch (error) {
    console.error('Error fetching hero section data:', error);
    return null;
  }
};

// Fetch about section data
export const fetchAboutSection = async (locale = 'en-US'): Promise<AboutSection | null> => {
  try {
    const aboutSections = await fetchEntries<AboutSection>({ 
      content_type: 'aboutSection',
      limit: 1,
      locale
    });
    return aboutSections[0] || null;
  } catch (error) {
    console.error('Error fetching about section data:', error);
    return null;
  }
};

// Fetch skill categories
export const fetchSkillCategories = async (locale = 'en-US'): Promise<SkillCategory[]> => {
  try {
    return await fetchEntries<SkillCategory>({ 
      content_type: 'skillCategory',
      order: 'fields.order',
      locale
    });
  } catch (error) {
    console.error('Error fetching skill categories:', error);
    return [];
  }
};

// Fetch projects
export const fetchProjects = async (locale = 'en-US'): Promise<Project[]> => {
  try {
    const projects = await fetchEntries<Project>({ 
      content_type: 'project',
      order: '-fields.order',
      locale
    });
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Fetch featured projects (limit to 3)
export const fetchFeaturedProjects = async (locale = 'en-US'): Promise<Project[]> => {
  try {
    return await fetchEntries<Project>({ 
      content_type: 'project',
      limit: 3,
      query: {
        'fields.featured': true
      },
      order: '-fields.order',
      locale
    });
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
};

// Fetch blog posts
export const fetchBlogPosts = async (limit: number = 10, locale = 'en-US'): Promise<BlogPost[]> => {
  try {
    return await fetchEntries<BlogPost>({ 
      content_type: 'blogPost',
      limit,
      order: '-fields.publishedDate',
      locale
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

// Fetch single blog post by slug
export const fetchBlogPostBySlug = async (slug: string, locale = 'en-US'): Promise<BlogPost | null> => {
  try {
    const posts = await fetchEntries<BlogPost>({ 
      content_type: 'blogPost',
      limit: 1,
      query: {
        'fields.slug': slug
      },
      locale
    });
    return posts[0] || null;
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    return null;
  }
};

// Fetch contact information
export const fetchContactInfo = async (locale = 'en-US'): Promise<ContactInfo | null> => {
  try {
    const contactInfos = await fetchEntries<ContactInfo>({ 
      content_type: 'contactInfo',
      limit: 1,
      locale
    });
    return contactInfos[0] || null;
  } catch (error) {
    console.error('Error fetching contact information:', error);
    return null;
  }
}; 