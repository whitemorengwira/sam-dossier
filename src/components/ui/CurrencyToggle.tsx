"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Currency = "ZAR" | "USD";

interface CurrencyContextType {
  currency: Currency;
  toggle: () => void;
  format: (zarAmount: number) => string;
  formatBoth: (zarAmount: number) => string;
}

const RATE = 16.67; // 1 USD = 16.67 ZAR (May 2026)

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "ZAR",
  toggle: () => {},
  format: () => "",
  formatBoth: () => "",
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("ZAR");

  const toggle = () =>
    setCurrency((prev) => (prev === "ZAR" ? "USD" : "ZAR"));

  const format = (zarAmount: number): string => {
    if (currency === "ZAR") {
      return `ZAR ${zarAmount.toLocaleString("en-ZA", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`;
    }
    const usdAmount = zarAmount / RATE;
    return `USD ${usdAmount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const formatBoth = (zarAmount: number): string => {
    const usdAmount = zarAmount / RATE;
    return `ZAR ${zarAmount.toLocaleString("en-ZA", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} / USD ${usdAmount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggle, format, formatBoth }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function CurrencyToggle() {
  const { currency, toggle } = useCurrency();

  return (
    <div className="currency-toggle">
      <button
        className={currency === "ZAR" ? "active" : ""}
        onClick={() => currency !== "ZAR" && toggle()}
      >
        ZAR
      </button>
      <button
        className={currency === "USD" ? "active" : ""}
        onClick={() => currency !== "USD" && toggle()}
      >
        USD
      </button>
    </div>
  );
}
