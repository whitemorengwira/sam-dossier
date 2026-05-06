import React from 'react';
import ToolsHubClient from './ToolsHubClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ToolsHubPage() {
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

      <ToolsHubClient />
    </div>
  );
}
