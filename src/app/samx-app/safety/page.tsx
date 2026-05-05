import React from 'react';
import { AlertCircle, Search, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import { KpiCard } from '../components/ui/KpiCard';
import { IncidentTypeDonutChart } from '../components/charts/IncidentTypeDonutChart';
import { Badge } from '../components/ui/Badge';

export default function SafetyPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f1f5f9]">Safety & Risk Management</h1>
          <p className="text-[#94a3b8] mt-1">Monitor and manage safety incidents</p>
        </div>
        <button className="btn-primary self-start md:self-auto">
          <Plus className="w-4 h-4" />
          Report Incident
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="kpi-card !border-[#ef4444]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#451a1a]/20"></div>
          <div className="kpi-card__label relative z-10 text-[#ef4444]">OPEN</div>
          <div className="kpi-card__value mt-2 relative z-10">2</div>
          <AlertCircle className="kpi-card__icon text-[#ef4444] relative z-10" />
        </div>
        
        <div className="kpi-card !border-[#3b82f6]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1a2545]/20"></div>
          <div className="kpi-card__label relative z-10 text-[#3b82f6]">INVESTIGATING</div>
          <div className="kpi-card__value mt-2 relative z-10">1</div>
          <Search className="kpi-card__icon text-[#3b82f6] relative z-10" />
        </div>

        <div className="kpi-card !border-[#22c55e]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1a3526]/20"></div>
          <div className="kpi-card__label relative z-10 text-[#22c55e]">RESOLVED</div>
          <div className="kpi-card__value mt-2 relative z-10">8</div>
          <CheckCircle className="kpi-card__icon text-[#22c55e] relative z-10" />
        </div>

        <div className="kpi-card !border-[#f59e0b]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#452a1a]/20"></div>
          <div className="kpi-card__label relative z-10 text-[#f59e0b]">CRITICAL</div>
          <div className="kpi-card__value mt-2 relative z-10">2</div>
          <AlertTriangle className="kpi-card__icon text-[#f59e0b] relative z-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Column */}
        <div className="lg:col-span-1">
          <IncidentTypeDonutChart />
        </div>

        {/* Incident Cards Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#111827] border-l-[3px] border-l-[#ef4444] border border-[#1e3a5f] rounded-xl p-4 md:p-5 relative">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-[#f1f5f9]">Gas Detected in Alpha Shaft</h3>
                <div className="text-sm text-[#94a3b8] flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-[#1f2937] text-xs">gas_detection</span>
                  <span>•</span>
                  <span>Alpha Shaft - Level 3</span>
                </div>
              </div>
              <Badge type="critical">Critical</Badge>
            </div>
            
            <div className="text-sm text-[#94a3b8] mb-4">
              Reported: 2026-03-25 09:15
            </div>
            
            <p className="text-[#f1f5f9] text-sm bg-[#1a2332] p-3 rounded border border-[#2d4a6f] mb-4">
              High concentration of methane detected near drilling face.
            </p>
            
            <div className="flex gap-3 mt-4">
              <button className="btn-primary !bg-[#22c55e] hover:!bg-[#16a34a] !text-white text-xs md:text-sm">
                Mark Resolved
              </button>
              <button className="btn-outline text-xs md:text-sm">
                Investigate
              </button>
            </div>
          </div>

          <div className="bg-[#111827] border-l-[3px] border-l-[#3b82f6] border border-[#1e3a5f] rounded-xl p-4 md:p-5 relative">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
              <div>
                <h3 className="text-lg font-semibold text-[#f1f5f9]">Structural Crack near Support Column</h3>
                <div className="text-sm text-[#94a3b8] flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-[#1f2937] text-xs">collapse_risk</span>
                  <span>•</span>
                  <span>Beta Shaft - Level 1</span>
                </div>
              </div>
              <Badge type="info">Investigating</Badge>
            </div>
            
            <div className="text-sm text-[#94a3b8] mb-4">
              Reported: 2026-03-24 14:30
            </div>
            
            <p className="text-[#f1f5f9] text-sm bg-[#1a2332] p-3 rounded border border-[#2d4a6f] mb-4">
              Miner noticed expanding hairline crack on primary support beam B-12. Area evacuated pending engineer review.
            </p>
            
            <div className="flex gap-3 mt-4">
              <button className="btn-primary !bg-[#22c55e] hover:!bg-[#16a34a] !text-white text-xs md:text-sm">
                Mark Resolved
              </button>
              <button className="btn-outline text-xs md:text-sm">
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
