"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function MineSimulator() {
  const [activeStage, setActiveStage] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [metrics, setMetrics] = useState({
    oreExtracted: 0,
    milledOre: 0,
    recoveryRate: 92,
    goldProduced: 0,
    revenue: 0,
  });

  const GOLD_PRICE_ZAR = 4615 * 16.67;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 4);
      
      setMetrics(prev => {
        const newOre = prev.oreExtracted + 2.5; // tons
        const newMilled = prev.milledOre + 2.4; // tons
        // 15g/t grade average
        const newGold = prev.goldProduced + (2.4 * 15) / 1000; // KG
        
        return {
          ...prev,
          oreExtracted: newOre,
          milledOre: newMilled,
          goldProduced: newGold,
          revenue: newGold * (GOLD_PRICE_ZAR / 32.15) * 1000, // Roughly converting kg to oz to ZAR
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isRunning, GOLD_PRICE_ZAR]);

  const stages = [
    {
      id: 0,
      name: "Sub-Surface Extraction",
      icon: "⛏️",
      desc: "Narrow reef shear zone mining across 4 shafts. Active blasting and hoisting.",
      status: "Active - 80m Depth",
    },
    {
      id: 1,
      name: "Crushing & Milling",
      icon: "⚙️",
      desc: "Stamp milling reducing ore to optimal micron size for cyanidation.",
      status: "Operational - 15t/hr",
    },
    {
      id: 2,
      name: "CIP Processing",
      icon: "🧪",
      desc: "Carbon-in-Pulp leaching. Target recovery 90-95%. High-pressure boilers active.",
      status: "Optimal pH 10.5",
    },
    {
      id: 3,
      name: "Refinery Off-Take",
      icon: "🏦",
      desc: "Smelted bullion delivered to Fidelity Gold Refinery (FGR). 90% USD / 10% ZiG settlement.",
      status: "Awaiting Delivery",
    }
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <span className="badge badge-gold">Digital Twin</span>
          <h1>Chikonga <span className="text-gold">Live Telemetry</span></h1>
          <p className={styles.lead}>
            IoT-enabled operational simulation of the end-to-end mining lifecycle.
          </p>
        </div>
        
        <div className={styles.controls}>
          <div className={styles.statusIndicator}>
            <span className={isRunning ? styles.pulseDotGreen : styles.pulseDotRed} />
            {isRunning ? "SYSTEM ONLINE" : "SYSTEM HALTED"}
          </div>
          <button 
            className={`btn ${isRunning ? "btn-outline" : "btn-gold"}`}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? "Halt Operations" : "Resume Operations"}
          </button>
        </div>
      </header>

      {/* ── Telemetry Dashboard ──────────────────────────────────────── */}
      <section className={styles.telemetryGrid}>
        <div className={styles.metricBox}>
          <div className={styles.metricLabel}>Ore Extracted</div>
          <div className={styles.metricValue}>{metrics.oreExtracted.toFixed(1)} <span className={styles.unit}>Tons</span></div>
        </div>
        <div className={styles.metricBox}>
          <div className={styles.metricLabel}>Milled Output</div>
          <div className={styles.metricValue}>{metrics.milledOre.toFixed(1)} <span className={styles.unit}>Tons</span></div>
        </div>
        <div className={styles.metricBox}>
          <div className={styles.metricLabel}>Avg. Recovery</div>
          <div className={styles.metricValue}>{metrics.recoveryRate}% <span className={styles.unit}>CIP</span></div>
        </div>
        <div className={styles.metricBox}>
          <div className={styles.metricLabel}>Gold Produced</div>
          <div className={styles.metricValue}>{metrics.goldProduced.toFixed(3)} <span className={styles.unit}>KG</span></div>
        </div>
        <div className={styles.metricBoxHighlight}>
          <div className={styles.metricLabel}>Est. Accrued Revenue (ZAR)</div>
          <div className={styles.metricValueHighlight}>
            R {(metrics.revenue).toLocaleString("en-ZA", { maximumFractionDigits: 0 })}
          </div>
        </div>
      </section>

      {/* ── Process Pipeline ─────────────────────────────────────────── */}
      <section className={styles.pipeline}>
        {stages.map((stage, i) => (
          <div key={stage.id} className={styles.stageWrapper}>
            <div className={`${styles.stageCard} ${activeStage === stage.id ? styles.stageActive : ''}`}>
              <div className={styles.stageHeader}>
                <div className={styles.stageIcon}>{stage.icon}</div>
                <div className={styles.stageName}>{stage.name}</div>
              </div>
              <p className={styles.stageDesc}>{stage.desc}</p>
              <div className={styles.stageStatus}>{stage.status}</div>
              
              {activeStage === stage.id && (
                <div className={styles.processingBar}>
                  <div className={styles.processingFill} />
                </div>
              )}
            </div>
            {i < stages.length - 1 && (
              <div className={`${styles.connector} ${activeStage > i ? styles.connectorActive : ''}`}>
                <div className={styles.particle} />
              </div>
            )}
          </div>
        ))}
      </section>
      
      {/* ── System Logs ──────────────────────────────────────────────── */}
      <section className={styles.logs}>
        <h3>System Logs</h3>
        <div className={styles.logWindow}>
          <div className={styles.logEntry}>
            <span className={styles.logTime}>[18:45:12]</span>
            <span className={styles.logInfo}>SYS:</span>
            <span>CIP tank pH stabilised at 10.5.</span>
          </div>
          <div className={styles.logEntry}>
            <span className={styles.logTime}>[18:42:30]</span>
            <span className={styles.logInfo}>SYS:</span>
            <span>Hoist motor 2 temperature normal.</span>
          </div>
          <div className={styles.logEntry}>
            <span className={styles.logTime}>[18:40:05]</span>
            <span className={styles.logWarning}>WARN:</span>
            <span>Crusher feed rate exceeding 15t/hr. Adjusting feeder speed.</span>
          </div>
          <div className={styles.logEntry}>
            <span className={styles.logTime}>[18:35:00]</span>
            <span className={styles.logInfo}>SYS:</span>
            <span>Shift handover complete. Team C on surface.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
