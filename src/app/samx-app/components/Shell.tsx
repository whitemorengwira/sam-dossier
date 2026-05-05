"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, Home, LayoutDashboard, Pickaxe, Shield, Wrench, 
  Users, DollarSign, ClipboardCheck, Package, Diamond, 
  Fingerprint, BarChart3, Plus 
} from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { label: 'Executive', icon: LayoutDashboard, href: '/samx-app' },
  { label: 'Production', icon: Pickaxe, href: '/samx-app/production' },
  { label: 'Safety', icon: Shield, href: '/samx-app/safety' },
  { label: 'Equipment', icon: Wrench, href: '/samx-app/equipment' },
  { label: 'Workforce', icon: Users, href: '/samx-app/workforce' },
  { label: 'Financial', icon: DollarSign, href: '/samx-app/financial' },
  { label: 'Compliance', icon: ClipboardCheck, href: '/samx-app/compliance' },
  { label: 'Inventory', icon: Package, href: '/samx-app/inventory' },
  { label: 'Gold Track', icon: Diamond, href: '/samx-app/gold-track' },
  { label: 'Biometrics', icon: Fingerprint, href: '/samx-app/biometrics' },
  { label: 'Reports', icon: BarChart3, href: '/samx-app/reports' },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#f1f5f9] font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 md:h-16 bg-[#0a0e17] border-b border-[#1e3a5f] z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="md:hidden text-[#f1f5f9] hover:text-[#f59e0b] transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/samx-app" className="hidden md:flex items-center justify-center text-[#f1f5f9] hover:text-[#f59e0b] transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-lg md:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#d4870e] to-[#f59e0b]">SAM-X</h1>
            <span className="text-[0.65rem] text-[#94a3b8] hidden md:block uppercase tracking-widest">Smarter Mines. Bigger Profits.</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn-primary !p-2 md:!px-4 md:!py-2">
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">New</span>
          </button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        "fixed top-0 bottom-0 left-0 w-[280px] md:w-[260px] bg-[#0a0e17] border-r border-[#1e3a5f] z-50 md:z-40 transition-transform duration-300 ease-in-out md:translate-x-0 pt-14 md:pt-16 flex flex-col",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 flex justify-between items-center md:hidden border-b border-[#1e3a5f]">
          <span className="font-bold text-[#f59e0b]">SAM-X SYSTEM</span>
          <button onClick={closeSidebar} className="text-[#94a3b8] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="hidden md:block px-4 py-4 border-b border-[#1e3a5f]">
          <span className="font-bold text-[#94a3b8] text-xs uppercase tracking-widest">SAM-X System</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  isActive 
                    ? "bg-[#d4870e] text-white font-semibold" 
                    : "text-[#94a3b8] font-medium hover:bg-[#1e293b] hover:text-[#f1f5f9]"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Prototype Ad Banner */}
        <div className="p-4 border-t border-[#1e3a5f] bg-[#111827]">
          <div className="text-center">
            <h4 className="text-[#d4870e] font-bold text-sm tracking-wider">SAM-X</h4>
            <p className="text-[10px] text-[#64748b] mt-1">Prototype Build</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="pt-14 md:pt-16 md:ml-[260px] min-h-screen">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
