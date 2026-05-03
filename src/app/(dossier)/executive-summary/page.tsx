import styles from "./page.module.css";

export const metadata = {
  title: "Executive Summary | SAM Dossier",
  description:
    "Investment thesis for Chikonga Mine, Mutare, Zimbabwe. ZAR 500M institutional-grade mining investment secured.",
};

export default function ExecutiveSummary() {
  return (
    <div className={styles.page}>
      {/* ── Page Header ────────────────────────────────────────────── */}
      <header className={styles.pageHeader}>
        <span className={styles.badge}>Executive Summary</span>
        <h1>
          Investment Thesis &{" "}
          <span className={styles.textGold}>Capital Structure</span>
        </h1>
        <hr className={styles.divider} />
        <p className={styles.lead}>
          Socinga Africa Mining (SAM) presents this institutional-grade
          investment dossier for the expansion of Chikonga Mine — a proven,
          producing gold asset in Mutare, Zimbabwe, with verified grades of
          15–25 g/t and a clear path to tripling monthly production.
        </p>
      </header>

      {/* ── Key Metrics Strip ──────────────────────────────────────── */}
      <section className={styles.metricsStrip}>
        {[
          { value: "ZAR 500M", label: "Total Investment", sub: "USD 29,994,000" },
          { value: "15+ KG", label: "Monthly Gold Target", sub: "From current 5 KG/month" },
          { value: "45 Ha", label: "Mining Concession", sub: "4 registered claims" },
          { value: "15–25 g/t", label: "Verified Grade", sub: "Harrison reports, 1972–75" },
          { value: "90–95%", label: "Recovery Rate", sub: "CIP/Cyanidation plant" },
          { value: "$4,615", label: "Gold Spot Price", sub: "Per troy ounce (May 2026)" },
        ].map((stat) => (
          <div key={stat.label} className={styles.metric}>
            <div className={styles.metricValue}>{stat.value}</div>
            <div className={styles.metricLabel}>{stat.label}</div>
            <div className={styles.metricSub}>{stat.sub}</div>
          </div>
        ))}
      </section>

      {/* ── The Opportunity ────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2>The Opportunity</h2>
        <hr className={styles.divider} />
        <div className={styles.twoCol}>
          <div>
            <p>
              Chikonga Mine is a subsidiary of Hilltouch Investments, an
              indigenous gold mining entity that is wholly owned by its
              Directors Mr Lufeyi Shato and Mrs Joyce Kujenga. Established in
              2005, it has grown in leaps and bounds from humble beginnings to
              become Manicaland&apos;s 3rd largest producer of the yellow mineral.
            </p>
            <p>
              The property is comprised of four 10-hectare registered claims.
              All four claims are currently or have previously been mined on a
              small scale for gold, with the first recorded production in 1959.
              Good and better standards of mining are presently being conducted
              by Hilltouch on multiple, steeply dipping, parallel narrow reefs
              (shear zones) stacked across a 350-metre wide, 800-metre+
              structural corridor.
            </p>
            <p>
              Previous geological assessment reports by Harrison et al. (1972)
              and Harrison (1975) recorded gold grades of 11.2 g/t, 1.6 g/t,
              2.8 g/t, 1.9 g/t, and 7.1 g/t during sampling on various reefs.
              Since resumption of mining, improved gold grades have averaged
              <strong> 15 g/t, 18 g/t, and 25 g/t</strong> in 2019, 2020, and
              2021 respectively.
            </p>
          </div>
          <div>
            <div className={styles.infoCard}>
              <h4>Mine Coordinates</h4>
              <table className={styles.table}>
                <tbody>
                  <tr><td>Latitude</td><td>19° 04&apos; 47&quot; S</td></tr>
                  <tr><td>Longitude</td><td>32° 36&apos; 28&quot; E</td></tr>
                  <tr><td>Altitude</td><td>~1,200m above sea level</td></tr>
                  <tr><td>Province</td><td>Manicaland</td></tr>
                  <tr><td>City</td><td>Mutare</td></tr>
                  <tr><td>Country</td><td>Zimbabwe</td></tr>
                </tbody>
              </table>
            </div>
            <div className={styles.infoCard} style={{ marginTop: "var(--space-4)" }}>
              <h4>Legal Entity</h4>
              <table className={styles.table}>
                <tbody>
                  <tr><td>Owner</td><td>Hilltouch Investments (Pvt) Ltd</td></tr>
                  <tr><td>SPV</td><td>12 Forge (Pvt) Ltd</td></tr>
                  <tr><td>Claims</td><td>4 × 10 Ha (registered)</td></tr>
                  <tr><td>Total Area</td><td>45 Hectares</td></tr>
                  <tr><td>First Production</td><td>1959</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Investment Structure ───────────────────────────────────── */}
      <section className={styles.section}>
        <h2>Investment Structure</h2>
        <hr className={styles.divider} />
        <div className={styles.pillars}>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>🔒</div>
            <h4>Legal Ring-Fencing</h4>
            <p>
              Every asset is legally ring-fenced, isolating investment risk and
              ensuring capital preservation through dedicated Special Purpose
              Vehicles (SPVs). Our Zimbabwean asset base is held through
              12 Forge (Pvt) Ltd with unencumbered legal title and complete
              statutory permitting through the Ministry of Mines and Mining
              Development.
            </p>
          </div>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>💎</div>
            <h4>Phased Tranche Releases</h4>
            <p>
              Capital is never deployed without clear Return on Investment (ROI)
              calculated upfront. Funds are deployed in controlled tranches,
              each release tied to verified operational milestones and audited
              performance benchmarks. Phased-out measurable trade progress
              monitoring approval ensures capital preservation.
            </p>
          </div>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>📜</div>
            <h4>Guaranteed Off-Take</h4>
            <p>
              Revenue pipelines are secured before extraction begins through
              Fidelity Gold Refinery (FGR), the sole authorised buyer of gold
              in Zimbabwe. Payment is structured at 90% in USD and 10% in ZiG
              (Zimbabwe Gold), providing immediate forex liquidity.
            </p>
          </div>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>🌱</div>
            <h4>ESG & Foundation</h4>
            <p>
              Committed to Environmental, Social, and Governance excellence
              through the Socinga Africa Foundation. All operations uplift host
              communities and maintain an impeccable social licence to operate.
              Every investment decision is measured against its impact on people
              and the planet.
            </p>
          </div>
        </div>
      </section>

      {/* ── Revenue Projection ─────────────────────────────────────── */}
      <section className={styles.section}>
        <h2>Revenue Projection</h2>
        <hr className={styles.divider} />
        <p>
          Based on the target production of 15 KG gold per month using CIP
          plant technology with 90–95% recovery rates, the following revenue
          projections apply at current and conservative gold pricing:
        </p>
        <div className={styles.projectionTable}>
          <table className={styles.fullTable}>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Conservative</th>
                <th>Current Spot</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gold Price (per troy oz)</td>
                <td>USD 3,300</td>
                <td>USD 4,615</td>
              </tr>
              <tr>
                <td>Monthly Production</td>
                <td colSpan={2}>15 KG (482.3 troy oz)</td>
              </tr>
              <tr>
                <td>Monthly Revenue (USD)</td>
                <td>USD 1,591,590</td>
                <td>USD 2,224,015</td>
              </tr>
              <tr>
                <td>Monthly Revenue (ZAR)</td>
                <td>ZAR 26,536,400</td>
                <td>ZAR 37,074,330</td>
              </tr>
              <tr>
                <td>Annual Revenue (USD)</td>
                <td>USD 19,099,080</td>
                <td>USD 26,688,180</td>
              </tr>
              <tr>
                <td>Annual Revenue (ZAR)</td>
                <td>ZAR 318,436,800</td>
                <td>ZAR 444,891,960</td>
              </tr>
              <tr className={styles.highlightRow}>
                <td>Recovery Rate</td>
                <td colSpan={2}>90–95% (CIP Plant / Cyanidation)</td>
              </tr>
              <tr className={styles.highlightRow}>
                <td>Off-Take Buyer</td>
                <td colSpan={2}>Fidelity Gold Refinery (FGR)</td>
              </tr>
              <tr className={styles.highlightRow}>
                <td>Payment Split</td>
                <td colSpan={2}>90% USD / 10% ZiG</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Key Governance ─────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2>Governance & Compliance</h2>
        <hr className={styles.divider} />
        <div className={styles.twoCol}>
          <div>
            <h4>Corporate Governance (King V Compliant)</h4>
            <ul className={styles.list}>
              <li>
                Board of Directors established as the Executive Authority in the
                highest decision-making capacity
              </li>
              <li>
                Chief Financial Officer (CFO) mandated to control all financial
                instruments and compliance
              </li>
              <li>
                No single person is permitted to conduct a financial process
                alone from start to end
              </li>
              <li>
                All transactions processed through clearly defined stages with
                segregation of duties
              </li>
              <li>
                Annual board review of all policies through the office of the
                Managing Director
              </li>
            </ul>
          </div>
          <div>
            <h4>Zimbabwe Regulatory Compliance</h4>
            <ul className={styles.list}>
              <li>
                ZIDA Investment Licence — registration through the Zimbabwe
                Investment and Development Agency
              </li>
              <li>
                Ministry of Mines and Mining Development — full statutory
                permitting secured
              </li>
              <li>
                Environmental Impact Assessment (EIA) — mandatory for all
                large-scale operations
              </li>
              <li>
                Fidelity Gold Refinery (FGR) — sole authorised gold buyer under
                the Gold Trade Act
              </li>
              <li>
                ZIMRA tax registration — compliant with all revenue authority
                requirements
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Next Steps ─────────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2>Immediate Next Steps</h2>
        <hr className={styles.divider} />
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <h4>Week 1 of June 2026</h4>
              <p>
                Zimbabwe Delegation Trip — 5-member executive team travel from
                Johannesburg to Mutare via Harare for on-site geological
                verification, equipment audit, and stakeholder meetings with
                Hilltouch Investments.
              </p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <h4>June 2026</h4>
              <p>
                Commission SAMREC-compliant Competent Person&apos;s Report (CPR)
                from an independent geological consultancy to upgrade the
                inferred resource to indicated/measured.
              </p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <h4>July – August 2026</h4>
              <p>
                Mobilise CIP plant equipment, commission boilers, and begin
                phased capital deployment per tranche release schedule.
              </p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <h4>September 2026</h4>
              <p>
                Full production at 15+ KG/month with first gold delivery to
                Fidelity Gold Refinery. Begin monthly investor reporting cadence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
