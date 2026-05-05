"use client";

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function ExpenseDonutChart() {
  const data = {
    labels: ['Equipment', 'Labor', 'Chemicals', 'Fuel', 'Maintenance', 'Utilities', 'Transport'],
    datasets: [{
      data: [35, 20, 15, 12, 8, 6, 5],
      backgroundColor: [
        '#14b8a6', '#f59e0b', '#3b82f6', '#ef4444',
        '#22c55e', '#06b6d4', '#a855f7'
      ],
      borderColor: '#111827',
      borderWidth: 2,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '55%',
    plugins: {
      legend: {
        position: 'right' as const,
        labels: { color: '#94a3b8', font: { size: 11 }, padding: 8, boxWidth: 12 }
      }
    }
  };

  return (
    <div className="chart-container bg-[#111827] border border-[#1e3a5f] rounded-xl p-4 mb-4">
      <h3 className="text-base font-semibold text-[#f1f5f9] mb-3">Expense Breakdown</h3>
      <div className="chart-canvas h-[220px] md:h-[250px] flex justify-center">
        <div className="w-full max-w-[400px]">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
