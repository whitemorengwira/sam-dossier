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

export function IncidentTypeDonutChart() {
  const data = {
    labels: ['Gas Detection', 'Collapse Risk', 'Near Miss', 'Injury', 'Flooding'],
    datasets: [{
      data: [3, 2, 2, 2, 1],
      backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#a855f7', '#06b6d4'],
      borderColor: '#111827',
      borderWidth: 2,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '50%',
    plugins: {
      legend: {
        position: 'right' as const,
        labels: { color: '#94a3b8', font: { size: 11 }, padding: 8, boxWidth: 12 }
      }
    }
  };

  return (
    <div className="chart-container bg-[#111827] border border-[#1e3a5f] rounded-xl p-4 h-full">
      <h3 className="text-base font-semibold text-[#f1f5f9] mb-3">Incident Types</h3>
      <div className="chart-canvas h-[220px] flex justify-center">
        <div className="w-full max-w-[300px]">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
