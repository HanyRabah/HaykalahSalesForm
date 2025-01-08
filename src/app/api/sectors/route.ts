import { NextResponse } from 'next/server';

const APP_SECRIPT =  process.env.NEXT_PUBLIC_APP_SCRIPT_URL

// Reuse the fetchData utility function
async function fetchData(url: string, method: 'GET' | 'POST', body?: Record<string, unknown>) {
  const response = await fetch(url, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
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
    const data = await fetchData(`${APP_SECRIPT}?type=sectors`, 'GET');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch sectors',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.sector) {
      throw new Error('Invalid sector data');
    }

    // Include the type in the request body
    const data = await fetchData(`${APP_SECRIPT}`, 'POST', {
      type: 'sectors', // Add the type here
      sector: body.sector,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error adding sector:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add sector',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}