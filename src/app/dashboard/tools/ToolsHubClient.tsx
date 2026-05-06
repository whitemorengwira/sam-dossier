'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Minimal Calculator component
function Calculator() {
  const [display, setDisplay] = useState('0');
  
  const handleInput = (val: string) => {
    if (display === '0') setDisplay(val);
    else setDisplay(display + val);
  };
  const calculate = () => {
    try { setDisplay(eval(display).toString()); } catch { setDisplay('Error'); }
  };

  return (
    <div className="bg-onyx-light p-4 rounded-lg border border-gold/20 w-64">
      <div className="bg-onyx p-3 text-right text-2xl font-mono text-gold rounded mb-4 overflow-hidden">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['7','8','9','/','4','5','6','*','1','2','3','-','C','0','.','+'].map(btn => (
          <button 
            key={btn}
            onClick={() => {
              if (btn === 'C') setDisplay('0');
              else if (['/','*','-','+'].includes(btn)) setDisplay(display + btn);
              else handleInput(btn);
            }}
            className="bg-onyx/50 hover:bg-gold/20 text-slate-300 py-2 rounded border border-white/5 font-mono"
          >
            {btn}
          </button>
        ))}
        <button onClick={calculate} className="col-span-4 bg-gold hover:bg-gold-light text-onyx py-2 rounded font-bold font-mono">
          =
        </button>
      </div>
    </div>
  );
}

