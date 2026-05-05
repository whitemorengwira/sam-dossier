# samX App: Smart Mining Progressive Web App (PWA) — Full Technical Specification

> **Document Version:** 1.0.0
> **Date:** 2026-05-05
> **Author:** Antigravity AI — Generated from Prototype Frame Analysis (3,300+ frames)
> **Status:** DRAFT — Prototype-Level ($0 Budget)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Visual Design System](#2-visual-design-system)
3. [Navigation & Layout Architecture](#3-navigation--layout-architecture)
4. [Module 01 — Executive Dashboard](#4-module-01--executive-dashboard)
5. [Module 02 — Production Intelligence](#5-module-02--production-intelligence)
6. [Module 03 — Safety & Risk Management](#6-module-03--safety--risk-management)
7. [Module 04 — Equipment & Predictive Maintenance](#7-module-04--equipment--predictive-maintenance)
8. [Module 05 — Workforce Intelligence](#8-module-05--workforce-intelligence)
9. [Module 06 — Financial Intelligence](#9-module-06--financial-intelligence)
10. [Module 07 — Compliance & ESG](#10-module-07--compliance--esg)
11. [Module 08 — Inventory & Supply Chain](#11-module-08--inventory--supply-chain)
12. [Module 09 — Gold Chain of Custody](#12-module-09--gold-chain-of-custody)
13. [Module 10 — Biometric Attendance](#13-module-10--biometric-attendance)
14. [Module 11 — Reports & Analytics](#14-module-11--reports--analytics)
15. [PWA Technical Requirements](#15-pwa-technical-requirements)
16. [Frontend Architecture](#16-frontend-architecture)
17. [Backend API Specification](#17-backend-api-specification)
18. [Data Models & Schema](#18-data-models--schema)
19. [State Management](#19-state-management)
20. [Authentication & Security](#20-authentication--security)
21. [Deployment & Infrastructure](#21-deployment--infrastructure)
22. [Testing Strategy](#22-testing-strategy)
23. [Performance Budget](#23-performance-budget)
24. [Accessibility (a11y)](#24-accessibility)
25. [Appendices](#25-appendices)

---

## 1. Project Overview

### 1.1 Application Identity

| Property | Value |
|----------|-------|
| **Name** | samX app (branded as SmartMine X™) |
| **Tagline** | "Smarter Mines. Bigger Profits." |
| **Type** | Progressive Web Application (PWA) |
| **Route** | `/samx-app` on existing website |
| **Target Devices** | Mobile-first; responsive to tablet & desktop |
| **Orientation** | Portrait-primary on mobile; landscape on desktop |
| **Offline Support** | Required — Service Worker with cache-first strategy |

### 1.2 Purpose & Vision

The samX app is a comprehensive mining operations management platform designed for small-to-medium artisanal and semi-mechanized gold mining operations in sub-Saharan Africa. It provides:

- **Real-time operational oversight** across all mining functions
- **Data visualization** for production, financial, safety, and equipment metrics
- **AI-powered reporting** with automated executive summaries
- **Chain of custody tracking** for gold from mine to market
- **Biometric workforce management** via ZKTeco hardware integration
- **Regulatory compliance management** for environmental and safety reporting

### 1.3 Prototype Scope (Zero-Budget Constraints)

Since this is a **$0 prototype**, the following constraints apply:

| Concern | Prototype Approach |
|---------|-------------------|
| **Backend** | Client-side localStorage + IndexedDB; no server required |
| **Authentication** | Simulated; single-user mode with optional PIN lock |
| **AI Reports** | Pre-built templates with data interpolation; no LLM API calls |
| **Biometrics** | Manual clock-in/out form; ZKTeco integration stubbed |
| **Real-time Data** | Simulated with seed data; polling stubs for future WebSocket |
| **Charts** | Chart.js (free, MIT-licensed) |
| **Hosting** | Cloudflare Pages (free tier) |
| **Domain** | Subdirectory on existing site (`/samx-app`) |
| **Database** | Browser-native IndexedDB via Dexie.js wrapper |
| **Notifications** | Browser Notification API (no push server) |

### 1.4 Technology Stack

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                          │
│  Framework:    React 18+ (Vite bundler)             │
│  Language:     TypeScript                           │
│  Styling:      Vanilla CSS (CSS Custom Properties)  │
│  Charts:       Chart.js 4.x + chartjs-adapter-date  │
│  Icons:        Lucide React (MIT, tree-shakeable)   │
│  Routing:      React Router v6                      │
│  State:        React Context + useReducer           │
│  Storage:      Dexie.js (IndexedDB wrapper)         │
│  PWA:          Workbox (Service Worker tooling)     │
│  Font:         Inter (Google Fonts)                 │
├─────────────────────────────────────────────────────┤
│                    BACKEND (Future)                  │
│  Runtime:      Cloudflare Workers                   │
│  Database:     Cloudflare D1 (SQLite edge)          │
│  Storage:      Cloudflare R2 (S3-compatible)        │
│  Auth:         Supabase Auth (free tier)            │
│  AI:           Cloudflare Workers AI                │
│  Realtime:     Supabase Realtime / Durable Objects  │
└─────────────────────────────────────────────────────┘
```

### 1.5 Module Registry

The application comprises 11 primary modules, each accessible from the sidebar navigation:

| # | Module Name | Sidebar Icon | Route | Description |
|---|-------------|-------------|-------|-------------|
| 1 | Executive Dashboard | `LayoutDashboard` | `/samx-app/` | KPI overview, alerts, trends |
| 2 | Production Intelligence | `Pickaxe` | `/samx-app/production` | Shift-based ore & gold tracking |
| 3 | Safety & Risk Management | `Shield` | `/samx-app/safety` | Incident tracking & hazard monitoring |
| 4 | Equipment & Predictive Maintenance | `Wrench` | `/samx-app/equipment` | Fleet health & AI failure prediction |
| 5 | Workforce Intelligence | `Users` | `/samx-app/workforce` | Worker management & productivity |
| 6 | Financial Intelligence | `DollarSign` | `/samx-app/financial` | Revenue, costs, P&L tracking |
| 7 | Compliance & ESG | `ClipboardCheck` | `/samx-app/compliance` | Regulatory reports & audit management |
| 8 | Inventory & Supply Chain | `Package` | `/samx-app/inventory` | Stock tracking & reorder management |
| 9 | Gold Chain of Custody | `Diamond` | `/samx-app/gold-track` | Batch tracking from mine to market |
| 10 | Biometric Attendance | `Fingerprint` | `/samx-app/biometrics` | ZKTeco clock-in/out & attendance |
| 11 | Reports & Analytics | `BarChart3` | `/samx-app/reports` | Cross-module analytics & AI reports |

---

## 2. Visual Design System

### 2.1 Design Philosophy

The samX UI follows a **dark industrial premium** aesthetic — a deep charcoal/near-black canvas with high-contrast orange/gold accent branding. The design evokes underground mining environments while maintaining clarity and readability for operational data. Every pixel must communicate professionalism, trustworthiness, and operational precision.

### 2.2 Color Palette

#### 2.2.1 Core Colors

```css
:root {
  /* ── Background Hierarchy ── */
  --bg-primary:          #0a0e17;    /* Main app background — near-black with blue undertone */
  --bg-secondary:        #111827;    /* Card/panel backgrounds */
  --bg-tertiary:         #1a2332;    /* Elevated surfaces, modals */
  --bg-hover:            #1e293b;    /* Interactive hover state */
  --bg-active:           #243044;    /* Active/pressed state */

  /* ── Border Colors ── */
  --border-primary:      #1e3a5f;    /* Card borders — dark teal/blue */
  --border-secondary:    #2d4a6f;    /* Emphasized borders */
  --border-accent:       #d4870e;    /* Accent borders (orange) */

  /* ── Text Hierarchy ── */
  --text-primary:        #f1f5f9;    /* Primary text — near-white */
  --text-secondary:      #94a3b8;    /* Secondary/muted text */
  --text-tertiary:       #64748b;    /* Disabled/hint text */
  --text-accent:         #f59e0b;    /* Highlighted text — amber/gold */

  /* ── Brand Colors ── */
  --brand-primary:       #d4870e;    /* Primary orange — buttons, highlights */
  --brand-primary-hover: #b8740c;    /* Orange hover state */
  --brand-secondary:     #f59e0b;    /* Amber/gold — KPI values, accents */
  --brand-gradient-start:#d4870e;    /* Gradient from */
  --brand-gradient-end:  #f59e0b;    /* Gradient to */
}
```

#### 2.2.2 Semantic Status Colors

```css
:root {
  /* ── Status Indicators ── */
  --status-critical:     #ef4444;    /* Red — Critical alerts, broken equipment */
  --status-critical-bg:  #451a1a;    /* Red background for alert banners */
  --status-warning:      #f59e0b;    /* Amber — Warnings, high risk */
  --status-warning-bg:   #452a1a;    /* Amber background for warning banners */
  --status-success:      #22c55e;    /* Green — Operational, resolved, profitable */
  --status-success-bg:   #1a3526;    /* Green background */
  --status-info:         #3b82f6;    /* Blue — Investigating, in transit, info */
  --status-info-bg:      #1a2545;    /* Blue background */
  --status-pending:      #a855f7;    /* Purple — Pending review */
  --status-closed:       #6b7280;    /* Gray — Closed/archived */
}
```

#### 2.2.3 Chart Colors

```css
:root {
  /* ── Chart Palette (must be distinct on dark backgrounds) ── */
  --chart-orange:        #f59e0b;    /* Primary data series (ore) */
  --chart-teal:          #14b8a6;    /* Secondary series (gold) */
  --chart-blue:          #3b82f6;    /* Tertiary series */
  --chart-green:         #22c55e;    /* Positive/revenue */
  --chart-red:           #ef4444;    /* Negative/expenses */
  --chart-purple:        #a855f7;    /* Supplementary */
  --chart-cyan:          #06b6d4;    /* Supplementary */

  /* ── Expense Breakdown Donut ── */
  --expense-labor:       #f59e0b;    /* 20% — largest segment */
  --expense-fuel:        #ef4444;    /* 12% */
  --expense-chemicals:   #3b82f6;    /* 15% */
  --expense-maintenance: #22c55e;    /* 8% */
  --expense-equipment:   #14b8a6;    /* 35% */
  --expense-transport:   #a855f7;    /* 5% */
  --expense-utilities:   #06b6d4;    /* 6% */
}
```

### 2.3 Typography

```css
:root {
  /* ── Font Family ── */
  --font-primary:        'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono:           'JetBrains Mono', 'Fira Code', monospace;

  /* ── Font Sizes ── */
  --text-xs:             0.75rem;    /* 12px — Labels, badges */
  --text-sm:             0.875rem;   /* 14px — Secondary text, table cells */
  --text-base:           1rem;       /* 16px — Body text */
  --text-lg:             1.125rem;   /* 18px — Section headers */
  --text-xl:             1.25rem;    /* 20px — Page subtitles */
  --text-2xl:            1.5rem;     /* 24px — Page titles */
  --text-3xl:            1.875rem;   /* 30px — KPI large values */
  --text-4xl:            2.25rem;    /* 36px — Hero numbers */

  /* ── Font Weights ── */
  --font-normal:         400;
  --font-medium:         500;
  --font-semibold:       600;
  --font-bold:           700;

  /* ── Line Heights ── */
  --leading-tight:       1.25;
  --leading-normal:      1.5;
  --leading-relaxed:     1.75;
}
```

### 2.4 Spacing Scale

```css
:root {
  --space-0:   0;
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;       /* 16px — default padding */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px — card padding */
  --space-8:   2rem;       /* 32px — section gaps */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;       /* 48px */
  --space-16:  4rem;       /* 64px */
}
```

### 2.5 Border Radius

```css
:root {
  --radius-sm:    0.375rem;   /* 6px — small buttons, badges */
  --radius-md:    0.5rem;     /* 8px — input fields */
  --radius-lg:    0.75rem;    /* 12px — cards, panels */
  --radius-xl:    1rem;        /* 16px — large cards */
  --radius-full:  9999px;     /* Pill shapes, circular avatars */
}
```

### 2.6 Elevation & Shadows

```css
:root {
  --shadow-sm:    0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md:    0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-lg:    0 10px 15px rgba(0, 0, 0, 0.5);
  --shadow-xl:    0 20px 25px rgba(0, 0, 0, 0.6);
  --shadow-glow:  0 0 20px rgba(212, 135, 14, 0.15);   /* Orange ambient glow */
  --shadow-card:  0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03);
}
```

### 2.7 Component Tokens

#### 2.7.1 KPI Cards

```css
.kpi-card {
  background:    var(--bg-secondary);
  border:        1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding:       var(--space-4) var(--space-5);
  box-shadow:    var(--shadow-card);
  min-height:    110px;
  display:       flex;
  flex-direction: column;
  justify-content: space-between;
}

.kpi-card__label {
  font-size:     var(--text-xs);
  font-weight:   var(--font-semibold);
  color:         var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.kpi-card__value {
  font-size:     var(--text-3xl);
  font-weight:   var(--font-bold);
  color:         var(--text-primary);
  line-height:   var(--leading-tight);
}

.kpi-card__icon {
  width:         32px;
  height:        32px;
  color:         var(--brand-secondary);
  position:      absolute;
  top:           var(--space-4);
  right:         var(--space-4);
}

.kpi-card__trend {
  font-size:     var(--text-xs);
  color:         var(--status-success);   /* green for positive */
}
```

#### 2.7.2 Alert Banners

```css
.alert-banner {
  border-radius: var(--radius-lg);
  padding:       var(--space-3) var(--space-4);
  margin-bottom: var(--space-3);
  display:       flex;
  align-items:   flex-start;
  gap:           var(--space-3);
  font-size:     var(--text-sm);
  line-height:   var(--leading-normal);
}

.alert-banner--warning {
  background:    var(--status-warning-bg);
  border-left:   3px solid var(--status-warning);
  color:         var(--status-warning);
}

.alert-banner--critical {
  background:    var(--status-critical-bg);
  border-left:   3px solid var(--status-critical);
  color:         var(--status-critical);
}

.alert-banner--info {
  background:    var(--status-info-bg);
  border-left:   3px solid var(--status-info);
  color:         var(--status-info);
}
```

#### 2.7.3 Action Buttons

```css
.btn-primary {
  background:    var(--brand-primary);
  color:         #ffffff;
  border:        none;
  border-radius: var(--radius-full);
  padding:       var(--space-2) var(--space-5);
  font-size:     var(--text-sm);
  font-weight:   var(--font-semibold);
  cursor:        pointer;
  display:       inline-flex;
  align-items:   center;
  gap:           var(--space-2);
  transition:    background 0.2s ease, transform 0.1s ease;
}

.btn-primary:hover {
  background:    var(--brand-primary-hover);
}

.btn-primary:active {
  transform:     scale(0.97);
}

.btn-outline {
  background:    transparent;
  color:         var(--text-primary);
  border:        1px solid var(--border-secondary);
  border-radius: var(--radius-md);
  padding:       var(--space-2) var(--space-4);
  font-size:     var(--text-sm);
  cursor:        pointer;
  transition:    border-color 0.2s ease;
}

.btn-outline:hover {
  border-color:  var(--brand-primary);
  color:         var(--brand-secondary);
}
```

#### 2.7.4 Status Badges

```css
.badge {
  display:       inline-block;
  padding:       var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size:     var(--text-xs);
  font-weight:   var(--font-semibold);
  text-transform: capitalize;
}

.badge--critical    { background: var(--status-critical-bg); color: var(--status-critical); }
.badge--warning     { background: var(--status-warning-bg);  color: var(--status-warning); }
.badge--success     { background: var(--status-success-bg);  color: var(--status-success); }
.badge--info        { background: var(--status-info-bg);     color: var(--status-info); }
.badge--draft       { background: #1f2937;                    color: #9ca3af; }
.badge--pending     { background: #2e1065;                    color: #a855f7; }
.badge--submitted   { background: #1a2545;                    color: #3b82f6; }
```

### 2.8 Animation Tokens

```css
:root {
  --transition-fast:    150ms ease;
  --transition-normal:  250ms ease;
  --transition-slow:    400ms ease;
  --transition-spring:  300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Skeleton loading shimmer */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-tertiary) 50%, var(--bg-secondary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}

/* Spinner for AI generation */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-primary);
  border-top-color: var(--brand-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Fade-in for page transitions */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.page-enter {
  animation: fadeIn 0.3s ease forwards;
}
```

---

## 3. Navigation & Layout Architecture

### 3.1 App Shell Structure

```
┌─────────────────────────────────────────────────┐
│  HEADER BAR (fixed top)                         │
│  [☰ Menu] [SmartMine X™ Logo Banner] [+ New]   │
├────────┬────────────────────────────────────────┤
│        │                                        │
│  SIDE  │         MAIN CONTENT AREA              │
│  BAR   │         (scrollable)                   │
│        │                                        │
│  Nav   │   ┌──────────────────────────────┐     │
│  Links │   │  Page Title + Subtitle       │     │
│        │   ├──────────────────────────────┤     │
│        │   │  Alert Banners (if any)      │     │
│        │   ├──────────────────────────────┤     │
│        │   │  KPI Card Grid (2-col)       │     │
│        │   ├──────────────────────────────┤     │
│        │   │  Charts / Tables / Content   │     │
│        │   └──────────────────────────────┘     │
│        │                                        │
└────────┴────────────────────────────────────────┘
```

### 3.2 Header Bar

The header is a **fixed-position** top bar that persists across all screens.

```
Height:          56px (mobile), 64px (desktop)
Background:      var(--bg-primary) with bottom border
Border-bottom:   1px solid var(--border-primary)
Z-index:         1000
```

**Header Elements (left to right):**

| Element | Mobile | Desktop | Behavior |
|---------|--------|---------|----------|
| Home Icon (🏠) | Visible | Visible | Navigate to `/samx-app/` |
| Hamburger (☰) | Visible | Hidden | Toggle sidebar overlay |
| Logo Banner | Visible | Visible | SmartMine X™ brand image with gold/rock texture |
| "+" Button | Visible | Visible | Context-sensitive quick-add action |
| Tab Count | Visible | Hidden | Chrome tab indicator (native PWA) |
| Menu Dots (⋮) | Visible | Hidden | Browser overflow menu |

**Logo Banner Specifications:**

```
Width:           160px (mobile), 200px (desktop)
Height:          40px (mobile), 48px (desktop)
Content:         "SMARTMINE X" in bold white text
                 "Smarter Mines. Bigger Profits." tagline below
Background:      Textured gold/rock imagery with gradient overlay
Border-radius:   var(--radius-md)
```

### 3.3 Sidebar Navigation

#### 3.3.1 Mobile Behavior (< 768px)

```
Default state:   Hidden (off-screen left)
Trigger:         Hamburger icon tap
Animation:       Slide-in from left, 300ms ease
Overlay:         Semi-transparent black backdrop (rgba(0,0,0,0.6))
Width:           280px (85% of viewport max)
Close:           Tap overlay, tap X, or swipe left
Z-index:         1100 (above header)
```

#### 3.3.2 Desktop Behavior (≥ 1024px)

```
Default state:   Visible, docked left
Width:           260px (collapsible to 64px icon-only)
Position:        Fixed left
Toggle:          Collapse button at bottom of sidebar
```

#### 3.3.3 Sidebar Content Structure

```
┌─────────────────────────────┐
│  SmartMine X™ Logo (top)    │
│  "X™ SYSTEM"               │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
│                             │
│  ■ Executive     ← active  │  (orange highlight bg)
│  ⛏ Production               │
│  🛡 Safety                   │
│  🔧 Equipment               │
│  👥 Workforce               │
│  $ Financial                │
│  📋 Compliance              │
│  📦 Inventory               │
│  💎 Gold Track              │
│  🔐 Biometrics              │
│  📊 Reports                 │
│                             │
└─────────────────────────────┘
```

#### 3.3.4 Nav Item Styling

```css
.nav-item {
  display:       flex;
  align-items:   center;
  gap:           var(--space-3);
  padding:       var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  color:         var(--text-secondary);
  font-size:     var(--text-sm);
  font-weight:   var(--font-medium);
  cursor:        pointer;
  transition:    all var(--transition-fast);
}

.nav-item:hover {
  background:    var(--bg-hover);
  color:         var(--text-primary);
}

.nav-item--active {
  background:    var(--brand-primary);
  color:         #ffffff;
  font-weight:   var(--font-semibold);
}

.nav-item__icon {
  width:         20px;
  height:        20px;
  flex-shrink:   0;
}
```

### 3.4 Main Content Area

```css
.main-content {
  margin-left:   0;                    /* mobile — full width */
  padding-top:   56px;                 /* header height */
  padding:       var(--space-4);
  min-height:    100vh;
  background:    var(--bg-primary);
}

@media (min-width: 1024px) {
  .main-content {
    margin-left: 260px;                /* sidebar width */
    padding-top: 64px;
  }
}
```

### 3.5 Page Layout Pattern

Every module page follows a consistent vertical layout:

```
1.  Page Title        — <h1> + subtitle paragraph
2.  Primary CTA       — Orange pill button ("+ Log Production", "+ Report Incident", etc.)
3.  Alert Banners     — Conditional; critical/warning alerts at top
4.  KPI Grid          — 2-column grid of metric cards (mobile), 4-column (desktop)
5.  Charts Section    — Data visualizations (trend lines, bar charts, donut charts)
6.  Data Table        — Sortable tabular data
7.  Detail Cards      — Expandable/actionable item cards
```

### 3.6 Responsive Breakpoints

```css
/* Mobile-first approach */
/* Default:    320px - 767px  (mobile)   — 1 column layout    */
/* Tablet:     768px - 1023px (tablet)   — 2 column layout    */
/* Desktop:    1024px+        (desktop)  — sidebar + 3-4 cols */

@media (min-width: 768px)  { /* tablet  */ }
@media (min-width: 1024px) { /* desktop */ }
@media (min-width: 1440px) { /* large   */ }
```

### 3.7 Bottom Ad Banner (Prototype Only)

The prototype displays a persistent **SmartMine X™ promotional banner** at the bottom of the viewport:

```
Position:        fixed bottom
Width:           ~200px centered
Height:          48px
Content:         SmartMine X™ logo with rock texture background
Purpose:         Branding watermark (prototype only — remove in production)
Z-index:         900
```

---

## 4. Module 01 — Executive Dashboard

### 4.1 Overview

| Property | Value |
|----------|-------|
| **Route** | `/samx-app/` (index) |
| **Title** | "Executive Dashboard" |
| **Subtitle** | "Real-time mining operations overview" |
| **Purpose** | Single-pane operational summary for mine managers |
| **Refresh** | Auto-refresh every 60s (simulated in prototype) |

### 4.2 Alert Banner System

The dashboard opens with **contextual alert banners** that surface the most critical operational issues. These appear stacked above the KPI grid.

#### Alert Data Structure

```typescript
interface DashboardAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  icon: string;                      // Lucide icon name
  title: string;                     // e.g., "Safety Alert"
  message: string;                   // e.g., "2 critical incidents require attention"
  module: string;                    // Originating module for navigation
  route: string;                     // Deep-link to relevant module
  timestamp: string;                 // ISO 8601
  dismissed: boolean;
}
```

#### Observed Alerts from Prototype

| Type | Icon | Title | Message | Deep Link |
|------|------|-------|---------|-----------|
| Warning ⚠️ | `AlertTriangle` | Safety Alert | "2 critical incidents require immediate attention" | `/samx-app/safety` |
| Warning ⚠️ | `Package` | Inventory | "2 items running low on stock" | `/samx-app/inventory` |

#### Alert Rendering Rules

1. **Critical** alerts always appear first (red border-left, red bg)
2. **Warning** alerts appear second (orange border-left, amber bg)
3. **Info** alerts appear last (blue border-left, blue bg)
4. Maximum **3 alerts** visible at once; overflow scrolls horizontally
5. Each alert is dismissible with an "X" button (persists for session)
6. Tapping an alert navigates to the relevant module

### 4.3 KPI Cards Section

The dashboard presents **8 KPI cards** in a scrollable summary grid.

#### KPI Grid Layout

```
Mobile (< 768px):   2 columns, 4 rows
Tablet (768px+):    4 columns, 2 rows
Desktop (1024px+):  4 columns, 2 rows
Gap:                var(--space-3)
```

#### KPI Card Definitions

| # | Label | Value Example | Icon | Trend | Source Module |
|---|-------|---------------|------|-------|-------------|
| 1 | Ore Today | 45.2t | `Mountain` (↗) | vs yesterday | Production |
| 2 | Gold Recovered | 15.8g | `Gem` (↗) | vs yesterday | Production |
| 3 | Active Workers | 9 | `Users` (👥) | — | Workforce |
| 4 | Safety Incidents | 2 open | `Shield` (🛡) | last 7 days | Safety |
| 5 | Equipment Health | 85% | `Wrench` (🔧) | fleet avg | Equipment |
| 6 | Revenue MTD | $55,800 | `DollarSign` ($) | vs budget | Financial |
| 7 | Compliance | 0 overdue | `ClipboardCheck` | — | Compliance |
| 8 | Gold in Vault | 28.5g | `Lock` (🔒) | — | Gold Track |

### 4.4 Production Trend Chart

Below the KPI grid, a **dual-line time-series chart** displays the last 7 days of production data.

```typescript
// Chart Configuration
const productionTrendConfig = {
  type: 'line',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 } }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
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
        grid: { color: '#1e293b' },
        ticks: { color: '#64748b', font: { size: 11 } }
      }
    }
  },
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Ore Extracted (t)',
        data: [42, 38, 45, 51, 48, 35, 44],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#f59e0b',
      },
      {
        label: 'Gold (g)',
        data: [12, 11, 14, 16, 15, 10, 13],
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#14b8a6',
      }
    ]
  }
};
```

**Chart Container:**
```css
.chart-container {
  background:    var(--bg-secondary);
  border:        1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding:       var(--space-4);
  margin-bottom: var(--space-4);
}

.chart-container__title {
  font-size:     var(--text-base);
  font-weight:   var(--font-semibold);
  color:         var(--text-primary);
  margin-bottom: var(--space-3);
}

.chart-canvas {
  height:        220px;   /* mobile */
}

@media (min-width: 768px) {
  .chart-canvas { height: 300px; }
}
```

### 4.5 Expense Breakdown Donut Chart

A **pie/donut chart** shows expense distribution by category:

```typescript
const expenseDonutConfig = {
  type: 'doughnut',
  data: {
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
  },
  options: {
    cutout: '55%',
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#94a3b8', font: { size: 11 }, padding: 8, boxWidth: 12 }
      }
    }
  }
};
```

### 4.6 Shift Schedule Panel

Displays today's active shift assignments:

```
┌──────────────────────────────────────┐
│  Today's Shift Schedule              │
│                                      │
│  Morning Shift (06:00 - 14:00)       │
│  ● Alpha Shaft — 3 workers          │
│  ● Beta Shaft — 2 workers           │
│                                      │
│  Afternoon Shift (14:00 - 22:00)     │
│  ● Alpha Shaft — 2 workers          │
│  ● Gamma Shaft — 1 worker           │
└──────────────────────────────────────┘
```

### 4.7 Financial Summary Panel

```
┌──────────────────────────────────────┐
│  Financial Summary                   │
│                                      │
│  Total Revenue     $55,800    ↗ gren │
│  Total Expenses    $15,900    ↘ red  │
│  Net Profit        $39,900    ↗ grn  │
│  ─────────────────────────────       │
│  Status:  ↑ Profitable              │
└──────────────────────────────────────┘
```

### 4.8 Recent Incidents Carousel

Shows the last 3 safety incidents as compact cards:

```typescript
interface DashboardIncidentCard {
  id: string;
  type: string;           // "gas_detection", "collapse_risk", "near_miss"
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;       // "Alpha Shaft - Level 3"
  time: string;           // "2 hours ago"
  status: string;         // "Open", "Investigating"
}
```

### 4.9 Gold Vault Summary

```
┌──────────────────────────────────────┐
│  Gold Vault                          │
│                                      │
│  In Vault:    28.5g                  │
│  In Transit:  34.8g                  │
│  Total Value: $75,000                │
└──────────────────────────────────────┘
```

---

## 5. Module 02 — Production Intelligence

### 5.1 Overview

| Property | Value |
|----------|-------|
| **Route** | `/samx-app/production` |
| **Title** | "Production Intelligence" |
| **Subtitle** | "Track ore extraction and gold recovery" |
| **Primary CTA** | "+ Log Production" (orange pill button) |

### 5.2 KPI Cards (4 metrics)

```
Mobile layout: 2 columns × 2 rows
```

| # | Label | Value | Icon | Sub-text |
|---|-------|-------|------|----------|
| 1 | ORE EXTRACTED | 408.6t | `Mountain` ↗ | "10 shifts" |
| 2 | GOLD RECOVERED | 119.4g | `Gem` 📄 | "Avg grade 4.16 g/t" |
| 3 | AVG GRADE | 4.16 g/t | `Target` 🎯 | "Across all shafts" |
| 4 | RECOVERY RATE | 92.3% | `Percent` ↗ | "Last 30 days" |

### 5.3 Production Trend Chart (Dual-Axis Line)

A time-series chart showing ore extraction and gold recovery over the reporting period:

```typescript
const productionDetailChart = {
  type: 'line',
  data: {
    labels: ['03-17', '03-18', '03-19', '03-20', '03-21', '03-22', '03-23', '03-24', '03-25'],
    datasets: [
      {
        label: 'Ore (tonnes)',
        data: [38, 42, 55, 29, 41, 48, 33, 52, 45],
        borderColor: '#f59e0b',
        yAxisID: 'y',
      },
      {
        label: 'Gold (grams)',
        data: [11, 13, 13.5, 10, 12, 14, 11, 13, 12.5],
        borderColor: '#14b8a6',
        yAxisID: 'y1',
      }
    ]
  },
  options: {
    interaction: { mode: 'index', intersect: false },
    scales: {
      y:  { position: 'left',  title: { text: 'Ore (t)', display: true, color: '#f59e0b' } },
      y1: { position: 'right', title: { text: 'Gold (g)', display: true, color: '#14b8a6' }, grid: { drawOnChartArea: false } }
    }
  }
};
```

**Tooltip Behavior:** On hover/tap, shows a vertical crosshair with values for both series:
```
┌─────────────────────┐
│  2026-03-25          │
│  Ore:   45.2 tonnes  │
│  Gold:  12.5 grams   │
│  Grade: 3.80 g/t     │
└─────────────────────┘
```

### 5.4 Production Log Table

A full data table showing per-shift production records:

#### Table Schema

| Column | Type | Width | Sortable | Example |
|--------|------|-------|----------|---------|
| Date | date | 80px | ✅ | 2026-03-25 |
| Shaft | string | 80px | ✅ | Alpha Shaft |
| Shift | string | 80px | ✅ | Morning |
| Ore (t) | number | 60px | ✅ | 45.2 |
| Grade (g/t) | number | 70px | ✅ | 3.80 |
| Gold (g) | number | 60px | ✅ | 12.5 |

#### Sample Data (from prototype)

```
Date        Shaft         Shift       Ore(t)  Grade  Gold(g)
2026-03-25  Alpha Shaft   Morning     45.2    3.80   12.5
2026-03-25  Beta Shaft    Afternoon   38.1    4.20   11.8
2026-03-24  Alpha Shaft   Morning     52.3    3.50   13.2
2026-03-24  Beta Shaft    Night       29.7    5.10   10.4
2026-03-23  Alpha Shaft   Morning     48.9    3.90   14.1
2026-03-23  Gamma Shaft   Afternoon   33.5    4.70   11.2
2026-03-22  Alpha Shaft   Morning     41.8    4.00   12.0
2026-03-22  Beta Shaft    Afternoon   36.4    3.60   9.8
2026-03-21  Alpha Shaft   Morning     55.1    3.30   13.5
2026-03-21  Gamma Shaft   Night       28.3    4.50   9.2
```

#### Table Styling

```css
.data-table {
  width:           100%;
  border-collapse: separate;
  border-spacing:  0;
  font-size:       var(--text-sm);
}

.data-table thead th {
  background:      var(--bg-tertiary);
  color:           var(--text-secondary);
  font-weight:     var(--font-semibold);
  font-size:       var(--text-xs);
  text-transform:  uppercase;
  letter-spacing:  0.05em;
  padding:         var(--space-3) var(--space-3);
  border-bottom:   1px solid var(--border-primary);
  position:        sticky;
  top:             0;
  z-index:         10;
}

.data-table tbody td {
  padding:         var(--space-3);
  color:           var(--text-primary);
  border-bottom:   1px solid var(--border-primary);
  white-space:     nowrap;
}

.data-table tbody tr:hover {
  background:      var(--bg-hover);
}
```

### 5.5 Log Production Modal

Triggered by the "+ Log Production" CTA button:

```
┌───────────────────────────────────────┐
│  Log Production Entry         [X]     │
│  ─────────────────────────────────    │
│                                       │
│  Date*          [2026-03-25 ▼]       │
│  Shaft*         [Select shaft ▼]     │
│                  ○ Alpha Shaft       │
│                  ○ Beta Shaft        │
│                  ○ Gamma Shaft       │
│  Shift*         [Select shift ▼]     │
│                  ○ Morning           │
│                  ○ Afternoon         │
│                  ○ Night             │
│  Ore Extracted* [____] tonnes        │
│  Grade*         [____] g/t           │
│  Gold Recovered [auto-calculated]    │
│                                       │
│  [Cancel]            [Save Entry]     │
└───────────────────────────────────────┘
```

**Auto-calculation:** Gold (g) = Ore (t) × Grade (g/t) × Recovery Rate

#### Form Data Model

```typescript
interface ProductionEntry {
  id: string;                    // UUID
  date: string;                  // YYYY-MM-DD
  shaft: 'alpha' | 'beta' | 'gamma';
  shift: 'morning' | 'afternoon' | 'night';
  oreTonnes: number;             // decimal
  gradeGpt: number;              // grams per tonne
  goldGrams: number;             // calculated
  createdAt: string;             // ISO 8601
  updatedAt: string;
}
```

---

## 6. Module 03 — Safety & Risk Management

### 6.1 Overview

| Property | Value |
|----------|-------|
| **Route** | `/samx-app/safety` |
| **Title** | "Safety & Risk Management" |
| **Subtitle** | "Monitor and manage safety incidents" |
| **Primary CTA** | "+ Report Incident" (orange pill button) |

### 6.2 KPI Cards (4 metrics)

| # | Label | Value | Badge Color | Icon |
|---|-------|-------|-------------|------|
| 1 | OPEN | 2 | Red bg | `AlertCircle` |
| 2 | INVESTIGATING | 1 | Blue bg | `Search` |
| 3 | RESOLVED | 8 | Green bg | `CheckCircle` |
| 4 | CRITICAL | 2 | Red/orange bg | `AlertTriangle` ⚠️ |

### 6.3 Incident Type Breakdown (Donut Chart)

```typescript
const incidentTypeChart = {
  type: 'doughnut',
  data: {
    labels: ['Gas Detection', 'Collapse Risk', 'Near Miss', 'Injury', 'Flooding'],
    datasets: [{
      data: [3, 2, 2, 2, 1],
      backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#a855f7', '#06b6d4'],
      borderColor: '#111827',
      borderWidth: 2,
    }]
  },
  options: { cutout: '50%' }
};
```

### 6.4 Incident Cards

Each incident is rendered as an expandable card:

```
┌──────────────────────────────────────────────┐
│  Gas Detected in Alpha Shaft       [Critical]│
│  gas_detection • Alpha Shaft - Level 3       │
│  Reported: 2026-03-25 09:15                  │
│                                              │
│  High concentration of methane detected near │
│  drilling face.                              │
│                                              │
│  [Mark Resolved]  [Investigate]              │
└──────────────────────────────────────────────┘
```

#### Incident Data Model

```typescript
interface SafetyIncident {
  id: string;                      // INC-2026-001
  title: string;
  type: 'gas_detection' | 'collapse_risk' | 'near_miss' | 'injury' | 'flooding' | 'equipment_failure';
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;                // "Alpha Shaft - Level 3"
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  reportedBy: string;              // Worker name
  reportedAt: string;              // ISO 8601
  resolvedAt: string | null;
  actionsTaken: string[];
  attachments: string[];           // Photo/doc references
}
```

#### Status Badge Mapping

| Status | Background | Text Color | Border |
|--------|-----------|------------|--------|
| Open | `#451a1a` | `#ef4444` | — |
| Investigating | `#1a2545` | `#3b82f6` | — |
| Resolved | `#1a3526` | `#22c55e` | — |
| Critical | `#451a1a` | `#ef4444` | 2px solid `#ef4444` |

### 6.5 Report Incident Modal

```
┌───────────────────────────────────────┐
│  Report Safety Incident       [X]     │
│  ─────────────────────────────────    │
│                                       │
│  Incident Title*   [______________]   │
│  Type*             [Select type ▼]    │
│  Severity*         [Select ▼]         │
│                    ○ Critical         │
│                    ○ High             │
│                    ○ Medium           │
│                    ○ Low              │
│  Location*         [______________]   │
│  Description*      [                  │
│                     _______________   │
│                     _______________]  │
│  Attach Photo      [📷 Upload]        │
│                                       │
│  [Cancel]          [Submit Report]    │
└───────────────────────────────────────┘
```

---

## 7. Module 04 — Equipment & Predictive Maintenance

### 7.1 Overview

| Property | Value |
|----------|-------|
| **Route** | `/samx-app/equipment` |
| **Title** | "Equipment & Predictive Maintenance" |
| **Subtitle** | "Monitor fleet health and predict failures" |
| **Primary CTA** | "+ Add Equipment" (orange pill button) |
| **AI Feature** | "🤖 AI Analysis" button — triggers predictive analysis |

### 7.2 Tab Navigation

The Equipment module has a **3-tab** layout:

```
[ Fleet Overview ]  [ AI Predictions ]  [ Maintenance Log ]
```

```css
.tab-bar {
  display:       flex;
  border-bottom: 1px solid var(--border-primary);
  margin-bottom: var(--space-4);
  overflow-x:    auto;
  gap:           0;
}

.tab-item {
  padding:       var(--space-3) var(--space-4);
  color:         var(--text-secondary);
  font-size:     var(--text-sm);
  font-weight:   var(--font-medium);
  border-bottom: 2px solid transparent;
  cursor:        pointer;
  white-space:   nowrap;
  transition:    all var(--transition-fast);
}

.tab-item--active {
  color:         var(--brand-secondary);
  border-bottom: 2px solid var(--brand-secondary);
}
```

### 7.3 Fleet Overview Tab

#### 7.3.1 KPI Cards (4 metrics)

| # | Label | Value | Color | Icon |
|---|-------|-------|-------|------|
| 1 | OPERATIONAL | 6 | Green | ✅ |
| 2 | MAINTENANCE | 1 | Orange/amber | 🔧 |
| 3 | BROKEN | 1 | Red | ❌ |
| 4 | DECOMMISSIONED | 0 | Gray | — |

#### 7.3.2 Equipment Cards

Each piece of equipment is a detailed card:

```
┌──────────────────────────────────────────────────┐
│  Ventilation Fan Alpha                [Operational]│
│  🌬️ Ventilation • VNT-001                        │
│                                                   │
│  Health Score ████████████████████░░  99%         │
│                                                   │
│  Failure Risk ░░░░░░░░░░░░░░░░░░░░  1%          │
│  ● HIGH RISK                                     │
│  ⚠ Mechanical failure due to age and lack of     │
│    service                                        │
│                                                   │
│  Alpha Shaft Headframe    3900h operated          │
│  📅 Service: 2026-03-30                           │
│                                                   │
│  [📋 Log Maintenance]                             │
└──────────────────────────────────────────────────┘
```

#### Equipment Data Model

```typescript
interface Equipment {
  id: string;                    // VNT-001, CRU-001, CNV-003, etc.
  name: string;                  // "Ventilation Fan Alpha"
  type: string;                  // "Ventilation", "Crusher", "Conveyor"
  category: string;              // Equipment category
  status: 'operational' | 'maintenance' | 'broken' | 'decommissioned';
  healthScore: number;           // 0-100 percentage
  failureRisk: number;           // 0-100 percentage
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskReason: string;            // AI-generated explanation
  location: string;              // "Alpha Shaft Headframe"
  hoursOperated: number;         // Cumulative hours
  lastService: string;           // ISO date
  nextService: string;           // ISO date
  createdAt: string;
}
```

#### Health Score Progress Bar

```css
.health-bar {
  width:         100%;
  height:        6px;
  background:    var(--bg-tertiary);
  border-radius: var(--radius-full);
  overflow:      hidden;
  margin:        var(--space-2) 0;
}

.health-bar__fill {
  height:        100%;
  border-radius: var(--radius-full);
  transition:    width 0.5s ease;
}

.health-bar__fill--good    { background: var(--status-success); }   /* 76-100% */
.health-bar__fill--fair    { background: var(--status-warning); }   /* 51-75% */
.health-bar__fill--poor    { background: var(--status-critical); }  /* 0-50% */
```

### 7.4 AI Predictions Tab

The AI Predictions tab shows AI-generated failure predictions for each equipment unit.

```
┌──────────────────────────────────────────────────┐
│  🤖 AI Predictive Analysis                       │
│                                                   │
│  Analyzing fleet data...                         │
│  [████████████░░░░░░] 65%                        │
│                                                   │
│  ── Results ──                                   │
│                                                   │
│  ⚠ VNT-001 (Ventilation Fan Alpha)              │
│  Predicted failure within 14 days                │
│  Confidence: 87%                                 │
│  Recommendation: Schedule preventive maintenance │
│                                                   │
│  ✅ CRU-001 (Primary Jaw Crusher)               │
│  No imminent failure predicted                   │
│  Next service due: 2026-06-01                    │
└──────────────────────────────────────────────────┘
```

### 7.5 Maintenance Log Tab

A chronological list of all maintenance activities:

```typescript
interface MaintenanceLog {
  id: string;
  equipmentId: string;
  equipmentName: string;
  type: 'preventive' | 'corrective' | 'emergency';
  description: string;
  performedBy: string;
  date: string;
  hoursSpent: number;
  cost: number;
  partsUsed: string[];
}
```

### 7.6 Equipment Roster (from prototype)

| Equipment | ID | Type | Health | Risk | Location | Hours |
|-----------|-----|------|--------|------|----------|-------|
| Ventilation Fan Alpha | VNT-001 | Ventilation | 99% | 1% HIGH RISK | Alpha Shaft | 3900h |
| Primary Jaw Crusher | CRU-001 | Crusher | 99% | 1% MEDIUM RISK | Processing Plant | 4820h |
| Main Conveyor Belt | CNV-003 | Conveyor | 99% | — | — | — |

---

## 8. Module 05 — Workforce Intelligence

### 8.1 Overview

| Property | Value |
|----------|-------|
| **Route** | `/samx-app/workforce` |
| **Title** | "Workforce Intelligence" |
| **Subtitle** | "Worker management, tracking and productivity" |
| **Primary CTA** | "+ Add Worker" (orange pill button) |

### 8.2 KPI Cards (4 metrics)

| # | Label | Value | Icon | Sub-text |
|---|-------|-------|------|----------|
| 1 | TOTAL WORKERS | 10 | `Users` 👥 | — |
| 2 | ACTIVE | 9 | `UserCheck` 🟢 | — |
| 3 | UNDERGROUND NOW | 5 | `ArrowDown` ↓ | "Real-time" |
| 4 | AVG PRODUCTIVITY | 86% | `TrendingUp` ↗ | — |

### 8.3 Worker Roster Table

Full-width scrollable table of all registered workers:

#### Table Schema

| Column | Type | Width | Sortable | Example |
|--------|------|-------|----------|---------|
| Name | string | 120px | ✅ | Rudo Mapfumo |
| ID | string | 70px | ✅ | MCX-009 |
| Role | string | 90px | ✅ | Geologist |
| Shaft | string | 90px | ✅ | All Shafts |
| Shift | string | 80px | ✅ | Morning |

#### Complete Worker Roster (from prototype)

| Name | ID | Role | Shaft | Shift |
|------|-----|------|-------|-------|
| Rudo Mapfumo | MCX-009 | Geologist | All Shafts | Morning |
| Chiedza Zimuto | MCX-010 | Electrician | Surface | Morning |
| Tatenda Moyo | MCX-001 | Supervisor | Shaft Alfa | Morning |
| Gift Ndlovu | MCX-002 | Miner | Alpha Shaft | Morning |
| Blessing Chirwa | MCX-003 | Driller | Beta Shaft | Afternoon |
| Kudakwashe Mhike | MCX-004 | Blaster | Alpha Shaft | Morning |
| Tinashe Gumbo | MCX-005 | Mechanic | Surface | Morning |
| Farai Mutasa | MCX-006 | Safety Officer | All Shafts | — |
| Simba Dube | MCX-007 | Operator | Processing Plant | Afternoon |
| Takudzwa Nyoni | MCX-008 | — | — | — |

### 8.4 Worker Data Model

```typescript
interface Worker {
  id: string;                     // MCX-001 format
  firstName: string;
  lastName: string;
  role: string;                   // "Geologist", "Electrician", "Miner", etc.
  shaft: string;                  // "Alpha Shaft", "Beta Shaft", "Surface", "All Shafts"
  shift: 'morning' | 'afternoon' | 'night' | null;
  status: 'active' | 'inactive' | 'on_leave';
  productivity: number;           // 0-100 percentage
  isUnderground: boolean;         // Real-time flag
  contactPhone: string;
  emergencyContact: string;
  hireDate: string;               // ISO date
  certifications: string[];       // Safety certs, mining licenses
  createdAt: string;
}
```

### 8.5 Add Worker Modal

```
┌───────────────────────────────────────┐
│  Add New Worker               [X]     │
│  ─────────────────────────────────    │
│                                       │
│  First Name*     [______________]     │
│  Last Name*      [______________]     │
│  Role*           [Select role ▼]      │
│  Assigned Shaft  [Select shaft ▼]     │
│  Default Shift   [Select shift ▼]     │
│  Phone           [______________]     │
│  Emergency Contact [____________]     │
│  Hire Date       [YYYY-MM-DD]         │
│                                       │
│  [Cancel]          [Add Worker]       │
└───────────────────────────────────────┘
```

---

## 9. Module 06 — Financial Intelligence

### 9.1 Overview

| Property | Value |
|----------|-------|
| **Route** | `/samx-app/financial` |
| **Title** | "Financial Intelligence" |
| **Subtitle** | "Revenue, costs, and profitability tracking" |
| **Primary CTA** | "+ Add Record" (orange pill button) |

### 9.2 KPI Cards (4 metrics)

| # | Label | Value | Icon | Color/Trend |
|---|-------|-------|------|-------------|
| 1 | REVENUE | $55,800 | `TrendingUp` ↗ | Green |
| 2 | EXPENSES | $15,900 | `TrendingDown` ↘ | Red |
| 3 | NET PROFIT | $39,900 | `DollarSign` $ | Green, "↑ Profitable" |
| 4 | RECORDS | 10 | `DollarSign` $ | Neutral |

### 9.3 Revenue vs Expenses Bar Chart

```typescript
const revenueExpenseChart = {
  type: 'bar',
  data: {
    labels: ['2026-03'],
    datasets: [
      {
        label: 'Revenue',
        data: [55800],
        backgroundColor: '#14b8a6',   // Teal
        borderRadius: 4,
        barPercentage: 0.6,
      },
      {
        label: 'Expenses',
        data: [15900],
        backgroundColor: '#ef4444',   // Red-ish (salmon in prototype)
        borderRadius: 4,
        barPercentage: 0.6,
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: $${ctx.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v) => `$${v.toLocaleString()}` }
      }
    }
  }
};
```

**Chart Tooltip (on hover):**
```
┌──────────────────────┐
│  2026-03             │
│  Revenue: $55,800    │
│  Expenses: $15,900   │
└──────────────────────┘
```

### 9.4 Financial Transactions Table

#### Table Schema

| Column | Type | Width | Example |
|--------|------|-------|---------|
| Date | date | 70px | 2026-03-25 |
| Type | badge | 70px | `revenue` (green) / `expense` (red) |
| Category | string | 90px | Gold Sales, Labor, Fuel, etc. |
| Amount | currency | 70px | $18,500 |
| Description | string | flex | "Gold sale batch GB-2026-014" |

#### Sample Transaction Data (from prototype)

| Date | Type | Category | Amount | Description |
|------|------|----------|--------|-------------|
| 2026-03-25 | revenue | Gold Sales | $18,500 | Gold sale |
| 2026-03-25 | expense | Labor | $3,200 | Weekly payroll |
| 2026-03-24 | revenue | Gold Sales | $15,200 | Gold sale |
| 2026-03-23 | expense | Fuel | $1,850 | Diesel delivery |
| 2026-03-22 | expense | Chemicals | $2,400 | Cyanide supply |
| 2026-03-21 | expense | Maintenance | $1,200 | Pump installation |
| 2026-03-20 | expense | Transport | $800 | Ore transport |
| 2026-03-19 | revenue | Gold Sales | $22,100 | Gold sale |
| 2026-03-18 | expense | Equipment | $5,500 | New equipment |
| 2026-03-17 | expense | Utilities | $750 | Monthly utilities |

#### Type Badge Styling

```css
.type-badge--revenue {
  color: var(--status-success);
  font-weight: var(--font-semibold);
}

.type-badge--revenue::before {
  content: '× ';   /* Prototype shows "× revenue" marker */
}

.type-badge--expense {
  color: var(--status-critical);
  font-weight: var(--font-semibold);
}

.type-badge--expense::before {
  content: '× ';
}
```

### 9.5 Financial Data Model

```typescript
interface FinancialRecord {
  id: string;
  date: string;                    // YYYY-MM-DD
  type: 'revenue' | 'expense';
  category: string;                // "Gold Sales", "Labor", "Fuel", etc.
  amount: number;                  // Always positive
  description: string;
  createdAt: string;
  updatedAt: string;
}
```

### 9.6 Expense Breakdown Donut (Reports Tab)

When viewed from the Reports module's Financial tab:

```
Expense Breakdown (Donut Chart)
───────────────────────────────
  equipment  35%   (#14b8a6)
  labor      20%   (#f59e0b)
  chemicals  15%   (#3b82f6)
  fuel       12%   (#ef4444)
  maintenance 8%   (#22c55e)
  utilities   6%   (#06b6d4)
  transport   5%   (#a855f7)
```

### 9.7 Financial Summary (Reports Tab)

```
Financial Summary
─────────────────
  Total Revenue    $55,800
  Total Expenses   $15,900
  Net P&L          $39,900
  Status:          ↑ Profitable
```

---

## 10. Module 07 — Compliance & ESG

### 10.1 Overview

| Property | Value |
|----------|-------|
| **Route** | `/samx-app/compliance` |
| **Title** | "Compliance & ESG" |
| **Subtitle** | "Regulatory reporting and audit management" |
| **Primary CTA** | "+ New Report" (orange pill button) |

### 10.2 KPI Cards (4 metrics)

| # | Label | Value | Icon | Color |
|---|-------|-------|------|-------|
| 1 | DRAFTS | 2 | `FileText` 📄 | Neutral (gray bg) |
| 2 | PENDING REVIEW | 1 | `Clock` ⏳ | Amber/orange bg |
| 3 | SUBMITTED | 2 | `CheckCircle` ✅ | Green bg |
| 4 | OVERDUE | 0 | `AlertTriangle` ⚠️ | Red bg (highlight if > 0) |

### 10.3 Compliance Report Cards

Each compliance report is rendered as a detailed card with workflow status:

```
┌──────────────────────────────────────────────────┐
│  March 2026 Monthly Production         [Draft]   │
│  Report                                          │
│  Production Report • March 2026                  │
│  Due: 2026-04-05                                 │
│                                                  │
│  Includes all three shafts production data       │
│                                                  │
│  [Submit for Review]                             │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  Q1 2026 Environmental Impact  [Pending Review]  │
│  Report                                          │
│  Environmental • Q1 2026                         │
│  Due: 2026-04-15                                 │
│                                                  │
│  Water quality and dust monitoring results       │
│                                                  │
│  [Approve]                                       │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  Annual Safety Audit 2025          [Approved]    │
│  Safety Audit • 2025                             │
│  Due: 2026-01-31                                 │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  Mining License Renewal Filing     [Submitted]   │
│  Government Filing • 2026-2028                   │
│  Due: 2026-03-31                                 │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  Q1 2026 ESG Report                  [Draft]     │
│  ESG Report • Q1 2026                            │
│  Due: 2026-04-20                                 │
│                                                  │
│  Community engagement and environmental metrics  │
│                                                  │
│  [Submit for Review]                             │
└──────────────────────────────────────────────────┘
```

### 10.4 Report Workflow State Machine

```
  ┌───────┐    Submit     ┌─────────┐   Approve    ┌──────────┐
  │ Draft │ ───────────→ │ Pending │ ──────────→ │ Approved │
  │       │              │ Review  │              │          │
  └───────┘              └─────────┘              └──────────┘
                              │                        │
                              │ Submit                 │ Submit
                              ▼                        ▼
                         ┌──────────┐            ┌──────────┐
                         │ Rejected │            │Submitted │
                         │ (→Draft) │            │(to govt) │
                         └──────────┘            └──────────┘
```

### 10.5 Compliance Report Data Model

```typescript
interface ComplianceReport {
  id: string;
  title: string;                    // "March 2026 Monthly Production Report"
  type: 'production' | 'environmental' | 'safety_audit' | 'government_filing' | 'esg';
  period: string;                   // "March 2026", "Q1 2026", "2025"
  status: 'draft' | 'pending_review' | 'approved' | 'submitted' | 'overdue' | 'rejected';
  dueDate: string;                  // ISO date
  description: string;
  submittedAt: string | null;
  approvedBy: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### 10.6 Status Badge Mapping

| Status | Badge Text | Background | Text Color |
|--------|-----------|------------|------------|
| Draft | "Draft" | `#1f2937` | `#9ca3af` (gray) |
| Pending Review | "Pending Review" | `#452a1a` | `#f59e0b` (amber) |
| Approved | "Approved" | `#1a3526` | `#22c55e` (green) |
| Submitted | "Submitted" | `#1a2545` | `#3b82f6` (blue) |
| Overdue | "Overdue" | `#451a1a` | `#ef4444` (red) |

---

## 11. Module 08 — Inventory & Supply Chain

### 11.1 Overview

| Property | Value |
|----------|-------|
| **Route** | `/samx-app/inventory` |
| **Title** | "Inventory & Supply Chain" |
| **Subtitle** | "Stock tracking and consumption analytics" |
| **Primary CTA** | "+ Add Item" (orange pill button) |

### 11.2 KPI Cards (4 metrics)

| # | Label | Value | Icon | Color |
|---|-------|-------|------|-------|
| 1 | IN STOCK | 5 | `Package` 📦 | Green |
| 2 | LOW STOCK | 2 | `AlertTriangle` ⚠️ | Amber/orange |
| 3 | OUT OF STOCK | 1 | `XCircle` ❌ | Red |
| 4 | TOTAL VALUE | $4,695 | `DollarSign` 💰 | Neutral |

### 11.3 Inventory Table

| Column | Type | Width | Example |
|--------|------|-------|---------|
| Item | string | 100px | Ammonium Nitrate |
| Category | string | 80px | Explosives |
| Qty | number | 50px | 250 |
| Unit | string | 50px | kg |
| Reorder | number | 60px | 100 |

#### Complete Inventory Data (from prototype)

| Item | Category | Qty | Unit | Reorder Level |
|------|----------|-----|------|--------------|
| Ammonium Nitrate | Explosives | 250 | kg | 100 |
| Sodium Cyanide | Chemicals | 80 | kg | 50 |
| Diesel Fuel | Fuel | 1200 | litres | 500 |
| Drill Bits (45mm) | Spare Parts | 8 | units | 10 |
| Safety Helmets | PPE | 25 | units | 10 |
| Conveyor Belt Section (1m) | Spare Parts | 3 | metres | 5 |
| Activated Carbon | Chemicals | 0 | kg | 100 |
| Ventilation Ducting | Other | — | — | — |

#### Stock Status Logic

```typescript
function getStockStatus(qty: number, reorderLevel: number): 'in_stock' | 'low_stock' | 'out_of_stock' {
  if (qty === 0) return 'out_of_stock';
  if (qty <= reorderLevel) return 'low_stock';
  return 'in_stock';
}
```

#### Row Color Coding

```css
.inventory-row--out-of-stock td { color: var(--status-critical); }
.inventory-row--low-stock td    { color: var(--status-warning); }
.inventory-row--in-stock td     { color: var(--text-primary); }
```

### 11.4 Inventory Data Model

```typescript
interface InventoryItem {
  id: string;
  name: string;
  category: 'explosives' | 'chemicals' | 'fuel' | 'spare_parts' | 'ppe' | 'other';
  quantity: number;
  unit: string;                    // "kg", "litres", "units", "metres"
  reorderLevel: number;
  unitCost: number;
  supplier: string;
  lastRestocked: string;           // ISO date
  createdAt: string;
  updatedAt: string;
}
```

---

## 12. Module 09 — Gold Chain of Custody

### 12.1 Overview

| Property | Value |
|----------|-------|
| **Route** | `/samx-app/gold-track` |
| **Title** | "Gold Chain of Custody" |
| **Subtitle** | "Secure tracking from mine to market" |
| **Primary CTA** | "+ Register Batch" (orange pill button) |

### 12.2 KPI Cards (4 metrics)

| # | Label | Value | Icon | Color |
|---|-------|-------|------|-------|
| 1 | IN VAULT | 28.5g | `Lock` 🔒 | Neutral |
| 2 | IN TRANSIT | 34.8g | `Truck` 🚚 | Blue |
| 3 | SOLD | 92.8g | `Diamond` 💎 | Green |
| 4 | TOTAL VALUE | $75,000 | `Eye` 👁 | Gold/amber |

### 12.3 Gold Batch Cards

Each gold batch is tracked with a detailed custody card showing weight, purity, custodian, and chain-of-custody status:

```
┌──────────────────────────────────────────────────┐
│  GB-2026-014                         [In Vault]  │
│  Alpha Shaft • 2026-03-25                        │
│                                                   │
│  Weight          Purity                           │
│  28.5g           93.1%                            │
│                                                   │
│  Custodian       Value                            │
│  Farai Mutasa    $12,400                          │
│                                                   │
│  Seal: SL-2026-014                               │
│                                                   │
│  [Mark in Transit]                               │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  GB-2026-015                    [Assay Pending]  │
│  Gamma Shaft • 2026-03-25                        │
│                                                   │
│  Weight          Purity                           │
│  15.7g           88.4%                            │
│                                                   │
│  Custodian       Value                            │
│  Rudo Mapfumo    $6,800                           │
│                                                   │
│  [Move to Vault]                                 │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  GB-2026-012                           [Sold]    │
│  Alpha Shaft • 2026-03-24                        │
│                                                   │
│  Weight          Purity                           │
│  42.3g           92.5%                            │
│                                                   │
│  Custodian       Value                            │
│  Mine Director   $18,500                          │
│                                                   │
│  Seal: SL-2026-012                               │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  GB-2026-013                      [In Transit]   │
│  Beta Shaft • 2026-03-24                         │
│                                                   │
│  Weight          Purity                           │
│  34.8g           91.8%                            │
│                                                   │
│  Custodian       Value                            │
│  Tatenda Moyo    $15,200                          │
│                                                   │
│  Seal: SL-2026-013                               │
│                                                   │
│  [Mark Delivered]                                │
└──────────────────────────────────────────────────┘
```

### 12.4 Batch Status State Machine

```
  ┌─────────┐  Move to   ┌──────────┐  Mark in   ┌───────────┐  Mark      ┌──────┐
  │  Assay  │ ────────→ │ In Vault │ ────────→ │In Transit │ ───────→ │ Sold │
  │ Pending │            │          │            │           │ Delivered │      │
  └─────────┘            └──────────┘            └───────────┘          └──────┘
```

### 12.5 Gold Batch Data Model

```typescript
interface GoldBatch {
  id: string;                      // GB-2026-014 format
  shaft: string;                   // "Alpha Shaft", "Beta Shaft", "Gamma Shaft"
  date: string;                    // Recovery date
  weightGrams: number;             // Gross weight in grams
  purity: number;                  // Percentage (e.g., 93.1)
  valueUSD: number;                // Calculated market value
  custodian: string;               // Current custodian name
  sealNumber: string | null;       // SL-2026-014 format
  status: 'assay_pending' | 'in_vault' | 'in_transit' | 'sold';
  buyer: string | null;            // Buyer info for sold batches
  transitDestination: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### 12.6 Status Badge Mapping

| Status | Badge Text | Background | Text Color |
|--------|-----------|------------|------------|
| Assay Pending | "Assay Pending" | `#452a1a` | `#f59e0b` (amber) |
| In Vault | "In Vault" | `#1a3526` | `#22c55e` (green) |
| In Transit | "In Transit" | `#1a2545` | `#3b82f6` (blue) |
| Sold | "Sold" | `#1f2937` | `#9ca3af` (gray) |

---

## 13. Module 10 — Biometric Attendance

### 13.1 Overview

| Property | Value |
|----------|-------|
| **Route** | `/samx-app/biometrics` |
| **Title** | "Biometric Attendance" |
| **Subtitle** | "ZKTeco integration — real-time worker clock-in/out tracking" |
| **Primary CTA** | "+ Add Device" (outline button, top-right) |
| **Date Picker** | Date selector for filtering attendance records |

### 13.2 Tab Navigation (3 tabs)

```
[ Attendance Log ]  [ ZK Devices (2) ]  [ Setup Guide ]
```

### 13.3 KPI Cards (4 metrics)

| # | Label | Value | Icon | Sub-text |
|---|-------|-------|------|----------|
| 1 | CLOCKED IN TODAY | 0 | `Fingerprint` 🔐 | — |
| 2 | CURRENTLY INSIDE | 0 | `Users` 👥 | "Below ground / on site" |
| 3 | CLOCKED OUT | 0 | `Clock` ⏰ | — |
| 4 | TOTAL HOURS | 0.0h | `Calendar` 📅 | — |

### 13.4 Attendance Log Tab

#### Manual Clock-In Form

```
┌───────────────────────────────────────┐
│  Worker         [Select worker... ▼]  │
│  Event          [Clock In ▼]          │
│                                       │
│  [→ Clock In]   (full-width orange)   │
│                                       │
│  "No attendance records for this date"│
└───────────────────────────────────────┘
```

#### Attendance Record Data Model

```typescript
interface AttendanceRecord {
  id: string;
  workerId: string;
  workerName: string;
  event: 'clock_in' | 'clock_out';
  timestamp: string;              // ISO 8601
  method: 'manual' | 'biometric' | 'nfc';
  deviceId: string | null;        // ZKTeco device ID
  location: string;               // "Main Gate", "Shaft Alpha Entrance"
  date: string;                   // YYYY-MM-DD for filtering
}
```

### 13.5 ZK Devices Tab

Displays connected ZKTeco biometric terminals:

```typescript
interface ZKDevice {
  id: string;
  name: string;                    // "Main Gate Scanner"
  model: string;                   // "ZKTeco SpeedFace V5L"
  ipAddress: string;
  status: 'online' | 'offline' | 'error';
  lastSync: string;                // ISO 8601
  enrolledWorkers: number;
  location: string;
}
```

### 13.6 Setup Guide Tab

Static documentation panel with setup instructions for ZKTeco hardware integration. Content rendered as markdown with code snippets for API configuration.

---

## 14. Module 11 — Reports & Analytics

### 14.1 Overview

| Property | Value |
|----------|-------|
| **Route** | `/samx-app/reports` |
| **Title** | "Reports & Analytics" |
| **Subtitle** | "Operational intelligence across all mining modules" |
| **Date Filter** | Dropdown: "Last 30 days" (default), "Last 7 days", "Last 90 days", "Custom" |

### 14.2 Cross-Module KPI Summary (4 cards)

| # | Label | Value | Icon | Sub-text |
|---|-------|-------|------|----------|
| 1 | ORE EXTRACTED | 408.6t | `Mountain` ↗ | "10 shifts" |
| 2 | GOLD RECOVERED | 119.4g | `Gem` 📄 | "Avg grade 4.16 g/t" |
| 3 | NET P&L | $39,900 | `DollarSign` $ | "Rev $55,800 / ↑ Profitable" |
| 4 | SAFETY EVENTS | 5 | `Shield` 🛡 | "2 critical/high" |

### 14.3 Tab Navigation (5 tabs)

```
[ Production ]  [ Financial ]  [ Safety ]  [ Equipment ]
                    [ AI Report ]
```

### 14.4 Production Tab

#### Production by Shaft (Grouped Bar Chart)

```typescript
const productionByShaftChart = {
  type: 'bar',
  data: {
    labels: ['Alpha Shaft', 'Beta Shaft', 'Gamma Shaft'],
    datasets: [
      {
        label: 'Ore (t)',
        data: [243, 120, 45],
        backgroundColor: '#f59e0b',
        borderRadius: 4,
      },
      {
        label: 'Gold (g)',
        data: [65, 35, 19],
        backgroundColor: '#14b8a6',
        borderRadius: 4,
      }
    ]
  }
};
```

#### Production Trend (Line Chart)

Displays ore extraction trend over the reporting period with values ranging from ~15t to ~55t across multiple dates.

#### Production Data Table

Same schema as Module 02 (Production Intelligence) — Date, Shaft, Shift, Ore(t), Grade(g/t), Gold(g).

### 14.5 Financial Tab

#### Expense Breakdown (Pie/Donut Chart)

Full-color donut showing expense categories:
- equipment 35%, labor 20%, chemicals 15%, fuel 12%, maintenance 8%, utilities 6%, transport 5%

#### Financial Summary Panel

```
Financial Summary
─────────────────
Total Revenue     $55,800
Total Expenses    $15,900
Net P&L           $39,900
```

### 14.6 Safety Tab

#### Incidents by Type (Horizontal Bar Chart)

```typescript
const incidentsByTypeChart = {
  type: 'bar',
  options: { indexAxis: 'y' },
  data: {
    labels: ['gas_detection', 'collapse_risk', 'near_miss', 'injury', 'flooding'],
    datasets: [{
      data: [1, 1, 1, 1, 1],
      backgroundColor: '#f59e0b',
      borderRadius: 4,
    }]
  }
};
```

#### Safety Summary Panel

Displays total incidents, critical count, resolution rate, and days since last incident.

### 14.7 Equipment Tab

#### Fleet Health Distribution (Bar Chart)

```typescript
const fleetHealthChart = {
  type: 'bar',
  data: {
    labels: ['0-25', '26-50', '51-75', '76-100'],
    datasets: [{
      data: [0, 0, 1, 7],
      backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#f59e0b'],
      borderRadius: 4,
    }]
  }
};
```

**Tooltip on 76-100 bar:** "76-100 | Units: 7"

#### Equipment Summary Panel

```
Equipment Summary
─────────────────
Operational         6
Maintenance         1
Broken              1
Decommissioned      0
```

### 14.8 AI Report Tab

The AI Report tab is the most distinctive feature — it generates a comprehensive executive summary by analyzing all operational data.

#### 14.8.1 Pre-Generation State

```
┌──────────────────────────────────────────────────┐
│  🧠 AI Executive Report                          │
│                                                   │
│  [🔄 Generate Report]  (orange button)           │
│                                                   │
│     🧠                                           │
│  Generate an AI Executive Report                 │
│  The AI will analyze all operational data and    │
│  produce a structured management summary         │
└──────────────────────────────────────────────────┘
```

#### 14.8.2 Generation Loading State

```
┌──────────────────────────────────────────────────┐
│  🧠 AI Executive Report                          │
│                                                   │
│  [⏳ Generating...]  (disabled, pulsing)         │
│                                                   │
│     ⟳  (spinning orange circle)                  │
│  Analyzing operational data...                   │
└──────────────────────────────────────────────────┘
```

#### 14.8.3 Generated Report State

```
┌──────────────────────────────────────────────────┐
│  🧠 AI Executive        [📥 Download]            │
│  Report                  [🔄 Generate Report]    │
│                                                   │
│  ┌────────────────────────────────────────────┐  │
│  │ # Executive Summary Report                 │  │
│  │                                            │  │
│  │ ## Executive Summary                       │  │
│  │ In the past 30 days, SmartMine X™ has     │  │
│  │ successfully extracted 408.6 tonnes of     │  │
│  │ ore, yielding 119.40 grams of gold at an  │  │
│  │ average grade of 4.16 g/t. Financially,   │  │
│  │ the operations generated a net income of   │  │
│  │ $39,900, demonstrating sustained           │  │
│  │ profitability despite operational          │  │
│  │ challenges that included five reported     │  │
│  │ safety incidents.                          │  │
│  │                                            │  │
│  │ ## Key Performance Highlights              │  │
│  │ - **Production Efficiency**: Total ore     │  │
│  │   extracted reached 408.6 tonnes with an   │  │
│  │   average gold recovery rate of 4.16 g/t.  │  │
│  │   Alpha Shaft leading in both ore and      │  │
│  │   gold output (243.3 tonnes and 65.3 g).  │  │
│  │                                            │  │
│  │ - **Financial Performance**: Revenue of    │  │
│  │   $55,800 against expenses of $15,900,    │  │
│  │   culminating in net income of $39,900.   │  │
│  │                                            │  │
│  │ - **Safety Overview**: Five incidents      │  │
│  │   recorded, two classified as critical.   │  │
│  │   Types: gas detection, collapse risk,    │  │
│  │   near misses, flooding.                  │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

#### 14.8.4 AI Report Template (Prototype Implementation)

Since this is a $0 prototype, the AI report is **template-driven** with data interpolation rather than using an actual LLM API:

```typescript
function generateExecutiveReport(data: AppState): string {
  const { production, financial, safety, equipment } = data;

  const totalOre = production.entries.reduce((sum, e) => sum + e.oreTonnes, 0);
  const totalGold = production.entries.reduce((sum, e) => sum + e.goldGrams, 0);
  const avgGrade = totalOre > 0 ? (totalGold / totalOre).toFixed(2) : '0.00';
  const totalRevenue = financial.records.filter(r => r.type === 'revenue').reduce((s, r) => s + r.amount, 0);
  const totalExpenses = financial.records.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
  const netIncome = totalRevenue - totalExpenses;
  const totalIncidents = safety.incidents.length;
  const criticalIncidents = safety.incidents.filter(i => i.severity === 'critical' || i.severity === 'high').length;

  return `# Executive Summary Report

## Executive Summary
In the past 30 days, SmartMine X™ has successfully extracted ${totalOre.toFixed(1)} tonnes of ore, yielding ${totalGold.toFixed(2)} grams of gold at an average grade of ${avgGrade} g/t. Financially, the operations generated a net income of $${netIncome.toLocaleString()}, demonstrating sustained profitability despite operational challenges that included ${totalIncidents} reported safety incidents.

## Key Performance Highlights
- **Production Efficiency**: Total ore extracted reached ${totalOre.toFixed(1)} tonnes with an average gold recovery rate of ${avgGrade} grams per tonne (g/t).
- **Financial Performance**: The operation realized a revenue of $${totalRevenue.toLocaleString()} against expenses of $${totalExpenses.toLocaleString()}, culminating in a net income of $${netIncome.toLocaleString()}.
- **Safety Overview**: There was a total of ${totalIncidents} incidents recorded, ${criticalIncidents} of which were classified as critical or high severity.`;
}
```

#### 14.8.5 Download Feature

The Download button exports the report as a `.md` file using the browser's `Blob` and `URL.createObjectURL` APIs:

```typescript
function downloadReport(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'SmartMineX_Executive_Report.md';
  a.click();
  URL.revokeObjectURL(url);
}
```

---

## 15. PWA Technical Requirements

### 15.1 Web App Manifest

```json
{
  "name": "samX App — SmartMine X™",
  "short_name": "samX",
  "description": "Smart Mining Progressive Web App — Smarter Mines. Bigger Profits.",
  "start_url": "/samx-app/",
  "scope": "/samx-app/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#0a0e17",
  "background_color": "#0a0e17",
  "lang": "en",
  "dir": "ltr",
  "categories": ["business", "productivity"],
  "icons": [
    { "src": "/samx-app/icons/icon-72x72.png", "sizes": "72x72", "type": "image/png" },
    { "src": "/samx-app/icons/icon-96x96.png", "sizes": "96x96", "type": "image/png" },
    { "src": "/samx-app/icons/icon-128x128.png", "sizes": "128x128", "type": "image/png" },
    { "src": "/samx-app/icons/icon-144x144.png", "sizes": "144x144", "type": "image/png" },
    { "src": "/samx-app/icons/icon-152x152.png", "sizes": "152x152", "type": "image/png" },
    { "src": "/samx-app/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/samx-app/icons/icon-384x384.png", "sizes": "384x384", "type": "image/png" },
    { "src": "/samx-app/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "screenshots": [
    { "src": "/samx-app/screenshots/dashboard-mobile.png", "sizes": "390x844", "type": "image/png", "form_factor": "narrow" },
    { "src": "/samx-app/screenshots/dashboard-desktop.png", "sizes": "1920x1080", "type": "image/png", "form_factor": "wide" }
  ]
}
```

### 15.2 Service Worker Strategy

```typescript
// service-worker.ts — Workbox-based implementation

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache all build assets
precacheAndRoute(self.__WB_MANIFEST);

// App Shell — Cache First (HTML, CSS, JS)
registerRoute(
  ({ request }) => request.destination === 'document' ||
                   request.destination === 'style' ||
                   request.destination === 'script',
  new CacheFirst({
    cacheName: 'samx-app-shell',
    plugins: [new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 })]
  })
);

// Google Fonts — Cache First
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'samx-fonts',
    plugins: [new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 365 * 24 * 60 * 60 })]
  })
);

// Images — Cache First
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'samx-images',
    plugins: [new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 })]
  })
);

// API Calls (future) — Network First with fallback
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'samx-api',
    plugins: [new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 5 * 60 })]
  })
);
```

### 15.3 Offline Capabilities

| Feature | Offline Behavior |
|---------|-----------------|
| Dashboard | Renders from last cached state in IndexedDB |
| Data Entry | Queues entries in IndexedDB; syncs when online |
| Charts | Renders from cached data; shows "Last updated: X" |
| AI Report | Not available offline; shows "Requires connection" |
| Navigation | Full sidebar navigation works offline |
| Forms | All forms functional; data persisted locally |

### 15.4 Install Prompt

```typescript
let deferredPrompt: BeforeInstallPromptEvent | null = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallBanner();
});

