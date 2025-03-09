import dotenv from 'dotenv';
import path from 'path';

// Tải biến môi trường từ .env.local hoặc .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
if (!process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || !process.env.CONTENTFUL_SPACE_ID) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

// Get the repository name from the package.json or fallback to 'portfolio'
const REPOSITORY_NAME = process.env.REPOSITORY_NAME || 'portfolio';

// Determine if we're in production build (GitHub Pages deployment)
const isGithubPages = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Add static export for GitHub Pages deployment
  
  // Set basePath and assetPrefix for GitHub Pages
  basePath: isGithubPages ? `/${REPOSITORY_NAME}` : '',
  assetPrefix: isGithubPages ? `/${REPOSITORY_NAME}/` : '',
  
  images: {
    domains: ['localhost', 'images.ctfassets.net'],
    unoptimized: true, // Required when using export
  },
  // Thêm các biến môi trường mà cả client và server cần truy cập
  env: {
    // Airtable
    NEXT_PUBLIC_AIRTABLE_API_KEY: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
    NEXT_PUBLIC_AIRTABLE_BASE_ID: process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID,
    NEXT_PUBLIC_AIRTABLE_TABLE_NAME: process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME,
    
    // Contentful
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN
  },
}

export default nextConfig 