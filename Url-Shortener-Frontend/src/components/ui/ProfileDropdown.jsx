import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, ChevronDown } from 'lucide-react'
import { Button } from './Button'
import { cn } from '../../lib/utils'

export function ProfileDropdown({ user, onLogout, className }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])


  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 h-10 px-3"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-semibold">
          {user?.sub?.[0]?.toUpperCase() || 'U'}
        </div>
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-medium">{user?.sub || 'User'}</span>
        </div>
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50"
          >
            {/* User Info Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg font-semibold">
                  {user?.sub?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {user?.sub || 'User'}
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-muted-foreground">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <motion.button
                whileHover={{ backgroundColor: "hsl(var(--accent))" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onLogout()
                  setIsOpen(false)
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-sm transition-colors text-destructive hover:text-destructive"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                <div className="font-medium">Sign out</div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}