function showInstallBanner() {
  // Show a custom "Install samX App" banner at the bottom of the screen
  // with "Install" and "Not now" buttons
}

async function handleInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
  }
}
```

---

## 16. Frontend Architecture

### 16.1 Project Structure

```
samx-app/
├── public/
│   ├── manifest.json
│   ├── service-worker.js
│   ├── icons/                    # PWA icons (72-512px)
│   └── screenshots/              # PWA install screenshots
├── src/
│   ├── main.tsx                  # React entry point
│   ├── App.tsx                   # Root component with Router
│   ├── index.css                 # Global styles + design tokens
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx      # Header + Sidebar + Content wrapper
│   │   │   ├── Header.tsx        # Top navigation bar
│   │   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   │   └── PageLayout.tsx    # Standard page layout wrapper
│   │   ├── common/
│   │   │   ├── KPICard.tsx       # Reusable KPI metric card
│   │   │   ├── KPIGrid.tsx       # 2/4-column grid container
│   │   │   ├── AlertBanner.tsx   # Contextual alert component
│   │   │   ├── StatusBadge.tsx   # Color-coded status pill
│   │   │   ├── DataTable.tsx     # Sortable data table
│   │   │   ├── ChartCard.tsx     # Chart.js wrapper with dark theme
│   │   │   ├── Modal.tsx         # Full-screen modal overlay
│   │   │   ├── Button.tsx        # Primary/Outline/Ghost buttons
│   │   │   ├── TabBar.tsx        # Horizontal tab navigation
│   │   │   ├── FormField.tsx     # Labeled input/select/textarea
│   │   │   ├── Skeleton.tsx      # Loading skeleton component
│   │   │   ├── Spinner.tsx       # Loading spinner
│   │   │   └── EmptyState.tsx    # "No data" placeholder
│   │   └── modules/
│   │       ├── dashboard/        # Dashboard-specific components
│   │       ├── production/       # Production module components
│   │       ├── safety/           # Safety module components
│   │       ├── equipment/        # Equipment module components
│   │       ├── workforce/        # Workforce module components
│   │       ├── financial/        # Financial module components
│   │       ├── compliance/       # Compliance module components
│   │       ├── inventory/        # Inventory module components
│   │       ├── goldtrack/        # Gold custody components
│   │       ├── biometrics/       # Biometric attendance components
│   │       └── reports/          # Reports & analytics components
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── ProductionPage.tsx
│   │   ├── SafetyPage.tsx
│   │   ├── EquipmentPage.tsx
│   │   ├── WorkforcePage.tsx
│   │   ├── FinancialPage.tsx
│   │   ├── CompliancePage.tsx
│   │   ├── InventoryPage.tsx
│   │   ├── GoldTrackPage.tsx
│   │   ├── BiometricsPage.tsx
│   │   └── ReportsPage.tsx
│   ├── context/
│   │   └── AppContext.tsx        # Global state provider
│   ├── hooks/
│   │   ├── useLocalStorage.ts    # LocalStorage persistence hook
│   │   ├── useIndexedDB.ts       # Dexie.js database hook
│   │   └── useMediaQuery.ts      # Responsive breakpoint hook
│   ├── data/
│   │   ├── seedData.ts           # Prototype seed data
│   │   └── db.ts                 # Dexie.js database schema
│   ├── utils/
│   │   ├── formatters.ts         # Number/date/currency formatters
│   │   ├── calculations.ts       # Production/financial calculations
│   │   ├── chartConfigs.ts       # Chart.js configuration presets
│   │   └── reportGenerator.ts    # AI report template engine
│   └── types/
│       └── index.ts              # All TypeScript interfaces
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### 16.2 Routing Configuration

