"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function ProductionDetailChart() {
  const data = {
    labels: ['03-17', '03-18', '03-19', '03-20', '03-21', '03-22', '03-23', '03-24', '03-25'],
    datasets: [
      {
        label: 'Ore (tonnes)',
        data: [38, 42, 55, 29, 41, 48, 33, 52, 45],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        yAxisID: 'y',
        tension: 0.3,
        pointBackgroundColor: '#f59e0b',
      },
      {
        label: 'Gold (grams)',
        data: [11, 13, 13.5, 10, 12, 14, 11, 13, 12.5],
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        yAxisID: 'y1',
        tension: 0.3,
        pointBackgroundColor: '#14b8a6',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 } }
      },
      tooltip: {
        backgroundColor: '#1a2332',
        borderColor: '#1e3a5f',
        borderWidth: 1,
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        padding: 12,
      }
    },
    scales: {
      x: {
        grid: { color: '#1e293b' },
        ticks: { color: '#64748b', font: { size: 11 } }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Ore (t)',
          color: '#f59e0b'
        },
        grid: { color: '#1e293b' },
        ticks: { color: '#64748b' }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Gold (g)',
          color: '#14b8a6'
        },
        grid: { drawOnChartArea: false },
        ticks: { color: '#64748b' }
      }
    }
  };

  return (
    <div className="chart-container bg-[#111827] border border-[#1e3a5f] rounded-xl p-4 mb-4">
      <h3 className="text-base font-semibold text-[#f1f5f9] mb-3">Production Details</h3>
      <div className="chart-canvas h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
