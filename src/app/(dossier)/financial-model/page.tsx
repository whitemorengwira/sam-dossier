import ROICalculator from "@/components/dossier/ROICalculator";
import styles from "./page.module.css";

export const metadata = {
  title: "Financial Model & ROI | SAM Dossier",
  description:
    "Interactive financial model, ROI calculator, and capital deployment waterfall for Chikonga Mine.",
};

export default function FinancialModelPage() {
  return (
    <div className={styles.page}>

      {/* ── Cinematic Hero ─────────────────────────────────────────────── */}
      <div className={styles.heroWrapper}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>Financial Model</span>
          <h1>Capital Deployment &amp; <span className={styles.textGold}>ROI Matrix</span></h1>
          <p className={styles.lead}>
            A legally binding, mathematically precise Capital Repayment Waterfall governing the
            deployment of ZAR 250,000,000 (USD 13,513,513) — with full principal recovery in
            under 24 months and perpetual 60% equity yields thereafter.
          </p>
        </div>
        <div className={styles.heroScrim} />
      </div>

      {/* ── Section: Waterfall Overview ────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.textBlock}>
          <span className={styles.sectionLabel}>Capital Repayment Waterfall</span>
          <h2>Order of Priority</h2>
          <div className={styles.goldBar} />
          <p>
            The deployment of ZAR 250,000,000 (USD 13,513,513) is governed by a legally binding,
            mathematically precise Capital Repayment Waterfall. This framework dictates the exact
            chronological priority in which revenues generated from the 15 kilogrammes (kg) per month
            output are distributed, ensuring the unconditional protection of the investor&apos;s principal
            and the systematic execution of the Production-Sharing Agreement (PSA).
          </p>
        </div>
        <div className={styles.waterfallPanel}>
          {[
            {
              priority: "Priority 1",
              title: "Operating Expenditure (OpEx) & Statutory Taxes/Royalties",
              desc: "Sustaining the physical integrity and legal standing of the mine.",
            },
            {
              priority: "Priority 2",
              title: "20 Per Cent (20%) Senior Debt Interest",
              desc: "Compensating the investor for the time value of money.",
            },
            {
              priority: "Priority 3",
              title: "Investor's Capital Repayment (Principal)",
              desc: "100 per cent (100%) of the remaining free cash flow is aggressively swept directly against the outstanding ZAR 250,000,000 (USD 13,513,513) principal balance.",
            },
            {
              priority: "Priority 4",
              title: "The 60/40 Profit Split",
              desc: "Only after Priorities 1, 2, and 3 are satisfied does the Net Distributable Profit split 60 per cent (60%) to the investor and 40 per cent (40%) to Socinga Africa Mining.",
            },
          ].map((item, i) => (
            <div key={i} className={styles.waterfallItem}>
              <div className={styles.waterfallPriority}>{item.priority}</div>
              <div className={styles.waterfallBody}>
                <div className={styles.waterfallTitle}>{item.title}</div>
                <div className={styles.waterfallDesc}>{item.desc}</div>
              </div>
              {i < 3 && <div className={styles.waterfallArrow}>↓</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── Section: ROI Timeline ──────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.fullWidth}>
          <span className={styles.sectionLabel}>Practical Payback Timeline</span>
          <h2>Post-Payback Equity Yield</h2>
          <div className={styles.goldBar} />
          <p>
            To ensure absolute clarity regarding the investment mechanics, the following details the
            exact timeline regarding how much capital is paid back, when the Return on Investment
            (ROI) kicks in, and what happens to the capital and profits thereafter.
          </p>
          <div className={styles.timelineGrid}>
            <div className={styles.timelineCard}>
              <div className={styles.timelineYear}>Year 1</div>
              <h4>ROI Kicks In Immediately</h4>
              <p>
                The Return on Investment (ROI) kicks in immediately during Year 1. While the plant
                is being commissioned, the investor receives exactly ZAR 50,000,000 (USD
                2,702,702.60) in pure interest yields paid out of the first available operational
                cash flows. Simultaneously, the aggressive cash sweep begins paying down the
                principal balance.
              </p>
              <div className={styles.timelineHighlight}>
                <span>ZAR 139,142,126.88</span>
                <span className={styles.timelineHighlightSub}>Principal Repaid in Year 1</span>
              </div>
            </div>
            <div className={styles.timelineCard}>
              <div className={styles.timelineYear}>Year 2</div>
              <h4>Full Principal Recovery</h4>
              <p>
                The entire ZAR 250,000,000 (USD 13,513,513) principal is paid back in full in
                under 24 months (by the end of Year 2). In Year 2, the remaining principal balance
                of ZAR 110,857,873.12 (USD 5,992,316.85) is completely cleared.
              </p>
              <div className={styles.timelineHighlight}>
                <span>ZAR 110,857,873.12</span>
                <span className={styles.timelineHighlightSub}>Final Balance Cleared</span>
              </div>
            </div>
            <div className={styles.timelineCard}>
              <div className={styles.timelineYear}>Year 3+</div>
              <h4>Pure Equity Phase — In Perpetuity</h4>
              <p>
                Once the ZAR 250,000,000 (USD 13,513,513) is fully returned to the investor at the
                end of Year 2, the debt is considered completely extinguished. The 20 per cent
                (20%) interest payments cease. At this pivotal moment, the investor practically
                holds a risk-free asset. For the entire remaining Life of Mine (LoM), the massive
                free cash flows transition into the pure equity phase. The investor receives 60 per
                cent (60%) of all remaining Net Distributable Profit in perpetuity.
              </p>
              <div className={styles.timelineHighlight}>
                <span>USD 11,501,901 / yr</span>
                <span className={styles.timelineHighlightSub}>Investor 60% Share (Year 3)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive ROI Calculator ────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionMid}`}>
        <div className={styles.fullWidth}>
          <span className={styles.sectionLabel}>Sensitivity Analysis</span>
          <h2>Interactive ROI Calculator</h2>
          <div className={styles.goldBar} />
          <p>
            In accordance with international financial evaluation standards, these models include
            sensitivity testing against operational variations. By utilising a highly conservative
            Operating Expenditure (OpEx) benchmark and a discounted gold price, the Internal Rate
            of Return (IRR) remains fiercely robust, ensuring that the targeted capital is defended
            against minor market fluctuations.
          </p>
          <div className={styles.calcWrapper}>
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* ── Section: ROI Matrix Tables ─────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.fullWidth}>
          <span className={styles.sectionLabel}>Return on Investment Matrix</span>
          <h2>Base Assumptions &amp; Three-Year Projection</h2>
          <div className={styles.goldBar} />

          {/* Base Assumptions */}
          <div className={styles.assumptionsGrid}>
            {[
              { label: "Gold Price", usd: "USD 4,750.00", zar: "ZAR 87,875.00" },
              { label: "Target Production (15 kg/month)", usd: "482.26 oz/month", zar: "5,787.12 oz/annum" },
              { label: "Estimated OpEx", usd: "USD 1,200.00 / oz", zar: "ZAR 22,200.00 / oz" },
            ].map((a) => (
              <div key={a.label} className={styles.assumptionCard}>
                <div className={styles.assumptionLabel}>{a.label}</div>
                <div className={styles.assumptionUsd}>{a.usd}</div>
                <div className={styles.assumptionZar}>{a.zar}</div>
              </div>
            ))}
          </div>

          {/* Year 1 */}
          <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
              <span className={styles.yearBadge}>Year 1</span>
              <span className={styles.tableTitle}>Plant Commissioning &amp; Ramp-Up — 8 kg/month Average</span>
            </div>
            <div className={styles.tableResponsive}>
              <table className={styles.roiTable}>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>United States Dollars (USD)</th>
                    <th>South African Rand (ZAR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gross Revenue (3,086.46 oz × Price)</td>
                    <td>USD 14,660,685.00</td>
                    <td>ZAR 271,222,672.50</td>
                  </tr>
                  <tr className={styles.deductionRow}>
                    <td>Priority 1: OpEx &amp; Royalties</td>
                    <td>(USD 4,436,786.25)</td>
                    <td>(ZAR 82,080,545.63)</td>
                  </tr>
                  <tr className={styles.deductionRow}>
                    <td>Priority 2: 20% Interest Paid to Investor</td>
                    <td>(USD 2,702,702.60)</td>
                    <td>(ZAR 50,000,000.00)</td>
                  </tr>
                  <tr className={styles.deductionRow}>
                    <td>Priority 3: Principal Repayment Swept</td>
                    <td>(USD 7,521,196.15)</td>
                    <td>(ZAR 139,142,126.88)</td>
                  </tr>
                  <tr className={styles.balanceRow}>
                    <td>Outstanding Capital Balance Carried to Year 2</td>
                    <td>USD 5,992,316.85</td>
                    <td>ZAR 110,857,873.12</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Year 2 */}
          <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
              <span className={styles.yearBadge}>Year 2</span>
              <span className={styles.tableTitle}>Steady State 15 kg/month &amp; Final Payback</span>
            </div>
            <div className={styles.tableResponsive}>
              <table className={styles.roiTable}>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>United States Dollars (USD)</th>
                    <th>South African Rand (ZAR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gross Revenue (5,787.12 oz × Price)</td>
                    <td>USD 27,488,820.00</td>
                    <td>ZAR 508,543,170.00</td>
                  </tr>
                  <tr className={styles.deductionRow}>
                    <td>Priority 1: OpEx &amp; Royalties</td>
                    <td>(USD 8,318,985.00)</td>
                    <td>(ZAR 153,901,222.50)</td>
                  </tr>
                  <tr className={styles.deductionRow}>
                    <td>Priority 2: 20% Interest on Remaining Principal</td>
                    <td>(USD 1,198,463.37)</td>
                    <td>(ZAR 22,171,574.62)</td>
                  </tr>
                  <tr className={styles.deductionRow}>
                    <td>Priority 3: Final Principal Repayment Swept</td>
                    <td>(USD 5,992,316.85)</td>
                    <td>(ZAR 110,857,873.12)</td>
                  </tr>
                  <tr className={styles.netRow}>
                    <td>Net Distributable Profit Available for Split</td>
                    <td>USD 11,979,054.78</td>
                    <td>ZAR 221,612,499.76</td>
                  </tr>
                  <tr className={styles.investorRow}>
                    <td>Priority 4: Investor Share (60%)</td>
                    <td>USD 7,187,432.87</td>
                    <td>ZAR 132,967,499.85</td>
                  </tr>
                  <tr>
                    <td>Priority 4: Socinga Share (40%)</td>
                    <td>USD 4,791,621.91</td>
                    <td>ZAR 88,644,999.91</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Year 3 */}
          <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
              <span className={`${styles.yearBadge} ${styles.yearBadgeGold}`}>Year 3</span>
              <span className={styles.tableTitle}>Post-Payback Pure Equity Yield — Debt Extinguished</span>
            </div>
            <div className={styles.tableResponsive}>
              <table className={styles.roiTable}>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>United States Dollars (USD)</th>
                    <th>South African Rand (ZAR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gross Revenue (5,787.12 oz × Price)</td>
                    <td>USD 27,488,820.00</td>
                    <td>ZAR 508,543,170.00</td>
                  </tr>
                  <tr className={styles.deductionRow}>
                    <td>Priority 1: OpEx &amp; Royalties</td>
                    <td>(USD 8,318,985.00)</td>
                    <td>(ZAR 153,901,222.50)</td>
                  </tr>
                  <tr className={styles.netRow}>
                    <td>Net Distributable Profit Available for Split</td>
                    <td>USD 19,169,835.00</td>
                    <td>ZAR 354,641,947.50</td>
                  </tr>
                  <tr className={styles.investorRow}>
                    <td>Priority 4: Investor Share (60%)</td>
                    <td className={styles.highlight}>USD 11,501,901.00</td>
                    <td className={styles.highlight}>ZAR 212,785,168.50</td>
                  </tr>
                  <tr>
                    <td>Priority 4: Socinga Share (40%)</td>
                    <td>USD 7,667,934.00</td>
                    <td>ZAR 141,856,779.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section: Institutional Controls ───────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionMid}`}>
        <div className={styles.fullWidth}>
          <span className={styles.sectionLabel}>Institutional Controls &amp; Compliance</span>
          <h2>Capital Governance Framework</h2>
          <div className={styles.goldBar} />
          <div className={styles.controlsGrid}>
            <div className={styles.controlCard}>
              <h4>Segregation of Duties</h4>
              <p>
                Under strict corporate governance protocols established on 30 April 2026, no single
                individual within Socinga Africa Mining may initiate, approve, and execute a
                financial transaction. Complete segregation between procurement, authorisation (CFO),
                and final release (MD/CEO) is mandatory.
              </p>
            </div>
            <div className={styles.controlCard}>
              <h4>Guaranteed Off-Take (FGR)</h4>
              <p>
                100% of gold produced is routed through the Fidelity Gold Refinery, the sole
                authorised purchaser in Zimbabwe. This ensures immediate legal compliance, guaranteed
                liquidity, and protection against illicit market volatility. Remittance is split 90%
                USD / 10% ZiG.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
