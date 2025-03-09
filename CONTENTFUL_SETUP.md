# Contentful Setup for Portfolio Website

This document will guide you through setting up your Contentful space to work with this portfolio website.

## Prerequisites

1. You need a Contentful account - [Sign up for free here](https://www.contentful.com/sign-up/)
2. Create a new space in Contentful

## API Credentials

After setting up your Contentful space, you need to get your API credentials:

1. Go to Settings > API keys
2. Create a new API key or use the default one
3. Copy the "Space ID" and "Content Delivery API - access token"
4. Add these to your `.env.local` file:

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

## Content Models

You need to create the following content models in your Contentful space:

### 1. Site Config

**Content Type ID**: `siteConfig`

Fields:
- `siteName` (Short text)
- `siteDescription` (Short text)
- `logo` (Media - Image) - Optional
- `primaryColor` (Short text - Hex value) - Optional
- `secondaryColor` (Short text - Hex value) - Optional
- `navigation` (JSON object) - Array of objects with `label` and `path` properties

Example JSON for navigation:
```json
[
  {
    "label": "Trang chủ",
    "path": "/"
  },
  {
    "label": "Giới thiệu",
    "path": "/about"
  },
  {
    "label": "Dự án",
    "path": "/projects"
  },
  {
    "label": "Blog",
    "path": "/blog"
  },
  {
    "label": "Kỹ năng",
    "path": "/skills"
  },
  {
    "label": "Liên hệ",
    "path": "/contact"
  }
]
```

### 2. Hero Section

**Content Type ID**: `heroSection`

Fields:
- `title` (Short text)
- `subtitle` (Short text)
- `description` (Long text)
- `ctaText` (Short text) - Optional
- `ctaLink` (Short text) - Optional
- `backgroundImage` (Media - Image) - Optional

### 3. About Section

**Content Type ID**: `aboutSection`

Fields:
- `title` (Short text)
- `description` (Long text)
- `image` (Media - Image) - Optional
- `skills` (JSON object) - Array of objects with `title` and `icon` properties

Example JSON for skills:
```json
[
  {
    "title": "Python Expert",
    "icon": "python"
  },
  {
    "title": "Machine Learning",
    "icon": "tensorflow"
  },
  {
    "title": "DevOps",
    "icon": "docker"
  },
  {
    "title": "Cloud Computing",
    "icon": "aws"
  }
]
```

### 4. Skill Category

**Content Type ID**: `skillCategory`

Fields:
- `name` (Short text)
- `order` (Integer) - For sorting categories
- `skills` (Reference, many) - References to Skill content type

### 5. Skill

**Content Type ID**: `skill`

Fields:
- `name` (Short text)
- `icon` (Short text) - String identifier for the icon (e.g., "python", "docker", "aws")
- `level` (Integer) - Number from 0-100 representing skill level percentage

### 6. Project

**Content Type ID**: `project`

Fields:
- `title` (Short text)
- `description` (Long text)
- `image` (Media - Image)
- `tags` (Short text, List)
- `github` (Short text) - Optional
- `demo` (Short text) - Optional
- `order` (Integer) - For sorting projects
- `featured` (Boolean) - To mark featured projects

### 7. Blog Post

**Content Type ID**: `blogPost`

Fields:
- `title` (Short text)
- `slug` (Short text) - URL-friendly identifier
- `publishedDate` (Date & time)
- `excerpt` (Short text)
- `content` (Rich text)
- `featuredImage` (Media - Image) - Optional
- `tags` (Short text, List)

### 8. Contact Info

**Content Type ID**: `contactInfo`

Fields:
- `email` (Short text)
- `phone` (Short text) - Optional
- `address` (Short text) - Optional
- `socialLinks` (JSON object) - Array of objects with `platform` and `url` properties

Example JSON for socialLinks:
```json
[
  {
    "platform": "GitHub",
    "url": "https://github.com/yourusername"
  },
  {
    "platform": "LinkedIn",
    "url": "https://linkedin.com/in/yourusername"
  },
  {
    "platform": "Twitter",
    "url": "https://twitter.com/yourusername"
  }
]
```

## Available Icons

The following icon names are supported for skills and other places:

- Programming Languages: `python`, `javascript`, `typescript`, `golang`
- Frameworks: `react`, `node`, `nodejs`
- AI & ML: `tensorflow`, `pytorch`, `langchain`
- DevOps & Cloud: `docker`, `kubernetes`, `k8s`, `aws`, `gcp`, `googlecloud`, `azure`
- Other: `database`, `db`, `code`, `github`, `cicd`, `external`, `link`

## Adding Content

After creating all the content models, add at least one entry for each content type. For SiteConfig, HeroSection, AboutSection, and ContactInfo, you only need one entry as the system will use the first one found.

## Testing Your Setup

Once you've set up all content models and added some entries, restart your development server and your portfolio website should now display content from Contentful. You can modify content in Contentful and see changes reflected on your site without changing any code! 