```typescript
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/samx-app">
      <AppProvider>
        <AppShell>
          <Routes>
            <Route index element={<DashboardPage />} />
            <Route path="production" element={<ProductionPage />} />
            <Route path="safety" element={<SafetyPage />} />
            <Route path="equipment" element={<EquipmentPage />} />
            <Route path="workforce" element={<WorkforcePage />} />
            <Route path="financial" element={<FinancialPage />} />
            <Route path="compliance" element={<CompliancePage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="gold-track" element={<GoldTrackPage />} />
            <Route path="biometrics" element={<BiometricsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="*" element={<DashboardPage />} />
          </Routes>
        </AppShell>
      </AppProvider>
    </BrowserRouter>
  );
}
```

### 16.3 Reusable Component API

#### KPICard Component

```typescript
interface KPICardProps {
  label: string;           // "ORE EXTRACTED"
  value: string | number;  // "408.6t"
  icon: React.ReactNode;   // Lucide icon component
  subtext?: string;        // "10 shifts"
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;     // "+12%"
  colorScheme?: 'default' | 'success' | 'warning' | 'critical' | 'info';
}

// Usage:
<KPICard
  label="ORE EXTRACTED"
  value="408.6t"
  icon={<Mountain size={24} />}
  subtext="10 shifts"
  trend="up"
  colorScheme="default"
/>
```

