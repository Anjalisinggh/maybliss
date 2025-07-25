import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google" // Import fonts
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-playfair"
})

export const metadata: Metadata = {
  title: "May Bliss - Wellness App",
  description:
    "MayBliss is a beautifully crafted self-care app that guides you toward balance in all areas of your life. Whether you're working on your physical health, nurturing your mental clarity, or deepening your emotional well-being, MayBliss offers daily practices and tools to support your journey.",
  icons: {
    icon: "/Lotus.png"
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
