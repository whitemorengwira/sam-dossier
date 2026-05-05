import React from 'react';
import type { Metadata } from 'next';
import './samx.css';
import Shell from './components/Shell';

export const metadata: Metadata = {
  title: 'SAM-X App',
  description: 'Smart Mining Progressive Web App — Smarter Mines. Bigger Profits.',
  manifest: '/samx-app/manifest.json',
  themeColor: '#0a0e17',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SAM-X',
  },
};

export default function SamxLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
