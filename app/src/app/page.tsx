import type { Metadata } from 'next'

import { HeroSection } from '@/components/sections/hero-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { SkillsSection } from '@/components/sections/skills-section'
import { ContactSection } from '@/components/sections/contact-section'
import { siteConfig } from '@/config/site'

// Page-specific metadata
export const metadata: Metadata = {
  title: 'Home',
  description: `${siteConfig.author.name} - ${siteConfig.description}`,
  openGraph: {
    title: `${siteConfig.author.name} - Portfolio`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
}

/**
 * Homepage component that displays the main portfolio sections
 * Includes hero, projects, skills, and contact sections
 * 
 * @returns JSX homepage structure with all main sections
 */
export default function HomePage() {
  return (
    <>
      {/* Hero section with introduction and CTA */}
      <HeroSection />
      
      {/* Featured projects and categories */}
      <ProjectsSection />
      
      {/* Technical skills and expertise */}
      <SkillsSection />
      
      {/* Contact information and form */}
      <ContactSection />
    </>
  )
}