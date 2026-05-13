"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

export default function LegalStructurePage() {
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
          <span className={styles.badge}>Legal Structure</span>
          <h1>Corporate Governance &amp; <span className={styles.textGold}>SPV Architecture</span></h1>
          <p className={styles.lead}>
            Actuarial-level fiduciary discipline — a flawless architectural framework for corporate
            governance, risk mitigation, and statutory compliance.
          </p>
        </div>
        <div className={styles.heroScrim} />
      </div>

      {/* ── Section: SPV Structure ────────────────────────────────────── */}
      <section className={styles.splitSection}>
        <div className={`${styles.textHalf} ${styles.reveal}`}>
          <span className={styles.sectionLabel}>Special Purpose Vehicle</span>
          <h2>12 Forge (Private) Limited</h2>
          <div className={styles.goldBar} />
          <p>
            The deployment of institutional capital into emerging market mining jurisdictions
            necessitates a flawless architectural framework for corporate governance, risk
            mitigation, and statutory compliance. Socinga Africa Mining approaches mining capital
            deployment with actuarial-level fiduciary discipline.
          </p>
          <p>
            To guarantee absolute operational segregation and to protect the ZAR 250,000,000 (USD
            13,513,513) capital injection from cross-collateralisation risks, all mining operations,
            mineral titles, processing infrastructure, and extraction activities associated with this
            expansion are legally executed through a dedicated Zimbabwean Special Purpose Vehicle
            (SPV) named 12 Forge (Private) Limited.
          </p>
          <p>
            The utilisation of 12 Forge (Private) Limited ensures that the mining operations are
            entirely insulated from the broader corporate activities of the Socinga Africa group. It
            is imperative to note that the parent entity&apos;s South African Financial Services Provider
            (FSP) licence is strictly ring-fenced for insurance administration; absolutely no mining
            capital is raised, processed, or deployed under the insurance regulatory structure.
          </p>
          <p>
            Instead, 12 Forge (Private) Limited holds unencumbered legal title to the mining
            concessions and operates with complete statutory permitting granted by the Zimbabwean
            Ministry of Mines and Mining Development. This precise legal segregation provides the
            investor with a clear, direct line of sight to the underlying physical assets without
            exposure to external corporate liabilities.
          </p>
        </div>
        <div className={`${styles.vizHalf} ${styles.reveal}`}>
          <div className={styles.spvDiagram}>
            <div className={styles.spvNode} data-label="Socinga Africa Mining">
              <div className={styles.spvNodeTitle}>Socinga Africa Mining</div>
              <div className={styles.spvNodeSub}>Parent Entity (SA-based)</div>
            </div>
            <div className={styles.spvConnector} />
            <div className={`${styles.spvNode} ${styles.spvNodeGold}`} data-label="SPV">
              <div className={styles.spvNodeTitle}>12 Forge (Pvt) Ltd</div>
              <div className={styles.spvNodeSub}>Special Purpose Vehicle (Zimbabwe)</div>
            </div>
            <div className={styles.spvBranches}>
              <div className={styles.spvBranch}>
                <div className={styles.spvLeaf}>Mineral Titles</div>
              </div>
              <div className={styles.spvBranch}>
                <div className={styles.spvLeaf}>Processing Infrastructure</div>
              </div>
              <div className={styles.spvBranch}>
                <div className={styles.spvLeaf}>Extraction Operations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section: PSA Structure ────────────────────────────────────── */}
      <section className={`${styles.fullSection} ${styles.sectionDark} ${styles.reveal}`}>
        <span className={styles.sectionLabel}>Investment Instrument</span>
        <h2>Production-Sharing Agreement (PSA)</h2>
        <div className={styles.goldBar} />
        <p className={styles.introPara}>
          The investment instrument is fundamentally structured as a bespoke Project Finance
          facility, executed via a Production-Sharing Agreement (PSA) within the 12 Forge
          (Private) Limited Special Purpose Vehicle (SPV). The Production-Sharing Agreement
          (PSA) dictates that the incoming investor acquires a 60 per cent (60%) equity share of
          the net distributable free cash flow generated specifically by the infrastructure funded
          by this capital tranche. Socinga Africa Mining retains the remaining 40 per cent (40%)
          equity share to manage the operational lifecycle, technological oversight, and statutory
          compliance.
        </p>
        <div className={styles.splitCards}>
          <div className={styles.shareCard}>
            <div className={styles.sharePercent}>60%</div>
            <div className={styles.shareTitle}>Investor Equity Share</div>
            <div className={styles.shareDesc}>
              Net distributable free cash flow generated by the funded infrastructure — for the
              entire Life of Mine.
            </div>
          </div>
          <div className={styles.shareCard}>
            <div className={`${styles.sharePercent} ${styles.sharePercentAlt}`}>40%</div>
            <div className={styles.shareTitle}>Socinga Africa Mining</div>
            <div className={styles.shareDesc}>
              Retained to manage the operational lifecycle, technological oversight, and statutory
              compliance of the mine.
            </div>
          </div>
        </div>
      </section>

      {/* ── Section: Entitlements & Compliance ───────────────────────── */}
      <section className={`${styles.splitSection} ${styles.sectionMid}`}>
        <div className={`${styles.vizHalf} ${styles.reveal}`}>
          <div className={styles.complianceGrid}>
            {[
              { icon: "⚖️", label: "Legal Rights", desc: "Mining concession titles held unencumbered" },
              { icon: "💧", label: "Water Usage Permits", desc: "Full statutory water rights secured" },
              { icon: "🌿", label: "Environmental Certifications", desc: "EIA compliance tracked digitally" },
              { icon: "📡", label: "Digital Compliance Framework", desc: "Real-time entitlement monitoring" },
            ].map((item) => (
              <div key={item.label} className={styles.complianceItem}>
                <div className={styles.complianceIcon}>{item.icon}</div>
                <div className={styles.complianceLabel}>{item.label}</div>
                <div className={styles.complianceDesc}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.textHalf} ${styles.reveal}`}>
          <span className={styles.sectionLabel}>Entitlements &amp; Statutory Compliance Tracking</span>
          <h2>Digital Compliance Framework</h2>
          <div className={styles.goldBar} />
          <p>
            Crucially, all legal rights, water usage permits, and environmental certifications are
            classified corporately as &quot;Entitlements&quot; and tracked transparently through our digital
            compliance frameworks. This ensures that the Special Purpose Vehicle (SPV) maintains a
            perfect legal standing at all times.
          </p>
        </div>
      </section>

      {/* ── Section: Legal Confirmation ───────────────────────────────── */}
      <section className={`${styles.fullSection} ${styles.reveal}`}>
        <span className={styles.sectionLabel}>Formal Legal Confirmation</span>
        <h2>Workflow Resolution</h2>
        <div className={styles.goldBar} />
        <div className={styles.legalBox}>
          <div className={styles.legalBoxHeader}>
            <span className={styles.legalBadge}>CONFIRMED</span>
            <span className={styles.legalRef}>Task (M) SAM Dossier #426359</span>
          </div>
          <p>
            In direct response to the pending system requirement for Task (M) SAM Dossier #426359,
            this section serves as the formal review and approval of the corporate architecture. The
            establishment of the 12 Forge (Private) Limited Special Purpose Vehicle (SPV) and the
            specific mechanics of the Production-Sharing Agreement (PSA) have been legally confirmed
            and verified against statutory guidelines. With this confirmation documented, the
            Request_Legal_Confirmation bottleneck is cleared, allowing this dossier item to be
            officially marked as closed so the workflow can be advanced via the system&apos;s RETRY
            execution.
          </p>
          <div className={styles.legalStatus}>
            <div className={styles.legalStatusDot} />
            <span>Bottleneck Cleared — Workflow Advanced</span>
          </div>
        </div>
      </section>
    </div>
  );
}
