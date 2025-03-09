import dotenv from 'dotenv';
import path from 'path';

// Tải biến môi trường từ file .env.local hoặc .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Fallback đến .env nếu không tìm thấy .env.local
if (!process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || !process.env.CONTENTFUL_SPACE_ID) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

// Đảm bảo các biến môi trường cần thiết đã được tải
const requiredEnvVars = [
  // Airtable
  'NEXT_PUBLIC_AIRTABLE_API_KEY',
  'NEXT_PUBLIC_AIRTABLE_BASE_ID',
  'NEXT_PUBLIC_AIRTABLE_TABLE_NAME',
  // Contentful
  'CONTENTFUL_SPACE_ID',
  'CONTENTFUL_ACCESS_TOKEN'
];

// Ghi nhận biến môi trường nào đang bị thiếu
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn(`Missing environment variables: ${missingEnvVars.join(', ')}`);
}

// Định nghĩa các biến môi trường với giá trị mặc định khi cần
export const env = {
  // Airtable
  AIRTABLE_API_KEY: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || '',
  AIRTABLE_BASE_ID: process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '',
  AIRTABLE_TABLE_NAME: process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME || 'Contacts',
  
  // Contentful
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID || '',
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  
  // GitHub Pages
  REPOSITORY_NAME: process.env.REPOSITORY_NAME || '',
  IS_GITHUB_PAGES: process.env.IS_GITHUB_PAGES === 'true',
};

// Một hàm tiện ích để tải biến môi trường, có thể sử dụng ở bất kỳ đâu trong ứng dụng
export function loadEnv() {
  return { ...env };
}

export default env;