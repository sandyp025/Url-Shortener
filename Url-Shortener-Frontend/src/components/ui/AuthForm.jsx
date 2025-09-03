import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, Github, Chrome, Facebook, Linkedin } from 'lucide-react'
import { Button } from './Button'
import { Input } from './Input'
import { cn } from '../../lib/utils'

export function AuthForm({ mode = 'login', onModeChange, onSubmit, className }) {
  const [isLogin, setIsLogin] = useState(mode === 'login')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const toggleMode = () => {
    const newMode = !isLogin
    setIsLogin(newMode)
    onModeChange?.(newMode ? 'login' : 'register')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(formData, isLogin ? 'login' : 'register')
  }

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const socialProviders = [
    { icon: Chrome, name: 'Google', color: 'hover:text-red-500' },
    { icon: Facebook, name: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Github, name: 'Github', color: 'hover:text-gray-900 dark:hover:text-gray-100' },
    { icon: Linkedin, name: 'LinkedIn', color: 'hover:text-blue-500' }
  ]

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto bg-card rounded-2xl shadow-2xl overflow-hidden", className)}>
      <div className="flex min-h-[600px] relative">
        {/* Forms Container */}
        <div className="w-full lg:w-1/2 relative">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center p-8"
              >
                <div className="w-full max-w-md space-y-6">
                  <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold gradient-text">Welcome Back</h1>
                    <p className="text-muted-foreground">Sign in to your account</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange('username')}
                        className="pl-10"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange('password')}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <Button type="submit" variant="gradient" size="lg" className="w-full">
                      Sign In
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                      {socialProviders.map((provider) => (
                        <motion.button
                          key={provider.name}
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            "p-2 border border-border rounded-lg transition-colors",
                            provider.color
                          )}
                        >
                          <provider.icon className="h-5 w-5" />
                        </motion.button>
                      ))}
                    </div>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center p-8"
              >
                <div className="w-full max-w-md space-y-6">
                  <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold gradient-text">Create Account</h1>
                    <p className="text-muted-foreground">Join us and start shortening URLs</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange('username')}
                        className="pl-10"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        className="pl-10"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange('password')}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    <Button type="submit" variant="gradient" size="lg" className="w-full">
                      Create Account
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or register with</span>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                      {socialProviders.map((provider) => (
                        <motion.button
                          key={provider.name}
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={cn(
                            "p-2 border border-border rounded-lg transition-colors",
                            provider.color
                          )}
                        >
                          <provider.icon className="h-5 w-5" />
                        </motion.button>
                      ))}
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Panel */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <motion.div
            initial={false}
            animate={{
              clipPath: isLogin 
                ? "ellipse(150% 100% at 0% 50%)"
                : "ellipse(150% 100% at 100% 50%)"
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-custom-gradient"
          />
          
          <div className="relative z-10 flex items-center justify-center text-center text-white p-8">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login-panel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold">New Here?</h2>
                    <p className="text-lg opacity-90">
                      Create an account and discover amazing features of Clipo
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={toggleMode}
                    className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                  >
                    Sign Up
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="register-panel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold">Welcome Back!</h2>
                    <p className="text-lg opacity-90">
                      Sign in to continue your journey with Clipo
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={toggleMode}
                    className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                  >
                    Sign In
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Button
            variant="ghost"
            onClick={toggleMode}
            className="text-sm"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </Button>
        </div>
      </div>
    </div>
  )
}