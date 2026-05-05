import React from 'react';
import { 
  Mountain, Gem, Users, Shield, Wrench, 
  DollarSign, ClipboardCheck, Lock, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { KpiCard } from './components/ui/KpiCard';
import { AlertBanner } from './components/ui/AlertBanner';
import { ProductionTrendChart } from './components/charts/ProductionTrendChart';
import { ExpenseDonutChart } from './components/charts/ExpenseDonutChart';
import { Badge } from './components/ui/Badge';

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#f1f5f9]">Executive Dashboard</h1>
        <p className="text-[#94a3b8] mt-1">Real-time mining operations overview</p>
      </div>

      {/* Alert Banners */}
      <div className="space-y-3">
        <AlertBanner 
          id="alert-1"
          type="warning"
          title="Safety Alert"
          message="2 critical incidents require immediate attention"
          route="/samx-app/safety"
        />
        <AlertBanner 
          id="alert-2"
          type="warning"
          title="Inventory"
          message="2 items running low on stock"
          route="/samx-app/inventory"
        />
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KpiCard label="Ore Today" value="45.2t" icon={Mountain} trend="vs yesterday" trendDirection="up" />
        <KpiCard label="Gold Recovered" value="15.8g" icon={Gem} trend="vs yesterday" trendDirection="up" />
        <KpiCard label="Active Workers" value="9" icon={Users} trendDirection="neutral" />
        <KpiCard label="Safety Incidents" value="2 open" icon={Shield} subtext="last 7 days" trendDirection="neutral" />
        <KpiCard label="Equipment Health" value="85%" icon={Wrench} subtext="fleet avg" trendDirection="neutral" />
        <KpiCard label="Revenue MTD" value="$55,800" icon={DollarSign} trend="vs budget" trendDirection="up" />
        <KpiCard label="Compliance" value="0 overdue" icon={ClipboardCheck} trendDirection="neutral" />
        <KpiCard label="Gold in Vault" value="28.5g" icon={Lock} trendDirection="neutral" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column (Charts) */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <ProductionTrendChart />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <ExpenseDonutChart />
            
            {/* Shift Schedule Panel */}
            <div className="bg-[#111827] border border-[#1e3a5f] rounded-xl p-4">
              <h3 className="text-base font-semibold text-[#f1f5f9] mb-4">Today's Shift Schedule</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-[#94a3b8] mb-2 font-medium">Morning Shift (06:00 - 14:00)</div>
                  <ul className="space-y-2 text-sm text-[#f1f5f9]">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></div> Alpha Shaft — 3 workers</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></div> Beta Shaft — 2 workers</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-[#94a3b8] mb-2 font-medium">Afternoon Shift (14:00 - 22:00)</div>
                  <ul className="space-y-2 text-sm text-[#f1f5f9]">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]"></div> Alpha Shaft — 2 workers</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]"></div> Gamma Shaft — 1 worker</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Summaries & Incidents) */}
        <div className="space-y-4 md:space-y-6">
          {/* Financial Summary */}
          <div className="bg-[#111827] border border-[#1e3a5f] rounded-xl p-4">
            <h3 className="text-base font-semibold text-[#f1f5f9] mb-4">Financial Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8] text-sm">Total Revenue</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">$55,800</span>
                  <ArrowUpRight className="w-4 h-4 text-[#22c55e]" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#94a3b8] text-sm">Total Expenses</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">$15,900</span>
                  <ArrowDownRight className="w-4 h-4 text-[#ef4444]" />
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-[#1e3a5f] flex justify-between items-center">
                <span className="text-[#94a3b8] text-sm font-medium">Net Profit</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-white">$39,900</span>
                  <ArrowUpRight className="w-5 h-5 text-[#22c55e]" />
                </div>
              </div>
              <div className="pt-2">
                <span className="text-sm text-[#22c55e] font-medium flex items-center gap-1">
                  ↑ Profitable
                </span>
              </div>
            </div>
          </div>

          {/* Gold Vault */}
          <div className="bg-[#111827] border border-[#1e3a5f] rounded-xl p-4">
            <h3 className="text-base font-semibold text-[#f1f5f9] mb-4">Gold Vault</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#94a3b8]">In Vault:</span>
                <span className="font-medium text-white">28.5g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94a3b8]">In Transit:</span>
                <span className="font-medium text-white">34.8g</span>
              </div>
              <div className="pt-3 mt-3 border-t border-[#1e3a5f] flex justify-between">
                <span className="text-[#94a3b8] font-medium">Total Value:</span>
                <span className="font-bold text-[#f59e0b]">$75,000</span>
              </div>
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="bg-[#111827] border border-[#1e3a5f] rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-[#f1f5f9]">Recent Incidents</h3>
              <a href="/samx-app/safety" className="text-xs text-[#d4870e] hover:underline">View All</a>
            </div>
            <div className="space-y-3">
              <div className="bg-[#1a2332] p-3 rounded-lg border border-[#2d4a6f]">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm text-white">Gas Detection</span>
                  <Badge type="critical">Critical</Badge>
                </div>
                <div className="text-xs text-[#94a3b8] space-y-1">
                  <div>Alpha Shaft - Level 3</div>
                  <div className="text-[#ef4444]">Status: Open (2 hours ago)</div>
                </div>
              </div>
              
              <div className="bg-[#1a2332] p-3 rounded-lg border border-[#2d4a6f]">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm text-white">Collapse Risk</span>
                  <Badge type="warning">High</Badge>
                </div>
                <div className="text-xs text-[#94a3b8] space-y-1">
                  <div>Beta Shaft - Level 1</div>
                  <div className="text-[#3b82f6]">Status: Investigating (5 hours ago)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
