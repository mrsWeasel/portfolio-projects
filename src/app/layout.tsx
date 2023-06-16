import "../styles/globals.css"
import { Space_Mono } from "next/font/google"

// const inter = Inter({ subsets: ["latin"] })
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata = {
  title: "Laura Heino | Projects",
  description: "Fun coding projects",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={spaceMono.className}>{children}</body>
      {/* <body>{children}</body> */}
    </html>
  )
}
