import Link from "next/link";
import styles from "../phases.module.css";

export const metadata = {
  title: "Phase 2: Production | SAM Dossier",
  description: "Tranche 2 capital deployment, shaft expansion, and HEMM mobilisation.",
};

export default function ProductionPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span className="badge badge-gold">Phase 2</span>
        <h1>
          Primary <span className="text-gold">Extraction</span>
        </h1>
        <p className={styles.lead}>
          Deployment of the ZAR 225M core infrastructure tranche to expand 
          sub-surface extraction capacity and mobilise Heavy Earth-Moving Machinery (HEMM).
        </p>
      </header>

      {/* ── Navigator ────────────────────────────────────────────────── */}
      <nav className={styles.phaseNav}>
        <Link href="/phases/pre-production" className={styles.phaseLink}>
          1. Pre-Production
        </Link>
        <Link href="/phases/production" className={`${styles.phaseLink} ${styles.phaseActive}`}>
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
          <h2>Sub-Surface Expansion & Infrastructure</h2>
          <p>
            Phase 2 fundamentally alters the extraction velocity at Chikonga. We transition 
            from artisanal stamp-milling constraints into a mechanised, high-tonnage 
            sub-surface operation designed to feed the upcoming CIP plant continuously.
          </p>

          <div className={styles.milestoneList}>
            <div className={styles.milestoneItem}>
              <div className={styles.milestoneIcon}>🚜</div>
              <div className={styles.milestoneText}>
                <h4>HEMM Mobilisation</h4>
                <p>Procurement and deployment of Heavy Earth-Moving Machinery, loaders, and industrial hoists to expand the 4 active claims.</p>
              </div>
            </div>
            
            <div className={styles.milestoneItem}>
              <div className={styles.milestoneIcon}>🕳️</div>
              <div className={styles.milestoneText}>
                <h4>Shaft Sinking & Development</h4>
                <p>Deepening the primary declines to access the enriched supergene zone where historical grades peaked at 25 g/t.</p>
              </div>
            </div>

            <div className={styles.milestoneItem}>
              <div className={styles.milestoneIcon}>⚡</div>
              <div className={styles.milestoneText}>
                <h4>Power Infrastructure Upgrades</h4>
                <p>Installation of high-capacity backup generators and grid-stabilisation transformers to ensure zero downtime during extraction.</p>
              </div>
            </div>
          </div>

          <div className={styles.kpiBox}>
            <div className={styles.kpiLabel}>Tranche 2 Capital Allocation</div>
            <div className={styles.kpiValue}>ZAR 225,000,000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
