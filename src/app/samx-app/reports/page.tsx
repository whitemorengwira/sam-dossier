"use client";

import React, { useState } from 'react';
import { Download, RefreshCw, BrainCircuit, Mountain, Gem, DollarSign, Shield } from 'lucide-react';
import { KpiCard } from '../components/ui/KpiCard';

export default function ReportsPage() {
  const [reportState, setReportState] = useState<'idle' | 'generating' | 'done'>('idle');

  const generateReport = () => {
    setReportState('generating');
    setTimeout(() => {
      setReportState('done');
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f1f5f9]">Reports & Analytics</h1>
          <p className="text-[#94a3b8] mt-1">Operational intelligence across all mining modules</p>
        </div>
        <select className="bg-[#111827] border border-[#2d4a6f] rounded-lg p-2 text-sm text-white outline-none focus:border-[#d4870e] self-start md:self-auto">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Last 90 days</option>
          <option>Custom Range</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KpiCard label="ORE EXTRACTED" value="408.6t" icon={Mountain} subtext="10 shifts" trendDirection="up" trend="↗" />
        <KpiCard label="GOLD RECOVERED" value="119.4g" icon={Gem} subtext="Avg grade 4.16 g/t" trendDirection="neutral" trend="📄" />
        <KpiCard label="NET P&L" value="$39,900" icon={DollarSign} subtext="Rev $55,800 / ↑ Profitable" trendDirection="neutral" />
        <KpiCard label="SAFETY EVENTS" value="5" icon={Shield} subtext="2 critical/high" trendDirection="neutral" />
      </div>

      <div className="flex border-b border-[#1e3a5f] overflow-x-auto gap-1">
        <button className="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 text-[#94a3b8] border-transparent hover:text-white">Production</button>
        <button className="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 text-[#94a3b8] border-transparent hover:text-white">Financial</button>
        <button className="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 text-[#94a3b8] border-transparent hover:text-white">Safety</button>
        <button className="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 text-[#94a3b8] border-transparent hover:text-white">Equipment</button>
        <button className="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 text-[#d4870e] border-[#d4870e] flex items-center gap-2">
          <BrainCircuit className="w-4 h-4" /> AI Report
        </button>
      </div>

      <div className="bg-[#111827] border border-[#d4870e]/50 rounded-xl p-6 relative overflow-hidden shadow-[0_0_20px_rgba(212,135,14,0.1)] min-h-[400px]">
        <div className="flex justify-between items-center mb-6 border-b border-[#1e3a5f] pb-4">
          <h2 className="text-xl font-bold text-[#f1f5f9] flex items-center gap-3">
            <BrainCircuit className="w-6 h-6 text-[#d4870e]" />
            AI Executive Report
          </h2>
          {reportState === 'done' && (
            <div className="flex gap-2">
              <button className="btn-outline !py-1.5 text-xs">
                <Download className="w-4 h-4 mr-1.5 inline" /> Download
              </button>
              <button className="btn-primary !py-1.5 text-xs" onClick={generateReport}>
                <RefreshCw className="w-4 h-4 mr-1.5 inline" /> Re-Generate
              </button>
            </div>
          )}
        </div>

        {reportState === 'idle' && (
          <div className="flex flex-col items-center justify-center h-[250px] text-center">
            <div className="w-16 h-16 rounded-full bg-[#d4870e]/10 flex items-center justify-center mb-4">
              <BrainCircuit className="w-8 h-8 text-[#d4870e]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Generate an AI Executive Report</h3>
            <p className="text-[#94a3b8] max-w-sm mb-6 text-sm">
              The AI will analyze all operational data and produce a structured management summary.
            </p>
            <button className="btn-primary" onClick={generateReport}>
              <RefreshCw className="w-4 h-4 mr-2" /> Generate Report
            </button>
          </div>
        )}

        {reportState === 'generating' && (
          <div className="flex flex-col items-center justify-center h-[250px] text-center">
            <div className="w-16 h-16 rounded-full border-4 border-[#1e3a5f] border-t-[#d4870e] animate-spin mb-4"></div>
            <p className="text-[#d4870e] font-medium animate-pulse">Analyzing operational data...</p>
          </div>
        )}

        {reportState === 'done' && (
          <div className="prose prose-invert max-w-none text-sm animate-fade-in bg-[#1a2332] p-6 rounded-lg border border-[#2d4a6f]">
            <h1 className="text-2xl text-white font-bold mb-4">Executive Summary Report</h1>
            
            <h2 className="text-lg text-[#f59e0b] font-semibold mt-6 mb-2 border-b border-[#2d4a6f] pb-2">Executive Summary</h2>
            <p className="text-[#f1f5f9] leading-relaxed">
              In the past 30 days, SAM-X has successfully extracted 408.6 tonnes of ore, yielding 119.40 grams of gold at an average grade of 4.16 g/t. Financially, the operations generated a net income of $39,900, demonstrating sustained profitability despite operational challenges that included five reported safety incidents.
            </p>

            <h2 className="text-lg text-[#f59e0b] font-semibold mt-6 mb-2 border-b border-[#2d4a6f] pb-2">Key Performance Highlights</h2>
            <ul className="list-disc pl-5 text-[#f1f5f9] space-y-3 mt-3">
              <li><strong className="text-white">Production Efficiency:</strong> Total ore extracted reached 408.6 tonnes with an average gold recovery rate of 4.16 grams per tonne (g/t). Alpha Shaft leading in both ore and gold output (243.3 tonnes and 65.3 g).</li>
              <li><strong className="text-white">Financial Performance:</strong> The operation realized a revenue of $55,800 against expenses of $15,900, culminating in a net income of $39,900.</li>
              <li><strong className="text-white">Safety Overview:</strong> There was a total of 5 incidents recorded, 2 of which were classified as critical or high severity (Gas Detection, Collapse Risk).</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
