import React from 'react';
import { Users, UserCheck, ArrowDown, TrendingUp, Plus } from 'lucide-react';
import { KpiCard } from '../components/ui/KpiCard';
import { Badge } from '../components/ui/Badge';

export default function WorkforcePage() {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f1f5f9]">Workforce Intelligence</h1>
          <p className="text-[#94a3b8] mt-1">Worker management, tracking and productivity</p>
        </div>
        <button className="btn-primary self-start md:self-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Worker
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KpiCard label="TOTAL WORKERS" value="10" icon={Users} trendDirection="neutral" />
        <div className="kpi-card !border-[#22c55e]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1a3526]/20"></div>
          <div className="kpi-card__label relative z-10 text-[#22c55e]">ACTIVE</div>
          <div className="kpi-card__value mt-2 relative z-10">9</div>
          <UserCheck className="kpi-card__icon text-[#22c55e] relative z-10" />
        </div>
        <KpiCard label="UNDERGROUND NOW" value="5" icon={ArrowDown} subtext="Real-time" trendDirection="neutral" />
        <KpiCard label="AVG PRODUCTIVITY" value="86%" icon={TrendingUp} trendDirection="up" trend="↗" />
      </div>

      {/* Roster Table */}
      <div className="bg-[#111827] border border-[#1e3a5f] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#1e3a5f] flex justify-between items-center">
          <h3 className="text-base font-semibold text-[#f1f5f9]">Worker Roster</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Role</th>
                <th>Shaft</th>
                <th>Shift</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium text-white">Rudo Mapfumo</td>
                <td className="text-[#94a3b8]">MCX-009</td>
                <td>Geologist</td>
                <td>All Shafts</td>
                <td>Morning</td>
              </tr>
              <tr>
                <td className="font-medium text-white">Chiedza Zimuto</td>
                <td className="text-[#94a3b8]">MCX-010</td>
                <td>Electrician</td>
                <td>Surface</td>
                <td>Morning</td>
              </tr>
              <tr>
                <td className="font-medium text-white">Tatenda Moyo</td>
                <td className="text-[#94a3b8]">MCX-001</td>
                <td>Supervisor</td>
                <td>Alpha Shaft</td>
                <td>Morning</td>
              </tr>
              <tr>
                <td className="font-medium text-white">Gift Ndlovu</td>
                <td className="text-[#94a3b8]">MCX-002</td>
                <td>Miner</td>
                <td>Alpha Shaft</td>
                <td>Morning</td>
              </tr>
              <tr>
                <td className="font-medium text-white">Blessing Chirwa</td>
                <td className="text-[#94a3b8]">MCX-003</td>
                <td>Driller</td>
                <td>Beta Shaft</td>
                <td>Afternoon</td>
              </tr>
              <tr>
                <td className="font-medium text-white">Kudakwashe Mhike</td>
                <td className="text-[#94a3b8]">MCX-004</td>
                <td>Blaster</td>
                <td>Alpha Shaft</td>
                <td>Morning</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
