import Link from "next/link";
import styles from "../phases.module.css";

export const metadata = {
  title: "Phase 1: Pre-Production | SAM Dossier",
  description: "Tranche 1 capital deployment, geological verification, and site logistics.",
};

export default function PreProductionPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span className="badge badge-gold">Phase 1</span>
        <h1>
          Pre-<span className="text-gold">Production</span>
        </h1>
        <p className={styles.lead}>
          Deployment of the ZAR 150M initial tranche to establish secure logistics, 
          verify geological targets, and finalise primary state compliance mechanisms.
        </p>
      </header>

      {/* ── Navigator ────────────────────────────────────────────────── */}
      <nav className={styles.phaseNav}>
        <Link href="/phases/pre-production" className={`${styles.phaseLink} ${styles.phaseActive}`}>
          1. Pre-Production
        </Link>
        <Link href="/phases/production" className={styles.phaseLink}>
          2. Production (Extraction)
        </Link>
        <Link href="/phases/post-production" className={styles.phaseLink}>
          3. Post-Production (CIP)
        </Link>
        <Link href="/phases/marketing" className={styles.phaseLink}>
          4. Marketing & Off-Take
        </Link>
      </nav>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className={styles.contentGrid}>
        <div className={styles.detailCard}>
          <h2>Geological Verification & Delegation</h2>
          <p>
            The immediate priority of Phase 1 is the physical verification of the Chikonga 
            Mine asset by the Johannesburg corporate delegation. Scheduled for the first week 
            of June 2026, this mission will transition the current data room into an actionable 
            deployment strategy.
          </p>

          <div className={styles.milestoneList}>
            <div className={styles.milestoneItem}>
              <div className={styles.milestoneIcon}>✈️</div>
              <div className={styles.milestoneText}>
                <h4>Mutare Site Delegation</h4>
                <p>Five-member executive team flight (JHB to Harare). Physical audit of Hilltouch operations and structural corridor assessment.</p>
              </div>
            </div>
            
            <div className={styles.milestoneItem}>
              <div className={styles.milestoneIcon}>📊</div>
              <div className={styles.milestoneText}>
                <h4>SAMREC CPR Commissioning</h4>
                <p>Contracting of independent geological consultants to produce the Competent Person&apos;s Report, formally upgrading Inferred resources.</p>
              </div>
            </div>

            <div className={styles.milestoneItem}>
              <div className={styles.milestoneIcon}>⚖️</div>
              <div className={styles.milestoneText}>
                <h4>Fidelity Gold Licensing Update</h4>
                <p>Ensuring all extraction quotas and metallurgical recovery agreements with FGR are legally bound to the 12 Forge SPV.</p>
              </div>
            </div>
          </div>

          <div className={styles.kpiBox}>
            <div className={styles.kpiLabel}>Tranche 1 Capital Allocation</div>
            <div className={styles.kpiValue}>ZAR 150,000,000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
