import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Monitor, Palette } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { Button } from './Button'
import { cn } from '../../lib/utils'

export function ThemeToggle({ className }) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return Sun
      case 'dark':
        return Moon
      case 'system':
        return Monitor
      default:
        return Sun
    }
  }

  const ThemeIcon = getThemeIcon()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative group transition-all duration-300 hover:bg-accent/50 hover:scale-110",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ rotate: 90, scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10
          }}
        >
          <ThemeIcon className="h-[1.3rem] w-[1.3rem]" />
        </motion.div>
      </AnimatePresence>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <span className="sr-only">Toggle theme</span>
      
      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border shadow-md">
        {theme === 'light' ? 'Switch to Dark' : theme === 'dark' ? 'Switch to System' : 'Switch to Light'}
      </div>
    </Button>
  )
}

export function ThemeSelect() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={theme === 'light' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('light')}
      >
        <Sun className="h-4 w-4 mr-2" />
        Light
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('dark')}
      >
        <Moon className="h-4 w-4 mr-2" />
        Dark
      </Button>
      <Button
        variant={theme === 'system' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('system')}
      >
        <Monitor className="h-4 w-4 mr-2" />
        System
      </Button>
    </div>
  )
}