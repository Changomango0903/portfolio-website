/**
 * Site configuration object containing all global site settings
 * This centralizes configuration for easy maintenance and type safety
 */
export const siteConfig = {
  // Basic site information
  name: 'Your Portfolio',
  description: 'AI/ML Engineer & Full-Stack Developer passionate about building innovative solutions that solve real-world problems.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourportfolio.com',
  
  // SEO and social media
  keywords: [
    'portfolio',
    'developer',
    'ai engineer',
    'machine learning',
    'full stack',
    'react',
    'python',
    'typescript',
    'next.js',
  ],
  
  // Open Graph image for social media sharing
  ogImage: '/og-image.png',
  
  // Author information
  author: {
    name: 'Sean Chang',
    email: 'changsean0903@gmail.com',
    url: 'https://yourportfolio.com',
    twitter: '@Changomango0903',
    github: 'https://github.com/Changomango0903',
    linkedin: 'https://linkedin.com/in/changomango',
    instagram: '@Changomango123',
  },
  
  // Navigation menu items
  navigation: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Projects',
      href: '/projects',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ],
  
  // Social media links
  social: {
    github: 'https://github.com/Changomango0903',
    linkedin: 'https://linkedin.com/in/changomango',
    twitter: 'https://twitter.com/Changomango0903',
    instagram: 'https://instagram.com/Changomango123',
    email: 'mailto:changsean0903@gmail.com',
  },
  
  // Project categories for filtering
  projectCategories: [
    {
      id: 'ml',
      name: 'Machine Learning & AI',
      description: 'Deep learning models, computer vision, NLP, and AI-powered applications',
      icon: '🧠',
      slug: 'machine-learning',
    },
    {
      id: 'software',
      name: 'Software Engineering',
      description: 'Full-stack applications, system design, and scalable software solutions',
      icon: '💻',
      slug: 'software-engineering',
    },
    {
      id: 'fintech',
      name: 'Fintech & Data',
      description: 'Financial modeling, algorithmic trading, and data-driven solutions',
      icon: '💰',
      slug: 'fintech',
    },
    {
      id: 'research',
      name: 'Research & Analysis',
      description: 'Academic research, data analysis, and experimental implementations',
      icon: '🔬',
      slug: 'research',
    },
  ],
  
  // Skill categories
  skillCategories: [
    {
      name: 'Programming Languages',
      skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C++'],
    },
    {
      name: 'Frameworks & Libraries',
      skills: ['React', 'Next.js', 'FastAPI', 'Django', 'PyTorch', 'TensorFlow'],
    },
    {
      name: 'Tools & Platforms',
      skills: ['Docker', 'AWS', 'Vercel', 'Git', 'PostgreSQL', 'MongoDB'],
    },
    {
      name: 'Specializations',
      skills: ['Machine Learning', 'Data Science', 'System Design', 'DevOps'],
    },
  ],
  
  // Contact form configuration
  contact: {
    email: 'your.email@example.com',
    location: 'Your City, Country',
    timezone: 'UTC-5',
    availability: 'Available for freelance and full-time opportunities',
  },
  
  // Analytics and tracking
  analytics: {
    google: process.env.NEXT_PUBLIC_GA_ID,
    vercel: true, // Vercel Analytics is enabled in layout
  },
  
  // Feature flags
  features: {
    blog: true,
    darkMode: true,
    contactForm: true,
    analytics: true,
    comments: false, // For blog posts
  },
} as const

// Type definitions for better TypeScript support
export type SiteConfig = typeof siteConfig
export type NavigationItem = typeof siteConfig.navigation[0]
export type ProjectCategory = typeof siteConfig.projectCategories[0]
export type SkillCategory = typeof siteConfig.skillCategories[0]