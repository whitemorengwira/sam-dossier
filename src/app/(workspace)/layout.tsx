"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CurrencyToggle } from "@/components/ui/CurrencyToggle";
import styles from "./layout.module.css";

const NAV_ITEMS = [
  {
    group: "Dossier",
    items: [
      { label: "Executive Summary", href: "/executive-summary", icon: "📋" },
      { label: "Chikonga Mine", href: "/chikonga-mine", icon: "⛏️" },
      { label: "Geological Report", href: "/geological-report", icon: "🔬" },
      { label: "Financial Model", href: "/financial-model", icon: "💰" },
      { label: "Team", href: "/team", icon: "👤" },
      { label: "Regulatory", href: "/regulatory", icon: "⚖️" },
    ],
  },
  {
    group: "Phases",
    items: [
      { label: "Pre-Production", href: "/phases/pre-production", icon: "🗓️" },
      { label: "Production", href: "/phases/production", icon: "⚙️" },
      { label: "Post-Production", href: "/phases/post-production", icon: "🏭" },
      { label: "Marketing", href: "/phases/marketing", icon: "📊" },
    ],
  },
  {
    group: "Workspace",
    items: [
      { label: "Dashboard", href: "/workspace/dashboard", icon: "📈" },
      { label: "Boards", href: "/workspace/boards", icon: "📋" },
      { label: "Tasks", href: "/workspace/tasks", icon: "✅" },
      { label: "Documents", href: "/workspace/documents", icon: "📄" },
    ],
  },
  {
    group: "Simulation",
    items: [
      { label: "Mine Simulator", href: "/simulation/mine-simulator", icon: "🎮" },
    ],
  },
];

export default function DossierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      {/* Mobile header */}
      <header className={styles.mobileHeader}>
        <button
          className={styles.menuBtn}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation"
        >
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>
        <Link href="/" className={styles.mobileLogo}>
          SAM Dossier
        </Link>
      </header>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>SAM</span>
            <span className={styles.logoText}>Dossier</span>
          </Link>
          <button
            className={styles.closeSidebar}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((group) => (
            <div key={group.group} className={styles.navGroup}>
              <div className={styles.navGroupLabel}>{group.group}</div>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navItem} ${
                    pathname === item.href ? styles.navItemActive : ""
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.currencyToggleWrapper}>
            <CurrencyToggle />
          </div>
          <Link href="https://www.socinga.africa" target="_blank" className={styles.sidebarLink}>
            🌍 Socinga Africa
          </Link>
          <Link href="https://www.socinga.africa/mining-hub" target="_blank" className={styles.sidebarLink}>
            ⛏️ Mining Hub
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <main className={styles.content}>{children}</main>
    </div>
  );
}
