import { getGlobalAssetUrl } from "@/lib/getGlobalAssetUrl";
import styles from "./page.module.css";

export const metadata = {
  title: "Geological Report | SAM Dossier",
  description:
    "Mineralisation data, assay results, structural corridor analysis, and independent sampling reports for the Chikonga Mine.",
};

export default function GeologicalReport() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span className="badge badge-gold">Technical Data</span>
        <h1>
          Geological <span className="text-gold">Report</span>
        </h1>
        <p className={styles.lead}>
          Comprehensive assay results, mineralisation style analysis, and historical 
          drilling data verifying the high-yield structural corridor at Chikonga.
        </p>
      </header>

      {/* ── Visual Section ────────────────────────────────────────── */}
      <section className={styles.visualSection}>
        <div className={styles.imageWrapper}>
          <img 
            src={getGlobalAssetUrl("sam-dossier/public/images/geology-core.png")} 
            alt="High-grade gold quartz core sample"
            className={styles.coreImage}
          />
          <div className={styles.imageOverlay} />
          <div className={styles.imageCaption}>
            <strong>FIG 1.0</strong> — Mineralised quartz vein displaying visible gold within the primary shear zone.
          </div>
        </div>
      </section>

      <section className={styles.contentGrid}>
        {/* ── Left Data Column ──────────────────────────────────────── */}
        <div className={styles.dataColumn}>
          <div className="glass-card">
            <h3 className="text-gold">Structural Corridor</h3>
            <hr className="divider-gold" />
            <div className={styles.statList}>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Corridor Width</div>
                <div className={styles.statValue}>350 metres</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Strike Length</div>
                <div className={styles.statValue}>800+ metres</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Reef Type</div>
                <div className={styles.statValue}>Parallel Narrow Reefs</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>Dip Geometry</div>
                <div className={styles.statValue}>Steeply Dipping</div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ marginTop: "var(--space-6)" }}>
            <h3 className="text-gold">Historical Assay (Harrison)</h3>
            <hr className="divider-gold" />
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Zone</th>
                  <th>Grade (g/t)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1972</td>
                  <td>Reef A</td>
                  <td className={styles.highlightVal}>11.2</td>
                </tr>
                <tr>
                  <td>1972</td>
                  <td>Reef B</td>
                  <td>1.6</td>
                </tr>
                <tr>
                  <td>1972</td>
                  <td>Reef C</td>
                  <td>2.8</td>
                </tr>
                <tr>
                  <td>1975</td>
                  <td>Reef D</td>
                  <td>1.9</td>
                </tr>
                <tr>
                  <td>1975</td>
                  <td>Reef E</td>
                  <td className={styles.highlightVal}>7.1</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="glass-card" style={{ marginTop: "var(--space-6)" }}>
            <h3 className="text-gold">Recent Production Assay</h3>
            <hr className="divider-gold" />
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Operator</th>
                  <th>Avg Grade (g/t)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2019</td>
                  <td>Hilltouch</td>
                  <td className={styles.highlightVal}>15.0</td>
                </tr>
                <tr>
                  <td>2020</td>
                  <td>Hilltouch</td>
                  <td className={styles.highlightVal}>18.0</td>
                </tr>
                <tr>
                  <td>2021</td>
                  <td>Hilltouch</td>
                  <td className={styles.highlightVal}>25.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right Text Column ─────────────────────────────────────── */}
        <div className={styles.textColumn}>
          <h2>Mineralisation Style</h2>
          <p>
            The Chikonga Mine operates on a well-defined structural corridor characterised 
            by steeply dipping, parallel narrow reefs. The primary mineralisation is hosted 
            within shear zones that cut across the local stratigraphy. Gold is predominantly 
            associated with quartz veining, exhibiting both free-milling characteristics 
            and varying degrees of sulphide association.
          </p>

          <h2 style={{ marginTop: "var(--space-8)" }}>Geological Interpretation</h2>
          <p>
            Extensive trenching and sampling over the 45-hectare concession have 
            confirmed the continuity of the auriferous structures over a strike length 
            exceeding 800 metres. The shear zones are stacked across a 350-metre wide 
            corridor, providing multiple parallel targets for extraction from a single 
            primary decline or vertical shaft infrastructure.
          </p>
          <p>
            Historical reports by Harrison (1972, 1975) established the baseline potential, 
            but recent precision mining by Hilltouch Investments has exposed significantly 
            higher-grade shoots. The progression from 15 g/t (2019) to 25 g/t (2021) 
            indicates that deeper operations are intersecting the enriched supergene zone 
            or primary feeder structures.
          </p>

          <h2 style={{ marginTop: "var(--space-8)" }}>SAMREC CPR Mandate</h2>
          <p>
            As part of Tranche 1 capital deployment, an independent geological consultancy 
            has been commissioned to produce a comprehensive SAMREC-compliant 
            (South African Code for the Reporting of Exploration Results, Mineral 
            Resources and Mineral Reserves) Competent Person&apos;s Report (CPR).
          </p>
          <p>
            This report will upgrade the current <em>Inferred</em> resources into the 
            <em>Indicated</em> and <em>Measured</em> categories, mathematically verifying 
            the life-of-mine (LOM) at the projected 15+ KG/month extraction rate.
          </p>

          <div className={styles.infoAlert}>
            <span className={styles.alertIcon}>ℹ️</span>
            <div>
              <strong>Note on Meng Xi Prospects:</strong>
              <p style={{ marginBottom: 0, fontSize: "var(--fs-sm)" }}>
                The technical parameters applied at Chikonga are derived from the same 
                geological methodologies utilised in the Meng Xi Trenching and Sampling 
                reports, ensuring institutional-grade data integrity across the Socinga 
                portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
