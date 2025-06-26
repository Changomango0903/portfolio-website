'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Mock project data - replace with actual data fetching
const featuredProjects = [
  {
    id: '1',
    title: 'Neural Style Transfer',
    description: 'A deep learning application that transfers artistic styles between images using convolutional neural networks.',
    category: 'ml',
    featured: true,
    techStack: ['Python', 'PyTorch', 'OpenCV', 'FastAPI'],
    links: {
      github: `${siteConfig.social.github}/neural-style-transfer`,
      demo: 'https://demo.example.com',
    },
    image: '/projects/neural-style.jpg',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Real-time Chat Application',
    description: 'Full-stack chat application with real-time messaging, file sharing, and video calls.',
    category: 'software',
    featured: true,
    techStack: ['Next.js', 'TypeScript', 'Socket.io', 'PostgreSQL'],
    links: {
      github: `${siteConfig.social.github}/chat-app`,
      demo: 'https://chat.example.com',
    },
    image: '/projects/chat-app.jpg',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Portfolio Optimization Tool',
    description: 'Algorithmic trading platform with portfolio optimization and risk analysis.',
    category: 'fintech',
    featured: true,
    techStack: ['Python', 'Pandas', 'NumPy', 'Plotly'],
    links: {
      github: `${siteConfig.social.github}/portfolio-optimizer`,
    },
    image: '/projects/portfolio-optimizer.jpg',
    status: 'in-progress',
  },
]

/**
 * Projects section component displaying featured projects and categories
 * Includes project cards with animations and category navigation
 * 
 * @returns JSX projects section structure
 */
export function ProjectsSection() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const handleCategoryClick = (categorySlug: string) => {
    // Navigate to projects page with category filter
    window.location.href = `/projects?category=${categorySlug}`
  }

  return (
    <section 
      id="projects"
      className="py-20 lg:py-32 bg-muted/30"
      aria-label="Projects section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Featured{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of my latest work in machine learning, software engineering, and data science.
            </p>
          </motion.div>

          {/* Project Categories */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {siteConfig.projectCategories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/20"
                  onClick={() => handleCategoryClick(category.slug)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-2" role="img" aria-label={category.name}>
                      {category.icon}
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Projects Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl group">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge 
                        variant={project.status === 'completed' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {project.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-20">
                        {siteConfig.projectCategories.find(cat => cat.id === project.category)?.icon}
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.techStack.length - 4} more
                        </Badge>
                      )}
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-2 pt-2">
                      {project.links.github && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex-1"
                        >
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github size={16} />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.links.demo && (
                        <Button
                          variant="default"
                          size="sm"
                          asChild
                          className="flex-1"
                        >
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink size={16} />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Projects CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <Button size="lg" asChild>
              <Link href="/projects">
                View All Projects
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}