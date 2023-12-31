"use client"
import { ThemeProvider } from "next-themes"
import { useEffect, useState } from "react"
import ReduxProvider from "./ReduxProvider"

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider enableSystem={false} attribute="class">
      <ReduxProvider>{children}</ReduxProvider>
    </ThemeProvider>
  )
}

export default Providers
