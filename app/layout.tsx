import "@/styles/globals.css"
import { Inter } from "next/font/google"
import Providers from "@/components/Providers"
const inter = Inter({ subsets: ["latin"] })
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: "Notes App",
  description: "Created my Leon Seet",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
