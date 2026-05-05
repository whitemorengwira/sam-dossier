import React from 'react';
import { Fingerprint, Users, Clock, Calendar, Plus } from 'lucide-react';
import { KpiCard } from '../components/ui/KpiCard';

export default function BiometricsPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f1f5f9]">Biometric Attendance</h1>
          <p className="text-[#94a3b8] mt-1">ZKTeco integration — real-time worker tracking</p>
        </div>
        <button className="btn-outline self-start md:self-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Device
        </button>
      </div>

      <div className="flex border-b border-[#1e3a5f] overflow-x-auto gap-1">
        <button className="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 text-[#f59e0b] border-[#f59e0b]">
          Attendance Log
        </button>
        <button className="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 text-[#94a3b8] border-transparent hover:text-white">
          ZK Devices (2)
        </button>
        <button className="px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 text-[#94a3b8] border-transparent hover:text-white">
          Setup Guide
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KpiCard label="CLOCKED IN TODAY" value="0" icon={Fingerprint} trendDirection="neutral" />
        <KpiCard label="CURRENTLY INSIDE" value="0" icon={Users} subtext="Below ground / on site" trendDirection="neutral" />
        <KpiCard label="CLOCKED OUT" value="0" icon={Clock} trendDirection="neutral" />
        <KpiCard label="TOTAL HOURS" value="0.0h" icon={Calendar} trendDirection="neutral" />
      </div>

      <div className="bg-[#111827] border border-[#1e3a5f] rounded-xl p-6 max-w-md mx-auto mt-8">
        <h3 className="text-lg font-semibold text-[#f1f5f9] mb-4 flex items-center gap-2">
          <Fingerprint className="w-5 h-5 text-[#d4870e]" />
          Manual Entry
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#94a3b8] mb-1">Worker</label>
            <select className="w-full bg-[#1a2332] border border-[#2d4a6f] rounded-lg p-2.5 text-white outline-none focus:border-[#d4870e]">
              <option>Select worker...</option>
              <option>Rudo Mapfumo (MCX-009)</option>
              <option>Tatenda Moyo (MCX-001)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-[#94a3b8] mb-1">Event</label>
            <select className="w-full bg-[#1a2332] border border-[#2d4a6f] rounded-lg p-2.5 text-white outline-none focus:border-[#d4870e]">
              <option>Clock In</option>
              <option>Clock Out</option>
            </select>
          </div>
          <button className="btn-primary w-full justify-center !py-3 font-bold mt-2">
            → Clock In
          </button>
        </div>
      </div>
      
      <div className="text-center text-[#64748b] text-sm py-8 border border-dashed border-[#1e3a5f] rounded-xl">
        No attendance records for this date
      </div>
    </div>
  );
}
