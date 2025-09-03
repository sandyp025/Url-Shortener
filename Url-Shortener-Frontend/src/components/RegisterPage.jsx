import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import toast from 'react-hot-toast'
import { useStoreContext } from '../contextApi/ContextApi'
import { AuthForm } from './ui/AuthForm'
import { LoadingSpinner } from './ui/LoadingSpinner'

const RegisterPage = () => {
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
            x: [0, -80, 0],
            y: [0, 120, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-32 right-32 w-40 h-40 bg-accent/5 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-32 left-32 w-36 h-36 bg-primary/5 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-28 h-28 bg-accent/10 rounded-full blur-lg"
        />
        
        {/* Different grid pattern for register */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_30%,transparent_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl relative"
      >
        {loading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl">
            <LoadingSpinner size="lg" />
          </div>
        )}
        
        <AuthForm
          mode="register"
          onModeChange={handleModeChange}
          onSubmit={handleAuthSubmit}
          className="backdrop-blur-sm bg-card/80 border border-border/50"
        />
      </motion.div>
    </div>
  )
}

export default RegisterPage