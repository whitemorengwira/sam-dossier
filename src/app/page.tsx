import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img
            src="/images/hero-mine.png"
            alt="Aerial view of Chikonga Mine, Manicaland, Zimbabwe"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroVignette} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.pulseDot} />
            Institutional-Grade Investment Dossier
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLine}>Chikonga</span>
            <span className={`${styles.heroTitleLine} ${styles.heroTitleGold}`}>
              Gold Mine
            </span>
          </h1>

          <p className={styles.heroSubtitle}>
            Mutare, Manicaland Province — Zimbabwe
          </p>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <div className={styles.heroStatValue}>ZAR 500M</div>
              <div className={styles.heroStatLabel}>Investment Secured</div>
            </div>
            <div className={styles.heroDivider} />
            <div className={styles.heroStat}>
              <div className={styles.heroStatValue}>15+ KG</div>
              <div className={styles.heroStatLabel}>Monthly Gold Target</div>
            </div>
            <div className={styles.heroDivider} />
            <div className={styles.heroStat}>
              <div className={styles.heroStatValue}>45 Ha</div>
              <div className={styles.heroStatLabel}>Mining Concession</div>
            </div>
          </div>

          <div className={styles.heroCtas}>
            <Link href="/executive-summary" className="btn btn-gold">
              Enter Dossier
            </Link>
            <Link href="/workspace/dashboard" className="btn btn-outline">
              Team Workspace
            </Link>
          </div>

          <p className={styles.heroDisclaimer}>
            Confidential — For Authorised Personnel Only
          </p>
        </div>

        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine} />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── Overview Section ──────────────────────────────────────────── */}
      <section className={`section ${styles.overview}`}>
        <div className="container">
          <div className={styles.overviewGrid}>
            <div className={styles.overviewText}>
              <span className={`badge badge-gold ${styles.sectionBadge}`}>
                The Opportunity
              </span>
              <h2>
                Asset-Backed Value Creation in{" "}
                <span className="text-gold">Africa&apos;s Richest Goldfields</span>
              </h2>
              <hr className="divider-gold" />
              <p>
                Chikonga Mine is a subsidiary of Hilltouch Investments, an
                indigenous gold mining entity that is wholly owned by its
                Directors Mr Lufeyi Shato and Mrs Joyce Kujenga. Established
                in 2005, it has grown in leaps and bounds from humble
                beginnings to become Manicaland&apos;s 3rd largest producer of
                the yellow mineral.
              </p>
              <p>
                The 45-hectare property is comprised of four 10-hectare
                registered claims. All four claims are currently or have
                previously been mined on a small scale for gold, with the
                first recorded production in 1959. Good and better standards
                of mining are presently being conducted by Hilltouch on
                multiple, steeply dipping, parallel narrow reefs (shear
                zones) stacked across a 350-metre wide, 800-metre+
                structural corridor.
              </p>
              <p>
                Improved gold grades averaged 15 g/t, 18 g/t and 25 g/t in
                2019, 2020 and 2021 respectively. With the secured
                investment of <strong>ZAR 500,000,000 (USD 29,994,000)</strong>,
                Socinga Africa Mining will push production from the current
                5 KG per month to <strong>15+ KG per month</strong>, unlocking
                significant returns for institutional partners.
              </p>
            </div>

            <div className={styles.overviewCards}>
              <div className="glass-card">
                <div className={styles.cardIcon}>⛏️</div>
                <h4>Current Production</h4>
                <div className="stat-value">5 KG</div>
                <div className="stat-label">Gold Per Month</div>
              </div>
              <div className="glass-card">
                <div className={styles.cardIcon}>📈</div>
                <h4>Target Production</h4>
                <div className="stat-value">15+ KG</div>
                <div className="stat-label">Gold Per Month</div>
              </div>
              <div className="glass-card">
                <div className={styles.cardIcon}>🪨</div>
                <h4>Ore Grade</h4>
                <div className="stat-value">15–25 g/t</div>
                <div className="stat-label">Verified Average</div>
              </div>
              <div className="glass-card">
                <div className={styles.cardIcon}>🔬</div>
                <h4>Recovery Rate</h4>
                <div className="stat-value">90–95%</div>
                <div className="stat-label">CIP Plant Technology</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dossier Navigation Section ────────────────────────────────── */}
      <section className={`section ${styles.navSection}`}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
            <span className="badge badge-gold">Navigate</span>
            <h2 style={{ marginTop: "var(--space-4)" }}>
              Explore the <span className="text-gold">Dossier</span>
            </h2>
            <hr className="divider-gold-center" />
            <p
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                color: "var(--smoke)",
              }}
            >
              Every aspect of this investment has been meticulously documented
              and is accessible through the sections below.
            </p>
          </div>

          <div className={styles.navGrid}>
            {[
              {
                title: "Executive Summary",
                desc: "High-level investment thesis, capital structure, and projected returns.",
                href: "/executive-summary",
                icon: "📋",
                phase: "Overview",
              },
              {
                title: "Chikonga Mine Profile",
                desc: "Complete mine profile, geological history, coordinates, and company documents.",
                href: "/chikonga-mine",
                icon: "⛏️",
                phase: "Asset",
              },
              {
                title: "Geological Report",
                desc: "Mineralisation data, assay results, shaft reports, and structural corridor analysis.",
                href: "/geological-report",
                icon: "🔬",
                phase: "Technical",
              },
              {
                title: "Financial Model",
                desc: "Interactive ROI calculator, 3-year projections, and capital deployment waterfall.",
                href: "/financial-model",
                icon: "💰",
                phase: "Financial",
              },
              {
                title: "Pre-Production",
                desc: "Zimbabwe trip logistics, geological verification, SAMREC CPR scheduling.",
                href: "/phases/pre-production",
                icon: "🗓️",
                phase: "Phase 1",
              },
              {
                title: "Production",
                desc: "Shaft sinking, equipment mobilisation, extraction timeline, and personnel.",
                href: "/phases/production",
                icon: "⚙️",
                phase: "Phase 2",
              },
              {
                title: "Post-Production",
                desc: "CIP plant commissioning, boiler installation, gold recovery and quality assurance.",
                href: "/phases/post-production",
                icon: "🏭",
                phase: "Phase 3",
              },
              {
                title: "Marketing & Distribution",
                desc: "FGR delivery pipeline, off-take fulfilment, and investor reporting.",
                href: "/phases/marketing",
                icon: "📊",
                phase: "Phase 4",
              },
              {
                title: "Mine Simulation",
                desc: "Interactive end-to-end mining ecosystem — from shaft to gold bar.",
                href: "/simulation/mine-simulator",
                icon: "🎮",
                phase: "Digital",
              },
              {
                title: "Regulatory & Compliance",
                desc: "Zimbabwe mining law, ZIDA licensing, beneficiation mandates, ESG framework.",
                href: "/regulatory",
                icon: "⚖️",
                phase: "Legal",
              },
              {
                title: "Team Workspace",
                desc: "monday.com-style dashboard, tasks, documents, AI chat, and timeline.",
                href: "/workspace/dashboard",
                icon: "👥",
                phase: "Workspace",
              },
              {
                title: "Mining Hub",
                desc: "Pan-African mining marketplace — listings, jobs, talent, and investors.",
                href: "https://www.socinga.africa/mining-hub",
                icon: "🌍",
                phase: "Hub",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.navCard}
              >
                <div className={styles.navCardHeader}>
                  <span className={styles.navCardIcon}>{item.icon}</span>
                  <span className="badge badge-gold">{item.phase}</span>
                </div>
                <h4 className={styles.navCardTitle}>{item.title}</h4>
                <p className={styles.navCardDesc}>{item.desc}</p>
                <span className={styles.navCardArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div>
              <h5 className="text-gold">SAM Dossier</h5>
              <p style={{ fontSize: "var(--fs-sm)", color: "var(--smoke)" }}>
                Socinga Africa Mining — Institutional-Grade Investment Dossier
              </p>
            </div>
            <div style={{ fontSize: "var(--fs-xs)", color: "var(--ash)" }}>
              <p>
                24 Kemphaan Street, Florida Lake, Roodepoort, 1709,
                Johannesburg, South Africa
              </p>
              <p>
                Reg No. 2013/227290/07 · FSP No. 46620 · FAIS Act Compliant
              </p>
              <p style={{ marginTop: "var(--space-2)" }}>
                © 2026 Socinga Africa. All Rights Reserved. Confidential
                Document.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
