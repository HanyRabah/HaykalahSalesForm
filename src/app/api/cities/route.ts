import { NextResponse } from 'next/server';

const APP_SECRIPT =  process.env.NEXT_PUBLIC_APP_SCRIPT_URL

// Utility function to handle fetch requests
async function fetchData(url: string, method: 'GET') {
  const response = await fetch(url, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    console.error('Invalid response format:', text);
    throw new Error('Invalid response format from server');
  }

  return response.json();
}

export async function GET() {
  try {
    const data = await fetchData(`${APP_SECRIPT}?type=cities`, 'GET');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch cities',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}