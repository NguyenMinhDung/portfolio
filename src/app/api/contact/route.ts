import { NextResponse } from 'next/server';
import Airtable from 'airtable';
import { env } from '@/lib/env';

// Khởi tạo Airtable API
const initAirtable = () => {
  const apiKey = env.AIRTABLE_API_KEY;
  const baseId = env.AIRTABLE_BASE_ID;
  
  if (!apiKey || !baseId) {
    console.error('Airtable configuration missing:', { apiKey: !!apiKey, baseId: !!baseId });
    throw new Error('Airtable API key or Base ID is missing');
  }
  
  Airtable.configure({
    apiKey
  });
  
  return Airtable.base(baseId);
};

// API route handler cho POST request
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;
    
    // Validate
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Lưu vào Airtable
    const base = initAirtable();
    const tableName = env.AIRTABLE_TABLE_NAME;
    
    console.log('Saving to Airtable table:', tableName);
    
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
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in contact API route:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save contact information' },
      { status: 500 }
    );
  }
} 