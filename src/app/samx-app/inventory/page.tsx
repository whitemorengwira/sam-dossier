import React from 'react';
import { Package, AlertTriangle, XCircle, DollarSign, Plus } from 'lucide-react';
import { KpiCard } from '../components/ui/KpiCard';

export default function InventoryPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f1f5f9]">Inventory & Supply Chain</h1>
          <p className="text-[#94a3b8] mt-1">Stock tracking and consumption analytics</p>
        </div>
        <button className="btn-primary self-start md:self-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="kpi-card !border-[#22c55e]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1a3526]/20"></div>
          <div className="kpi-card__label relative z-10 text-[#22c55e]">IN STOCK</div>
          <div className="kpi-card__value mt-2 relative z-10">5</div>
          <Package className="kpi-card__icon text-[#22c55e] relative z-10" />
        </div>
        <div className="kpi-card !border-[#f59e0b]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#452a1a]/20"></div>
          <div className="kpi-card__label relative z-10 text-[#f59e0b]">LOW STOCK</div>
          <div className="kpi-card__value mt-2 relative z-10">2</div>
          <AlertTriangle className="kpi-card__icon text-[#f59e0b] relative z-10" />
        </div>
        <div className="kpi-card !border-[#ef4444]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#451a1a]/20"></div>
          <div className="kpi-card__label relative z-10 text-[#ef4444]">OUT OF STOCK</div>
          <div className="kpi-card__value mt-2 relative z-10">1</div>
          <XCircle className="kpi-card__icon text-[#ef4444] relative z-10" />
        </div>
        <KpiCard label="TOTAL VALUE" value="$4,695" icon={DollarSign} trendDirection="neutral" />
      </div>

      <div className="bg-[#111827] border border-[#1e3a5f] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#1e3a5f] flex justify-between items-center">
          <h3 className="text-base font-semibold text-[#f1f5f9]">Inventory Catalog</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Reorder Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium text-white">Ammonium Nitrate</td>
                <td className="text-[#94a3b8]">Explosives</td>
                <td>250</td>
                <td className="text-[#94a3b8]">kg</td>
                <td className="text-[#94a3b8]">100</td>
              </tr>
              <tr className="bg-[#452a1a]/20">
                <td className="font-medium text-[#f59e0b]">Sodium Cyanide</td>
                <td className="text-[#94a3b8]">Chemicals</td>
                <td className="text-[#f59e0b] font-bold">80</td>
                <td className="text-[#94a3b8]">kg</td>
                <td className="text-[#94a3b8]">50</td>
              </tr>
              <tr>
                <td className="font-medium text-white">Diesel Fuel</td>
                <td className="text-[#94a3b8]">Fuel</td>
                <td>1200</td>
                <td className="text-[#94a3b8]">litres</td>
                <td className="text-[#94a3b8]">500</td>
              </tr>
              <tr className="bg-[#452a1a]/20">
                <td className="font-medium text-[#f59e0b]">Drill Bits (45mm)</td>
                <td className="text-[#94a3b8]">Spare Parts</td>
                <td className="text-[#f59e0b] font-bold">8</td>
                <td className="text-[#94a3b8]">units</td>
                <td className="text-[#94a3b8]">10</td>
              </tr>
              <tr>
                <td className="font-medium text-white">Safety Helmets</td>
                <td className="text-[#94a3b8]">PPE</td>
                <td>25</td>
                <td className="text-[#94a3b8]">units</td>
                <td className="text-[#94a3b8]">10</td>
              </tr>
              <tr className="bg-[#451a1a]/30">
                <td className="font-medium text-[#ef4444]">Activated Carbon</td>
                <td className="text-[#94a3b8]">Chemicals</td>
                <td className="text-[#ef4444] font-bold">0</td>
                <td className="text-[#94a3b8]">kg</td>
                <td className="text-[#94a3b8]">100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
