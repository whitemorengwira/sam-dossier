import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export const dynamic = 'force-dynamic';

const parser = new Parser({
  timeout: 5000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region') || 'world';
    
    // Determine the query based on the region
    let query = '';
    switch (region) {
      case 'sa':
        query = 'South+Africa+Mining+Industry';
        break;
      case 'southern-africa':
        query = 'Southern+Africa+Mining';
        break;
      case 'africa':
        query = 'Africa+Mining';
        break;
      case 'world':
      default:
        query = 'Global+Mining+Industry';
        break;
    }

    const url = `https://news.google.com/rss/search?q=${query}&hl=en-ZA&gl=ZA&ceid=ZA:en`;
    
    const feed = await parser.parseURL(url);
    
    const items = feed.items.slice(0, 8).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      source: item.creator || item.source || 'Google News'
    }));

    return NextResponse.json({ items, region });
  } catch (error: any) {
    console.error(`Failed to fetch RSS for region`, error);
    return NextResponse.json({ error: 'Failed to load RSS feed', items: [] }, { status: 500 });
  }
}
