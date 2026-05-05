import React from 'react';
import { Lock, Truck, Diamond, Eye, Plus } from 'lucide-react';
import { KpiCard } from '../components/ui/KpiCard';
import { Badge } from '../components/ui/Badge';

export default function GoldTrackPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f1f5f9]">Gold Chain of Custody</h1>
          <p className="text-[#94a3b8] mt-1">Secure tracking from mine to market</p>
        </div>
        <button className="btn-primary self-start md:self-auto">
          <Plus className="w-4 h-4 mr-2" />
          Register Batch
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KpiCard label="IN VAULT" value="28.5g" icon={Lock} trendDirection="neutral" />
        <div className="kpi-card !border-[#3b82f6]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1a2545]/20"></div>
          <div className="kpi-card__label relative z-10 text-[#3b82f6]">IN TRANSIT</div>
          <div className="kpi-card__value mt-2 relative z-10">34.8g</div>
          <Truck className="kpi-card__icon text-[#3b82f6] relative z-10" />
        </div>
        <div className="kpi-card !border-[#22c55e]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1a3526]/20"></div>
          <div className="kpi-card__label relative z-10 text-[#22c55e]">SOLD</div>
          <div className="kpi-card__value mt-2 relative z-10">92.8g</div>
          <Diamond className="kpi-card__icon text-[#22c55e] relative z-10" />
        </div>
        <div className="kpi-card !border-[#f59e0b]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#452a1a]/20"></div>
          <div className="kpi-card__label relative z-10 text-[#f59e0b]">TOTAL VALUE</div>
          <div className="kpi-card__value mt-2 relative z-10">$75,000</div>
          <Eye className="kpi-card__icon text-[#f59e0b] relative z-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-[#111827] border border-[#22c55e]/50 rounded-xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-semibold text-[#f1f5f9]">GB-2026-014</h3>
              <div className="text-sm text-[#94a3b8] mt-1">Alpha Shaft • 2026-03-25</div>
            </div>
            <Badge type="success">In Vault</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm bg-[#1a2332] p-3 rounded border border-[#2d4a6f]">
            <div>
              <span className="block text-[#94a3b8]">Weight</span>
              <span className="font-semibold text-white text-base">28.5g</span>
            </div>
            <div>
              <span className="block text-[#94a3b8]">Purity</span>
              <span className="font-semibold text-[#14b8a6] text-base">93.1%</span>
            </div>
            <div className="col-span-2 border-t border-[#2d4a6f] pt-2 mt-1 flex justify-between">
              <div>
                <span className="block text-[#94a3b8]">Custodian</span>
                <span className="text-white">Farai Mutasa</span>
              </div>
              <div className="text-right">
                <span className="block text-[#94a3b8]">Value</span>
                <span className="text-[#f59e0b] font-medium">$12,400</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-xs font-mono text-[#64748b] bg-[#0a0e17] px-3 py-2 rounded">
            Seal: SL-2026-014
          </div>
          
          <button className="btn-outline w-full mt-4 text-sm justify-center">
            Mark in Transit
          </button>
        </div>

        <div className="bg-[#111827] border border-[#f59e0b]/50 rounded-xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-semibold text-[#f1f5f9]">GB-2026-015</h3>
              <div className="text-sm text-[#94a3b8] mt-1">Gamma Shaft • 2026-03-25</div>
            </div>
            <Badge type="warning">Assay Pending</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm bg-[#1a2332] p-3 rounded border border-[#2d4a6f]">
            <div>
              <span className="block text-[#94a3b8]">Weight</span>
              <span className="font-semibold text-white text-base">15.7g</span>
            </div>
            <div>
              <span className="block text-[#94a3b8]">Purity</span>
              <span className="font-semibold text-[#14b8a6] text-base">88.4%</span>
            </div>
            <div className="col-span-2 border-t border-[#2d4a6f] pt-2 mt-1 flex justify-between">
              <div>
                <span className="block text-[#94a3b8]">Custodian</span>
                <span className="text-white">Rudo Mapfumo</span>
              </div>
              <div className="text-right">
                <span className="block text-[#94a3b8]">Value</span>
                <span className="text-[#f59e0b] font-medium">$6,800</span>
              </div>
            </div>
          </div>
          
          <button className="btn-primary w-full mt-4 text-sm justify-center">
            Move to Vault
          </button>
        </div>

        <div className="bg-[#111827] border border-[#3b82f6]/50 rounded-xl p-5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-semibold text-[#f1f5f9]">GB-2026-013</h3>
              <div className="text-sm text-[#94a3b8] mt-1">Beta Shaft • 2026-03-24</div>
            </div>
            <Badge type="info">In Transit</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm bg-[#1a2332] p-3 rounded border border-[#2d4a6f]">
            <div>
              <span className="block text-[#94a3b8]">Weight</span>
              <span className="font-semibold text-white text-base">34.8g</span>
            </div>
            <div>
              <span className="block text-[#94a3b8]">Purity</span>
              <span className="font-semibold text-[#14b8a6] text-base">91.8%</span>
            </div>
            <div className="col-span-2 border-t border-[#2d4a6f] pt-2 mt-1 flex justify-between">
              <div>
                <span className="block text-[#94a3b8]">Custodian</span>
                <span className="text-white">Tatenda Moyo</span>
              </div>
              <div className="text-right">
                <span className="block text-[#94a3b8]">Value</span>
                <span className="text-[#f59e0b] font-medium">$15,200</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-xs font-mono text-[#64748b] bg-[#0a0e17] px-3 py-2 rounded">
            Seal: SL-2026-013
          </div>
          
          <button className="btn-outline w-full mt-4 text-sm justify-center !border-[#22c55e] !text-[#22c55e]">
            Mark Delivered
          </button>
        </div>
      </div>
    </div>
  );
}
