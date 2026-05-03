"use client";

import { useState } from "react";
import styles from "./page.module.css";

type DocStatus = "Pending Signature" | "Signed & Locked" | "Under Review";

interface Document {
  id: string;
  title: string;
  type: string;
  date: string;
  status: DocStatus;
  parties: string[];
}

const INITIAL_DOCS: Document[] = [
  {
    id: "doc1",
    title: "SOCINGA AFRICA MINING STRATEGY ADDENDUM",
    type: "Board Resolution",
    date: "03 May 2026",
    status: "Pending Signature",
    parties: ["W. Ngwira", "P. Ngwira"],
  },
  {
    id: "doc2",
    title: "Chikonga Mine Joint Venture MoU",
    type: "Legal Contract",
    date: "30 Apr 2026",
    status: "Signed & Locked",
    parties: ["Hilltouch Inv.", "12 Forge SPV"],
  },
  {
    id: "doc3",
    title: "FGR Off-Take Agreement - Tranche 1",
    type: "Compliance",
    date: "01 Jun 2026",
    status: "Under Review",
    parties: ["FGR Legal", "P. Ngwira"],
  },
  {
    id: "doc4",
    title: "SAMREC CPR Commissioning Contract",
    type: "Service Agreement",
    date: "15 May 2026",
    status: "Pending Signature",
    parties: ["Independent Geo", "Shingirai"],
  },
];

export default function DocumentVaultPage() {
  const [documents, setDocuments] = useState<Document[]>(INITIAL_DOCS);
  const [signingId, setSigningId] = useState<string | null>(null);

  const handleSign = (docId: string) => {
    setSigningId(docId);
    
    // Simulate API call for e-signature verification
    setTimeout(() => {
      setDocuments(prev => prev.map(doc => 
        doc.id === docId ? { ...doc, status: "Signed & Locked" } : doc
      ));
      setSigningId(null);
    }, 1500);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <span className="badge badge-gold">Secure Vault</span>
          <h1>E-Signature <span className="text-gold">Documents</span></h1>
          <p className={styles.lead}>Cryptographically secure document staging and execution room.</p>
        </div>
        <div className={styles.stats}>
          <div className={styles.statBox}>
            <div className={styles.statLabel}>Pending</div>
            <div className={styles.statValue}>{documents.filter(d => d.status === "Pending Signature").length}</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statLabel}>Secured</div>
            <div className={styles.statValue} style={{color: "var(--success)"}}>
              {documents.filter(d => d.status === "Signed & Locked").length}
            </div>
          </div>
        </div>
      </header>

      <div className={styles.vaultGrid}>
        {documents.map((doc) => (
          <div key={doc.id} className={`${styles.docCard} ${doc.status === "Signed & Locked" ? styles.docLocked : ""}`}>
            <div className={styles.docHeader}>
              <div className={styles.docIcon}>📄</div>
              <div className={styles.docType}>{doc.type}</div>
            </div>
            
            <h3 className={styles.docTitle}>{doc.title}</h3>
            
            <div className={styles.docMeta}>
              <div className={styles.metaItem}>
                <span>Date:</span>
                <strong>{doc.date}</strong>
              </div>
              <div className={styles.metaItem}>
                <span>Parties:</span>
                <strong>{doc.parties.join(" & ")}</strong>
              </div>
            </div>

            <div className={styles.docFooter}>
              <div className={`${styles.statusBadge} ${
                doc.status === "Pending Signature" ? styles.statusPending :
                doc.status === "Signed & Locked" ? styles.statusLocked :
                styles.statusReview
              }`}>
                {doc.status}
              </div>

              {doc.status !== "Signed & Locked" && (
                <button 
                  className={`btn ${signingId === doc.id ? "btn-outline" : "btn-gold"}`}
                  onClick={() => handleSign(doc.id)}
                  disabled={signingId !== null}
                >
                  {signingId === doc.id ? "Verifying Identity..." : "Execute E-Signature"}
                </button>
              )}
              
              {doc.status === "Signed & Locked" && (
                <div className={styles.lockedSeal}>
                  🔒 Verified
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
