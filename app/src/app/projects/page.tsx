import type { Metadata } from 'next'
import { Suspense } from 'react'
import { siteConfig } from '@/config/site'
import ProjectsPage from '../../components/pages/projects-page'  // ← Local import

export const metadata: Metadata = {
  title: 'Projects',
  description: `Explore ${siteConfig.author.name}'s portfolio projects.`,
  openGraph: {
    title: `Projects - ${siteConfig.author.name}`,
    description: `Explore ${siteConfig.author.name}'s portfolio projects.`,
    url: `${siteConfig.url}/projects`,
  },
}

export default function ProjectsPageRoute() {
  return (
    <main>
      <Suspense fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      }>
        <ProjectsPage />
      </Suspense>
    </main>
  )
}