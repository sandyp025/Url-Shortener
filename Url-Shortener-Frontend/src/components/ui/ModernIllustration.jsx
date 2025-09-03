import React from 'react'
import { motion } from 'framer-motion'
import { Link2, BarChart3, Globe, Zap, Shield, Users } from 'lucide-react'

export function LinkAnalyticsIllustration({ className }) {
  return (
    <div className={`relative w-full h-96 ${className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Main Dashboard Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-4 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-md rounded-2xl border border-border/50 shadow-2xl p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm font-medium">Analytics Dashboard</div>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: Users, value: '2.4k', label: 'Users', color: 'text-blue-500' },
            { icon: Link2, value: '12.3k', label: 'Links', color: 'text-green-500' },
            { icon: BarChart3, value: '98.5%', label: 'CTR', color: 'text-purple-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-background/50 rounded-lg p-3 border border-border/30"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
              <div className="text-lg font-bold">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart Area */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-background/30 rounded-lg p-4 mb-4 h-32 relative overflow-hidden"
        >
          {/* Animated Chart Bars */}
          <div className="flex items-end justify-between h-full">
            {[20, 40, 60, 45, 80, 35, 70, 55, 90, 65, 40, 85].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.05 }}
                className="bg-gradient-to-t from-primary to-accent rounded-t w-2 opacity-80"
              />
            ))}
          </div>
          
          {/* Chart Labels */}
          <div className="absolute bottom-1 left-4 text-xs text-muted-foreground">
            Click Analytics
          </div>
        </motion.div>

        {/* Recent Links */}
        <div className="space-y-2">
          {[
            { url: 'linkly.co/abc123', clicks: '1.2k', status: 'active' },
            { url: 'linkly.co/xyz789', clicks: '856', status: 'active' },
            { url: 'linkly.co/def456', clicks: '432', status: 'paused' }
          ].map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              className="flex items-center justify-between py-2 px-3 bg-background/20 rounded-lg border border-border/20"
            >
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${link.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <div className="text-xs font-mono">{link.url}</div>
              </div>
              <div className="text-xs text-muted-foreground">{link.clicks}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [-10, 10, -10],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -left-4 p-3 bg-primary/10 rounded-full backdrop-blur-sm border border-primary/20"
      >
        <Globe className="w-6 h-6 text-primary" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [10, -10, 10],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-2 -right-6 p-2 bg-accent/10 rounded-full backdrop-blur-sm border border-accent/20"
      >
        <Zap className="w-5 h-5 text-accent" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [-5, 15, -5],
          x: [0, 5, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-2 -left-2 p-2 bg-green-500/10 rounded-full backdrop-blur-sm border border-green-500/20"
      >
        <Shield className="w-4 h-4 text-green-500" />
      </motion.div>
    </div>
  )
}

export function NetworkIllustration({ className }) {
  return (
    <div className={`relative w-full h-96 ${className}`}>
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Animated Connection Lines */}
        {[
          { x1: 50, y1: 150, x2: 200, y2: 80 },
          { x1: 200, y1: 80, x2: 350, y2: 120 },
          { x1: 50, y1: 150, x2: 150, y2: 220 },
          { x1: 150, y1: 220, x2: 300, y2: 180 },
          { x1: 200, y1: 80, x2: 250, y2: 200 },
          { x1: 250, y1: 200, x2: 350, y2: 120 }
        ].map((line, index) => (
          <motion.line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: index * 0.2 }}
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-10"
              dur="1s"
              repeatCount="indefinite"
            />
          </motion.line>
        ))}
      </svg>

      {/* Network Nodes */}
      {[
        { x: 50, y: 150, icon: Globe, size: 'large', color: 'primary' },
        { x: 200, y: 80, icon: Link2, size: 'medium', color: 'accent' },
        { x: 350, y: 120, icon: Users, size: 'medium', color: 'green' },
        { x: 150, y: 220, icon: BarChart3, size: 'small', color: 'blue' },
        { x: 300, y: 180, icon: Shield, size: 'small', color: 'purple' },
        { x: 250, y: 200, icon: Zap, size: 'small', color: 'yellow' }
      ].map((node, index) => {
        const sizeClasses = {
          large: 'w-16 h-16 p-4',
          medium: 'w-12 h-12 p-3',
          small: 'w-10 h-10 p-2'
        }
        
        const colorClasses = {
          primary: 'bg-primary/20 border-primary/40 text-primary',
          accent: 'bg-accent/20 border-accent/40 text-accent',
          green: 'bg-green-500/20 border-green-500/40 text-green-500',
          blue: 'bg-blue-500/20 border-blue-500/40 text-blue-500',
          purple: 'bg-purple-500/20 border-purple-500/40 text-purple-500',
          yellow: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-500'
        }

        return (
          <motion.div
            key={index}
            className={`absolute rounded-full backdrop-blur-sm border-2 ${sizeClasses[node.size]} ${colorClasses[node.color]}`}
            style={{ 
              left: `${(node.x / 400) * 100}%`, 
              top: `${(node.y / 300) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ scale: 1.1 }}
          >
            <node.icon className="w-full h-full" />
            
            {/* Pulse Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-current"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}