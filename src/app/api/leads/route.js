import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();

    const { name, email, company, service, budget, message } = data || {};

    if (!email || !name) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    console.log('[VELOXA INTAKE LEAD]', {
      timestamp: new Date().toISOString(),
      name,
      email,
      company,
      service,
      budget,
      message,
    });

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully.',
    });
  } catch (error) {
    console.error('Lead processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process lead intake.' },
      { status: 500 }
    );
  }
}
