import Link from "next/link";
import styles from "../phases.module.css";

export const metadata = {
  title: "Phase 4: Marketing & Off-Take | SAM Dossier",
  description: "Tranche 4 capital deployment, FGR remittance, and ESG foundation building.",
};

export default function MarketingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span className="badge badge-gold">Phase 4</span>
        <h1>
          Marketing & <span className="text-gold">Off-Take</span>
        </h1>
        <p className={styles.lead}>
          Deployment of the ZAR 50M final tranche focusing on ESG obligations, 
          finalising the Fidelity Gold Refinery (FGR) liquidity channel, and establishing 
          contingency reserves.
        </p>
      </header>

      {/* ── Navigator ────────────────────────────────────────────────── */}
      <nav className={styles.phaseNav}>
        <Link href="/phases/pre-production" className={styles.phaseLink}>
          1. Pre-Production
        </Link>
        <Link href="/phases/production" className={styles.phaseLink}>
          2. Production (Extraction)
        </Link>
        <Link href="/phases/post-production" className={styles.phaseLink}>
          3. Post-Production (CIP)
        </Link>
        <Link href="/phases/marketing" className={`${styles.phaseLink} ${styles.phaseActive}`}>
          4. Marketing & Off-Take
        </Link>
      </nav>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className={styles.contentGrid}>
        <div className={styles.detailCard}>
          <h2>FGR Liquidity & ESG Mandates</h2>
          <p>
            Phase 4 secures the revenue pipeline. All smelted bullion is routed 
            exclusively through FGR, guaranteeing statutory compliance and immediate 
            capital liquidity. Concurrently, our commitment to the Mutare community is 
            materialised through the Socinga Foundation.
          </p>

          <div className={styles.milestoneList}>
            <div className={styles.milestoneItem}>
              <div className={styles.milestoneIcon}>🏦</div>
              <div className={styles.milestoneText}>
                <h4>FGR Remittance Pipeline</h4>
                <p>Securing the physical transport logistics and auditing the 90% USD / 10% ZiG settlement ratio upon delivery to Harare.</p>
              </div>
            </div>
            
            <div className={styles.milestoneItem}>
              <div className={styles.milestoneIcon}>🏥</div>
              <div className={styles.milestoneText}>
                <h4>Mission House & Clinic</h4>
                <p>Execution of ESG mandates including the construction of the local Mission House and upgrading the Mutare clinic infrastructure.</p>
              </div>
            </div>

            <div className={styles.milestoneItem}>
              <div className={styles.milestoneIcon}>💼</div>
              <div className={styles.milestoneText}>
                <h4>Investor Reporting</h4>
                <p>Initiation of quarterly shareholder dividend distribution and SAMREC-audited production reports to the Johannesburg SPV.</p>
              </div>
            </div>
          </div>

          <div className={styles.kpiBox}>
            <div className={styles.kpiLabel}>Tranche 4 Capital Allocation</div>
            <div className={styles.kpiValue}>ZAR 50,000,000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
