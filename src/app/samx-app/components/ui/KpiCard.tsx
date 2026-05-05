import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  subtext?: string;
  className?: string;
}

export function KpiCard({ label, value, icon: Icon, trend, trendDirection = 'up', subtext, className = '' }: KpiCardProps) {
  const trendColor = trendDirection === 'up' ? 'text-[#22c55e]' : trendDirection === 'down' ? 'text-[#ef4444]' : 'text-[#94a3b8]';

  return (
    <div className={`kpi-card ${className}`}>
      <div className="kpi-card__label">{label}</div>
      <div className="kpi-card__value mt-2">{value}</div>
      <Icon className="kpi-card__icon" />
      <div className="mt-4 flex items-center justify-between text-xs">
        {trend && (
          <span className={`${trendColor} font-medium`}>
            {trendDirection === 'up' && '↗ '}
            {trendDirection === 'down' && '↘ '}
            {trend}
          </span>
        )}
        {subtext && <span className="text-[#64748b]">{subtext}</span>}
      </div>
    </div>
  );
}
