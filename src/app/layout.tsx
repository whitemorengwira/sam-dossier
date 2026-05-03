import type { Metadata } from "next";
import { CurrencyProvider } from "@/components/ui/CurrencyToggle";
import AIChatSidebar from "@/components/ui/AIChatSidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAM Dossier | Socinga Africa Mining — Investment Dossier",
  description:
    "Institutional-Grade Mining Investment Dossier for Chikonga Mine, Zimbabwe. Socinga Africa Mining deploys secured capital into de-risked, high-yield mineral assets across the African continent.",
  keywords: [
    "Socinga Africa Mining",
    "Chikonga Mine",
    "Gold Mining Zimbabwe",
    "Investment Dossier",
    "Mining Investment",
    "SAM Dossier",
  ],
  openGraph: {
    title: "SAM Dossier | Socinga Africa Mining",
    description:
      "Institutional-Grade Mining Investment Dossier — Chikonga Mine, Mutare, Zimbabwe",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>
        <CurrencyProvider>
          {children}
          <AIChatSidebar />
        </CurrencyProvider>
      </body>
    </html>
  );
}
