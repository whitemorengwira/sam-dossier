import Link from "next/link";
import styles from "../phases.module.css";

export const metadata = {
  title: "Phase 3: Post-Production | SAM Dossier",
  description: "Tranche 3 capital deployment, CIP Plant commissioning, and Smart Mining IoT integration.",
};

export default function PostProductionPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span className="badge badge-gold">Phase 3</span>
        <h1>
          Post-<span className="text-gold">Production</span>
        </h1>
        <p className={styles.lead}>
          Deployment of the ZAR 75M technology tranche to commission the Carbon-in-Pulp 
          (CIP) plant and integrate Smart Mining IoT security protocols.
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
        <Link href="/phases/post-production" className={`${styles.phaseLink} ${styles.phaseActive}`}>
          3. Post-Production (CIP)
        </Link>
        <Link href="/phases/marketing" className={styles.phaseLink}>
          4. Marketing & Off-Take
        </Link>
      </nav>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className={styles.contentGrid}>
        <div className={styles.detailCard}>
          <h2>CIP Plant & Smart Mining Integration</h2>
          <p>
            Phase 3 represents the core technological leap for the Chikonga asset. 
            By replacing traditional stamp milling with a state-of-the-art CIP plant, 
            recovery rates are projected to increase from ~60% to 90-95%, effectively 
            tripling the monthly yield to the 15+ KG target.
          </p>

          <div className={styles.milestoneList}>
            <div className={styles.milestoneItem}>
              <div className={styles.milestoneIcon}>🏭</div>
              <div className={styles.milestoneText}>
                <h4>CIP Plant Commissioning</h4>
                <p>Assembly and stress-testing of the Carbon-in-Pulp tanks, high-pressure industrial boilers, and chemical leaching circuitry.</p>
              </div>
            </div>
            
            <div className={styles.milestoneItem}>
              <div className={styles.milestoneIcon}>📡</div>
              <div className={styles.milestoneText}>
                <h4>IoT Telemetry Dashboard</h4>
                <p>Live integration of smart sensors into the digital twin, allowing the Johannesburg office to monitor pH levels and hoist loads in real-time.</p>
              </div>
            </div>

            <div className={styles.milestoneItem}>
              <div className={styles.milestoneIcon}>🛡️</div>
              <div className={styles.milestoneText}>
                <h4>Armed Security & Vaulting</h4>
                <p>Construction of the on-site secure vault and deployment of drone surveying to monitor the 45-hectare concession perimeter.</p>
              </div>
            </div>
          </div>

          <div className={styles.kpiBox}>
            <div className={styles.kpiLabel}>Tranche 3 Capital Allocation</div>
            <div className={styles.kpiValue}>ZAR 75,000,000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
