import ROICalculator from "@/components/dossier/ROICalculator";
import styles from "./page.module.css";

export const metadata = {
  title: "Financial Model & ROI | SAM Dossier",
  description:
    "Interactive financial model, ROI calculator, and capital deployment waterfall for Chikonga Mine.",
};

export default function FinancialModelPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span className="badge badge-gold">Financial Structure</span>
        <h1>
          Capital Deployment & <span className="text-gold">ROI Matrix</span>
        </h1>
        <p className={styles.lead}>
          A transparent breakdown of the ZAR 500,000,000 capital stack, phased 
          deployment tranches, and expected return on investment calculated against 
          current spot prices and historical assay grades.
        </p>
      </header>

      <section className={styles.section}>
        <ROICalculator />
      </section>

      <section className={styles.section}>
        <h2>Capital Deployment Waterfall</h2>
        <hr className="divider-gold" />
        <p style={{ marginBottom: "var(--space-6)", color: "var(--smoke)" }}>
          The ZAR 500M investment is structurally ring-fenced and deployed in strictly monitored 
          tranches. No single entity commands unilateral authority over capital release, ensuring 
          complete asset protection and milestone-driven funding.
        </p>
        
        <div className={styles.waterfallGrid}>
          <div className={styles.waterfallCard}>
            <div className={styles.trancheHeader}>
              <span className="badge badge-gold">Tranche 1</span>
              <span className={styles.trancheValue}>30%</span>
            </div>
            <h4>Pre-Production & Logistics</h4>
            <ul className={styles.trancheList}>
              <li>SAMREC CPR Commissioning</li>
              <li>Zimbabwe Site Delegation (June 2026)</li>
              <li>Fidelity Gold Refinery Licensing</li>
              <li>Mining Consumables Securitisation</li>
            </ul>
            <div className={styles.trancheAmount}>ZAR 150,000,000</div>
          </div>

          <div className={styles.waterfallCard}>
            <div className={styles.trancheHeader}>
              <span className="badge badge-gold">Tranche 2</span>
              <span className={styles.trancheValue}>45%</span>
            </div>
            <h4>Core Infrastructure (CIP Plant)</h4>
            <ul className={styles.trancheList}>
              <li>Carbon-in-Pulp (CIP) Plant Acquisition</li>
              <li>High-Pressure Industrial Boilers</li>
              <li>Heavy Earth-Moving Machinery (HEMM)</li>
              <li>Shaft Sinking & Expansion</li>
            </ul>
            <div className={styles.trancheAmount}>ZAR 225,000,000</div>
          </div>

          <div className={styles.waterfallCard}>
            <div className={styles.trancheHeader}>
              <span className="badge badge-gold">Tranche 3</span>
              <span className={styles.trancheValue}>15%</span>
            </div>
            <h4>Smart Mining & Security</h4>
            <ul className={styles.trancheList}>
              <li>IoT Sensors & Telemetry</li>
              <li>Drone Surveying Integration</li>
              <li>Armed Security & Vault Construction</li>
              <li>AI Operational Dashboarding</li>
            </ul>
            <div className={styles.trancheAmount}>ZAR 75,000,000</div>
          </div>

          <div className={styles.waterfallCard}>
            <div className={styles.trancheHeader}>
              <span className="badge badge-gold">Tranche 4</span>
              <span className={styles.trancheValue}>10%</span>
            </div>
            <h4>ESG & Community Foundation</h4>
            <ul className={styles.trancheList}>
              <li>Mutare Mission House Build</li>
              <li>Local Clinic & Infrastructure Support</li>
              <li>Environmental Impact Mitigation</li>
              <li>Contingency Reserve</li>
            </ul>
            <div className={styles.trancheAmount}>ZAR 50,000,000</div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Institutional Controls & Compliance</h2>
        <hr className="divider-gold" />
        <div className={styles.controlsGrid}>
          <div className="glass-card">
            <h4>Segregation of Duties</h4>
            <p>
              Under strict corporate governance protocols established on 30 April 2026, 
              no single individual within Socinga Africa Mining may initiate, approve, 
              and execute a financial transaction. Complete segregation between procurement, 
              authorisation (CFO), and final release (MD/CEO) is mandatory.
            </p>
          </div>
          <div className="glass-card">
            <h4>Guaranteed Off-Take (FGR)</h4>
            <p>
              100% of gold produced is routed through the Fidelity Gold Refinery, the sole 
              authorised purchaser in Zimbabwe. This ensures immediate legal compliance, 
              guaranteed liquidity, and protection against illicit market volatility. 
              Remittance is split 90% USD / 10% ZiG.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
