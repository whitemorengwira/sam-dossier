import styles from "./page.module.css";

export const metadata = {
  title: "Chikonga Mine Profile | SAM Dossier",
  description:
    "Complete mine profile, geological history, coordinates, and company documents for Chikonga Mine, Mutare.",
};

export default function ChikongaMineProfile() {
  return (
    <div className={styles.page}>
      {/* ── Visual Header ────────────────────────────────────────── */}
      <header className={styles.visualHeader}>
        <div className={styles.visualWrapper}>
          <img
            src="https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/images/chikonga-profile.png"
            alt="High-grade gold-bearing quartz rock from Chikonga Mine"
            className={styles.visualImage}
          />
          <div className={styles.visualOverlay} />
          <div className={styles.headerContent}>
            <span className="badge badge-gold">Asset Profile</span>
            <h1>
              Chikonga <span className="text-gold">Mine</span>
            </h1>
            <p className={styles.lead}>
              Manicaland&apos;s 3rd largest producer of gold, situated on a
              prolific structural corridor in Mutare, Zimbabwe.
            </p>
          </div>
        </div>
      </header>

      {/* ── Content Grid ─────────────────────────────────────────── */}
      <div className={styles.contentGrid}>
        {/* Left Column (70% Visual/Data framing) */}
        <div className={styles.dataColumn}>
          <div className="glass-card">
            <h3 className="text-gold">Asset Ownership</h3>
            <hr className="divider-gold" />
            <div className={styles.ownershipGrid}>
              <div className={styles.ownerBox}>
                <div className={styles.ownerTitle}>Operating Company</div>
                <div className={styles.ownerValue}>Hilltouch Investments (Pvt) Ltd</div>
                <div className={styles.ownerSub}>Est. 2005</div>
              </div>
              <div className={styles.ownerBox}>
                <div className={styles.ownerTitle}>Directors</div>
                <div className={styles.ownerValue}>Mr. Lufeyi Shato</div>
                <div className={styles.ownerValue}>Mrs. Joyce Kujenga</div>
                <div className={styles.ownerSub}>100% Indigenous Owned</div>
              </div>
              <div className={styles.ownerBox}>
                <div className={styles.ownerTitle}>Holding SPV</div>
                <div className={styles.ownerValue}>12 Forge (Pvt) Ltd</div>
                <div className={styles.ownerSub}>Dedicated Legal Ring-Fence</div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ marginTop: "var(--space-6)" }}>
            <h3 className="text-gold">Topographical Data</h3>
            <hr className="divider-gold" />
            <table className={styles.dataTable}>
              <tbody>
                <tr>
                  <td>Concession Area</td>
                  <td>45 Hectares (4 × 10 Ha claims)</td>
                </tr>
                <tr>
                  <td>Structural Corridor</td>
                  <td>350m wide × 800m+ length</td>
                </tr>
                <tr>
                  <td>Altitude</td>
                  <td>~1,200m ASL</td>
                </tr>
                <tr>
                  <td>Longitude</td>
                  <td>32° 36&apos; 28&quot; E</td>
                </tr>
                <tr>
                  <td>Latitude</td>
                  <td>19° 04&apos; 47&quot; S</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.visualCard} style={{ marginTop: "var(--space-6)" }}>
            <div className={styles.statCallout}>
              <div className={styles.statIcon}>📈</div>
              <div>
                <div className={styles.statCalloutValue}>25 g/t</div>
                <div className={styles.statCalloutLabel}>Peak Verified Grade (2021)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (30% Text reading) */}
        <div className={styles.textColumn}>
          <h2>Historical Context</h2>
          <p>
            The Chikonga Mine property comprises four 10-hectare registered claims. 
            All four claims are currently, or have previously been, mined on a small 
            scale for gold. The first recorded production dates back to 1959.
          </p>
          <p>
            In recent years, good and better standards of mining have been conducted 
            by Hilltouch on multiple, steeply dipping, parallel narrow reefs (shear 
            zones) stacked across a 350-metre wide and 800-metre long structural 
            corridor.
          </p>

          <h2 style={{ marginTop: "var(--space-8)" }}>Geological Grade Profile</h2>
          <p>
            Previous geological assessment reports authored by Harrison et al. (1972) 
            and Harrison (1975) documented variable gold grades during sampling 
            programmes on the various reefs. Recorded grades included 11.2 g/t, 1.6 g/t, 
            2.8 g/t, 1.9 g/t, and 7.1 g/t.
          </p>
          <p>
            Following the resumption of mining activities by Hilltouch Investments, 
            improved geological targeting has yielded significantly higher gold grades, 
            averaging <strong>15 g/t in 2019, 18 g/t in 2020, and 25 g/t in 2021</strong>.
          </p>

          <h2 style={{ marginTop: "var(--space-8)" }}>Current Operations</h2>
          <p>
            Currently operating at a production volume of 5 KG of gold per month, 
            the mine utilises traditional stamp milling combined with cyanidation. 
            The targeted investment capital of ZAR 500,000,000 (USD 29,994,000) will 
            be directly deployed to transition the operation toward a highly efficient 
            Carbon-in-Pulp (CIP) plant architecture, effectively tripling output to 
            a minimum of 15 KG per month while pushing recovery rates into the 90–95% 
            bracket.
          </p>
        </div>
      </div>
    </div>
  );
}
