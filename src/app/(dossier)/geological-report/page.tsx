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

      {/* ── Cinematic Hero ────────────────────────────────────────────── */}
      <div className={styles.heroWrapper}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Technical Data</span>
          <h1>Geological <span className={styles.textGold}>Report</span></h1>
          <p className={styles.heroLead}>
            The fundamental viability of any mining expansion is inextricably linked to the
            quality, scale, and proven consistency of the underlying geological resource.
          </p>
        </div>
        <div className={styles.heroScrim} />
      </div>

      {/* ── Original Visual Section ───────────────────────────────────── */}
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

      {/* ── Original Content Grid ─────────────────────────────────────── */}
      <section className={styles.contentGrid}>
        {/* Left Data Column */}
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

        {/* Right Text Column */}
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

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ── APPROVED DOSSIER COPY — FULL GEOLOGICAL REPORT ─────────── */}
      {/* ═══════════════════════════════════════════════════════════════ */}

      {/* ── Section: Location & Regional Geology ─────────────────────── */}
      <section className={styles.cinematicSection}>
        <div className={styles.textHalf}>
          <span className={styles.sectionLabel}>Location &amp; Regional Geology</span>
          <h2>Mutare Greenstone Belt</h2>
          <div className={styles.goldBar} />
          <p>
            The Chikonga Mine is strategically located exactly 20 kilometres (km) from the
            Mutare Central Business District (CBD) in Manicaland, Zimbabwe. The asset sits on a
            sprawling 45-hectare footprint comprising four distinctly registered claims, each
            covering 10 hectares. Geologically, the property is situated within the highly prolific
            Mutare Greenstone Belt.
          </p>
          <p>
            Lode gold deposits within this specific greenstone architecture are typically
            concentrated within fractures and shear zones along brittle-ductile second-order
            faults. At the Chikonga site, mining operations are presently conducted on multiple,
            steeply dipping, parallel narrow reefs. These shear zones are stacked across a massive
            structural corridor that spans approximately 350 metres in width and extends laterally
            for over 800 metres.
          </p>
          <p>
            The mineralised reefs themselves manifest as siliceous mica schist and silicified
            andesite, hosting distinct bands of fine-grained grey and black quartz heavily
            impregnated with disseminated sulphides, including pyrrhotite, pyrite, arsenopyrite,
            chalcopyrite, and native gold.
          </p>
        </div>
        <div className={styles.vizHalf}>
          <div className={styles.geoViz}>
            <div className={styles.geoStratum} style={{ height: "18%", background: "rgba(101,67,33,0.4)", borderColor: "rgba(101,67,33,0.5)" }}>
              <span>Surface &amp; Overburden</span>
            </div>
            <div className={styles.geoStratum} style={{ height: "22%", background: "rgba(212,175,55,0.08)", borderColor: "rgba(212,175,55,0.3)" }}>
              <span>Siliceous Mica Schist — Primary Reef Zone</span>
            </div>
            <div className={styles.geoStratum} style={{ height: "20%", background: "rgba(100,100,120,0.3)", borderColor: "rgba(150,150,180,0.2)" }}>
              <span>Silicified Andesite Host Rock</span>
            </div>
            <div className={styles.geoStratum} style={{ height: "24%", background: "rgba(212,175,55,0.15)", borderColor: "rgba(212,175,55,0.5)" }}>
              <span>⭑ High-Grade Quartz Vein — 15–25 g/t</span>
            </div>
            <div className={styles.geoStratum} style={{ height: "16%", background: "rgba(40,40,60,0.5)", borderColor: "rgba(80,80,120,0.2)" }}>
              <span>400m Decline Target — Level 3</span>
            </div>
            <div className={styles.geoDepthLabel}>↕ 400m Total Depth</div>
          </div>
        </div>
      </section>

      {/* ── Section: Exceptional Grades ──────────────────────────────── */}
      <section className={`${styles.cinematicSection} ${styles.cinematicSectionDark} ${styles.cinematicSectionReverse}`}>
        <div className={styles.vizHalf}>
          <div className={styles.gradeChart}>
            <div className={styles.gradeChartTitle}>Run-of-Mine Grade Trajectory</div>
            {[
              { year: "2019", grade: 15, max: 25, color: "rgba(212,175,55,0.5)" },
              { year: "2020", grade: 18, max: 25, color: "rgba(212,175,55,0.7)" },
              { year: "2021", grade: 25, max: 25, color: "var(--gold)" },
              { year: "Tailings", grade: 15, max: 25, color: "rgba(212,175,55,0.4)", label: "15 g/t" },
            ].map((g) => (
              <div key={g.year} className={styles.gradeRow}>
                <div className={styles.gradeYear}>{g.year}</div>
                <div className={styles.gradeBar}>
                  <div
                    className={styles.gradeBarFill}
                    style={{ width: `${(g.grade / g.max) * 100}%`, background: g.color }}
                  />
                </div>
                <div className={styles.gradeValue}>{g.grade} g/t</div>
              </div>
            ))}
            <div className={styles.gradeNote}>
              World-class ore: Global average is ~1.5 g/t
            </div>
          </div>
        </div>
        <div className={styles.textHalf}>
          <span className={styles.sectionLabel}>Exceptional Run-of-Mine Grades</span>
          <h2>Historical Tailings &amp; Grade Data</h2>
          <div className={styles.goldBar} />
          <p>
            The primary driver of the expansion&apos;s financial feasibility is the exceptionally high
            run-of-mine grade consistently extracted from the Chikonga shear zones. Verified
            operational data demonstrates that the run-of-mine gold grades at Chikonga averaged
            15 grammes per tonne (g/t) in 2019, escalated to 18 grammes per tonne (g/t) in 2020,
            and reached an extraordinary 25 grammes per tonne (g/t) in 2021.
          </p>
          <p>
            Furthermore, a historical geological survey conducted by the Regional Geologist of the
            Geological Survey of Rhodesia in 1974 reported on an underground winze intersection
            that revealed a &quot;strong wide band of pale grey rock.&quot; Despite containing no visible
            quartz or sulphides, this wall-rock assay returned a grade of 5 grammes per tonne (g/t)
            gold. This indicates that the mineralisation extends significantly beyond the visible
            quartz veins into the surrounding host rock, presenting a vast, unexploited tonnage
            opportunity.
          </p>
          <p>
            Equally compelling is the data regarding the site&apos;s historical waste materials.
            Limited sampling of the existing tailings dumps at the Chikonga Mine indicates a
            retained average grade of 15 grammes per tonne (g/t) gold. The reprocessing of these
            15 grammes per tonne (g/t) tailings alone, fed directly into the new Carbon-in-Leach
            (CIL) plant, provides an immediate, low-cost revenue stream that bypasses the expenses
            associated with underground drilling and blasting.
          </p>
        </div>
      </section>

      {/* ── Section: Data-Driven Resource Modelling ───────────────────── */}
      <section className={`${styles.fullSection}`}>
        <div className={styles.fullSectionInner}>
          <span className={styles.sectionLabel}>Data-Driven Resource Modelling</span>
          <h2>GIS Integration &amp; 3D Prospectivity</h2>
          <div className={styles.goldBar} />
          <p className={styles.fullSectionLead}>
            To align with 2026 international best practices, the expansion will heavily utilise
            Geographic Information System (GIS) tools and remote sensing data to construct 3D
            prospectivity visuals of the ore body. This integration of big data drastically reduces
            site uncertainty before precision blasting occurs, ensuring the mechanised stoping
            efficiently intercepts the 15 to 25 grammes per tonne (g/t) pay zones.
          </p>
          <div className={styles.techGrid}>
            {[
              { icon: "🛰️", title: "Remote Sensing Data", desc: "Satellite and aerial imaging for structural corridor mapping and fault identification across the 45-hectare footprint." },
              { icon: "📐", title: "3D Prospectivity Modelling", desc: "GIS-constructed volumetric models of the ore body reduce drill uncertainty and optimise stope placement." },
              { icon: "💡", title: "Precision Blast Engineering", desc: "Data-driven drill-and-blast patterns ensure maximum interception of 15–25 g/t pay zones with minimal dilution." },
              { icon: "📡", title: "Real-Time Ore Tracking", desc: "IoT-connected ore tracking from face to mill, eliminating grade loss and capital leakage through the circuit." },
            ].map((t) => (
              <div key={t.title} className={styles.techCard}>
                <div className={styles.techIcon}>{t.icon}</div>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
