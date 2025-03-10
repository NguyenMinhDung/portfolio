import dotenv from 'dotenv';
import path from 'path';

// Tải biến môi trường từ .env.local hoặc .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
if (!process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || !process.env.CONTENTFUL_SPACE_ID) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

// Get the repository name from the package.json or fallback to 'portfolio'
const REPOSITORY_NAME = process.env.REPOSITORY_NAME || '';

// Determine if we're in production build (GitHub Pages deployment)
const isGithubPages = process.env.IS_GITHUB_PAGES === 'true';

// Define base path for GitHub Pages
// Ensure the repository name is correctly set for GitHub Pages
const basePath = isGithubPages ? `/${REPOSITORY_NAME}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Chỉ sử dụng mode export khi triển khai GitHub Pages hoặc các nền tảng tĩnh khác
  // Lưu ý: API Routes không hoạt động với output: 'export'
  output: isGithubPages ? 'export' : undefined,  
  
  // Set basePath và assetPrefix cho GitHub Pages
  basePath: basePath,
  assetPrefix: isGithubPages ? `/${REPOSITORY_NAME}/` : '',

  // Always use trailing slash for consistent behavior, especially for GitHub Pages
  trailingSlash: true,
  
  images: {
    domains: ['localhost', 'images.ctfassets.net'],
    unoptimized: true, // Required when using export
  },
  // Thêm các biến môi trường mà cả client và server cần truy cập
  env: {
    // Formspree
    NEXT_PUBLIC_FORMSPREE_ENDPOINT: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT,
    
    // Contentful
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    
    // Base Path cho các tài nguyên tĩnh
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig 