import dotenv from 'dotenv';
import path from 'path';

// Tải biến môi trường từ .env.local hoặc .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
if (!process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || !process.env.CONTENTFUL_SPACE_ID) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.ctfassets.net'],
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