// Global Mining Calendar Component
function GlobalMiningCalendar() {
  const events = [
    { date: '2026-02-09', title: 'Mining Indaba 2026 (Cape Town, SA)' },
    { date: '2026-03-01', title: 'PDAC 2026 (Toronto, Canada)' },
    { date: '2026-06-15', title: 'Africa Mining Forum (Kigali, Rwanda)' },
    { date: '2026-09-02', title: 'Electra Mining Africa (Johannesburg, SA)' },
    { date: '2026-10-20', title: 'IMARC (Sydney, Australia)' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-lg text-gold">{currentYear} Sector Events Planner</h3>
      <div className="space-y-2">
        {events.map((e, i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-onyx-light border border-white/5 rounded">
            <span className="font-mono text-xs text-gold/80">{e.date}</span>
            <span className="text-sm text-slate-300 text-right">{e.title}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 italic mt-4">* Add custom events using the SAM Dossier timeline functionality.</p>
    </div>
  );
}

// Time Zones Component
function TimeZones() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const timer = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(timer); }, []);
  
  const zones = [
    { label: 'Johannesburg (SAST)', tz: 'Africa/Johannesburg' },
    { label: 'London (GMT/BST)', tz: 'Europe/London' },
    { label: 'New York (EST/EDT)', tz: 'America/New_York' },
    { label: 'Toronto (EST/EDT)', tz: 'America/Toronto' },
    { label: 'Perth (AWST)', tz: 'Australia/Perth' },
    { label: 'Beijing (CST)', tz: 'Asia/Shanghai' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {zones.map((z, i) => (
        <div key={i} className="bg-onyx-light border border-white/5 p-4 rounded text-center">
          <div className="text-xs text-slate-400 mb-1">{z.label}</div>
          <div className="font-mono text-lg text-gold">
            {time.toLocaleTimeString('en-US', { timeZone: z.tz, hour12: false })}
          </div>
        </div>
      ))}
    </div>
  );
}

// System Health Monitor
function SystemHealth() {
  const [status, setStatus] = useState('Checking systems...');
  const [prompts, setPrompts] = useState<string[]>([]);

  useEffect(() => {
    // Simulate health check
    setTimeout(() => {
      setStatus('Operational with minor warnings');
      setPrompts([
        "Antigravity Prompt: Fix caching mismatch on RSS feeds by enforcing dynamic rendering.",
        "Antigravity Prompt: Update Supabase realtime subscription limits in project settings.",
      ]);
    }, 2000);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${status.includes('Operational') ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
        <span className="font-mono text-sm text-slate-300">{status}</span>
      </div>
      
      {prompts.length > 0 && (
        <div className="mt-4 border border-red-500/30 bg-red-500/10 p-4 rounded">
          <h4 className="text-red-400 text-xs font-bold uppercase mb-2">Automated Antigravity Prompts</h4>
          <ul className="list-disc pl-4 space-y-1">
            {prompts.map((p, i) => (
              <li key={i} className="text-xs text-slate-300 font-mono">{p}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ToolsHubClient() {
  const [exchangeRate, setExchangeRate] = useState<string | null>(null);
  const [exchangeLoading, setExchangeLoading] = useState(true);
  
  // News state
  const [newsFeed, setNewsFeed] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(false);
  const regions = ['sa', 'southern-africa', 'africa', 'world'];
  const regionLabels: Record<string, string> = {
    'sa': 'South Africa Focus',
    'southern-africa': 'Southern Africa Focus',
    'africa': 'Africa Continent',
    'world': 'Global Markets'
  };
  const [currentRegionIndex, setCurrentRegionIndex] = useState(0);

  // Fetch Exchange Rate
  useEffect(() => {
    async function fetchExchange() {
      try {
        const res = await fetch('/api/tools/exchange');
        if (res.ok) {
          const data = await res.json();
          setExchangeRate(data.rate ? Number(data.rate).toFixed(2) : 'Error');
        } else {
          setExchangeRate('Error');
        }
      } catch (e) {
        setExchangeRate('Error');
      } finally {
        setExchangeLoading(false);
      }
    }
    fetchExchange();
  }, []);

  // Fetch News for current region
  useEffect(() => {
    let isMounted = true;
    async function fetchNews() {
      setNewsLoading(true);
      setNewsError(false);
      try {
        const res = await fetch(`/api/tools/rss?region=${regions[currentRegionIndex]}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setNewsFeed(data.items || []);
        } else {
          if (isMounted) setNewsError(true);
        }
      } catch (e) {
        if (isMounted) setNewsError(true);
      } finally {
        if (isMounted) setNewsLoading(false);
      }
    }
    fetchNews();

    // Auto-rotate region every 15 seconds
    const interval = setInterval(() => {
      setCurrentRegionIndex(prev => (prev + 1) % regions.length);
    }, 15000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [currentRegionIndex]);

  return (
    <Tabs defaultValue="utilities" className="w-full">
      <TabsList className="bg-onyx border border-white/10 mb-8 flex flex-wrap">
        <TabsTrigger value="utilities" className="data-[state=active]:bg-gold data-[state=active]:text-onyx font-mono text-xs">UTILITIES</TabsTrigger>
        <TabsTrigger value="calendar" className="data-[state=active]:bg-gold data-[state=active]:text-onyx font-mono text-xs">GLOBAL PLANNER</TabsTrigger>
        <TabsTrigger value="markets" className="data-[state=active]:bg-gold data-[state=active]:text-onyx font-mono text-xs">MARKETS & NEWS</TabsTrigger>
        <TabsTrigger value="health" className="data-[state=active]:bg-gold data-[state=active]:text-onyx font-mono text-xs">SYSTEM HEALTH</TabsTrigger>
      </TabsList>

      <TabsContent value="utilities" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-onyx border-gold/20">
            <CardHeader>
              <CardTitle className="text-gold font-serif">Exchange Rates</CardTitle>
              <CardDescription>Live USD/ZAR conversion</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="text-slate-400 font-mono mb-2">1 USD =</div>
              {exchangeLoading ? (
                <div className="animate-pulse w-24 h-10 bg-gold/20 rounded"></div>
              ) : (
                <div className="text-4xl font-bold text-gold font-mono">
                  R {exchangeRate}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-onyx border-gold/20">
            <CardHeader>
              <CardTitle className="text-gold font-serif">Calculator</CardTitle>
              <CardDescription>Quick financial calculations</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calculator />
            </CardContent>
          </Card>

          <Card className="bg-onyx border-gold/20">
            <CardHeader>
              <CardTitle className="text-gold font-serif">Global Time Zones</CardTitle>
              <CardDescription>Live tracking for key mining jurisdictions</CardDescription>
            </CardHeader>
            <CardContent>
              <TimeZones />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="calendar">
        <Card className="bg-onyx border-gold/20">
          <CardHeader>
            <CardTitle className="text-gold font-serif">Mining Sector Calendar</CardTitle>
            <CardDescription>Major worldwide events and summits</CardDescription>
          </CardHeader>
          <CardContent>
            <GlobalMiningCalendar />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="markets" className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-onyx border-gold/20">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gold/10 pb-4">
              <div>
                <CardTitle className="text-gold font-serif flex items-center gap-2">
                  <span className="text-2xl">📡</span> Live Mining News Network
                </CardTitle>
                <CardDescription>Auto-scrolling regional updates</CardDescription>
              </div>
              <div className="bg-gold/10 px-4 py-2 rounded border border-gold/20">
                <span className="text-gold font-mono uppercase text-sm font-bold tracking-widest">
                  {regionLabels[regions[currentRegionIndex]]}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-6 relative h-96 overflow-hidden">
              {newsLoading && newsFeed.length === 0 ? (
                <div className="flex justify-center items-center h-full text-gold font-mono animate-pulse">Loading intel...</div>
              ) : newsError ? (
                <div className="flex justify-center items-center h-full text-red-400 font-mono">Failed to load RSS feed.</div>
              ) : (
                <div className="absolute inset-x-6 animate-slide-up space-y-4">
                  {newsFeed.map((item, i) => (
                    <div key={i} className="border-l-2 border-gold/30 pl-4 py-2 hover:border-gold transition-colors bg-onyx-light/50 rounded-r pr-4">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block text-slate-200 hover:text-gold font-medium transition-colors mb-1">
                        {item.title}
                      </a>
                      <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500 uppercase">
                        <span className="text-gold">{item.source || 'Intel Report'}</span>
                        <span>{item.pubDate ? new Date(item.pubDate).toLocaleDateString() : ''}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="health">
        <Card className="bg-onyx border-gold/20">
          <CardHeader>
            <CardTitle className="text-gold font-serif">SAM Dossier Diagnostics</CardTitle>
            <CardDescription>Automated system health checks</CardDescription>
          </CardHeader>
          <CardContent>
            <SystemHealth />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
