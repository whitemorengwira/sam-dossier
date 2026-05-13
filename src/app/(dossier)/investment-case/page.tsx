import styles from "./page.module.css";

export const metadata = {
  title: "Investment Case | SAM Dossier",
  description:
    "Strategic rationale, market context, and fiscal feasibility for the Chikonga Mine expansion.",
};

export default function InvestmentCasePage() {
  return (
    <div className={styles.page}>
      {/* ── Page Header ────────────────────────────────────────────── */}
      <header className={styles.pageHeader}>
        <span className={styles.badge}>Investment Case</span>
        <h1>
          Strategic Rationale &amp;{" "}
          <span className={styles.textGold}>Market Context</span>
        </h1>
        <hr className={styles.divider} />
        <p className={styles.lead}>
          The strategic rationale underpinning this expansion is rooted in the
          exceptional, proven metrics of the Chikonga Mine and the robust capital
          governance framework engineered by Socinga Africa Mining.
        </p>
      </header>

      {/* ── Key Metrics Strip ──────────────────────────────────────── */}
      <section className={styles.metricsStrip}>
        {[
          { value: "ZAR 250M", label: "Capital Injection", sub: "USD 13,513,513" },
          { value: "USD 4,750", label: "Baseline Gold Price", sub: "Per Troy Ounce" },
          { value: "5%", label: "Royalty Rate", sub: "Within USD 1,200–5,000/oz" },
          { value: "100%", label: "Capital Redemption", sub: "Allowance (CRA)" },
          { value: "15 KG/mo", label: "Production Target", sub: "From current 5 KG/month" },
          { value: "60/40", label: "Profit Split", sub: "Investor / Socinga" },
        ].map((stat) => (
          <div key={stat.label} className={styles.metric}>
            <div className={styles.metricValue}>{stat.value}</div>
            <div className={styles.metricLabel}>{stat.label}</div>
            <div className={styles.metricSub}>{stat.sub}</div>
          </div>
        ))}
      </section>

      {/* ── The Strategic Rationale ────────────────────────────────── */}
      <section className={styles.section}>
        <h2>The Strategic Rationale</h2>
        <hr className={styles.divider} />
        <p>
          The strategic rationale underpinning this expansion is rooted in the exceptional, proven
          metrics of the Chikonga Mine and the robust capital governance framework engineered by
          Socinga Africa Mining. By transitioning from inefficient stamp-milling and basic
          cyanidation to modern Carbon-in-Leach (CIL) metallurgy, the operation will not only
          triple its volumetric output but will also drastically enhance its recovery efficiencies.
        </p>
      </section>

      {/* ── Market Context ─────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2>Market Context and Global Demand Analysis</h2>
        <hr className={styles.divider} />
        <p>
          In alignment with modern feasibility study requirements, our market analysis confirms the
          enduring commercial context for gold. As an essential safe-haven asset, gold commands a
          premium pricing environment that directly influences revenue projections and heavily
          justifies the financial metrics of the project.
        </p>
      </section>

      {/* ── Macroeconomic and Fiscal Feasibility ───────────────────── */}
      <section className={styles.section}>
        <h2>Macroeconomic and Fiscal Feasibility</h2>
        <hr className={styles.divider} />
        <p>
          The financial architecture of this expansion must be meticulously stress-tested against
          the prevailing macroeconomic environment and the specific statutory fiscal policies
          enforced by the Government of Zimbabwe. The commercial viability of the ZAR 250,000,000
          (USD 13,513,513) investment is heavily insulated by current global commodity dynamics, yet
          requires sophisticated navigation of domestic taxation.
        </p>
      </section>

      {/* ── Three Pillars ──────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2>Three Pillars of Financial Insulation</h2>
        <hr className={styles.divider} />
        <div className={styles.pillars}>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>01</div>
            <h4>Gold Price Macroeconomics</h4>
            <p>
              For the purposes of this highly conservative financial model, the baseline gold price is
              assumed at exactly USD 4,750 (ZAR 87,875) per troy ounce. By locking the model at this
              rate, the feasibility study builds in an intrinsic margin of safety, ensuring that the
              15 kilogrammes (kg) per month target generates robust cash flows even during minor
              cyclical market corrections.
            </p>
          </div>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>02</div>
            <h4>The 5 Per Cent (5%) Royalty Framework</h4>
            <p>
              Under the legally enacted framework applicable to this model, large-scale gold producers
              are subject to a 5 per cent (5%) royalty rate for gold prices ranging between USD 1,200
              (ZAR 22,200) and USD 5,000 (ZAR 92,500) per ounce. The aggressive 10 per cent (10%)
              windfall royalty is strictly triggered only when the global spot price exceeds the USD
              5,000 (ZAR 92,500) threshold. Because our financial model assumes a steady-state
              commodity price of USD 4,750 (ZAR 87,875) per ounce, the operation fits perfectly within
              the 5 per cent (5%) royalty bracket, preserving millions in gross revenue annually and
              shielding the investor&apos;s free cash flow from excessive sovereign taxation.
            </p>
          </div>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>03</div>
            <h4>The 100% Capital Redemption Allowance (CRA)</h4>
            <p>
              In assessing the profitability of capital-intensive mining expansions, the treatment of
              Capital Expenditure (CapEx) against corporate income tax is the most critical variable.
              Zimbabwe&apos;s Income Tax Act allows mining companies to claim a 100 per cent (100%)
              Capital Redemption Allowance (CRA) on a &quot;New Mine Basis&quot;. Following recent intense
              industry advocacy, the Government of Zimbabwe confirmed the preservation of this 100 per
              cent (100%) upfront deduction for 2026, withdrawing previous proposals that would have
              forced life-of-mine amortisation. This statutory mechanism functions as a massive,
              immediate tax shield, legally deferring corporate income tax and allowing the operation
              to direct all available liquidity toward the rapid repayment of the investor&apos;s ZAR
              250,000,000 (USD 13,513,513) principal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