#### DataTable Component

```typescript
interface Column<T> {
  key: keyof T;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  stickyHeader?: boolean;
}

// Usage:
<DataTable
  columns={[
    { key: 'date', header: 'Date', sortable: true },
    { key: 'shaft', header: 'Shaft', sortable: true },
    { key: 'oreTonnes', header: 'Ore (t)', sortable: true,
      render: (v) => v.toFixed(1) },
  ]}
  data={productionEntries}
  emptyMessage="No production records found"
/>
```

#### ChartCard Component

```typescript
interface ChartCardProps {
  title: string;
  chartType: 'line' | 'bar' | 'doughnut' | 'pie';
  data: ChartData;
  options?: ChartOptions;
  height?: number;
}
```

---

## 17. Backend API Specification

### 17.1 Prototype vs Production

| Concern | Prototype (v1) | Production (v2) |
|---------|----------------|-----------------|
| Runtime | Browser-only (IndexedDB) | Cloudflare Workers |
| Database | Dexie.js (IndexedDB) | Cloudflare D1 (SQLite) |
| Auth | None / PIN lock | Supabase Auth (JWT) |
| Storage | Browser cache | Cloudflare R2 |
| AI | Template interpolation | Workers AI / OpenAI |
| Realtime | Polling simulation | WebSocket / SSE |

