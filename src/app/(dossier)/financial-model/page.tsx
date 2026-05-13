import ROICalculator from "@/components/dossier/ROICalculator";
import styles from "./page.module.css";

export const metadata = {
  title: "Financial Model & ROI | SAM Dossier",
  description:
    "Capital Repayment Waterfall, ROI matrix, and interactive calculator for Chikonga Mine.",
};

export default function FinancialModelPage() {
  return (
    <div className={styles.page}>
      {/* ── Page Header ────────────────────────────────────────────── */}
      <header className={styles.pageHeader}>
        <span className={styles.badge}>Financial Model</span>
        <h1>
          Capital Deployment &amp;{" "}
          <span className={styles.textGold}>ROI Matrix</span>
        </h1>
        <hr className={styles.divider} />
        <p className={styles.lead}>
          The deployment of ZAR 250,000,000 (USD 13,513,513) is governed by a
          legally binding, mathematically precise Capital Repayment Waterfall.
          This framework dictates the exact chronological priority in which
          revenues generated from the 15 kilogrammes (kg) per month output are
          distributed, ensuring the unconditional protection of the
          investor&apos;s principal and the systematic execution of the
          Production-Sharing Agreement (PSA).
        </p>
      </header>

      {/* ── Capital Repayment Waterfall ─────────────────────────────── */}
      <section className={styles.section}>
        <h2>The Capital Repayment Waterfall (Order of Priority)</h2>
        <hr className={styles.divider} />
        <div className={styles.pillars}>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>P1</div>
            <h4>Operating Expenditure (OpEx) &amp; Statutory Taxes/Royalties</h4>
            <p>Sustaining the physical integrity and legal standing of the mine.</p>
          </div>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>P2</div>
            <h4>20 Per Cent (20%) Senior Debt Interest</h4>
            <p>Compensating the investor for the time value of money.</p>
          </div>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>P3</div>
            <h4>Investor&apos;s Capital Repayment (Principal)</h4>
            <p>
              100 per cent (100%) of the remaining free cash flow is aggressively swept
              directly against the outstanding ZAR 250,000,000 (USD 13,513,513) principal balance.
            </p>
          </div>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>P4</div>
            <h4>The 60/40 Profit Split</h4>
            <p>
              Only after Priorities 1, 2, and 3 are satisfied does the Net Distributable Profit
              split 60 per cent (60%) to the investor and 40 per cent (40%) to Socinga Africa Mining.
            </p>
          </div>
        </div>
      </section>

      {/* ── Payback Timeline ───────────────────────────────────────── */}
      <section className={styles.section}>
        <h2>Practical Payback Timeline and Post-Payback Equity Yield</h2>
        <hr className={styles.divider} />
        <p>
          To ensure absolute clarity regarding the investment mechanics, the following details
          the exact timeline regarding how much capital is paid back, when the Return on
          Investment (ROI) kicks in, and what happens to the capital and profits thereafter:
        </p>
        <div className={styles.twoCol}>
          <div>
            <h4 className={styles.subhead}>When does the ROI kick in?</h4>
            <p>
              The Return on Investment (ROI) kicks in immediately during Year 1. While the plant
              is being commissioned, the investor receives exactly ZAR 50,000,000 (USD
              2,702,702.60) in pure interest yields paid out of the first available operational
              cash flows. Simultaneously, the aggressive cash sweep begins paying down the
              principal balance.
            </p>
            <h4 className={styles.subhead}>How much is paid back, and after how long?</h4>
            <p>
              The entire ZAR 250,000,000 (USD 13,513,513) principal is paid back in full in
              under 24 months (by the end of Year 2). In Year 1, the priority cash sweep repays
              ZAR 139,142,126.88 (USD 7,521,196.15) of the original principal. In Year 2, the
              remaining principal balance of ZAR 110,857,873.12 (USD 5,992,316.85) is completely
              cleared.
            </p>
          </div>
          <div>
            <h4 className={styles.subhead}>What happens after full repayment?</h4>
            <p>
              Once the ZAR 250,000,000 (USD 13,513,513) is fully returned to the investor at the
              end of Year 2, the debt is considered completely extinguished. The 20 per cent (20%)
              interest payments cease because there is no longer any outstanding principal to levy
              interest against. At this pivotal moment, the investor practically holds a risk-free
              asset. For the entire remaining Life of Mine (LoM), the massive free cash flows
              transition into the pure equity phase. The investor receives 60 per cent (60%) of
              all remaining Net Distributable Profit in perpetuity, delivering staggering
              unencumbered yields (as demonstrated in the Year 3 matrix below).
            </p>
          </div>
        </div>
      </section>

      {/* ── Interactive ROI Calculator ─────────────────────────────── */}
      <section className={styles.section}>
        <h2>Sensitivity Analysis &amp; Risk-Adjusted Projections</h2>
        <hr className={styles.divider} />
        <p>
          In accordance with international financial evaluation standards, these models include
          sensitivity testing against operational variations. By utilising a highly conservative
          Operating Expenditure (OpEx) benchmark and a discounted gold price, the Internal Rate
          of Return (IRR) remains fiercely robust, ensuring that the targeted capital is defended
          against minor market fluctuations.
        </p>
        <ROICalculator />
      </section>

      {/* ── ROI Matrix: Year 1 ─────────────────────────────────────── */}
      <section className={styles.section}>
        <h2>Return on Investment (ROI) Matrix</h2>
        <hr className={styles.divider} />

        <div className={styles.infoCard} style={{ marginBottom: "var(--space-6)" }}>
          <h4>Base Assumptions</h4>
          <table className={styles.table}>
            <tbody>
              <tr><td>Gold Price</td><td>USD 4,750.00 (ZAR 87,875.00)</td></tr>
              <tr><td>Target Production (15 kg/month)</td><td>482.26 oz/month — 5,787.12 oz/annum</td></tr>
              <tr><td>Estimated OpEx</td><td>USD 1,200.00 (ZAR 22,200.00) per ounce</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className={styles.yearLabel}>Year 1: Plant Commissioning and Ramp-Up (8 kg/month average)</h3>
        <div className={styles.projectionTable}>
          <table className={styles.fullTable}>
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
              <tr className={styles.highlightRow}>
                <td>Outstanding Capital Balance Carried to Year 2</td>
                <td>USD 5,992,316.85</td>
                <td>ZAR 110,857,873.12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── ROI Matrix: Year 2 ─────────────────────────────────────── */}
      <section className={styles.section}>
        <h3 className={styles.yearLabel}>Year 2: Steady State 15 kg/month and Final Payback</h3>
        <div className={styles.projectionTable}>
          <table className={styles.fullTable}>
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
              <tr>
                <td><strong>Net Distributable Profit Available for Split</strong></td>
                <td><strong>USD 11,979,054.78</strong></td>
                <td><strong>ZAR 221,612,499.76</strong></td>
              </tr>
              <tr className={styles.highlightRow}>
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
      </section>

      {/* ── ROI Matrix: Year 3 ─────────────────────────────────────── */}
      <section className={styles.section}>
        <h3 className={styles.yearLabel}>Year 3: Post-Payback Pure Equity Yield (Debt Extinguished)</h3>
        <div className={styles.projectionTable}>
          <table className={styles.fullTable}>
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
              <tr>
                <td><strong>Net Distributable Profit Available for Split</strong></td>
                <td><strong>USD 19,169,835.00</strong></td>
                <td><strong>ZAR 354,641,947.50</strong></td>
              </tr>
              <tr className={styles.highlightRow}>
                <td>Priority 4: Investor Share (60%)</td>
                <td>USD 11,501,901.00</td>
                <td>ZAR 212,785,168.50</td>
              </tr>
              <tr>
                <td>Priority 4: Socinga Share (40%)</td>
                <td>USD 7,667,934.00</td>
                <td>ZAR 141,856,779.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
