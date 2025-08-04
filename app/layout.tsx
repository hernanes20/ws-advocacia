import type { Metadata } from 'next'
import './globals.css'
import CookieBanner from "@/components/cookie-banner"

export const metadata: Metadata = {
  title: 'Ws Advocacia',
  description: 'Site institucional Ws Advocacia',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/wpplogo.png" />
        <link rel="icon" href="/logoaba.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/logoaba.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/logoaba.png" sizes="512x512" type="image/png" />
        <link rel="icon" href="/logoaba.ico" sizes="any" />
      </head>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
