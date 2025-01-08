import { NextResponse } from 'next/server';

const APP_SECRIPT =  process.env.NEXT_PUBLIC_APP_SCRIPT_URL

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Ensure services is an array
    if (!Array.isArray(body.services)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Services must be an array',
        },
        { status: 400 }
      );
    }

    // Add the type field to the request body
    const payload = {
      ...body,
      type: 'submit', // Add the type field
    };

    // Send the request to the Google Apps Script
    const response = await fetch(`${APP_SECRIPT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    // Parse the response
    const data = await response.json();

    // Return the response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      },
      { status: 500 }
    );
  }
}