import Airtable from 'airtable';

/**
 * Khởi tạo Airtable API
 */
const initAirtable = () => {
  const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
  
  if (!apiKey || !baseId) {
    throw new Error('Airtable API key or Base ID is missing');
  }
  
  Airtable.configure({
    apiKey: apiKey
  });
  
  return Airtable.base(baseId);
};

/**
 * Lưu thông tin liên hệ vào Airtable
 * @param data - Dữ liệu form contact
 */
export const saveContactToAirtable = async (data: { 
  name: string;
  email: string;
  message: string;
}) => {
  try {
    const { name, email, message } = data;
    const base = initAirtable();
    const tableName = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME || 'Contacts';
    
    const result = await base(tableName).create([
      {
        fields: {
          Name: name,
          Email: email,
          Message: message,
          SubmittedAt: new Date().toISOString()
        }
      }
    ]);
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Error saving to Airtable:', error);
    return { success: false, error };
  }
}; 