import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Macro Pulse | US Economic Health Dashboard",
    template: "%s | Macro Pulse",
  },
  description: "Real-time US economic indicators including CPI, unemployment, GDP, Federal Funds Rate, and Treasury yields from FRED.",
  keywords: ["economics", "GDP", "CPI", "unemployment", "federal reserve", "treasury yields", "FRED"],
  authors: [{ name: "Macro Pulse" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://macropulse.app",
    siteName: "Macro Pulse",
    title: "Macro Pulse | US Economic Health Dashboard",
    description: "Real-time US economic indicators from FRED",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Macro Pulse Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Macro Pulse | US Economic Health Dashboard",
    description: "Real-time US economic indicators from FRED",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}>
        {children}
      </body>
    </html>
  )
}
