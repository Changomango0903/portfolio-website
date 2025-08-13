import type { Metadata } from 'next'
import { Suspense } from 'react'
import { siteConfig } from '@/config/site'
import BlogPage from '../../components/pages/blog-page'

/**
 * Metadata configuration for the blog page
 * Follows the same pattern as projects page
 */
export const metadata: Metadata = {
  title: 'Blog',
  description: `Read ${siteConfig.author.name}'s latest articles on machine learning, software engineering, and tech insights.`,
  openGraph: {
    title: `Blog - ${siteConfig.author.name}`,
    description: `Read ${siteConfig.author.name}'s latest articles on machine learning, software engineering, and tech insights.`,
    url: `${siteConfig.url}/blog`,
  },
}

/**
 * Loading component for blog page
 * Provides visual feedback while content loads
 */
const BlogLoadingFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading blog posts...</p>
    </div>
  </div>
)

/**
 * Blog page route component
 * Wraps the BlogPage component with proper metadata and suspense
 * 
 * @returns JSX blog page route structure
 */
export default function BlogPageRoute() {
  return (
    <main>
      <Suspense fallback={<BlogLoadingFallback />}>
        <BlogPage />
      </Suspense>
    </main>
  )
}