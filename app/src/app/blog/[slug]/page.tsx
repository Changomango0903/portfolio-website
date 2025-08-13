import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { siteConfig, blogPosts, blogCategories, type BlogPost } from '@/config/site'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/**
 * Generate static params for all blog posts
 * Enables static generation for better performance
 */
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

/**
 * Generate metadata for individual blog posts
 * Provides proper SEO and social media sharing
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

/**
 * Get related posts based on category and tags
 */
function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit)
}

/**
 * Individual blog post page component
 * Displays full blog post content with related posts
 */
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post)
  const categoryInfo = blogCategories.find(c => c.id === post.category)

  /**
   * Format publish date for display
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="pt-24 pb-8 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Post Header */}
      <header className="py-12 bg-gradient-to-br from-background via-muted/30 to-background relative">
        {/* Background grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='hsl(var(--border))' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Category Badge */}
            {categoryInfo && (
              <Badge variant="outline" className="mb-4 text-sm">
                {categoryInfo.icon} {categoryInfo.name}
              </Badge>
            )}

            {/* Post Title */}
            <h1 className="text-display mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              {post.title}
            </h1>

            {/* Post Meta */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Post Description */}
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {post.description}
            </p>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Image Placeholder */}
            <div className="h-96 bg-muted rounded-lg mb-12 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                {categoryInfo?.icon}
              </div>
              {/* Grid pattern overlay */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='hsl(var(--border))' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              {/* This would typically be rendered from markdown or a rich text editor */}
              <div className="text-body leading-relaxed space-y-6">
                <p>
                  This is where the full blog post content would be rendered. In a real application,
                  this content would typically come from a CMS, markdown files, or a database.
                </p>
                <p>
                  The content could include rich text formatting, code blocks, images, and other 
                  interactive elements depending on your content management solution.
                </p>
                <h2 className="text-subheading font-bold mt-8 mb-4">
                  Example Section Heading
                </h2>
                <p>
                  You could integrate with popular CMS solutions like Contentful, Strapi, 
                  or use markdown files with libraries like next-mdx-remote for static content.
                </p>
                <div className="bg-muted/50 p-6 rounded-lg border border-border/50">
                  <p className="text-sm text-muted-foreground mb-2">💡 Pro Tip</p>
                  <p className="mb-0">
                    Consider implementing a content management system for easier blog post 
                    creation and editing by non-technical team members.
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-subheading font-bold mb-8 text-center">
                Related Articles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => {
                  const relatedCategory = blogCategories.find(c => c.id === relatedPost.category)
                  
                  return (
                    <Link 
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                        {/* Post image placeholder */}
                        <div className="h-32 bg-muted relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center text-2xl">
                            {relatedCategory?.icon}
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {relatedPost.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{formatDate(relatedPost.publishDate)}</span>
                            <span>{relatedPost.readTime} min read</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  )
}