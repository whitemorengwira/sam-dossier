"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

export default function InvestmentCasePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Parallax hero
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Intersection Observer for scroll-reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(`.${styles.revealBlock}`).forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.page}>
      {/* ── Cinematic Hero ─────────────────────────────────────────────── */}
      <div className={styles.heroWrapper}>
        <div className={styles.heroBg} ref={heroRef} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>Investment Case</span>
          <h1>
            The Strategic <span className={styles.textGold}>Rationale</span>
          </h1>
          <p className={styles.lead}>
            Asset-backed mineral extraction with measured, commercial returns — rooted in the
            exceptional, proven metrics of the Chikonga Mine.
          </p>
        </div>
        <div className={styles.heroScrim} />
      </div>

      {/* ── Section 1: Strategic Rationale ────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={`${styles.textBlock} ${styles.revealBlock}`}>
          <span className={styles.sectionLabel}>Strategic Overview</span>
          <h2>The Strategic Rationale</h2>
          <div className={styles.goldBar} />
          <p>
            The strategic rationale underpinning this expansion is rooted in the exceptional, proven
            metrics of the Chikonga Mine and the robust capital governance framework engineered by
            Socinga Africa Mining. By transitioning from inefficient stamp-milling and basic
            cyanidation to modern Carbon-in-Leach (CIL) metallurgy, the operation will not only
            triple its volumetric output but will also drastically enhance its recovery efficiencies.
          </p>
        </div>
        <div className={`${styles.visualPanel} ${styles.revealBlock}`}>
          <div className={styles.dataViz}>
            <div className={styles.vizLabel}>Production Transition</div>
            <div className={styles.barChart}>
              <div className={styles.barGroup}>
                <div className={styles.barWrap}>
                  <div className={styles.barFill} style={{ height: "33%" }} />
                </div>
                <div className={styles.barLabel}>Current<br />5 KG/mo</div>
              </div>
              <div className={styles.barGroup}>
                <div className={styles.barWrap}>
                  <div className={`${styles.barFill} ${styles.barFillGold}`} style={{ height: "100%" }} />
                </div>
                <div className={styles.barLabel}>Target<br />15 KG/mo</div>
              </div>
            </div>
            <div className={styles.vizCaption}>3× Volume Uplift via CIL Metallurgy</div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Market Context ──────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionMid}`}>
        <div className={`${styles.fullWidthText} ${styles.revealBlock}`}>
          <span className={styles.sectionLabel}>Market Context</span>
          <h2>Global Demand Analysis</h2>
          <div className={styles.goldBar} />
          <p>
            In alignment with modern feasibility study requirements, our market analysis confirms the
            enduring commercial context for gold. As an essential safe-haven asset, gold commands a
            premium pricing environment that directly influences revenue projections and heavily
            justifies the financial metrics of the project.
          </p>
        </div>
        <div className={`${styles.metricsRow} ${styles.revealBlock}`}>
          {[
            { value: "USD 4,750", sub: "ZAR 87,875", label: "Baseline Gold Price Per Troy Ounce" },
            { value: "5%", sub: "Royalty Rate", label: "Within USD 1,200–5,000/oz Bracket" },
            { value: "100%", sub: "Capital Redemption", label: "Allowance (CRA) on New Mine Basis" },
            { value: "ZAR 250M", sub: "USD 13,513,513", label: "Targeted Capital Injection" },
          ].map((m) => (
            <div key={m.label} className={styles.metricCard}>
              <div className={styles.metricValue}>{m.value}</div>
              <div className={styles.metricSub}>{m.sub}</div>
              <div className={styles.metricLabel}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Macroeconomic & Fiscal Feasibility ─────────────── */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={`${styles.textBlock} ${styles.revealBlock}`}>
          <span className={styles.sectionLabel}>Macroeconomic & Fiscal Feasibility</span>
          <h2>Financial Architecture</h2>
          <div className={styles.goldBar} />
          <p>
            The financial architecture of this expansion must be meticulously stress-tested against
            the prevailing macroeconomic environment and the specific statutory fiscal policies
            enforced by the Government of Zimbabwe. The commercial viability of the ZAR 250,000,000
            (USD 13,513,513) investment is heavily insulated by current global commodity dynamics, yet
            requires sophisticated navigation of domestic taxation.
          </p>
        </div>
        <div className={`${styles.visualPanel} ${styles.revealBlock}`}>
          <div className={styles.abstractViz}>
            <div className={styles.orb} />
            <div className={`${styles.orb} ${styles.orbGold}`} />
            <div className={`${styles.orb} ${styles.orbSmall}`} />
          </div>
        </div>
      </section>

      {/* ── Section 4: Three Pillars ───────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionFull} ${styles.revealBlock}`}>
        <span className={styles.sectionLabel}>Fiscal Framework</span>
        <h2>Three Pillars of Financial Insulation</h2>
        <div className={styles.goldBar} />
        <div className={styles.pillarsGrid}>
          <div className={styles.pillarCard}>
            <div className={styles.pillarNumber}>01</div>
            <h3>Gold Price Macroeconomics</h3>
            <div className={styles.pillarDivider} />
            <p>
              For the purposes of this highly conservative financial model, the baseline gold price is
              assumed at exactly USD 4,750 (ZAR 87,875) per troy ounce. By locking the model at this
              rate, the feasibility study builds in an intrinsic margin of safety, ensuring that the
              15 kilogrammes (kg) per month target generates robust cash flows even during minor
              cyclical market corrections.
            </p>
          </div>
          <div className={styles.pillarCard}>
            <div className={styles.pillarNumber}>02</div>
            <h3>The 5 Per Cent (5%) Royalty Framework</h3>
            <div className={styles.pillarDivider} />
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
          <div className={styles.pillarCard}>
            <div className={styles.pillarNumber}>03</div>
            <h3>The 100% Capital Redemption Allowance (CRA)</h3>
            <div className={styles.pillarDivider} />
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
