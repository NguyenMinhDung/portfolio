// Contentful Assets
export interface ContentfulAsset {
  title: string;
  description: string;
  file: {
    url: string;
    details: {
      size: number;
      image?: {
        width: number;
        height: number;
      };
    };
    fileName: string;
    contentType: string;
  };
}

// Hero Section
export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: ContentfulAsset;
}

// About Section
export interface AboutSection {
  id: string;
  title: string;
  description: string;
  image?: ContentfulAsset;
  skills: Skill[];
}

// Skill Category
export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

// Skill
export interface Skill {
  id: string;
  name: string;
  icon: string; // We'll store icon names and map them to components
  level: number;
}

// Project
export interface Project {
  id: string;
  title: string;
  description: string;
  image: ContentfulAsset;
  tags: string[];
  github?: string;
  demo?: string;
}

// BlogPost
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedDate: string;
  excerpt: string;
  content: any; // Rich text content
  featuredImage?: ContentfulAsset;
  tags: string[];
}

// Contact Information
export interface ContactInfo {
  id: string;
  email: string;
  phone?: string;
  address?: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
}

// Site Configuration
export interface SiteConfig {
  id: string;
  siteName: string;
  siteDescription: string;
  logo?: ContentfulAsset;
  primaryColor?: string;
  secondaryColor?: string;
  navigation: Array<{
    label: string;
    path: string;
  }>;
} 