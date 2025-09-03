import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import toast from 'react-hot-toast'
import { useStoreContext } from '../contextApi/ContextApi'
import { AuthForm } from './ui/AuthForm'
import { LoadingSpinner } from './ui/LoadingSpinner'

const LoginPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { setToken } = useStoreContext()

  const handleAuthSubmit = async (formData, mode) => {
    setLoading(true)
    try {
      const endpoint = mode === 'login' ? '/api/auth/public/login' : '/api/auth/public/register'
      const { data: response } = await api.post(endpoint, formData)
      
      if (response.token) {
        setToken(response.token)
        localStorage.setItem('JWT_TOKEN', response.token)
        toast.success(`${mode === 'login' ? 'Login' : 'Registration'} Successful!`)
        navigate('/dashboard')
      } else {
        toast.success('Registration successful! Please login.')
        if (mode === 'register') {
          // You might want to switch to login mode here
        }
      }
    } catch (error) {
      console.log(error)
      const message = error.response?.data?.message || `${mode === 'login' ? 'Login' : 'Registration'} Failed!`
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleModeChange = (mode) => {
    // Handle mode change if needed
    console.log('Mode changed to:', mode)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Animated background shapes */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-48 h-48 bg-accent/5 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/10 rounded-full blur-lg"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl relative"
      >
        {loading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl">
            <LoadingSpinner size="lg" />
          </div>
        )}
        
        <AuthForm
          mode="login"
          onModeChange={handleModeChange}
          onSubmit={handleAuthSubmit}
          className="backdrop-blur-sm bg-card/80 border border-border/50"
        />
      </motion.div>
    </div>
  )
}

export default LoginPage
