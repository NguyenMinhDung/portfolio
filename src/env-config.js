// Tải biến môi trường ngay khi ứng dụng khởi động
require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env.local') });

// Fallback đến .env nếu .env.local không được tìm thấy
if (!process.env.CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_AIRTABLE_API_KEY) {
  require('dotenv').config({ path: require('path').resolve(process.cwd(), '.env') });
}

// Log để kiểm tra biến môi trường
console.log('Early environment load complete:', {
  contentfulSpaceIdExists: !!process.env.CONTENTFUL_SPACE_ID,
  contentfulAccessTokenExists: !!process.env.CONTENTFUL_ACCESS_TOKEN,
  airtableApiKeyExists: !!process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
}); 