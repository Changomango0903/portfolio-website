/**
 * Site configuration object containing all global site settings
 * This centralizes configuration for easy maintenance and type safety
 */
export const siteConfig = {
  // Basic site information
  name: 'Sean\'s Portfolio',
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
    name: 'Sean Chang',
    email: 'changomango@example.com',
    url: 'https://changomango-portfolio.vercel.app',
    twitter: '@Changomango0903',
    github: 'https://github.com/Changomango0903',
    linkedin: 'https://linkedin.com/in/changomango',
    instagram: 'https://instagram.com/Changomango123',
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
    email: 'mailto:changomango@example.com',
    instagram: 'https://instagram.com/Changomango123',
  },
  
  // Project categories for filtering - ENHANCED with filters
  projectCategories: [
    {
      id: 'ml',
      name: 'Machine Learning & AI',
      description: 'Deep learning models, computer vision, NLP, and AI-powered applications that solve real-world problems.',
      icon: '🧠',
      slug: 'machine-learning',
      filters: ['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'AWS', 'CUDA'],
    },
    {
      id: 'software',
      name: 'Software Engineering',
      description: 'Full-stack applications, system design, and scalable software solutions with clean architecture.',
      icon: '💻',
      slug: 'software-engineering',
      filters: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
    },
    {
      id: 'fintech',
      name: 'Fintech & Data',
      description: 'Financial modeling, algorithmic trading, risk analysis, and data-driven investment strategies.',
      icon: '💰',
      slug: 'fintech',
      filters: ['Python', 'Pandas', 'NumPy', 'PostgreSQL', 'Redis', 'WebSocket'],
    },
    {
      id: 'research',
      name: 'Research & Analysis',
      description: 'Academic research projects, data analysis, and experimental implementations of cutting-edge algorithms.',
      icon: '🔬',
      slug: 'research',
      filters: ['Python', 'R', 'Jupyter', 'Matplotlib', 'Seaborn', 'LaTeX'],
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

// ===== PROJECT DATA SECTION =====
// This section adds project data to the existing site config

/**
 * Project interface definition
 */
export interface Project {
  id: string
  title: string
  description: string
  category: 'ml' | 'software' | 'fintech' | 'research'
  featured: boolean
  techStack: string[]
  links: {
    github?: string
    demo?: string
    paper?: string
    docs?: string
  }
  image: string
  status: 'completed' | 'in-progress' | 'research' | 'planning'
  metrics?: {
    label: string
    value: string
  }[]
  date: string
}

/**
 * Projects data - centralized with site configuration
 * In a real application, this would be fetched from a CMS, database, or API
 */
export const projects: Project[] = [
  {
    id: '1',
    title: 'Neural Style Transfer',
    description: 'A deep learning application that transfers artistic styles between images using convolutional neural networks. Implemented custom loss functions and optimization techniques for high-quality results.',
    category: 'ml',
    featured: true,
    techStack: ['Python', 'PyTorch', 'OpenCV', 'FastAPI'],
    links: {
      github: `${siteConfig.social.github}/neural-style-transfer`,
      demo: 'https://demo.example.com',
      paper: 'https://arxiv.org/abs/example'
    },
    image: '/projects/neural-style.jpg',
    status: 'completed',
    metrics: [
      { label: 'Style Accuracy', value: '95%' },
      { label: 'Processing Time', value: '2.3s' },
      { label: 'Max Resolution', value: '512px' }
    ],
    date: '2024-03-15'
  },
  {
    id: '2',
    title: 'Sentiment Analysis API',
    description: 'REST API for real-time sentiment analysis using BERT transformers. Handles 1000+ requests/second with 94% accuracy on social media text.',
    category: 'ml',
    featured: false,
    techStack: ['Python', 'TensorFlow', 'BERT', 'Docker'],
    links: {
      github: `${siteConfig.social.github}/sentiment-api`,
      docs: 'https://api-docs.example.com'
    },
    image: '/projects/sentiment-api.jpg',
    status: 'completed',
    date: '2024-02-20'
  },
  {
    id: '3',
    title: 'Real-time Object Detection',
    description: 'Custom YOLO implementation for detecting objects in live video streams. Optimized for edge devices with 30+ FPS performance.',
    category: 'ml',
    featured: false,
    techStack: ['Python', 'PyTorch', 'OpenCV', 'CUDA'],
    links: {
      github: `${siteConfig.social.github}/object-detection`,
      demo: 'https://demo-video.example.com'
    },
    image: '/projects/object-detection.jpg',
    status: 'in-progress',
    date: '2024-01-10'
  },
  {
    id: '4',
    title: 'Full-stack E-commerce Platform',
    description: 'Modern e-commerce solution with microservices architecture, real-time inventory, and advanced analytics dashboard.',
    category: 'software',
    featured: true,
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    links: {
      github: `${siteConfig.social.github}/ecommerce-platform`,
      demo: 'https://shop.example.com'
    },
    image: '/projects/ecommerce.jpg',
    status: 'completed',
    date: '2024-04-05'
  },
  {
    id: '5',
    title: 'Portfolio Optimization Tool',
    description: 'Algorithmic trading platform with portfolio optimization and risk analysis using modern portfolio theory.',
    category: 'fintech',
    featured: true,
    techStack: ['Python', 'Pandas', 'NumPy', 'Plotly', 'FastAPI'],
    links: {
      github: `${siteConfig.social.github}/portfolio-optimizer`
    },
    image: '/projects/portfolio-optimizer.jpg',
    status: 'in-progress',
    date: '2024-03-01'
  },
  {
    id: '6',
    title: 'Crypto Trading Bot',
    description: 'Automated cryptocurrency trading bot with machine learning prediction models and risk management.',
    category: 'fintech',
    featured: false,
    techStack: ['Python', 'Pandas', 'scikit-learn', 'WebSocket', 'Redis'],
    links: {
      github: `${siteConfig.social.github}/crypto-bot`
    },
    image: '/projects/crypto-bot.jpg',
    status: 'research',
    date: '2024-01-20'
  },
  {
    id: '7',
    title: 'Distributed Task Scheduler',
    description: 'Scalable task scheduling system with queue management, worker orchestration, and real-time monitoring.',
    category: 'software',
    featured: false,
    techStack: ['Node.js', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes'],
    links: {
      github: `${siteConfig.social.github}/task-scheduler`,
      docs: 'https://docs.example.com'
    },
    image: '/projects/task-scheduler.jpg',
    status: 'completed',
    date: '2024-02-10'
  },
  {
    id: '8',
    title: 'Climate Data Analysis',
    description: 'Statistical analysis of climate patterns using machine learning for prediction and visualization of environmental trends.',
    category: 'research',
    featured: true,
    techStack: ['Python', 'Pandas', 'Matplotlib', 'Jupyter', 'scikit-learn'],
    links: {
      github: `${siteConfig.social.github}/climate-analysis`,
      paper: 'https://research.example.com/climate'
    },
    image: '/projects/climate-analysis.jpg',
    status: 'completed',
    date: '2024-01-25'
  }
]

// ===== UTILITY FUNCTIONS =====

/**
 * Get projects by category
 * @param category - Category ID to filter by
 * @returns Array of projects in the specified category
 */
export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(project => project.category === category)
}

/**
 * Get featured projects across all categories
 * @returns Array of featured projects
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured)
}

/**
 * Get projects by technology
 * @param tech - Technology to filter by
 * @returns Array of projects using the specified technology
 */
export function getProjectsByTech(tech: string): Project[] {
  return projects.filter(project => 
    project.techStack.some(t => t.toLowerCase().includes(tech.toLowerCase()))
  )
}

/**
 * Search projects by query
 * @param query - Search query string
 * @returns Array of projects matching the search query
 */
export function searchProjects(query: string): Project[] {
  const lowercaseQuery = query.toLowerCase()
  return projects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.techStack.some(tech => tech.toLowerCase().includes(lowercaseQuery))
  )
}

// Type definitions for better TypeScript support
export type SiteConfig = typeof siteConfig
export type NavigationItem = typeof siteConfig.navigation[0]
export type ProjectCategory = typeof siteConfig.projectCategories[0]
export type SkillCategory = typeof siteConfig.skillCategories[0]