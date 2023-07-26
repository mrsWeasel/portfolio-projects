import "../styles/globals.css"
import { Red_Hat_Text } from "next/font/google"

const redHatText = Red_Hat_Text({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata = {
  title: "Laura Heino | Projects",
  description: "Fun coding projects",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={redHatText.className}>{children}</body>
    </html>
  )
}
