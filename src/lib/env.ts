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

// Export các biến môi trường để sử dụng trong ứng dụng
export const env = {
  // Airtable
  AIRTABLE_API_KEY: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || '',
  AIRTABLE_BASE_ID: process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '',
  AIRTABLE_TABLE_NAME: process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME || 'Contacts',
  
  // Contentful
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID || '',
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN || ''
};