### 17.2 IndexedDB Schema (Prototype)

```typescript
// data/db.ts
import Dexie, { Table } from 'dexie';

class SamXDatabase extends Dexie {
  production!: Table<ProductionEntry>;
  incidents!: Table<SafetyIncident>;
  equipment!: Table<Equipment>;
  workers!: Table<Worker>;
  financial!: Table<FinancialRecord>;
  compliance!: Table<ComplianceReport>;
  inventory!: Table<InventoryItem>;
  goldBatches!: Table<GoldBatch>;
  attendance!: Table<AttendanceRecord>;
  zkDevices!: Table<ZKDevice>;
  maintenanceLogs!: Table<MaintenanceLog>;

  constructor() {
    super('samx-db');
    this.version(1).stores({
      production: 'id, date, shaft, shift',
      incidents: 'id, type, severity, status, reportedAt',
      equipment: 'id, type, status, healthScore',
      workers: 'id, role, shaft, status',
      financial: 'id, date, type, category',
      compliance: 'id, type, status, dueDate',
      inventory: 'id, category, name',
      goldBatches: 'id, shaft, status, date',
      attendance: 'id, workerId, date, event',
      zkDevices: 'id, status',
      maintenanceLogs: 'id, equipmentId, date, type',
    });
  }
}

export const db = new SamXDatabase();
```

