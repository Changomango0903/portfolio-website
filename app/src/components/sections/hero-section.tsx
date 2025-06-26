'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'

/**
 * Hero section component displaying main introduction and call-to-action
 * Features animated text, social links, and scroll indicator
 * No floating elements to prevent hydration issues
 * 
 * @returns JSX hero section structure
 */
export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    projectsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50" />
      
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='%23333' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground mb-4"
        >
          Hello, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            {siteConfig.author.name}
          </span>
        </motion.h1>

        {/* Title/Role */}
        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          {siteConfig.description}
        </motion.h2>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button
            size="lg"
            onClick={handleScrollToProjects}
            className="group relative overflow-hidden"
          >
            <span className="relative z-10">Explore My Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </Button>

          <Button
            variant="outline"
            size="lg"
            asChild
          >
            <Link href="/contact">
              Get In Touch
            </Link>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-6 mb-16"
        >
          <motion.a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-2"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="GitHub profile"
          >
            <Github size={24} />
          </motion.a>

          <motion.a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-2"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="LinkedIn profile"
          >
            <Linkedin size={24} />
          </motion.a>

          <motion.a
            href={siteConfig.social.email}
            className="text-muted-foreground hover:text-primary transition-colors p-2"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Email contact"
          >
            <Mail size={24} />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={handleScrollToProjects}
            className="text-muted-foreground hover:text-primary transition-colors p-2"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            aria-label="Scroll to projects"
          >
            <ArrowDown size={24} />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}