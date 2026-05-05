import React from 'react';
import type { Metadata, Viewport } from 'next';
import './samx.css';
import Shell from './components/Shell';

export const metadata: Metadata = {
  title: 'SAM-X App',
  description: 'Smart Mining Progressive Web App — Smarter Mines. Bigger Profits.',
  manifest: '/samx-app/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SAM-X',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0e17',
};

export default function SamxLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