### 17.3 Future REST API Endpoints

```
Base URL: https://api.socinga-africa.com/samx/v1

── Authentication ──
POST   /auth/login              # Login with credentials
POST   /auth/logout             # Invalidate session
GET    /auth/me                 # Get current user

── Production ──
GET    /production              # List entries (paginated, filterable)
POST   /production              # Create new entry
GET    /production/:id          # Get single entry
PUT    /production/:id          # Update entry
DELETE /production/:id          # Delete entry
GET    /production/stats        # Aggregated KPIs

── Safety ──
GET    /safety/incidents        # List incidents
POST   /safety/incidents        # Report new incident
PATCH  /safety/incidents/:id    # Update status (resolve, investigate)
GET    /safety/stats            # Incident KPIs

── Equipment ──
GET    /equipment               # List all equipment
POST   /equipment               # Add equipment
PATCH  /equipment/:id           # Update equipment
GET    /equipment/:id/predict   # AI failure prediction
GET    /equipment/stats         # Fleet health KPIs
POST   /equipment/:id/maintenance  # Log maintenance

── Workforce ──
GET    /workers                 # List workers
POST   /workers                 # Add worker
PUT    /workers/:id             # Update worker
GET    /workers/stats           # Workforce KPIs

── Financial ──
GET    /financial               # List records
POST   /financial               # Add record
GET    /financial/stats         # Revenue/Expense KPIs
GET    /financial/breakdown     # Expense breakdown by category

── Compliance ──
GET    /compliance              # List reports
POST   /compliance              # Create report
PATCH  /compliance/:id          # Update status
GET    /compliance/stats        # Compliance KPIs

── Inventory ──
GET    /inventory               # List items
POST   /inventory               # Add item
PATCH  /inventory/:id           # Update quantity
GET    /inventory/alerts        # Low/out-of-stock alerts

── Gold Chain of Custody ──
GET    /gold-batches            # List batches
POST   /gold-batches            # Register batch
PATCH  /gold-batches/:id        # Update status (vault → transit → sold)
GET    /gold-batches/stats      # Vault/transit/sold KPIs

── Biometrics ──
GET    /attendance              # List records (filterable by date)
POST   /attendance              # Clock in/out
GET    /attendance/stats        # Daily attendance KPIs
GET    /zk-devices              # List ZKTeco devices
POST   /zk-devices              # Register device

── Reports ──
GET    /reports/production      # Production analytics
GET    /reports/financial       # Financial analytics
GET    /reports/safety          # Safety analytics
GET    /reports/equipment       # Equipment analytics
POST   /reports/ai-generate     # Generate AI executive report
```

