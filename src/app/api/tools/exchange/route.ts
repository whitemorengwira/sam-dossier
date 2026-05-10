import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Exchange rate API responded with ${res.status}`);
    }
    
    const data = await res.json();
    const zarRate = data.rates?.ZAR;
    
    if (!zarRate) {
      throw new Error('ZAR rate not found in response');
    }
    
    return NextResponse.json({ rate: zarRate });
  } catch (error: unknown) {
    console.error('Failed to fetch exchange rate:', error);
    return NextResponse.json({ error: 'Failed to load exchange rate' }, { status: 500 });
  }
}
