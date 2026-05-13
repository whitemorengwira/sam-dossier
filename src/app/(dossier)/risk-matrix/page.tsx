import styles from "./page.module.css";

export const metadata = {
  title: "Risk Matrix | SAM Dossier",
  description:
    "Risk management framework for the Chikonga Mine expansion — operational, macroeconomic, and ESG risk mitigation.",
};

export default function RiskMatrixPage() {
  return (
    <div className={styles.page}>
      {/* ── Page Header ────────────────────────────────────────────── */}
      <header className={styles.pageHeader}>
        <span className={styles.badge}>Risk Matrix</span>
        <h1>
          Risk Management &amp;{" "}
          <span className={styles.textGold}>Mitigation Framework</span>
        </h1>
        <hr className={styles.divider} />
        <p className={styles.lead}>
          The deployment of multi-million-dollar capital requires an
          uncompromising approach to risk management. Socinga Africa Mining
          ensures that the 12 Forge (Private) Limited Special Purpose Vehicle
          (SPV) operates within the strictest parameters of physical,
          operational, and macroeconomic security, fully incorporating high-end
          international methodologies.
        </p>
      </header>

      {/* ── Key Risk Metrics ───────────────────────────────────────── */}
      <section className={styles.metricsStrip}>
        {[
          { value: "3", label: "Risk Categories", sub: "Operational, Macro, ESG" },
          { value: "14+", label: "Mitigation Controls", sub: "Active controls deployed" },
          { value: "15–25 g/t", label: "Grade Buffer", sub: "Production insulation" },
          { value: "USD 4,750", label: "Conservative Peg", sub: "Below market peaks" },
        ].map((stat) => (
          <div key={stat.label} className={styles.metric}>
            <div className={styles.metricValue}>{stat.value}</div>
            <div className={styles.metricLabel}>{stat.label}</div>
            <div className={styles.metricSub}>{stat.sub}</div>
          </div>
        ))}
      </section>

      {/* ── Risk 1: Operational ─────────────────────────────────────── */}
      <section className={styles.section}>
        <h2>Operational Readiness and Execution Risk</h2>
        <hr className={styles.divider} />
        <p>
          To sustain the targeted production output of 15 kilogrammes (kg) per month, the
          physical extraction capacity of the mine must be radically scaled from shallow,
          artisanal workings to a mechanised, 400-metre inclined depth architecture (level 3).
          Furthermore, the bottleneck of the antiquated stamp-mill system will be eliminated by
          constructing a 500 tonnes per day (tpd) Carbon-in-Leach (CIL) plant.
        </p>
        <p>
          To mitigate execution risk during this massive upgrade, the operation relies heavily on
          our advanced corporate dashboard systems. We apply rigorous &quot;Project Management&quot; and
          &quot;Asset Management&quot; controls directly to the physical mining environment. The executive
          team utilises &quot;Inventory Management&quot; for ore tracking, &quot;Maintenance Management&quot; for the
          CIL plant, and &quot;Security Management&quot; to protect the gold bullion. Real-time tracking of
          &quot;Consumption &amp; Compliance&quot; ensures reagent burn rates (cyanide, activated carbon)
          precisely match theoretical expectations, completely eliminating capital leakage.
        </p>
        <div className={styles.controlsList}>
          <h4>Mitigation Controls</h4>
          <ul className={styles.list}>
            <li>Advanced corporate dashboard with Project Management and Asset Management controls</li>
            <li>Inventory Management for ore tracking from shaft to mill</li>
            <li>Maintenance Management for the 500 tpd CIL plant</li>
            <li>Security Management to protect gold bullion</li>
            <li>Real-time Consumption &amp; Compliance tracking for reagent burn rates</li>
          </ul>
        </div>
      </section>

      {/* ── Risk 2: Macroeconomic ──────────────────────────────────── */}
      <section className={styles.section}>
        <h2>Macroeconomic and Commodity Risk</h2>
        <hr className={styles.divider} />
        <p>
          Global macroeconomic instability is mitigated by calculating the Return on Investment
          (ROI) against highly conservative benchmarks. By pegging the financial model at USD
          4,750 (ZAR 87,875) per ounce — well below market peaks — the project builds in immense
          safety margins. Furthermore, the exceptionally high run-of-mine grades (15 to 25
          grammes per tonne) insulate the project against minor cyclical market corrections.
        </p>
        <div className={styles.controlsList}>
          <h4>Mitigation Controls</h4>
          <ul className={styles.list}>
            <li>Financial model pegged at USD 4,750 (ZAR 87,875) — intrinsically conservative</li>
            <li>Exceptionally high run-of-mine grades (15 to 25 g/t) provide grade insulation</li>
            <li>5% royalty bracket preserved well below USD 5,000 windfall threshold</li>
            <li>100% Capital Redemption Allowance (CRA) provides immediate tax shield</li>
          </ul>
        </div>
      </section>

      {/* ── Risk 3: ESG ────────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2>Environmental, Social, and Governance (ESG) Risk</h2>
        <hr className={styles.divider} />
        <p>
          To meet 2026 international best practices, Environmental, Social, and Governance (ESG)
          compliance is structurally embedded into the Capital Expenditure (CapEx). Capital
          tranches are explicitly allocated to facilitate concurrent environmental
          rehabilitation, ensuring strict adherence to environmental laws. Mandated features of
          the new 500 tonnes per day (tpd) Carbon-in-Leach (CIL) plant will include closed-loop
          water recycling systems within the wash circuits to minimise ecological impact, ensure
          water security, and lower the overall carbon footprint of the extraction process.
          Furthermore, community consent-building and social impact are formalised through
          transparent stakeholder communication plans, fostering long-term trust and mitigating
          any localized disruption risks.
        </p>
        <div className={styles.controlsList}>
          <h4>Mitigation Controls</h4>
          <ul className={styles.list}>
            <li>Closed-loop water recycling systems within CIL wash circuits</li>
            <li>Minimised ecological impact and enhanced water security</li>
            <li>Reduced overall carbon footprint of the extraction process</li>
            <li>Community consent-building and social impact formalised through stakeholder plans</li>
            <li>Transparent communication to foster long-term trust and mitigate localised disruption</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
