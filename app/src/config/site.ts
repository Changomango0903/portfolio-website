/**
 * Site configuration object containing all global site settings
 * This centralizes configuration for easy maintenance and type safety
 */

/**
 * Blog post interface definition
 * Follows similar pattern to Project interface for consistency
 */
export interface BlogPost {
  id: string
  title: string
  description: string
  content: string
  author: string
  publishDate: string
  readTime: number // minutes
  tags: string[]
  category: 'technical' | 'personal' | 'projects' | 'tutorials'
  featured: boolean
  image: string
  slug: string
}

/**
 * Blog category interface definition
 */
export interface BlogCategory {
  id: string
  name: string
  description: string
  icon: string
  count: number
}

/**
 * Blog categories configuration - matches existing projectCategories pattern
 */
export const blogCategories: BlogCategory[] = [
  {
    id: 'technical',
    name: 'Technical Deep Dives',
    description: 'In-depth technical articles about algorithms, architectures, and engineering solutions.',
    icon: '⚙️',
    count: 12
  },
  {
    id: 'personal',
    name: 'Personal Journey',
    description: 'Reflections on my learning journey, experiences, and growth as a developer.',
    icon: '🚀',
    count: 8
  },
  {
    id: 'projects',
    name: 'Project Stories',
    description: 'Behind-the-scenes stories and lessons learned from building real-world projects.',
    icon: '🛠️',
    count: 15
  },
  {
    id: 'tutorials',
    name: 'Tutorials & Guides',
    description: 'Step-by-step tutorials and practical guides for developers and students.',
    icon: '📚',
    count: 10
  }
]

/**
 * Available blog tags - extracted from all blog posts
 */
export const blogTags = [
  'PyTorch', 'React', 'Python', 'TypeScript', 'Next.js', 'Machine Learning',
  'Deep Learning', 'Computer Vision', 'WebSocket', 'PostgreSQL', 'System Design',
  'Performance', 'Trading', 'Finance', 'Tutorial', 'Design', 'Portfolio',
  'Personal Growth', 'Student Life', 'JavaScript', 'Pandas', 'Optimization',
  'BERT', 'Docker', 'Node.js', 'API', 'TensorFlow', 'OpenCV', 'FastAPI'
] as const


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
  // Blog configuration - add this section to the existing siteConfig object
  blog: {
    enabled: true,
    postsPerPage: 6,
    categories: blogCategories,
    tags: blogTags,
    featuredPostsCount: 2,
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
/**
 * Mock blog posts data - centralized with site configuration
 * In a real application, this would be fetched from a CMS, database, or API
 */
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building a Neural Style Transfer Pipeline from Scratch',
    description: 'A comprehensive guide to implementing neural style transfer using PyTorch, including optimization techniques and performance considerations for high-quality artistic style transfers.',
    content: 'Full article content would be fetched from CMS or markdown files...',
    author: 'Sean Chang',
    publishDate: '2024-06-15',
    readTime: 12,
    tags: ['PyTorch', 'Computer Vision', 'Deep Learning', 'Python'],
    category: 'technical',
    featured: true,
    image: '/blog/neural-style-transfer.jpg',
    slug: 'neural-style-transfer-from-scratch'
  },
  {
    id: '2',
    title: 'My Journey into Machine Learning: Lessons from First Year',
    description: 'Reflections on my first year diving deep into machine learning, the challenges I faced, and the breakthroughs that kept me motivated throughout the learning process.',
    content: 'Full article content would be fetched from CMS or markdown files...',
    author: 'Sean Chang',
    publishDate: '2024-06-10',
    readTime: 8,
    tags: ['Machine Learning', 'Personal Growth', 'Student Life'],
    category: 'personal',
    featured: false,
    image: '/blog/ml-journey.jpg',
    slug: 'machine-learning-journey-first-year'
  },
  {
    id: '3',
    title: 'Scaling Real-time Chat: Architecture Decisions and Trade-offs',
    description: 'Deep dive into the architecture decisions behind building a scalable real-time chat application, covering WebSockets, database design, and performance optimization strategies.',
    content: 'Full article content would be fetched from CMS or markdown files...',
    author: 'Sean Chang',
    publishDate: '2024-06-05',
    readTime: 15,
    tags: ['WebSocket', 'System Design', 'PostgreSQL', 'Performance'],
    category: 'projects',
    featured: true,
    image: '/blog/chat-architecture.jpg',
    slug: 'scaling-realtime-chat-architecture'
  },
  {
    id: '4',
    title: 'Getting Started with Algorithmic Trading: A Beginner\'s Guide',
    description: 'Complete tutorial on building your first algorithmic trading bot, from market data collection to strategy implementation and comprehensive backtesting methodologies.',
    content: 'Full article content would be fetched from CMS or markdown files...',
    author: 'Sean Chang',
    publishDate: '2024-05-28',
    readTime: 20,
    tags: ['Python', 'Trading', 'Pandas', 'Finance', 'Tutorial'],
    category: 'tutorials',
    featured: false,
    image: '/blog/algo-trading-guide.jpg',
    slug: 'algorithmic-trading-beginners-guide'
  },
  {
    id: '5',
    title: 'Optimizing React Performance: Beyond the Basics',
    description: 'Advanced techniques for optimizing React applications, including code splitting strategies, memoization patterns, and effective bundle size reduction techniques.',
    content: 'Full article content would be fetched from CMS or markdown files...',
    author: 'Sean Chang',
    publishDate: '2024-05-20',
    readTime: 10,
    tags: ['React', 'Performance', 'Optimization', 'JavaScript'],
    category: 'technical',
    featured: false,
    image: '/blog/react-optimization.jpg',
    slug: 'react-performance-optimization-advanced'
  },
  {
    id: '6',
    title: 'Building a Personal Portfolio: Design Principles and Tech Stack',
    description: 'The story behind building this portfolio website, covering design decisions, technology choices, and lessons learned throughout the development process.',
    content: 'Full article content would be fetched from CMS or markdown files...',
    author: 'Sean Chang',
    publishDate: '2024-05-15',
    readTime: 7,
    tags: ['Next.js', 'Design', 'Portfolio', 'TypeScript'],
    category: 'projects',
    featured: false,
    image: '/blog/portfolio-build.jpg',
    slug: 'building-personal-portfolio-website'
  },
  {
    id: '7',
    title: 'Understanding BERT: Transformer Architecture for NLP',
    description: 'Comprehensive breakdown of BERT architecture, pre-training methodology, and practical implementation for sentiment analysis and text classification tasks.',
    content: 'Full article content would be fetched from CMS or markdown files...',
    author: 'Sean Chang',
    publishDate: '2024-05-10',
    readTime: 14,
    tags: ['BERT', 'NLP', 'TensorFlow', 'Deep Learning'],
    category: 'technical',
    featured: false,
    image: '/blog/bert-architecture.jpg',
    slug: 'understanding-bert-transformer-architecture'
  },
  {
    id: '8',
    title: 'Building APIs with FastAPI: Best Practices and Performance',
    description: 'Guide to building high-performance APIs with FastAPI, covering async patterns, database integration, authentication, and deployment strategies.',
    content: 'Full article content would be fetched from CMS or markdown files...',
    author: 'Sean Chang',
    publishDate: '2024-04-25',
    readTime: 16,
    tags: ['FastAPI', 'Python', 'API', 'Performance'],
    category: 'tutorials',
    featured: false,
    image: '/blog/fastapi-guide.jpg',
    slug: 'building-apis-fastapi-best-practices'
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