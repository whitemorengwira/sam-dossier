"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

const RISKS = [
  {
    category: "Operational Readiness & Execution Risk",
    level: "Managed",
    levelClass: "managed",
    icon: "⚙️",
    body: `To sustain the targeted production output of 15 kilogrammes (kg) per month, the physical extraction capacity of the mine must be radically scaled from shallow, artisanal workings to a mechanised, 400-metre inclined depth architecture (level 3). Furthermore, the bottleneck of the antiquated stamp-mill system will be eliminated by constructing a 500 tonnes per day (tpd) Carbon-in-Leach (CIL) plant.`,
    mitigations: [
      "Advanced corporate dashboard systems with Project Management and Asset Management controls",
      "Inventory Management for ore tracking",
      "Maintenance Management for the CIL plant",
      "Security Management to protect gold bullion",
      "Real-time Consumption & Compliance tracking for reagent burn rates (cyanide, activated carbon)",
    ],
  },
  {
    category: "Macroeconomic & Commodity Risk",
    level: "Insulated",
    levelClass: "insulated",
    icon: "📊",
    body: `Global macroeconomic instability is mitigated by calculating the Return on Investment (ROI) against highly conservative benchmarks. By pegging the financial model at USD 4,750 (ZAR 87,875) per ounce — well below market peaks — the project builds in immense safety margins.`,
    mitigations: [
      "Financial model pegged at USD 4,750 (ZAR 87,875) — intrinsically conservative",
      "Exceptionally high run-of-mine grades (15 to 25 g/t) insulate against cyclical corrections",
      "5% royalty bracket preserved well below USD 5,000 windfall threshold",
      "100% Capital Redemption Allowance (CRA) provides immediate tax shield",
    ],
  },
  {
    category: "Environmental, Social & Governance (ESG) Risk",
    level: "Embedded",
    levelClass: "embedded",
    icon: "🌿",
    body: `To meet 2026 international best practices, Environmental, Social, and Governance (ESG) compliance is structurally embedded into the Capital Expenditure (CapEx). Capital tranches are explicitly allocated to facilitate concurrent environmental rehabilitation, ensuring strict adherence to environmental laws.`,
    mitigations: [
      "Closed-loop water recycling systems within CIL wash circuits",
      "Minimised ecological impact and enhanced water security",
      "Reduced overall carbon footprint of the extraction process",
      "Community consent-building and social impact formalised through stakeholder plans",
      "Transparent communication to foster long-term trust and mitigate localised disruption",
    ],
  },
];

export default function RiskMatrixPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.revealed);
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(`.${styles.reveal}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className={styles.heroWrapper}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>Risk Matrix</span>
          <h1>Risk Management &amp; <span className={styles.textGold}>Mitigation Framework</span></h1>
          <p className={styles.lead}>
            An uncompromising approach to risk management — ensuring the 12 Forge (Private)
            Limited SPV operates within the strictest parameters of physical, operational, and
            macroeconomic security.
          </p>
        </div>
        <div className={styles.heroScrim} />
      </div>

      {/* ── Intro ─────────────────────────────────────────────────────── */}
      <section className={`${styles.introSection} ${styles.reveal}`}>
        <div className={styles.introText}>
          <span className={styles.sectionLabel}>Risk Philosophy</span>
          <h2>International-Grade Risk Governance</h2>
          <div className={styles.goldBar} />
          <p>
            The deployment of multi-million-dollar capital requires an uncompromising approach to
            risk management. Socinga Africa Mining ensures that the 12 Forge (Private) Limited
            Special Purpose Vehicle (SPV) operates within the strictest parameters of physical,
            operational, and macroeconomic security, fully incorporating high-end international
            methodologies.
          </p>
        </div>
        <div className={styles.riskSummary}>
          {[
            { label: "Risk Categories", value: "3", sub: "Operational, Macro, ESG" },
            { label: "Mitigation Controls", value: "14+", sub: "Active controls deployed" },
            { label: "Production Safeguard", value: "15–25 g/t", sub: "Grade insulation buffer" },
          ].map((s) => (
            <div key={s.label} className={styles.summaryCard}>
              <div className={styles.summaryValue}>{s.value}</div>
              <div className={styles.summaryLabel}>{s.label}</div>
              <div className={styles.summarySub}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Risk Cards ────────────────────────────────────────────────── */}
      <section className={styles.risksSection}>
        {RISKS.map((risk, i) => (
          <div key={i} className={`${styles.riskRow} ${i % 2 === 1 ? styles.riskRowReverse : ""} ${styles.reveal}`}>
            {/* Text Panel */}
            <div className={styles.riskTextPanel}>
              <div className={styles.riskHeader}>
                <span className={styles.riskIcon}>{risk.icon}</span>
                <div>
                  <span className={`${styles.riskLevel} ${styles[risk.levelClass]}`}>{risk.level}</span>
                  <h3>{risk.category}</h3>
                </div>
              </div>
              <div className={styles.riskDivider} />
              <p className={styles.riskBody}>{risk.body}</p>
              <div className={styles.mitigationList}>
                <div className={styles.mitigationTitle}>Mitigation Controls</div>
                {risk.mitigations.map((m, j) => (
                  <div key={j} className={styles.mitigationItem}>
                    <div className={styles.mitigationDot} />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Panel */}
            <div className={styles.riskVisualPanel}>
              <div className={`${styles.riskGlobe} ${styles[`riskGlobe${i}`]}`} />
              <div className={styles.riskVisualLabel}>{risk.category}</div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Risk Matrix Heatmap ───────────────────────────────────────── */}
      <section className={`${styles.heatmapSection} ${styles.reveal}`}>
        <span className={styles.sectionLabel}>Risk Register Overview</span>
        <h2>Risk Assessment Matrix</h2>
        <div className={styles.goldBar} />
        <div className={styles.heatmap}>
          <div className={styles.heatmapYAxis}>
            <span>HIGH</span>
            <span>MEDIUM</span>
            <span>LOW</span>
          </div>
          <div className={styles.heatmapGrid}>
            {/* Row: High Likelihood */}
            <div className={`${styles.cell} ${styles.cellMed}`}><span>Gold Price Spike</span></div>
            <div className={`${styles.cell} ${styles.cellMed}`}><span>FX Volatility</span></div>
            <div className={`${styles.cell} ${styles.cellLow}`}><span>Community Disruption</span></div>
            {/* Row: Medium Likelihood */}
            <div className={`${styles.cell} ${styles.cellHigh}`}><span>Equipment Failure</span></div>
            <div className={`${styles.cell} ${styles.cellMed}`}><span>Regulatory Change</span></div>
            <div className={`${styles.cell} ${styles.cellLow}`}><span>ESG Compliance Gap</span></div>
            {/* Row: Low Likelihood */}
            <div className={`${styles.cell} ${styles.cellHigh}`}><span>Shaft Collapse</span></div>
            <div className={`${styles.cell} ${styles.cellMed}`}><span>Labour Dispute</span></div>
            <div className={`${styles.cell} ${styles.cellLow}`}><span>Water Shortage</span></div>
          </div>
          <div className={styles.heatmapXAxis}>
            <span>LOW IMPACT</span>
            <span>MEDIUM IMPACT</span>
            <span>HIGH IMPACT</span>
          </div>
        </div>
        <div className={styles.heatmapLegend}>
          <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.cellLow}`} /><span>Low / Managed</span></div>
          <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.cellMed}`} /><span>Medium / Monitored</span></div>
          <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.cellHigh}`} /><span>High / Mitigated</span></div>
        </div>
      </section>
    </div>
  );
}
