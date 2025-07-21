import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google" // Import the Inter font
import "./globals.css"

const inter = Inter({ subsets: ["latin"] }) // Configure the Inter font

export const metadata: Metadata = {
  title: "May Bliss - Wellness App",
  description: "MayBliss is a beautifully crafted self-care app that guides you toward balance in all areas of your life. Whether you're working on your physical health, nurturing your mental clarity, or deepening your emotional well-being, MayBliss offers daily practices and tools to support your journey",
  icons: {
    icon: "/Lotus.png",}
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      {" "}
      {/* Apply the Inter font class here */}
      <body>{children}</body>
    </html>
  )
}
