import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Executive Leadership | SAM Dossier",
  description: "Leadership profiles for Socinga Africa Mining and Hilltouch Investments.",
};

const LEADERS = [
  {
    name: "Lufeyi Shato",
    role: "Director, Hilltouch Investments",
    desc: "Co-founder of Hilltouch Investments. Over two decades of operational experience scaling the Chikonga Mine from artisanal works to Manicaland's 3rd largest gold producer.",
    image: "https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/images/portrait-placeholder.png",
    group: "asset",
  },
  {
    name: "Joyce Kujenga",
    role: "Director, Hilltouch Investments",
    desc: "Co-founder and strategic director of Hilltouch Investments. Manages internal operations, statutory compliance, and strategic growth for the Chikonga concession.",
    image: "https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/images/portrait-placeholder.png",
    group: "asset",
  },
  {
    name: "Whitemore Ngwira",
    role: "Managing Director / CEO",
    desc: "Spearheads the strategic vision and capital deployment for Socinga Africa Mining. Lead architect of the Chikonga structural investment and digital operational twin.",
    image: "https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/images/portrait-placeholder.png",
    group: "executive",
  },
  {
    name: "Patience Ngwira",
    role: "Chief Financial Officer (CFO)",
    desc: "Controls all financial instruments, tranche releases, and compliance. Ensures rigorous King V corporate governance and strict segregation of duties across the SPV.",
    image: "https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/images/portrait-placeholder.png",
    group: "executive",
  },
  {
    name: "Olwethu Mlokoti",
    role: "Head of Logistics & Pre-Production",
    desc: "Directs physical mobilisation, cross-border logistics, and operational setup between the Johannesburg corporate office and the Mutare asset site.",
    image: "https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/images/portrait-placeholder.png",
    group: "operations",
  },
  {
    name: "Shingirai",
    role: "Technical & Geological Liaison",
    desc: "Coordinates the independent SAMREC-compliant Competent Person's Report (CPR) and oversees CIP plant specification, sourcing, and commissioning.",
    image: "https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/images/portrait-placeholder.png",
    group: "operations",
  },
];

export default function TeamPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span className="badge badge-gold">Leadership</span>
        <h1>
          Executive <span className="text-gold">Committee</span>
        </h1>
        <p className={styles.lead}>
          The unified leadership structure driving the Chikonga Mine expansion. 
          Combining decades of on-the-ground Zimbabwean mining expertise with 
          institutional-grade capital management from Johannesburg.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Asset Proprietors (Hilltouch Investments)</h2>
        <hr className="divider-gold" />
        <div className={styles.grid}>
          {LEADERS.filter(l => l.group === "asset").map(leader => (
            <div key={leader.name} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={leader.image} alt={leader.name} className={styles.image} />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.content}>
                <h3>{leader.name}</h3>
                <div className={styles.role}>{leader.role}</div>
                <p className={styles.desc}>{leader.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Socinga Africa Executive Board</h2>
        <hr className="divider-gold" />
        <div className={styles.grid}>
          {LEADERS.filter(l => l.group === "executive").map(leader => (
            <div key={leader.name} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={leader.image} alt={leader.name} className={styles.image} />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.content}>
                <h3>{leader.name}</h3>
                <div className={styles.role}>{leader.role}</div>
                <p className={styles.desc}>{leader.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Technical & Operations Directorate</h2>
        <hr className="divider-gold" />
        <div className={styles.grid}>
          {LEADERS.filter(l => l.group === "operations").map(leader => (
            <div key={leader.name} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={leader.image} alt={leader.name} className={styles.image} />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.content}>
                <h3>{leader.name}</h3>
                <div className={styles.role}>{leader.role}</div>
                <p className={styles.desc}>{leader.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.footerSection}>
        <div className="glass-card">
          <h4 className="text-gold">Corporate Organogram Note</h4>
          <p style={{ marginTop: "var(--space-2)", fontSize: "var(--fs-sm)", color: "var(--smoke)" }}>
            In accordance with the 30 April 2026 meeting resolutions, the Board of Directors 
            acts as the Executive Authority in the highest decision-making capacity. The Chief 
            Financial Officer maintains sovereign control over financial instruments. Refer to 
            the <Link href="/regulatory" className="text-gold" style={{textDecoration:"underline"}}>Governance & Compliance</Link> section 
            for detailed segregation of duties.
          </p>
        </div>
      </section>
    </div>
  );
}
