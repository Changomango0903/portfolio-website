'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, Search, Grid, List, BookOpen, Tag } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { siteConfig, blogCategories, blogPosts, blogTags, type BlogPost, type BlogCategory } from '@/config/site'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/**
 * Page header component with category information
 * Reuses the same pattern as projects page header
 */
interface PageHeaderProps {
  activeCategory: BlogCategory | null
  totalPosts: number
}

const PageHeader: React.FC<PageHeaderProps> = ({ activeCategory, totalPosts }) => (
  <div className="pt-32 pb-16 text-center bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
    {/* Background grid pattern - consistent with existing design */}
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
        {activeCategory ? `${activeCategory.icon} ${activeCategory.name}` : '📝 Blog'}
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        {activeCategory 
          ? activeCategory.description 
          : `Sharing insights, tutorials, and stories from my journey in tech. ${totalPosts} articles and counting.`
        }
      </p>
    </motion.div>
  </div>
)

/**
 * Category tabs component - adapted from projects page
 */
interface CategoryTabsProps {
  categories: BlogCategory[]
  activeCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => (
  <div className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-16 z-40">
    <div className="container mx-auto px-4 py-4">
      <div className="flex gap-4 overflow-x-auto pb-2">
        <Button
          onClick={() => onCategoryChange(null)}
          variant={activeCategory === null ? "default" : "outline"}
          size="sm"
          className="whitespace-nowrap"
        >
          📝 All Posts
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            className="whitespace-nowrap flex items-center gap-2"
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
            <Badge variant="secondary" className="ml-1">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  </div>
)

/**
 * Filter controls component - reuses projects page pattern
 */
interface FilterControlsProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  availableTags: readonly string[]
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  totalResults: number
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchQuery,
  onSearchChange,
  selectedTags,
  onTagToggle,
  availableTags,
  viewMode,
  onViewModeChange,
  totalResults
}) => (
  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 mb-8">
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Search input */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>
      </div>

      {/* View toggle */}
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

    {/* Tag filters */}
    <div className="mt-6">
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter by tags:</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {totalResults} article{totalResults !== 1 ? 's' : ''} found
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => onTagToggle('all')}
          variant={selectedTags.length === 0 ? "default" : "outline"}
          size="sm"
          className="text-xs"
        >
          All
        </Button>
        {availableTags.map((tag) => (
          <Button
            key={tag}
            onClick={() => onTagToggle(tag)}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            size="sm"
            className="text-xs"
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  </div>
)

/**
 * Blog post card component - adapted from project card
 */
interface BlogPostCardProps {
  post: BlogPost
  viewMode: 'grid' | 'list'
  index: number
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, viewMode, index }) => {
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

  /**
   * Handle card click navigation
   */
  const handleCardClick = useCallback(() => {
    // Navigate to blog post detail page
    window.location.href = `/blog/${post.slug}`
  }, [post.slug])

  /**
   * Format publish date for display
   */
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }, [])

  // List view layout
  if (viewMode === 'list') {
    return (
      <motion.div variants={cardVariants}>
        <Card 
          className={cn(
            "card-hover cursor-pointer group",
            post.featured && "border-primary/50 bg-primary/5"
          )}
          onClick={handleCardClick}
        >
          <CardContent className="p-6">
            <div className="flex gap-6 items-start">
              {/* Post image placeholder */}
              <div className="w-40 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <div className="text-3xl">
                  {blogCategories.find(c => c.id === post.category)?.icon}
                </div>
                {post.featured && (
                  <div className="absolute -top-1 -right-1">
                    <Badge variant="default" className="h-6 px-2 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span className="text-xs">Featured</span>
                    </Badge>
                  </div>
                )}
                {/* Grid pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='hsl(var(--border))' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              
              {/* Post content */}
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {post.title}
                </CardTitle>
                
                <CardDescription className="mb-4 line-clamp-2">
                  {post.description}
                </CardDescription>
                
                {/* Meta information */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime} min read
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{post.tags.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Grid view layout
  return (
    <motion.div 
      variants={cardVariants}
      className={cn(
        post.featured && 'lg:col-span-2'
      )}
    >
      <Card 
        className={cn(
          "card-hover cursor-pointer group h-full",
          post.featured && "border-primary/50 bg-primary/5"
        )}
        onClick={handleCardClick}
      >
        {/* Featured badge */}
        {post.featured && (
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="default" className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              Featured
            </Badge>
          </div>
        )}
        
        {/* Post image */}
        <div className="h-48 bg-muted relative overflow-hidden rounded-t-lg">
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            {blogCategories.find(c => c.id === post.category)?.icon}
          </div>
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='hsl(var(--border))' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        {/* Post content */}
        <CardHeader>
          <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
          
          <CardDescription className="leading-relaxed line-clamp-3">
            {post.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Meta information */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishDate)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/**
 * Main Blog Page Component
 * Handles state management, filtering, and layout for the blog page
 * Reuses patterns from projects page for consistency
 */
const BlogPage: React.FC = () => {
  const searchParams = useSearchParams()
  
  // State management with proper typing
  const [activeCategory, setActiveCategory] = useState<string | null>(
    searchParams.get('category') || null
  )
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState<string>('')

  /**
   * Get current category configuration
   */
  const currentCategory = useMemo(() => 
    activeCategory ? blogCategories.find(cat => cat.id === activeCategory) || null : null, 
    [activeCategory]
  )

  /**
   * Filter posts based on category, tags, and search query
   * Uses useMemo for performance optimization
   */
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      // Category filter
      const matchesCategory = !activeCategory || post.category === activeCategory
      
      // Tag filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => post.tags.includes(tag))
      
      // Search filter
      const matchesSearch = !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesCategory && matchesTags && matchesSearch
    })
  }, [activeCategory, selectedTags, searchQuery])

  /**
   * Handle tag toggle - supports multiple tag selection
   */
  const handleTagToggle = useCallback((tag: string) => {
    if (tag === 'all') {
      setSelectedTags([])
    } else {
      setSelectedTags(prev => 
        prev.includes(tag) 
          ? prev.filter(t => t !== tag)
          : [...prev, tag]
      )
    }
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <>
      {/* Page header */}
      <PageHeader 
        activeCategory={currentCategory} 
        totalPosts={filteredPosts.length} 
      />
      
      {/* Category tabs */}
      <CategoryTabs 
        categories={blogCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter controls */}
        <FilterControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          availableTags={blogTags}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalResults={filteredPosts.length}
        />

        {/* Blog posts grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "grid gap-6 mb-8",
            viewMode === 'grid' 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          )}
        >
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <BlogPostCard
                key={post.id}
                post={post}
                viewMode={viewMode}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('')
                setSelectedTags([])
                setActiveCategory(null)
              }}
              variant="outline"
            >
              Clear all filters
            </Button>
          </motion.div>
        )}
      </div>
    </>
  )
}

export default BlogPage