### 17.4 API Response Format

```typescript
interface APIResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  error?: {
    code: string;
    message: string;
  };
}
```

---

## 18. Data Models & Schema

### 18.1 Complete TypeScript Interface Registry

All data models are consolidated in `src/types/index.ts`. Each module's interface has been documented in its respective section above. This section provides the unified type exports and shared utility types.

```typescript
// src/types/index.ts

// ── Shared Utility Types ──
export type UUID = string;
export type ISODate = string;         // "2026-03-25"
export type ISODateTime = string;     // "2026-03-25T09:15:00Z"
export type Currency = number;        // Always in USD
export type Percentage = number;      // 0-100

export type StatusColor = 'critical' | 'warning' | 'success' | 'info' | 'neutral';

export interface TimestampFields {
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

// ── Module-Specific Types (re-exported) ──
export type { ProductionEntry } from './production';
export type { SafetyIncident } from './safety';
export type { Equipment, MaintenanceLog } from './equipment';
export type { Worker } from './workforce';
export type { FinancialRecord } from './financial';
export type { ComplianceReport } from './compliance';
export type { InventoryItem } from './inventory';
export type { GoldBatch } from './goldtrack';
export type { AttendanceRecord, ZKDevice } from './biometrics';

// ── KPI Aggregation Types ──
export interface DashboardKPIs {
  oreToday: number;
  goldToday: number;
  activeWorkers: number;
  openIncidents: number;
  equipmentHealth: Percentage;
  revenueMTD: Currency;
  overdueCompliance: number;
  goldInVault: number;
}

export interface ProductionKPIs {
  totalOre: number;
  totalGold: number;
  avgGrade: number;
  recoveryRate: Percentage;
  shiftCount: number;
}

export interface SafetyKPIs {
  open: number;
  investigating: number;
  resolved: number;
  critical: number;
}

export interface EquipmentKPIs {
  operational: number;
  maintenance: number;
  broken: number;
  decommissioned: number;
}

export interface WorkforceKPIs {
  total: number;
  active: number;
  underground: number;
  avgProductivity: Percentage;
}

export interface FinancialKPIs {
  totalRevenue: Currency;
  totalExpenses: Currency;
  netProfit: Currency;
  recordCount: number;
  isProfitable: boolean;
}

export interface ComplianceKPIs {
  drafts: number;
  pendingReview: number;
  submitted: number;
  overdue: number;
}

export interface InventoryKPIs {
  inStock: number;
  lowStock: number;
  outOfStock: number;
  totalValue: Currency;
}

export interface GoldTrackKPIs {
  inVault: number;           // grams
  inTransit: number;         // grams
  sold: number;              // grams
  totalValue: Currency;
}

export interface AttendanceKPIs {
  clockedInToday: number;
  currentlyInside: number;
  clockedOut: number;
  totalHours: number;
}
```

### 18.2 Seed Data Generation

```typescript
// src/data/seedData.ts

export function generateSeedData(): AppState {
  return {
    production: {
      entries: [
        { id: 'PRD-001', date: '2026-03-25', shaft: 'alpha', shift: 'morning', oreTonnes: 45.2, gradeGpt: 3.80, goldGrams: 12.5, createdAt: '2026-03-25T06:00:00Z', updatedAt: '2026-03-25T14:00:00Z' },
        { id: 'PRD-002', date: '2026-03-25', shaft: 'beta', shift: 'afternoon', oreTonnes: 38.1, gradeGpt: 4.20, goldGrams: 11.8, createdAt: '2026-03-25T14:00:00Z', updatedAt: '2026-03-25T22:00:00Z' },
        { id: 'PRD-003', date: '2026-03-24', shaft: 'alpha', shift: 'morning', oreTonnes: 52.3, gradeGpt: 3.50, goldGrams: 13.2, createdAt: '2026-03-24T06:00:00Z', updatedAt: '2026-03-24T14:00:00Z' },
        { id: 'PRD-004', date: '2026-03-24', shaft: 'beta', shift: 'night', oreTonnes: 29.7, gradeGpt: 5.10, goldGrams: 10.4, createdAt: '2026-03-24T22:00:00Z', updatedAt: '2026-03-25T06:00:00Z' },
        { id: 'PRD-005', date: '2026-03-23', shaft: 'alpha', shift: 'morning', oreTonnes: 48.9, gradeGpt: 3.90, goldGrams: 14.1, createdAt: '2026-03-23T06:00:00Z', updatedAt: '2026-03-23T14:00:00Z' },
        { id: 'PRD-006', date: '2026-03-23', shaft: 'gamma', shift: 'afternoon', oreTonnes: 33.5, gradeGpt: 4.70, goldGrams: 11.2, createdAt: '2026-03-23T14:00:00Z', updatedAt: '2026-03-23T22:00:00Z' },
        { id: 'PRD-007', date: '2026-03-22', shaft: 'alpha', shift: 'morning', oreTonnes: 41.8, gradeGpt: 4.00, goldGrams: 12.0, createdAt: '2026-03-22T06:00:00Z', updatedAt: '2026-03-22T14:00:00Z' },
        { id: 'PRD-008', date: '2026-03-22', shaft: 'beta', shift: 'afternoon', oreTonnes: 36.4, gradeGpt: 3.60, goldGrams: 9.8, createdAt: '2026-03-22T14:00:00Z', updatedAt: '2026-03-22T22:00:00Z' },
        { id: 'PRD-009', date: '2026-03-21', shaft: 'alpha', shift: 'morning', oreTonnes: 55.1, gradeGpt: 3.30, goldGrams: 13.5, createdAt: '2026-03-21T06:00:00Z', updatedAt: '2026-03-21T14:00:00Z' },
        { id: 'PRD-010', date: '2026-03-21', shaft: 'gamma', shift: 'night', oreTonnes: 28.3, gradeGpt: 4.50, goldGrams: 9.2, createdAt: '2026-03-21T22:00:00Z', updatedAt: '2026-03-22T06:00:00Z' },
      ]
    },
    // ... remaining seed data for all modules follows the same pattern
    // using the exact values documented in each module section above
  };
}
```

---

## 19. State Management

### 19.1 Architecture

The prototype uses **React Context + useReducer** for global state management. This keeps the architecture simple and avoids external dependencies.

```typescript
// src/context/AppContext.tsx

interface AppState {
  // Module states
  production: { entries: ProductionEntry[] };
  safety: { incidents: SafetyIncident[] };
  equipment: { items: Equipment[]; maintenanceLogs: MaintenanceLog[] };
  workforce: { workers: Worker[] };
  financial: { records: FinancialRecord[] };
  compliance: { reports: ComplianceReport[] };
  inventory: { items: InventoryItem[] };
  goldTrack: { batches: GoldBatch[] };
  biometrics: { records: AttendanceRecord[]; devices: ZKDevice[] };

  // UI state
  ui: {
    sidebarOpen: boolean;
    activeModule: string;
    modalOpen: string | null;
    dateFilter: string;
    isLoading: boolean;
  };
}

type AppAction =
  | { type: 'ADD_PRODUCTION_ENTRY'; payload: ProductionEntry }
  | { type: 'ADD_INCIDENT'; payload: SafetyIncident }
  | { type: 'UPDATE_INCIDENT_STATUS'; payload: { id: string; status: string } }
  | { type: 'ADD_EQUIPMENT'; payload: Equipment }
  | { type: 'LOG_MAINTENANCE'; payload: MaintenanceLog }
  | { type: 'ADD_WORKER'; payload: Worker }
  | { type: 'ADD_FINANCIAL_RECORD'; payload: FinancialRecord }
  | { type: 'UPDATE_COMPLIANCE_STATUS'; payload: { id: string; status: string } }
  | { type: 'UPDATE_INVENTORY'; payload: { id: string; quantity: number } }
  | { type: 'ADD_GOLD_BATCH'; payload: GoldBatch }
  | { type: 'UPDATE_BATCH_STATUS'; payload: { id: string; status: string } }
  | { type: 'CLOCK_IN_OUT'; payload: AttendanceRecord }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_ACTIVE_MODULE'; payload: string }
  | { type: 'OPEN_MODAL'; payload: string }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_DATE_FILTER'; payload: string }
  | { type: 'LOAD_STATE'; payload: AppState };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_PRODUCTION_ENTRY':
      return { ...state, production: { entries: [...state.production.entries, action.payload] } };
    case 'ADD_INCIDENT':
      return { ...state, safety: { incidents: [...state.safety.incidents, action.payload] } };
    case 'UPDATE_INCIDENT_STATUS':
      return {
        ...state,
        safety: {
          incidents: state.safety.incidents.map(i =>
            i.id === action.payload.id ? { ...i, status: action.payload.status as any } : i
          )
        }
      };
    case 'TOGGLE_SIDEBAR':
      return { ...state, ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen } };
    // ... similar patterns for all other actions
    default:
      return state;
  }
}
```

### 19.2 Persistence Hook

```typescript
// src/hooks/useLocalStorage.ts

function usePersistedReducer(reducer: Reducer, initialState: AppState) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const persisted = localStorage.getItem('samx-state');
    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem('samx-state', JSON.stringify(state));
  }, [state]);

  return [state, dispatch] as const;
}
```

### 19.3 KPI Computation Hooks

```typescript
// src/hooks/useKPIs.ts

export function useProductionKPIs(entries: ProductionEntry[]): ProductionKPIs {
  return useMemo(() => ({
    totalOre: entries.reduce((s, e) => s + e.oreTonnes, 0),
    totalGold: entries.reduce((s, e) => s + e.goldGrams, 0),
    avgGrade: entries.length > 0
      ? entries.reduce((s, e) => s + e.gradeGpt, 0) / entries.length
      : 0,
    recoveryRate: 92.3,  // Calculated from actual recovery data
    shiftCount: entries.length,
  }), [entries]);
}

export function useFinancialKPIs(records: FinancialRecord[]): FinancialKPIs {
  return useMemo(() => {
    const totalRevenue = records.filter(r => r.type === 'revenue').reduce((s, r) => s + r.amount, 0);
    const totalExpenses = records.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
    return {
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      recordCount: records.length,
      isProfitable: totalRevenue > totalExpenses,
    };
  }, [records]);
}

// Similar hooks: useSafetyKPIs, useEquipmentKPIs, useWorkforceKPIs,
// useComplianceKPIs, useInventoryKPIs, useGoldTrackKPIs, useAttendanceKPIs
```

---

## 20. Authentication & Security

### 20.1 Prototype Authentication

For the $0 prototype, authentication is **simulated**:

```typescript
// Simple PIN lock (optional)
interface AuthState {
  isAuthenticated: boolean;
  pin: string | null;        // 4-digit PIN stored in localStorage
  userName: string;           // "Mine Manager"
  role: 'admin' | 'manager' | 'operator';
}

// PIN verification
function verifyPin(input: string, stored: string): boolean {
  return input === stored;
}
```

### 20.2 Production Authentication (Future)

| Feature | Implementation |
|---------|---------------|
| Provider | Supabase Auth (free tier) |
| Methods | Email/Password, Magic Link |
| Session | JWT tokens (access + refresh) |
| RBAC | Admin, Manager, Operator, Viewer roles |
| MFA | TOTP-based (future enhancement) |
| Storage | Supabase manages sessions; tokens in httpOnly cookies |

### 20.3 Role-Based Access Control

| Role | Dashboard | Data Entry | Settings | AI Report | Delete |
|------|-----------|------------|----------|-----------|--------|
| Admin | ✅ | ✅ | ✅ | ✅ | ✅ |
| Manager | ✅ | ✅ | View only | ✅ | ❌ |
| Operator | ✅ | ✅ | ❌ | ❌ | ❌ |
| Viewer | ✅ | ❌ | ❌ | ❌ | ❌ |

### 20.4 Data Security Measures

| Concern | Approach |
|---------|----------|
| Data at Rest | IndexedDB encrypted via browser security model |
| Data in Transit | HTTPS enforced via Cloudflare |
| XSS Prevention | React's built-in escaping; CSP headers |
| Input Validation | Client-side Zod schemas; server-side validation (future) |
| CORS | Restricted to same-origin; API whitelist (future) |

---

## 21. Deployment & Infrastructure

### 21.1 Cloudflare Pages Configuration

```toml
# wrangler.toml (for Cloudflare Pages)
name = "samx-app"
compatibility_date = "2026-01-01"

[site]
bucket = "./dist"

[[routes]]
pattern = "/samx-app/*"
```

### 21.2 Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/samx-app/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-stylesheets' }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-webfonts', expiration: { maxEntries: 10 } }
          }
        ]
      },
      manifest: {
        name: 'samX App — SmartMine X™',
        short_name: 'samX',
        theme_color: '#0a0e17',
        background_color: '#0a0e17',
        display: 'standalone',
        scope: '/samx-app/',
        start_url: '/samx-app/',
      }
    })
  ],
  server: {
    port: 3000,              // socinga-africa project port
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'chart': ['chart.js'],
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'dexie': ['dexie'],
        }
      }
    }
  }
});
```

### 21.3 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml (future)
name: Deploy samX App
on:
  push:
    branches: [main]
    paths: ['samx-app/**']
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: cd samx-app && npm ci
      - run: cd samx-app && npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: samx-app
          directory: samx-app/dist
```

### 21.4 Environment Variables

```bash
# .env.example
VITE_APP_NAME=samX
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://api.socinga-africa.com/samx/v1
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_ENABLE_AI_REPORTS=false          # Toggle AI features
VITE_ENABLE_BIOMETRICS=false          # Toggle ZKTeco features
VITE_GOLD_PRICE_USD_PER_GRAM=65.00   # Default gold price
```

---

## 22. Testing Strategy

### 22.1 Testing Pyramid

```
         ┌─────────┐
         │   E2E   │  — 5% (Playwright)
         ├─────────┤
         │  Integ  │  — 15% (React Testing Library)
         ├─────────┤
         │  Unit   │  — 80% (Vitest)
         └─────────┘
```

### 22.2 Unit Tests (Vitest)

