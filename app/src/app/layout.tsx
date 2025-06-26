import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { Providers } from '@/components/providers'
import { Navigation } from '@/components/layout/navigation'

import './globals.css'

// Font optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// SEO metadata
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  ],
  creator: siteConfig.author.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.author.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

/**
 * Root layout component that wraps the entire application
 * Includes global providers, fonts, analytics, and navigation
 * 
 * @param children - Child components to render
 * @returns JSX root layout structure
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      className={cn(inter.variable, 'scroll-smooth')}
      suppressHydrationWarning
    >
      <head />
      <body 
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          'selection:bg-primary/20 selection:text-primary-foreground',
          inter.className
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            {/* Skip to content link for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
            >
              Skip to main content
            </a>
            
            {/* Global navigation */}
            <Navigation />
            
            {/* Main content area */}
            <main 
              id="main-content"
              className="flex-1"
              role="main"
            >
              {children}
            </main>
          </div>
        </Providers>

        {/* Analytics and performance monitoring */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}