'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Search, Filter, Grid, List, Star, Clock, CheckCircle, Zap } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/**
 * Type definitions for better type safety and code organization
 */
interface Project {
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

interface CategoryConfig {
  id: string
  name: string
  description: string
  icon: string
  filters: string[]
}

/**
 * Static configuration data - in a real app, this would come from a CMS or API
 */
const CATEGORIES: CategoryConfig[] = [
  {
    id: 'ml',
    name: 'Machine Learning & AI',
    description: 'Deep learning models, computer vision, NLP, and AI-powered applications that solve real-world problems.',
    icon: '🧠',
    filters: ['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'AWS', 'CUDA']
  },
  {
    id: 'software',
    name: 'Software Engineering',
    description: 'Full-stack applications, system design, and scalable software solutions with clean architecture.',
    icon: '💻',
    filters: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    id: 'fintech',
    name: 'Fintech & Data',
    description: 'Financial modeling, algorithmic trading, risk analysis, and data-driven investment strategies.',
    icon: '💰',
    filters: ['Python', 'Pandas', 'NumPy', 'PostgreSQL', 'Redis', 'WebSocket']
  },
  {
    id: 'research',
    name: 'Research & Analysis',
    description: 'Academic research projects, data analysis, and experimental implementations of cutting-edge algorithms.',
    icon: '🔬',
    filters: ['Python', 'R', 'Jupyter', 'Matplotlib', 'Seaborn', 'LaTeX']
  }
]

/**
 * Mock project data - would typically come from an API or CMS
 */
const MOCK_PROJECTS: Project[] = [
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
  }
]

/**
 * Page header component with category information
 */
interface PageHeaderProps {
  activeCategory: CategoryConfig
}

const PageHeader: React.FC<PageHeaderProps> = ({ activeCategory }) => (
  <div className="pt-32 pb-16 text-center bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
    {/* Background grid pattern using consistent styling */}
    <div 
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='hsl(var(--border))' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
      }}
    />
    
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 container mx-auto px-4"
    >
      <h1 className="text-display mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
        {activeCategory.icon} {activeCategory.name}
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        {activeCategory.description}
      </p>
    </motion.div>
  </div>
)

/**
 * Category tabs for switching between project categories
 */
interface CategoryTabsProps {
  categories: CategoryConfig[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => (
  <div className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-16 z-40">
    <div className="container mx-auto px-4 py-4">
      <div className="flex gap-4 overflow-x-auto">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            className={cn(
              "flex items-center gap-2 whitespace-nowrap",
              activeCategory === category.id && "shadow-lg"
            )}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="font-medium">{category.name.split(' ')[0]}</span>
          </Button>
        ))}
      </div>
    </div>
  </div>
)

/**
 * Filter controls for technology tags and view options
 */
