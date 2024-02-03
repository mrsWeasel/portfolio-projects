import "../styles/globals.css"
import { redHatText } from "@/services/fonts"

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
