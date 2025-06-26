'use client'

import { ThemeProvider } from 'next-themes'

interface ProvidersProps {
  children: React.ReactNode
}

/**
 * Global providers component that wraps the application with necessary context providers
 * Includes theme provider for dark/light mode support
 * 
 * @param children - Child components to wrap with providers
 * @returns JSX providers wrapper
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}