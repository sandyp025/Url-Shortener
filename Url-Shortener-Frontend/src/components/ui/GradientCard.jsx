import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export function GradientCard({ 
  children, 
  className, 
  gradient = "from-primary/20 to-accent/20",
  hover = true,
  ...props 
}) {
  const MotionDiv = motion.div

  return (
    <MotionDiv
      className={cn(
        "relative overflow-hidden rounded-xl border bg-gradient-to-br",
        gradient,
        "backdrop-blur-sm",
        hover && "hover:shadow-lg transition-all duration-300",
        className
      )}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      <div className="relative z-10">
        {children}
      </div>
    </MotionDiv>
  )
}

export function GlassCard({ 
  children, 
  className, 
  blur = "backdrop-blur-md",
  ...props 
}) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/20 dark:border-white/10",
        "bg-white/10 dark:bg-black/10",
        blur,
        "shadow-xl",
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}