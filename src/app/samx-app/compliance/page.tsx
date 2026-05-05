import React from 'react';
import { FileText, Clock, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import { KpiCard } from '../components/ui/KpiCard';
import { Badge } from '../components/ui/Badge';

export default function CompliancePage() {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f1f5f9]">Compliance & ESG</h1>
          <p className="text-[#94a3b8] mt-1">Regulatory reporting and audit management</p>
        </div>
        <button className="btn-primary self-start md:self-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Report
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KpiCard label="DRAFTS" value="2" icon={FileText} trendDirection="neutral" />
        <div className="kpi-card !border-[#f59e0b]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#452a1a]/20"></div>
          <div className="kpi-card__label relative z-10 text-[#f59e0b]">PENDING REVIEW</div>
          <div className="kpi-card__value mt-2 relative z-10">1</div>
          <Clock className="kpi-card__icon text-[#f59e0b] relative z-10" />
        </div>
        <div className="kpi-card !border-[#22c55e]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1a3526]/20"></div>
          <div className="kpi-card__label relative z-10 text-[#22c55e]">SUBMITTED</div>
          <div className="kpi-card__value mt-2 relative z-10">2</div>
          <CheckCircle className="kpi-card__icon text-[#22c55e] relative z-10" />
        </div>
        <KpiCard label="OVERDUE" value="0" icon={AlertTriangle} trendDirection="neutral" />
      </div>

      <div className="space-y-4">
        <div className="bg-[#111827] border border-[#1e3a5f] rounded-xl p-5 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
            <div>
              <h3 className="text-lg font-semibold text-[#f1f5f9]">March 2026 Monthly Production Report</h3>
              <div className="text-sm text-[#94a3b8] mt-1">Production Report • March 2026</div>
              <div className="text-sm text-[#94a3b8] mt-1">Due: <span className="text-white">2026-04-05</span></div>
            </div>
            <Badge type="draft">Draft</Badge>
          </div>
          <p className="text-[#f1f5f9] text-sm bg-[#1a2332] p-3 rounded border border-[#2d4a6f] mb-4">
            Includes all three shafts production data
          </p>
          <button className="btn-outline text-xs md:text-sm">Submit for Review</button>
        </div>

        <div className="bg-[#111827] border border-[#f59e0b]/50 rounded-xl p-5 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
            <div>
              <h3 className="text-lg font-semibold text-[#f1f5f9]">Q1 2026 Environmental Impact Report</h3>
              <div className="text-sm text-[#94a3b8] mt-1">Environmental • Q1 2026</div>
              <div className="text-sm text-[#94a3b8] mt-1">Due: <span className="text-[#f59e0b]">2026-04-15</span></div>
            </div>
            <Badge type="warning">Pending Review</Badge>
          </div>
          <p className="text-[#f1f5f9] text-sm bg-[#1a2332] p-3 rounded border border-[#2d4a6f] mb-4">
            Water quality and dust monitoring results
          </p>
          <button className="btn-primary !bg-[#22c55e] hover:!bg-[#16a34a] text-xs md:text-sm">Approve</button>
        </div>

        <div className="bg-[#111827] border border-[#22c55e]/30 rounded-xl p-5 relative overflow-hidden opacity-80">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div>
              <h3 className="text-lg font-semibold text-[#f1f5f9]">Annual Safety Audit 2025</h3>
              <div className="text-sm text-[#94a3b8] mt-1">Safety Audit • 2025</div>
              <div className="text-sm text-[#94a3b8] mt-1">Submitted: 2026-01-31</div>
            </div>
            <Badge type="success">Approved</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
