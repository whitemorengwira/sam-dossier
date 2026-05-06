import React from 'react';
import ToolsHubClient from './ToolsHubClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// We fetch RSS feeds server-side to avoid CORS issues
async function fetchRSS(url: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const text = await res.text();
    // A simple regex parser for RSS items
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    let count = 0;
    while ((match = itemRegex.exec(text)) !== null && count < 5) {
      const itemContent = match[1];
      const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/);
      const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
      const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
      
      if (titleMatch && linkMatch) {
        items.push({
          title: titleMatch[1] || titleMatch[2],
          link: linkMatch[1],
          pubDate: pubDateMatch ? pubDateMatch[1] : '',
        });
        count++;
      }
    }
    return items;
  } catch (error) {
    console.error('RSS Fetch Error:', error);
    return null;
  }
}

export default async function ToolsHubPage() {
  // Free public RSS feeds for mining/finance
  // Mining.com RSS
  const miningNews = await fetchRSS('https://www.mining.com/feed/') || [];
  // Kitco Gold News RSS (or similar)
  const goldNews = await fetchRSS('https://www.kitco.com/news/rss/') || [];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-serif text-white tracking-wide mb-2 uppercase flex items-center gap-3">
          <span className="text-gold">⚒</span> Operations Tools Hub
        </h1>
        <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
          SAM Dossier Utilities & Live Data
        </p>
      </div>

      <ToolsHubClient miningNews={miningNews} goldNews={goldNews} />
    </div>
  );
}
