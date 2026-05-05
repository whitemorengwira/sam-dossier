import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Socinga Africa Mining | Investment Dossier',
  description:
    'Institutional-Grade Mining Investment Dossier for Chikonga Mine, Zimbabwe. Socinga Africa Mining deploys secured capital into de-risked, high-yield mineral assets across the African continent.',
  keywords: [
    'Socinga Africa Mining',
    'Chikonga Mine',
    'Gold Mining Zimbabwe',
    'Investment Dossier',
    'Mining Investment',
    'SAM Dossier',
  ],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Socinga Africa Mining | Investment Dossier',
    description:
      'Institutional-Grade Mining Investment Dossier - Chikonga Mine, Mutare, Zimbabwe',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Socinga Africa Mining - Investment Dossier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Socinga Africa Mining | Investment Dossier',
    description:
      'Institutional-Grade Mining Investment Dossier - Chikonga Mine, Mutare, Zimbabwe',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Cormorant+Garamond:ital,wght@0,600;1,600&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
