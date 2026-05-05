"use client";

import React, { useState } from 'react';
import { Wrench, Plus, CheckCircle, AlertTriangle, XCircle, Bot } from 'lucide-react';
import { KpiCard } from '../components/ui/KpiCard';
import clsx from 'clsx';

export default function EquipmentPage() {
  const [activeTab, setActiveTab] = useState<'fleet' | 'ai' | 'log'>('fleet');

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f1f5f9]">Equipment & Maintenance</h1>
          <p className="text-[#94a3b8] mt-1">Monitor fleet health and predict failures</p>
        </div>
        <div className="flex gap-3 self-start md:self-auto">
          <button 
            onClick={() => setActiveTab('ai')}
            className="btn-outline !border-[#a855f7] !text-[#a855f7] hover:!bg-[#a855f7]/10"
          >
            <Bot className="w-4 h-4 mr-2" />
            AI Analysis
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Equipment
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#1e3a5f] overflow-x-auto gap-1">
        <button 
          onClick={() => setActiveTab('fleet')}
          className={clsx(
            "px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2",
            activeTab === 'fleet' ? "text-[#f59e0b] border-[#f59e0b]" : "text-[#94a3b8] border-transparent hover:text-white"
          )}
        >
          Fleet Overview
        </button>
        <button 
          onClick={() => setActiveTab('ai')}
          className={clsx(
            "px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 flex items-center gap-2",
            activeTab === 'ai' ? "text-[#f59e0b] border-[#f59e0b]" : "text-[#94a3b8] border-transparent hover:text-white"
          )}
        >
          AI Predictions
        </button>
        <button 
          onClick={() => setActiveTab('log')}
          className={clsx(
            "px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2",
            activeTab === 'log' ? "text-[#f59e0b] border-[#f59e0b]" : "text-[#94a3b8] border-transparent hover:text-white"
          )}
        >
          Maintenance Log
        </button>
      </div>

      {activeTab === 'fleet' && (
        <div className="space-y-6 animate-fade-in">
          {/* KPI Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="kpi-card !border-[#22c55e]/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#1a3526]/20"></div>
              <div className="kpi-card__label relative z-10 text-[#22c55e]">OPERATIONAL</div>
              <div className="kpi-card__value mt-2 relative z-10">6</div>
              <CheckCircle className="kpi-card__icon text-[#22c55e] relative z-10" />
            </div>
            
            <div className="kpi-card !border-[#f59e0b]/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#452a1a]/20"></div>
              <div className="kpi-card__label relative z-10 text-[#f59e0b]">MAINTENANCE</div>
              <div className="kpi-card__value mt-2 relative z-10">1</div>
              <Wrench className="kpi-card__icon text-[#f59e0b] relative z-10" />
            </div>

            <div className="kpi-card !border-[#ef4444]/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#451a1a]/20"></div>
              <div className="kpi-card__label relative z-10 text-[#ef4444]">BROKEN</div>
              <div className="kpi-card__value mt-2 relative z-10">1</div>
              <XCircle className="kpi-card__icon text-[#ef4444] relative z-10" />
            </div>

            <div className="kpi-card border border-[#1e3a5f] relative overflow-hidden">
              <div className="kpi-card__label relative z-10 text-[#64748b]">DECOMMISSIONED</div>
              <div className="kpi-card__value mt-2 relative z-10 text-[#94a3b8]">0</div>
            </div>
          </div>

          {/* Equipment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-[#111827] border border-[#22c55e]/50 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-[#1a3526] text-[#22c55e] text-xs font-semibold rounded-bl-lg">
                Operational
              </div>
              <h3 className="text-lg font-semibold text-[#f1f5f9] pr-20">Ventilation Fan Alpha</h3>
              <div className="text-sm text-[#94a3b8] mb-4 mt-1">🌬️ Ventilation • VNT-001</div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#94a3b8]">Health Score</span>
                    <span className="text-[#22c55e] font-medium">99%</span>
                  </div>
                  <div className="w-full h-2 bg-[#1a2332] rounded-full overflow-hidden">
                    <div className="h-full bg-[#22c55e]" style={{ width: '99%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#94a3b8]">Failure Risk</span>
                    <span className="text-[#ef4444] font-medium">HIGH RISK (1%)</span>
                  </div>
                  <div className="text-xs bg-[#451a1a]/50 border border-[#ef4444]/30 text-[#ef4444] p-2 rounded mt-1">
                    ⚠ Mechanical failure due to age and lack of service
                  </div>
                </div>

                <div className="text-sm text-[#94a3b8] border-t border-[#1e3a5f] pt-3 mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <span className="block text-xs text-[#64748b]">Location</span>
                    <span className="text-white">Alpha Shaft Headframe</span>
                  </div>
                  <div>
                    <span className="block text-xs text-[#64748b]">Hours Operated</span>
                    <span className="text-white">3,900h</span>
                  </div>
                  <div className="col-span-2 mt-2">
                    <span className="block text-xs text-[#64748b]">Next Service</span>
                    <span className="text-[#f59e0b]">📅 2026-03-30 (Overdue)</span>
                  </div>
                </div>

                <button className="btn-outline w-full justify-center mt-4 text-xs">
                  📋 Log Maintenance
                </button>
              </div>
            </div>

            <div className="bg-[#111827] border border-[#22c55e]/50 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-[#1a3526] text-[#22c55e] text-xs font-semibold rounded-bl-lg">
                Operational
              </div>
              <h3 className="text-lg font-semibold text-[#f1f5f9] pr-20">Primary Jaw Crusher</h3>
              <div className="text-sm text-[#94a3b8] mb-4 mt-1">⚙️ Crusher • CRU-001</div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#94a3b8]">Health Score</span>
                    <span className="text-[#22c55e] font-medium">99%</span>
                  </div>
                  <div className="w-full h-2 bg-[#1a2332] rounded-full overflow-hidden">
                    <div className="h-full bg-[#22c55e]" style={{ width: '99%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#94a3b8]">Failure Risk</span>
                    <span className="text-[#f59e0b] font-medium">MEDIUM RISK (1%)</span>
                  </div>
                </div>

                <div className="text-sm text-[#94a3b8] border-t border-[#1e3a5f] pt-3 mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <span className="block text-xs text-[#64748b]">Location</span>
                    <span className="text-white">Processing Plant</span>
                  </div>
                  <div>
                    <span className="block text-xs text-[#64748b]">Hours Operated</span>
                    <span className="text-white">4,820h</span>
                  </div>
                  <div className="col-span-2 mt-2">
                    <span className="block text-xs text-[#64748b]">Next Service</span>
                    <span className="text-white">📅 2026-06-01</span>
                  </div>
                </div>

                <button className="btn-outline w-full justify-center mt-4 text-xs">
                  📋 Log Maintenance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="bg-[#111827] border border-[#a855f7]/50 rounded-xl p-6 relative overflow-hidden animate-fade-in shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#a855f7] opacity-5 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>
          <h2 className="text-xl font-bold text-[#f1f5f9] flex items-center gap-3 mb-6">
            <Bot className="w-6 h-6 text-[#a855f7]" /> 
            AI Predictive Analysis
          </h2>
          
          <div className="mb-6 bg-[#1a2332] p-4 rounded-lg border border-[#2d4a6f]">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#94a3b8]">Analyzing fleet telemetry data...</span>
              <span className="text-[#a855f7] font-mono">100% Complete</span>
            </div>
            <div className="w-full h-2 bg-[#0a0e17] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] w-full"></div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[#94a3b8] font-medium uppercase text-xs tracking-wider border-b border-[#1e3a5f] pb-2">Results & Recommendations</h3>
            
            <div className="bg-[#451a1a]/30 border-l-4 border-[#ef4444] p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold">VNT-001 (Ventilation Fan Alpha)</h4>
                  <p className="text-[#ef4444] text-sm mt-1">Predicted failure within 14 days (Confidence: 87%)</p>
                  <div className="mt-3 text-sm text-[#f1f5f9]">
                    <span className="text-[#94a3b8]">Recommendation:</span> Schedule preventive maintenance immediately. High vibration signatures detected correlating with bearing wear patterns.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a3526]/30 border-l-4 border-[#22c55e] p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#22c55e] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold">CRU-001 (Primary Jaw Crusher)</h4>
                  <p className="text-[#22c55e] text-sm mt-1">No imminent failure predicted</p>
                  <div className="mt-2 text-sm text-[#f1f5f9]">
                    Operating within nominal parameters. Next service due: 2026-06-01.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
