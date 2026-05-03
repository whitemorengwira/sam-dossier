"use client";

import { useState } from "react";
import { useCurrency } from "@/components/ui/CurrencyToggle";

const BASE_INVESTMENT = 500000000; // ZAR 500M
const SPOT_PRICE_USD = 4615; // USD spot price May 2026

export default function ROICalculator() {
  const { format, currency } = useCurrency();
  
  const [productionTarget, setProductionTarget] = useState(15); // KG per month
  const [goldPriceDisc, setGoldPriceDisc] = useState(0); // discount % from spot
  const [recoveryRate, setRecoveryRate] = useState(90); // %

  // Calculations
  const troyOzPerKg = 32.1507;
  const targetTroyOz = productionTarget * troyOzPerKg;
  const effectiveRecovery = recoveryRate / 100;
  
  const actualGoldPrice = SPOT_PRICE_USD * (1 - goldPriceDisc / 100);
  const monthlyRevenueUSD = targetTroyOz * effectiveRecovery * actualGoldPrice;
  const monthlyRevenueZAR = monthlyRevenueUSD * 16.67;
  
  const annualRevenueUSD = monthlyRevenueUSD * 12;
  const annualRevenueZAR = monthlyRevenueZAR * 12;

  const currentRevenue = currency === "ZAR" ? annualRevenueZAR : annualRevenueUSD;
  const initialInvestment = currency === "ZAR" ? BASE_INVESTMENT : BASE_INVESTMENT / 16.67;
  
  // Very simplified assumptions for OPEX (e.g., 40% of revenue) to calculate ROI
  const opexMargin = 0.40;
  const annualProfit = currentRevenue * (1 - opexMargin);
  const paybackPeriodMonths = (initialInvestment / (annualProfit / 12)).toFixed(1);

  return (
    <div style={{ background: "var(--black-700)", padding: "var(--space-6)", borderRadius: "var(--radius-lg)", border: "1px solid var(--white-05)" }}>
      <h3 style={{ marginBottom: "var(--space-4)" }}>Interactive ROI Simulator</h3>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)", marginBottom: "var(--space-6)" }}>
        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div>
            <label style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-sm)", color: "var(--smoke)", marginBottom: "var(--space-2)" }}>
              <span>Target Production (KG/month)</span>
              <span style={{ color: "var(--gold-400)", fontWeight: "bold" }}>{productionTarget} KG</span>
            </label>
            <input 
              type="range" 
              min="5" max="30" step="1" 
              value={productionTarget} 
              onChange={(e) => setProductionTarget(Number(e.target.value))} 
              style={{ width: "100%", accentColor: "var(--gold-400)" }}
            />
          </div>
          
          <div>
            <label style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-sm)", color: "var(--smoke)", marginBottom: "var(--space-2)" }}>
              <span>Gold Price Discount from Spot (%)</span>
              <span style={{ color: "var(--gold-400)", fontWeight: "bold" }}>{goldPriceDisc}%</span>
            </label>
            <input 
              type="range" 
              min="0" max="40" step="1" 
              value={goldPriceDisc} 
              onChange={(e) => setGoldPriceDisc(Number(e.target.value))} 
              style={{ width: "100%", accentColor: "var(--gold-400)" }}
            />
            <div style={{ fontSize: "var(--fs-xs)", color: "var(--ash)", marginTop: "var(--space-1)" }}>
              Effective Price: USD {actualGoldPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })} / oz
            </div>
          </div>

          <div>
            <label style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--fs-sm)", color: "var(--smoke)", marginBottom: "var(--space-2)" }}>
              <span>CIP Plant Recovery Rate (%)</span>
              <span style={{ color: "var(--gold-400)", fontWeight: "bold" }}>{recoveryRate}%</span>
            </label>
            <input 
              type="range" 
              min="70" max="98" step="1" 
              value={recoveryRate} 
              onChange={(e) => setRecoveryRate(Number(e.target.value))} 
              style={{ width: "100%", accentColor: "var(--gold-400)" }}
            />
          </div>
        </div>

        {/* Outputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div style={{ background: "rgba(0,0,0,0.3)", padding: "var(--space-4)", borderRadius: "var(--radius-md)" }}>
            <div style={{ fontSize: "var(--fs-xs)", color: "var(--smoke)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Projected Annual Revenue</div>
            <div style={{ fontSize: "var(--fs-3xl)", fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--white)" }}>
              {format(currency === "ZAR" ? annualRevenueZAR : annualRevenueUSD)}
            </div>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
            <div style={{ background: "rgba(0,0,0,0.3)", padding: "var(--space-3)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: "var(--fs-xs)", color: "var(--smoke)", textTransform: "uppercase" }}>Capital Recovery</div>
              <div style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--success)" }}>{paybackPeriodMonths} Months</div>
            </div>
            <div style={{ background: "rgba(0,0,0,0.3)", padding: "var(--space-3)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: "var(--fs-xs)", color: "var(--smoke)", textTransform: "uppercase" }}>Monthly Profit (Est.)</div>
              <div style={{ fontSize: "var(--fs-lg)", fontWeight: 700, color: "var(--gold-400)" }}>
                {format(currency === "ZAR" ? (annualProfit / 12) : (annualProfit / 12))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ fontSize: "var(--fs-xs)", color: "var(--ash)", textAlign: "center", borderTop: "1px solid var(--white-10)", paddingTop: "var(--space-3)" }}>
        *Projections based on May 2026 spot price of USD 4,615/oz. Operating expense (OPEX) margin assumed at 40% for indicative capital recovery calculations.
      </div>
    </div>
  );
}
