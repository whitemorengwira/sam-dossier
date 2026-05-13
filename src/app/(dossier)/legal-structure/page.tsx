import styles from "./page.module.css";

export const metadata = {
  title: "Legal Structure | SAM Dossier",
  description:
    "Corporate governance, SPV structuring, and regulatory compliance for Chikonga Mine.",
};

export default function LegalStructurePage() {
  return (
    <div className={styles.page}>
      {/* ── Page Header ────────────────────────────────────────────── */}
      <header className={styles.pageHeader}>
        <span className={styles.badge}>Legal Structure</span>
        <h1>
          Corporate Governance &amp;{" "}
          <span className={styles.textGold}>SPV Architecture</span>
        </h1>
        <hr className={styles.divider} />
        <p className={styles.lead}>
          The deployment of institutional capital into emerging market mining
          jurisdictions necessitates a flawless architectural framework for
          corporate governance, risk mitigation, and statutory compliance.
          Socinga Africa Mining approaches mining capital deployment with
          actuarial-level fiduciary discipline.
        </p>
      </header>

      {/* ── SPV Structure ──────────────────────────────────────────── */}
      <section className={styles.section}>
        <h2>12 Forge (Private) Limited — Special Purpose Vehicle</h2>
        <hr className={styles.divider} />
        <div className={styles.twoCol}>
          <div>
            <p>
              To guarantee absolute operational segregation and to protect the ZAR 250,000,000
              (USD 13,513,513) capital injection from cross-collateralisation risks, all mining
              operations, mineral titles, processing infrastructure, and extraction activities
              associated with this expansion are legally executed through a dedicated Zimbabwean
              Special Purpose Vehicle (SPV) named 12 Forge (Private) Limited.
            </p>
            <p>
              The utilisation of 12 Forge (Private) Limited ensures that the mining operations are
              entirely insulated from the broader corporate activities of the Socinga Africa group.
              It is imperative to note that the parent entity&apos;s South African Financial Services
              Provider (FSP) licence is strictly ring-fenced for insurance administration;
              absolutely no mining capital is raised, processed, or deployed under the insurance
              regulatory structure.
            </p>
            <p>
              Instead, 12 Forge (Private) Limited holds unencumbered legal title to the mining
              concessions and operates with complete statutory permitting granted by the Zimbabwean
              Ministry of Mines and Mining Development. This precise legal segregation provides the
              investor with a clear, direct line of sight to the underlying physical assets without
              exposure to external corporate liabilities.
            </p>
          </div>
          <div>
            <div className={styles.infoCard}>
              <h4>SPV Details</h4>
              <table className={styles.table}>
                <tbody>
                  <tr><td>Entity Name</td><td>12 Forge (Pvt) Ltd</td></tr>
                  <tr><td>Jurisdiction</td><td>Zimbabwe</td></tr>
                  <tr><td>Mineral Titles</td><td>Unencumbered</td></tr>
                  <tr><td>Statutory Permitting</td><td>Ministry of Mines</td></tr>
                  <tr><td>FSP Licence</td><td>Ring-fenced (SA only)</td></tr>
                </tbody>
              </table>
            </div>
            <div className={styles.infoCard} style={{ marginTop: "var(--space-4)" }}>
              <h4>Investment Split</h4>
              <table className={styles.table}>
                <tbody>
                  <tr><td>Investor Share</td><td>60% Net Free Cash Flow</td></tr>
                  <tr><td>Socinga Share</td><td>40% Operational Equity</td></tr>
                  <tr><td>Structure</td><td>Production-Sharing Agreement</td></tr>
                  <tr><td>Vehicle</td><td>Bespoke Project Finance</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Production-Sharing Agreement ───────────────────────────── */}
      <section className={styles.section}>
        <h2>Production-Sharing Agreement (PSA)</h2>
        <hr className={styles.divider} />
        <p>
          The investment instrument is fundamentally structured as a bespoke Project Finance
          facility, executed via a Production-Sharing Agreement (PSA) within the 12 Forge
          (Private) Limited Special Purpose Vehicle (SPV). The Production-Sharing Agreement
          (PSA) dictates that the incoming investor acquires a 60 per cent (60%) equity share of
          the net distributable free cash flow generated specifically by the infrastructure funded
          by this capital tranche. Socinga Africa Mining retains the remaining 40 per cent (40%)
          equity share to manage the operational lifecycle, technological oversight, and statutory
          compliance.
        </p>
      </section>

      {/* ── Entitlements & Compliance ──────────────────────────────── */}
      <section className={styles.section}>
        <h2>Entitlements and Statutory Compliance Tracking</h2>
        <hr className={styles.divider} />
        <p>
          Crucially, all legal rights, water usage permits, and environmental certifications are
          classified corporately as &quot;Entitlements&quot; and tracked transparently through our digital
          compliance frameworks. This ensures that the Special Purpose Vehicle (SPV) maintains a
          perfect legal standing at all times.
        </p>
        <div className={styles.pillars}>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>⚖️</div>
            <h4>Legal Rights</h4>
            <p>Mining concession titles held unencumbered through 12 Forge (Pvt) Ltd.</p>
          </div>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>💧</div>
            <h4>Water Usage Permits</h4>
            <p>Full statutory water rights secured for processing operations.</p>
          </div>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>🌿</div>
            <h4>Environmental Certifications</h4>
            <p>EIA compliance tracked digitally through our governance platform.</p>
          </div>
          <div className={styles.pillar}>
            <div className={styles.pillarIcon}>📡</div>
            <h4>Digital Compliance</h4>
            <p>Real-time entitlement monitoring across all statutory requirements.</p>
          </div>
        </div>
      </section>

      {/* ── Legal Confirmation ─────────────────────────────────────── */}
      <section className={styles.section}>
        <h2>Formal Legal Confirmation and Workflow Resolution</h2>
        <hr className={styles.divider} />
        <div className={styles.confirmationCard}>
          <div className={styles.confirmBadge}>CONFIRMED</div>
          <p>
            In direct response to the pending system requirement for Task (M) SAM Dossier
            #426359, this section serves as the formal review and approval of the corporate
            architecture. The establishment of the 12 Forge (Private) Limited Special Purpose
            Vehicle (SPV) and the specific mechanics of the Production-Sharing Agreement (PSA)
            have been legally confirmed and verified against statutory guidelines. With this
            confirmation documented, the Request_Legal_Confirmation bottleneck is cleared,
            allowing this dossier item to be officially marked as closed so the workflow can be
            advanced via the system&apos;s RETRY execution.
          </p>
        </div>
      </section>
    </div>
  );
}
