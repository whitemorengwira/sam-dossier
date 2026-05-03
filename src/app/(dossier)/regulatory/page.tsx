import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Regulatory & Compliance | SAM Dossier",
  description: "Governance, ESG frameworks, and statutory compliance across the Pan-African mining ecosystem.",
};

const MANDATES = [
  { country: "Zimbabwe", status: "Active", law: "Mines and Minerals Act / ZIDA", focus: "Primary Asset Base" },
  { country: "South Africa", status: "Active", law: "MPRDA / BBBEE", focus: "Corporate Headquarters" },
  { country: "Zambia", status: "Exploration", law: "Mines and Minerals Dev Act", focus: "Copper Belt Expansion" },
  { country: "Mozambique", status: "Scoping", law: "Mining Law No. 20/2014", focus: "Logistics Corridor" },
  { country: "Malawi", status: "Scoping", law: "Mines and Minerals Act 2019", focus: "Rare Earth Potential" },
  { country: "Ghana", status: "Pipeline", law: "Minerals and Mining Act", focus: "West African Gold" },
];

export default function RegulatoryPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span className="badge badge-gold">Compliance & Law</span>
        <h1>
          Regulatory <span className="text-gold">Framework</span>
        </h1>
        <p className={styles.lead}>
          Socinga Africa Mining operates with an uncompromising commitment to 
          statutory compliance, ensuring absolute legal protection for institutional 
          capital deployed across our Pan-African asset base.
        </p>
      </header>

      {/* ── Zimbabwe Core Operations ─────────────────────────────────── */}
      <section className={styles.section}>
        <h2>Zimbabwe Operations Mandate</h2>
        <hr className="divider-gold" />
        <div className={styles.grid2}>
          <div className="glass-card">
            <h3 className="text-gold" style={{fontSize: "var(--fs-lg)", marginBottom: "var(--space-4)"}}>
              ZIDA & Foreign Investment
            </h3>
            <p>
              The Zimbabwe Investment and Development Agency (ZIDA) acts as the 
              one-stop-shop investment centre. All foreign capital deployed by Socinga 
              Africa Mining into the 12 Forge SPV is registered through ZIDA, guaranteeing:
            </p>
            <ul className={styles.checkList}>
              <li>Protection of private property against expropriation</li>
              <li>100% repatriation of invested capital and dividends</li>
              <li>Facilitation of critical expatriate work permits</li>
            </ul>
          </div>
          
          <div className="glass-card">
            <h3 className="text-gold" style={{fontSize: "var(--fs-lg)", marginBottom: "var(--space-4)"}}>
              FGR & Beneficiation
            </h3>
            <p>
              Compliance with the Gold Trade Act is absolute. The Chikonga Mine 
              channels 100% of its processed bullion to Fidelity Gold Refinery (FGR), 
              the sole authorised buyer. 
            </p>
            <ul className={styles.checkList}>
              <li>Secured 90% USD / 10% ZiG settlement ratio</li>
              <li>Immediate statutory clearance of export revenues</li>
              <li>Alignment with national beneficiation mandates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Pan-African Mandates ─────────────────────────────────────── */}
      <section className={styles.section}>
        <h2>Pan-African Mandates</h2>
        <hr className="divider-gold" />
        <p style={{color: "var(--smoke)", marginBottom: "var(--space-6)"}}>
          As the Socinga ecosystem scales, our legal and compliance frameworks adapt to 
          the distinct mining charters of 6 strategic African jurisdictions.
        </p>
        
        <div className={styles.mandateTableWrapper}>
          <table className={styles.mandateTable}>
            <thead>
              <tr>
                <th>Jurisdiction</th>
                <th>Current Status</th>
                <th>Primary Legal Framework</th>
                <th>Strategic Focus</th>
              </tr>
            </thead>
            <tbody>
              {MANDATES.map((mandate) => (
                <tr key={mandate.country}>
                  <td className={styles.countryCell}>{mandate.country}</td>
                  <td>
                    <span className={`badge ${mandate.status === 'Active' ? 'badge-success' : 'badge-gold'}`}>
                      {mandate.status}
                    </span>
                  </td>
                  <td className={styles.lawCell}>{mandate.law}</td>
                  <td className={styles.focusCell}>{mandate.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── ESG & Corporate Governance ───────────────────────────────── */}
      <section className={styles.section}>
        <h2>ESG & Corporate Governance</h2>
        <hr className="divider-gold" />
        
        <div className={styles.esgGrid}>
          <div className={styles.esgImageWrapper}>
            <div className={styles.esgPlaceholder}>
              <div className={styles.esgIcon}>🌱</div>
              <h4>Socinga Africa Foundation</h4>
            </div>
          </div>
          <div className={styles.esgContent}>
            <h3>Environmental & Social Governance</h3>
            <p>
              Capital accumulation is inherently tied to community upliftment. 
              The Socinga Africa Foundation is the philanthropic arm ensuring that 
              the communities hosting our operations benefit from our presence.
            </p>
            
            <div className={styles.policyBox}>
              <h4>Tranche 4 Allocation</h4>
              <p>
                As part of the ZAR 500M Chikonga expansion, Tranche 4 specifically mandates 
                funds for the construction of a Mission House and local clinic support 
                in Mutare.
              </p>
            </div>
            
            <div className={styles.policyBox}>
              <h4>King V Compliance</h4>
              <p>
                Our Johannesburg corporate office adheres strictly to King V corporate 
                governance principles. Segregation of duties between procurement, finance, 
                and executive authorisation is hardcoded into our operating procedures.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
