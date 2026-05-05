import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Plus } from 'lucide-react';
import { KpiCard } from '../components/ui/KpiCard';
import { Badge } from '../components/ui/Badge';

export default function FinancialPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f1f5f9]">Financial Intelligence</h1>
          <p className="text-[#94a3b8] mt-1">Revenue, costs, and profitability tracking</p>
        </div>
        <button className="btn-primary self-start md:self-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Record
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KpiCard label="REVENUE" value="$55,800" icon={TrendingUp} trendDirection="up" trend="↗" />
        <KpiCard label="EXPENSES" value="$15,900" icon={TrendingDown} trendDirection="down" trend="↘" />
        <div className="kpi-card !border-[#22c55e]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1a3526]/20"></div>
          <div className="kpi-card__label relative z-10 text-[#22c55e]">NET PROFIT</div>
          <div className="kpi-card__value mt-2 relative z-10">$39,900</div>
          <DollarSign className="kpi-card__icon text-[#22c55e] relative z-10" />
          <div className="mt-4 flex items-center justify-between text-xs z-10 relative text-[#22c55e] font-medium">
            <span>↑ Profitable</span>
          </div>
        </div>
        <KpiCard label="RECORDS" value="10" icon={DollarSign} trendDirection="neutral" />
      </div>

      <div className="bg-[#111827] border border-[#1e3a5f] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#1e3a5f] flex justify-between items-center">
          <h3 className="text-base font-semibold text-[#f1f5f9]">Financial Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2026-03-25</td>
                <td><span className="text-[#22c55e] font-medium">+ revenue</span></td>
                <td>Gold Sales</td>
                <td className="font-semibold text-white">$18,500</td>
                <td className="text-[#94a3b8]">Gold sale batch GB-2026-014</td>
              </tr>
              <tr>
                <td>2026-03-25</td>
                <td><span className="text-[#ef4444] font-medium">− expense</span></td>
                <td>Labor</td>
                <td className="font-semibold text-white">$3,200</td>
                <td className="text-[#94a3b8]">Weekly payroll</td>
              </tr>
              <tr>
                <td>2026-03-24</td>
                <td><span className="text-[#22c55e] font-medium">+ revenue</span></td>
                <td>Gold Sales</td>
                <td className="font-semibold text-white">$15,200</td>
                <td className="text-[#94a3b8]">Gold sale batch GB-2026-013</td>
              </tr>
              <tr>
                <td>2026-03-23</td>
                <td><span className="text-[#ef4444] font-medium">− expense</span></td>
                <td>Fuel</td>
                <td className="font-semibold text-white">$1,850</td>
                <td className="text-[#94a3b8]">Diesel delivery</td>
              </tr>
              <tr>
                <td>2026-03-22</td>
                <td><span className="text-[#ef4444] font-medium">− expense</span></td>
                <td>Chemicals</td>
                <td className="font-semibold text-white">$2,400</td>
                <td className="text-[#94a3b8]">Cyanide supply</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