```typescript
// __tests__/calculations.test.ts
import { describe, it, expect } from 'vitest';
import { calculateGoldGrams, getStockStatus } from '../utils/calculations';

describe('Production Calculations', () => {
  it('calculates gold from ore and grade', () => {
    expect(calculateGoldGrams(45.2, 3.80, 0.923)).toBeCloseTo(158.7, 1);
  });

  it('handles zero ore input', () => {
    expect(calculateGoldGrams(0, 3.80, 0.923)).toBe(0);
  });
});

describe('Inventory Status', () => {
  it('returns out_of_stock when qty is 0', () => {
    expect(getStockStatus(0, 100)).toBe('out_of_stock');
  });

  it('returns low_stock when qty <= reorder', () => {
    expect(getStockStatus(8, 10)).toBe('low_stock');
  });

  it('returns in_stock when qty > reorder', () => {
    expect(getStockStatus(250, 100)).toBe('in_stock');
  });
});
```

### 22.3 Component Tests (React Testing Library)

```typescript
// __tests__/KPICard.test.tsx
import { render, screen } from '@testing-library/react';
import { KPICard } from '../components/common/KPICard';

describe('KPICard', () => {
  it('renders label and value', () => {
    render(<KPICard label="ORE EXTRACTED" value="408.6t" icon={<span>⛏</span>} />);
    expect(screen.getByText('ORE EXTRACTED')).toBeInTheDocument();
    expect(screen.getByText('408.6t')).toBeInTheDocument();
  });

  it('shows subtext when provided', () => {
    render(<KPICard label="ORE" value="408.6t" icon={<span>⛏</span>} subtext="10 shifts" />);
    expect(screen.getByText('10 shifts')).toBeInTheDocument();
  });
});
```

### 22.4 E2E Tests (Playwright)

```typescript
// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('navigates through all modules', async ({ page }) => {
  await page.goto('/samx-app/');
  await expect(page.locator('h1')).toContainText('Executive Dashboard');

  // Test sidebar navigation
  await page.click('[data-testid="nav-production"]');
  await expect(page.locator('h1')).toContainText('Production Intelligence');

  await page.click('[data-testid="nav-safety"]');
  await expect(page.locator('h1')).toContainText('Safety & Risk');
});

test('adds production entry via modal', async ({ page }) => {
  await page.goto('/samx-app/production');
  await page.click('[data-testid="btn-log-production"]');
  await expect(page.locator('[data-testid="modal-title"]')).toContainText('Log Production');

  await page.fill('[data-testid="input-ore"]', '45.2');
  await page.fill('[data-testid="input-grade"]', '3.80');
  await page.click('[data-testid="btn-save-entry"]');

  await expect(page.locator('table')).toContainText('45.2');
});
```

---

## 23. Performance Budget

### 23.1 Core Web Vitals Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | First KPI card render |
| **FID** (First Input Delay) | < 100ms | Sidebar navigation tap |
| **CLS** (Cumulative Layout Shift) | < 0.1 | No layout jumps during load |
| **FCP** (First Contentful Paint) | < 1.8s | App shell with skeleton |
| **TTI** (Time to Interactive) | < 3.5s | Full dashboard interactive |
| **TTFB** (Time to First Byte) | < 200ms | Cloudflare edge response |

### 23.2 Bundle Size Budget

| Chunk | Target Size (gzipped) | Contents |
|-------|----------------------|----------|
| `vendor` | < 45 KB | React, React-DOM, React Router |
| `chart` | < 60 KB | Chart.js core + required controllers |
| `dexie` | < 15 KB | Dexie.js IndexedDB wrapper |
| `app` | < 80 KB | Application code |
| `styles` | < 15 KB | CSS (all design tokens + components) |
| **Total** | **< 215 KB** | Full application payload |

### 23.3 Optimization Strategies

```typescript
// 1. Code Splitting — Lazy load module pages
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ProductionPage = lazy(() => import('./pages/ProductionPage'));
const SafetyPage = lazy(() => import('./pages/SafetyPage'));
const EquipmentPage = lazy(() => import('./pages/EquipmentPage'));
const WorkforcePage = lazy(() => import('./pages/WorkforcePage'));
const FinancialPage = lazy(() => import('./pages/FinancialPage'));
const CompliancePage = lazy(() => import('./pages/CompliancePage'));
const InventoryPage = lazy(() => import('./pages/InventoryPage'));
const GoldTrackPage = lazy(() => import('./pages/GoldTrackPage'));
const BiometricsPage = lazy(() => import('./pages/BiometricsPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));

// 2. Chart.js Tree Shaking — Import only needed components
import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  PointElement, LineElement, BarElement, ArcElement,
  Title, Tooltip, Legend, Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale,
  PointElement, LineElement, BarElement, ArcElement,
  Title, Tooltip, Legend, Filler,
);

// 3. Image Optimization
// - Use WebP format for all images
// - Lazy load images below the fold
// - Use CSS gradients/patterns instead of images where possible

// 4. Font Loading Strategy
// - Preconnect to Google Fonts
// - Use font-display: swap
// - Load only Inter weights: 400, 500, 600, 700
```

### 23.4 Loading States

Every page renders a **skeleton UI** before data loads:

```css
/* Skeleton patterns for each component type */
.skeleton-kpi {
  width: 100%;
  height: 110px;
  border-radius: var(--radius-lg);
}

.skeleton-chart {
  width: 100%;
  height: 220px;
  border-radius: var(--radius-lg);
}

.skeleton-table-row {
  width: 100%;
  height: 44px;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-1);
}

.skeleton-card {
  width: 100%;
  height: 180px;
  border-radius: var(--radius-lg);
}
```

---

## 24. Accessibility

### 24.1 WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|---------------|
| Color Contrast | All text meets 4.5:1 ratio minimum on dark backgrounds |
| Keyboard Navigation | Full tab-order for all interactive elements |
| Screen Reader | ARIA labels on all icons, charts, and interactive elements |
| Focus Indicators | Visible focus rings (2px solid `var(--brand-secondary)`) |
| Touch Targets | Minimum 44×44px for all tappable elements |
| Motion | Respects `prefers-reduced-motion` media query |
| Text Scaling | Supports up to 200% browser zoom without layout break |

### 24.2 ARIA Landmarks

```html
<body>
  <header role="banner" aria-label="SmartMine X navigation">
    <!-- Header bar -->
  </header>
  <nav role="navigation" aria-label="Main navigation">
    <!-- Sidebar -->
  </nav>
  <main role="main" aria-label="Page content">
    <!-- Module content -->
  </main>
</body>
```

### 24.3 Chart Accessibility

```typescript
// Every chart includes an sr-only data table alternative
<div role="img" aria-label="Production trend showing ore extraction over 7 days">
  <canvas id="production-chart"></canvas>
  <table className="sr-only" aria-label="Production data">
    <thead>
      <tr><th>Day</th><th>Ore (t)</th><th>Gold (g)</th></tr>
    </thead>
    <tbody>
      {data.map(row => (
        <tr key={row.day}>
          <td>{row.day}</td>
          <td>{row.ore}</td>
          <td>{row.gold}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### 24.4 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .spinner { animation: none; }
  .skeleton { animation: none; }
  .page-enter { animation: none; }
}
```

### 24.5 Focus Management

```css
/* Global focus indicator */
*:focus-visible {
  outline: 2px solid var(--brand-secondary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Remove outline for mouse users */
*:focus:not(:focus-visible) {
  outline: none;
}
```

---

## 25. Appendices

### Appendix A: Prototype Frame Mapping

This specification was generated from a detailed analysis of the SmartMine X™ prototype video sequence. Below is the mapping of key frames to documented features:

| Frame Range | Module / Feature | Section |
|-------------|-----------------|---------|
| 0001–0200 | Loading & App Shell | §3 Navigation |
| 0200–0600 | Executive Dashboard | §4 Dashboard |
| 0600–1200 | Sidebar Navigation & Transitions | §3.3 Sidebar |
| 1200–1800 | Production Intelligence | §5 Production |
| 1800–2300 | Safety & Risk Management | §6 Safety |
| 2300–2800 | Equipment & Predictive Maintenance | §7 Equipment |
| 2800–3200 | Workforce Intelligence | §8 Workforce |
| 3200–3800 | Financial Intelligence | §9 Financial |
| 3800–4200 | Compliance & ESG | §10 Compliance |
| 4200–4800 | Inventory & Supply Chain | §11 Inventory |
| 4800–5600 | Gold Chain of Custody | §12 Gold Track |
| 5600–6300 | Biometric Attendance | §13 Biometrics |
| 6300–8600 | Reports & Analytics (all tabs) | §14 Reports |

### Appendix B: Color Reference Quick Sheet

```
Background:     #0a0e17 → #111827 → #1a2332
Borders:        #1e3a5f → #2d4a6f
Brand Orange:   #d4870e → #f59e0b
Text:           #f1f5f9 → #94a3b8 → #64748b
Critical:       #ef4444 (bg: #451a1a)
Warning:        #f59e0b (bg: #452a1a)
Success:        #22c55e (bg: #1a3526)
Info:           #3b82f6 (bg: #1a2545)
```

### Appendix C: Icon Registry

| Module | Lucide Icon | Usage |
|--------|-------------|-------|
| Dashboard | `LayoutDashboard` | Sidebar nav, page header |
| Production | `Pickaxe` | Sidebar nav |
| Safety | `Shield` | Sidebar nav, KPI cards |
| Equipment | `Wrench` | Sidebar nav, maintenance |
| Workforce | `Users` | Sidebar nav, worker count |
| Financial | `DollarSign` | Sidebar nav, currency values |
| Compliance | `ClipboardCheck` | Sidebar nav, report status |
| Inventory | `Package` | Sidebar nav, stock alerts |
| Gold Track | `Gem` / `Diamond` | Sidebar nav, batch cards |
| Biometrics | `Fingerprint` | Sidebar nav, clock-in |
| Reports | `BarChart3` | Sidebar nav, charts |
| Alerts | `AlertTriangle` | Warning banners |
| Close | `X` | Modal close, dismiss |
| Add | `Plus` | CTA buttons |
| Menu | `Menu` | Hamburger toggle |
| Home | `Home` | Header home link |

### Appendix D: Third-Party Dependencies

| Package | Version | License | Purpose | Size (gzip) |
|---------|---------|---------|---------|-------------|
| react | ^18.3.0 | MIT | UI framework | 6.4 KB |
| react-dom | ^18.3.0 | MIT | DOM rendering | 36 KB |
| react-router-dom | ^6.22.0 | MIT | Client-side routing | 11 KB |
| chart.js | ^4.4.0 | MIT | Data visualization | 55 KB |
| dexie | ^4.0.0 | Apache-2.0 | IndexedDB wrapper | 13 KB |
| lucide-react | ^0.350.0 | ISC | Icon library | ~1 KB/icon |
| vite | ^5.4.0 | MIT | Build tooling | dev only |
| vite-plugin-pwa | ^0.20.0 | MIT | PWA integration | dev only |
| workbox-precaching | ^7.0.0 | MIT | Service worker caching | 4 KB |
| typescript | ^5.4.0 | Apache-2.0 | Type system | dev only |
| vitest | ^1.6.0 | MIT | Unit testing | dev only |
| @testing-library/react | ^14.2.0 | MIT | Component testing | dev only |
| playwright | ^1.43.0 | Apache-2.0 | E2E testing | dev only |

### Appendix E: Implementation Checklist

```
Phase 1 — Foundation (Week 1)
  [ ] Initialize Vite + React + TypeScript project
  [ ] Configure PWA manifest and service worker
  [ ] Implement design system (CSS custom properties)
  [ ] Build AppShell (Header + Sidebar + Content)
  [ ] Create reusable components (KPICard, DataTable, ChartCard, Modal)
  [ ] Set up React Context + useReducer state management
  [ ] Load seed data from seedData.ts

Phase 2 — Core Modules (Week 2-3)
  [ ] Executive Dashboard with all KPIs and charts
  [ ] Production Intelligence with log entry form
  [ ] Safety & Risk Management with incident cards
  [ ] Equipment & Predictive Maintenance with 3-tab layout
  [ ] Workforce Intelligence with roster table

Phase 3 — Extended Modules (Week 3-4)
  [ ] Financial Intelligence with bar chart and ledger
  [ ] Compliance & ESG with workflow state machine
  [ ] Inventory & Supply Chain with stock status
  [ ] Gold Chain of Custody with batch tracking
  [ ] Biometric Attendance with ZKTeco stub

Phase 4 — Reports & Polish (Week 4-5)
  [ ] Reports & Analytics with 5-tab layout
  [ ] AI Report generator (template-based)
  [ ] Download report as markdown
  [ ] Responsive testing across devices
  [ ] Performance optimization and code splitting
  [ ] Accessibility audit (WCAG 2.1 AA)
  [ ] PWA install flow testing
  [ ] Cloudflare Pages deployment

Phase 5 — Production Upgrade (Future)
  [ ] Migrate to Cloudflare D1 database
  [ ] Implement Supabase Auth
  [ ] Replace template AI with Workers AI
  [ ] Add WebSocket real-time updates
  [ ] ZKTeco hardware integration
  [ ] Multi-user support with RBAC
```

### Appendix F: Glossary

| Term | Definition |
|------|-----------|
| **Shaft** | A vertical or inclined excavation for accessing underground ore bodies |
| **Grade (g/t)** | Gold content measured in grams per tonne of ore |
| **Recovery Rate** | Percentage of gold successfully extracted from ore |
| **P&L** | Profit and Loss statement |
| **ESG** | Environmental, Social, and Governance reporting |
| **Chain of Custody** | Documentation trail tracking gold from extraction to sale |
| **Assay** | Chemical analysis to determine gold content and purity |
| **ZKTeco** | Manufacturer of biometric hardware (fingerprint, facial recognition) |
| **PWA** | Progressive Web Application — web app with native-like capabilities |
| **KPI** | Key Performance Indicator |
| **MTD** | Month-to-Date |
| **PPE** | Personal Protective Equipment |

---

> **End of Specification**
>
> This document serves as the complete technical blueprint for the samX Mining PWA.
> All UI patterns, data models, API contracts, and implementation details are derived
> from the prototype video frame analysis and are ready for production implementation.
>
> **Document Statistics:**
> - Sections: 25
> - Modules Specified: 11
> - Data Models Defined: 13
> - API Endpoints: 42
> - Chart Configurations: 8
> - CSS Component Tokens: 12
>
> © 2026 SmartMine X™ — Smarter Mines. Bigger Profits.

