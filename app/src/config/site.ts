/**
 * Site configuration object containing all global site settings
 * This centralizes configuration for easy maintenance and type safety
 */
export const siteConfig = {
  // Basic site information
  name: 'Changomango Portfolio',
  description: 'Computer Science Student & Aspiring Software Engineer passionate about AI/ML and building innovative solutions.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://changomango-portfolio.vercel.app',
  
  // SEO and social media
  keywords: [
    'portfolio',
    'computer science',
    'software engineer',
    'ai engineer',
    'machine learning',
    'python',
    'typescript',
    'react',
    'next.js',
    'student developer',
  ] as string[],
  
  // Open Graph image for social media sharing
  ogImage: '/og-image.png',
  
  // Author information
  author: {
    name: 'Changomango',
    email: 'changomango@example.com',
    url: 'https://changomango-portfolio.vercel.app',
    twitter: '@changomango',
    github: 'https://github.com/Changomango0903',
    linkedin: 'https://linkedin.com/in/changomango',
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
    twitter: 'https://twitter.com/changomango',
    email: 'mailto:changomango@example.com',
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
      skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'],
    },
    {
      name: 'Frameworks & Libraries',
      skills: ['React', 'Next.js', 'Node.js', 'Express', 'Django'],
    },
    {
      name: 'Tools & Platforms',
      skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Linux', 'VS Code'],
    },
    {
      name: 'Areas of Interest',
      skills: ['Machine Learning', 'Web Development', 'Data Structures', 'Algorithms'],
    },
  ],
  
  // Contact form configuration
  contact: {
    email: 'changomango@example.com',
    location: 'Your City, Country',
    timezone: 'UTC+/-X',
    availability: 'Available for internships and entry-level positions',
  },
  
  // Analytics and tracking
  analytics: {
    google: process.env.NEXT_PUBLIC_GA_ID,
    vercel: true,
  },
  
  // Feature flags
  features: {
    blog: true,
    darkMode: true,
    contactForm: true,
    analytics: true,
    comments: false,
  },
} as const

// Type definitions for better TypeScript support
export type SiteConfig = typeof siteConfig
export type NavigationItem = typeof siteConfig.navigation[0]
export type ProjectCategory = typeof siteConfig.projectCategories[0]
export type SkillCategory = typeof siteConfig.skillCategories[0]