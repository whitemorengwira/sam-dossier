import React from 'react';
import { Mountain, Gem, Target, Percent, Plus } from 'lucide-react';
import { KpiCard } from '../components/ui/KpiCard';
import { ProductionDetailChart } from '../components/charts/ProductionDetailChart';

export default function ProductionPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f1f5f9]">Production Intelligence</h1>
          <p className="text-[#94a3b8] mt-1">Track ore extraction and gold recovery</p>
        </div>
        <button className="btn-primary self-start md:self-auto">
          <Plus className="w-4 h-4" />
          Log Production
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KpiCard label="ORE EXTRACTED" value="408.6t" icon={Mountain} subtext="10 shifts" trendDirection="up" trend="↗" />
        <KpiCard label="GOLD RECOVERED" value="119.4g" icon={Gem} subtext="Avg grade 4.16 g/t" trendDirection="neutral" trend="📄" />
        <KpiCard label="AVG GRADE" value="4.16 g/t" icon={Target} subtext="Across all shafts" trendDirection="neutral" trend="🎯" />
        <KpiCard label="RECOVERY RATE" value="92.3%" icon={Percent} subtext="Last 30 days" trendDirection="up" trend="↗" />
      </div>

      {/* Main Chart */}
      <ProductionDetailChart />

      {/* Data Table */}
      <div className="bg-[#111827] border border-[#1e3a5f] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#1e3a5f] flex justify-between items-center">
          <h3 className="text-base font-semibold text-[#f1f5f9]">Production Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Shaft</th>
                <th>Shift</th>
                <th>Ore (t)</th>
                <th>Grade (g/t)</th>
                <th>Gold (g)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2026-03-25</td>
                <td>Alpha Shaft</td>
                <td>Morning</td>
                <td>45.2</td>
                <td>3.80</td>
                <td className="font-medium text-[#f59e0b]">12.5</td>
              </tr>
              <tr>
                <td>2026-03-25</td>
                <td>Beta Shaft</td>
                <td>Afternoon</td>
                <td>38.1</td>
                <td>4.20</td>
                <td className="font-medium text-[#f59e0b]">11.8</td>
              </tr>
              <tr>
                <td>2026-03-24</td>
                <td>Alpha Shaft</td>
                <td>Morning</td>
                <td>52.3</td>
                <td>3.50</td>
                <td className="font-medium text-[#f59e0b]">13.2</td>
              </tr>
              <tr>
                <td>2026-03-24</td>
                <td>Beta Shaft</td>
                <td>Night</td>
                <td>29.7</td>
                <td>5.10</td>
                <td className="font-medium text-[#f59e0b]">10.4</td>
              </tr>
              <tr>
                <td>2026-03-23</td>
                <td>Alpha Shaft</td>
                <td>Morning</td>
                <td>48.9</td>
                <td>3.90</td>
                <td className="font-medium text-[#f59e0b]">14.1</td>
              </tr>
              <tr>
                <td>2026-03-23</td>
                <td>Gamma Shaft</td>
                <td>Afternoon</td>
                <td>33.5</td>
                <td>4.70</td>
                <td className="font-medium text-[#f59e0b]">11.2</td>
              </tr>
              <tr>
                <td>2026-03-22</td>
                <td>Alpha Shaft</td>
                <td>Morning</td>
                <td>41.8</td>
                <td>4.00</td>
                <td className="font-medium text-[#f59e0b]">12.0</td>
              </tr>
              <tr>
                <td>2026-03-22</td>
                <td>Beta Shaft</td>
                <td>Afternoon</td>
                <td>36.4</td>
                <td>3.60</td>
                <td className="font-medium text-[#f59e0b]">9.8</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
