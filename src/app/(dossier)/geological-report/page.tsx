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
          The fundamental viability of any mining expansion is inextricably linked to the
          quality, scale, and proven consistency of the underlying geological resource.
          The Chikonga Mine profile presents a compelling empirical case for aggressive
          capital deployment, supported by decades of historical production and recent
          high-yield assay verification.
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
                <tr><td>1972</td><td>Reef A</td><td className={styles.highlightVal}>11.2</td></tr>
                <tr><td>1972</td><td>Reef B</td><td>1.6</td></tr>
                <tr><td>1972</td><td>Reef C</td><td>2.8</td></tr>
                <tr><td>1975</td><td>Reef D</td><td>1.9</td></tr>
                <tr><td>1975</td><td>Reef E</td><td className={styles.highlightVal}>7.1</td></tr>
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
                <tr><td>2019</td><td>Hilltouch</td><td className={styles.highlightVal}>15.0</td></tr>
                <tr><td>2020</td><td>Hilltouch</td><td className={styles.highlightVal}>18.0</td></tr>
                <tr><td>2021</td><td>Hilltouch</td><td className={styles.highlightVal}>25.0</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right Text Column ─────────────────────────────────────── */}
        <div className={styles.textColumn}>
          <h2>Location and Regional Geology</h2>
          <p>
            The Chikonga Mine is strategically located exactly 20 kilometres (km) from the
            Mutare Central Business District (CBD) in Manicaland, Zimbabwe. The asset sits on a
            sprawling 45-hectare footprint comprising four distinctly registered claims, each
            covering 10 hectares. Geologically, the property is situated within the highly
            prolific Mutare Greenstone Belt.
          </p>
          <p>
            Lode gold deposits within this specific greenstone architecture are typically
            concentrated within fractures and shear zones along brittle-ductile second-order
            faults. At the Chikonga site, mining operations are presently conducted on multiple,
            steeply dipping, parallel narrow reefs. These shear zones are stacked across a
            massive structural corridor that spans approximately 350 metres in width and extends
            laterally for over 800 metres.
          </p>
          <p>
            The mineralised reefs themselves manifest as siliceous mica schist and silicified
            andesite, hosting distinct bands of fine-grained grey and black quartz heavily
            impregnated with disseminated sulphides, including pyrrhotite, pyrite, arsenopyrite,
            chalcopyrite, and native gold.
          </p>

          <h2 style={{ marginTop: "var(--space-8)" }}>Exceptional Run-of-Mine Grades and Historical Tailings</h2>
          <p>
            The primary driver of the expansion&apos;s financial feasibility is the exceptionally high
            run-of-mine grade consistently extracted from the Chikonga shear zones. Verified
            operational data demonstrates that the run-of-mine gold grades at Chikonga averaged
            15 grammes per tonne (g/t) in 2019, escalated to 18 grammes per tonne (g/t) in 2020,
            and reached an extraordinary 25 grammes per tonne (g/t) in 2021.
          </p>
          <p>
            Furthermore, a historical geological survey conducted by the Regional Geologist of
            the Geological Survey of Rhodesia in 1974 reported on an underground winze
            intersection that revealed a &quot;strong wide band of pale grey rock.&quot; Despite containing
            no visible quartz or sulphides, this wall-rock assay returned a grade of 5 grammes
            per tonne (g/t) gold. This indicates that the mineralisation extends significantly
            beyond the visible quartz veins into the surrounding host rock, presenting a vast,
            unexploited tonnage opportunity.
          </p>
          <p>
            Equally compelling is the data regarding the site&apos;s historical waste materials.
            Limited sampling of the existing tailings dumps at the Chikonga Mine indicates a
            retained average grade of 15 grammes per tonne (g/t) gold. The reprocessing of these
            15 grammes per tonne (g/t) tailings alone, fed directly into the new Carbon-in-Leach
            (CIL) plant, provides an immediate, low-cost revenue stream that bypasses the expenses
            associated with underground drilling and blasting.
          </p>

          <h2 style={{ marginTop: "var(--space-8)" }}>Data-Driven Resource Modelling</h2>
          <p>
            To align with 2026 international best practices, the expansion will heavily utilise
            Geographic Information System (GIS) tools and remote sensing data to construct 3D
            prospectivity visuals of the ore body. This integration of big data drastically
            reduces site uncertainty before precision blasting occurs, ensuring the mechanised
            stoping efficiently intercepts the 15 to 25 grammes per tonne (g/t) pay zones.
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