interface FilterControlsProps {
  availableFilters: string[]
  activeFilter: string
  onFilterChange: (filter: string) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

const FilterControls: React.FC<FilterControlsProps> = ({
  availableFilters,
  activeFilter,
  onFilterChange,
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange
}) => (
  <div className="bg-muted/30 border-b border-border/50">
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={cn(
                "pl-10 pr-4 py-2 bg-background border border-border rounded-lg",
                "text-foreground placeholder-muted-foreground",
                "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary",
                "w-full sm:w-64"
              )}
            />
          </div>
          
          {/* Technology Filters */}
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => onFilterChange('all')}
              variant={activeFilter === 'all' ? "default" : "outline"}
              size="sm"
            >
              All
            </Button>
            {availableFilters.map((filter) => (
              <Button
                key={filter}
                onClick={() => onFilterChange(filter.toLowerCase())}
                variant={activeFilter === filter.toLowerCase() ? "default" : "outline"}
                size="sm"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
        
        {/* View Toggle */}
        <div className="flex gap-2">
          <Button
            onClick={() => onViewModeChange('grid')}
            variant={viewMode === 'grid' ? "default" : "outline"}
            size="sm"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => onViewModeChange('list')}
            variant={viewMode === 'list' ? "default" : "outline"}
            size="sm"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
)

/**
 * Status badge component for project status
 */
interface StatusBadgeProps {
  status: Project['status']
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    completed: { 
      icon: CheckCircle, 
      text: 'Completed', 
      variant: 'default' as const
    },
    'in-progress': { 
      icon: Clock, 
      text: 'In Progress', 
      variant: 'secondary' as const
    },
    research: { 
      icon: Zap, 
      text: 'Research', 
      variant: 'outline' as const
    },
    planning: { 
      icon: Clock, 
      text: 'Planning', 
      variant: 'outline' as const
    }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="w-3 h-3" />
      {config.text}
    </Badge>
  )
}

/**
 * Project card component - displays individual project information
 */
interface ProjectCardProps {
  project: Project
  viewMode: 'grid' | 'list'
  index: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, viewMode, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }
    }
  }

  const handleCardClick = useCallback(() => {
    // Navigate to project detail page - in real app, use Next.js router
    alert(`Navigate to: ${project.title} detail page`)
  }, [project.title])

  if (viewMode === 'list') {
    return (
      <motion.div variants={cardVariants}>
        <Card 
          className={cn(
            "card-hover cursor-pointer group",
            project.featured && "border-primary/50 bg-primary/5"
          )}
          onClick={handleCardClick}
        >
          <CardContent className="p-6">
            <div className="flex gap-6 items-start">
              {/* Project Image */}
              <div className="w-32 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <div className="text-2xl">{CATEGORIES.find(c => c.id === project.category)?.icon}</div>
                {project.featured && (
                  <div className="absolute -top-1 -right-1">
                    <Badge variant="default" className="h-6 px-2">
                      <Star className="w-3 h-3" />
                    </Badge>
                  </div>
                )}
              </div>
              
              {/* Project Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <StatusBadge status={project.status} />
                </div>
                
                <CardDescription className="mb-4 line-clamp-2">
                  {project.description}
                </CardDescription>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex gap-4">
                  {project.links.github && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {project.links.demo && (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div 
      variants={cardVariants}
      className={project.featured ? 'lg:col-span-2' : ''}
    >
      <Card 
        className={cn(
          "card-hover cursor-pointer group h-full",
          project.featured && "border-primary/50 bg-primary/5"
        )}
        onClick={handleCardClick}
      >
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="default" className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </Badge>
          </div>
        )}
        
        {/* Project Image */}
        <div className="h-48 bg-muted relative overflow-hidden rounded-t-lg">
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            {CATEGORIES.find(c => c.id === project.category)?.icon}
          </div>
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='hsl(var(--border))' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        {/* Project Content */}
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <StatusBadge status={project.status} />
          </div>
          
          <CardDescription className="leading-relaxed">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Metrics for featured projects */}
          {project.featured && project.metrics && (
            <div className="flex gap-4 mb-4 p-4 bg-muted/50 rounded-lg">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-lg font-semibold text-primary">{metric.value}</div>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          )}
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          
          {/* Links */}
          <div className="flex gap-2">
            {project.links.github && (
              <Button
                variant="outline"
                size="sm"
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </Button>
            )}
            {project.links.demo && (
              <Button
                variant="default"
                size="sm"
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </a>
              </Button>
            )}
            {project.links.paper && (
              <Button
                variant="outline"
                size="sm"
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={project.links.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  📖 Paper
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/**
 * Main Projects Page Component
 * Handles state management, filtering, and layout for the projects page
 */
const ProjectsPage: React.FC = () => {
  const searchParams = useSearchParams()
  
  // State management with proper typing
  const [activeCategory, setActiveCategory] = useState<string>(
    searchParams.get('category') || 'ml'
  )
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState<string>('')

  /**
   * Get current category configuration
   */
  const currentCategory = useMemo(() => 
    CATEGORIES.find(cat => cat.id === activeCategory) || CATEGORIES[0], 
    [activeCategory]
  )

  /**
   * Filter projects based on category, tech filter, and search query
   * Uses useMemo for performance optimization
   */
  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter(project => {
      // Category filter
      const matchesCategory = project.category === activeCategory
      
      // Technology filter
      const matchesTech = activeFilter === 'all' || 
        project.techStack.some(tech => tech.toLowerCase().includes(activeFilter))
      
      // Search filter
      const matchesSearch = searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesCategory && matchesTech && matchesSearch
    }).sort((a, b) => {
      // Sort by featured status first, then by date
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [activeCategory, activeFilter, searchQuery])

  /**
   * Animation variants for the projects grid
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  /**
   * Handle category change with URL update (in real app, use Next.js router)
   */
  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId)
    setActiveFilter('all') // Reset filter when category changes
    setSearchQuery('') // Reset search when category changes
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Page Header */}
      <PageHeader activeCategory={currentCategory} />
      
      {/* Category Tabs */}
      <CategoryTabs
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      {/* Filter Controls */}
      <FilterControls
        availableFilters={currentCategory.filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activeFilter}-${searchQuery}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-6'
            )}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  viewMode={viewMode}
                  index={index}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Load More Button (for pagination in real app) */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                // In real app, load more projects from API
                alert('Load more projects - would fetch from API')
              }}
            >
              Load More Projects
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ProjectsPage