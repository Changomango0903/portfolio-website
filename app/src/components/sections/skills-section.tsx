'use client'

import { motion } from 'framer-motion'
import { Code, Database, Globe, Cpu } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Icon mapping for skill categories
const categoryIcons = {
  'Programming Languages': Code,
  'Frameworks & Libraries': Globe,
  'Tools & Platforms': Database,
  'Specializations': Cpu,
}

/**
 * Skills section component displaying technical skills organized by category
 * Features animated skill cards with icons and responsive grid layout
 * 
 * @returns JSX skills section structure
 */
export function SkillsSection() {
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

  return (
    <section 
      id="skills"
      className="py-20 lg:py-32"
      aria-label="Skills section"
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
              Technical{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise and the tools I use to build amazing solutions.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {siteConfig.skillCategories.map((category, index) => {
              const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons] || Code

              return (
                <motion.div
                  key={category.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        className="mx-auto mb-4 p-3 rounded-full bg-primary/10 text-primary"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <IconComponent size={32} />
                      </motion.div>
                      <CardTitle className="text-lg mb-2">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              delay: index * 0.1 + skillIndex * 0.05,
                              duration: 0.3 
                            }}
                            viewport={{ once: true }}
                          >
                            <Badge 
                              variant="secondary" 
                              className="text-xs hover:bg-primary/20 transition-colors cursor-default"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Additional Skills Info */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6">
                Always Learning
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I'm passionate about staying current with emerging technologies and continuously expanding my skill set. 
                Currently exploring{' '}
                <span className="text-primary font-medium">
                  advanced AI architectures, cloud-native development, and modern DevOps practices
                </span>
                {' '}to deliver cutting-edge solutions.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}