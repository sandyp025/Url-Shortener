import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Link2, 
  BarChart3, 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  Sparkles,
  Target,
  Clock,
  Award,
  TrendingUp,
  Lock
} from "lucide-react";
import { GradientCard, GlassCard } from "./ui/GradientCard";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

const AboutPage = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: Link2,
      title: "Simple URL Shortening",
      description: "Transform long URLs into clean, memorable links with just one click. Our intuitive interface makes link management effortless.",
      color: "text-blue-500"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get detailed insights with real-time tracking, geographic data, device information, and referral sources to optimize your campaigns.",
      color: "text-green-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade encryption, spam detection, and malicious link protection keep your brand safe and user trust intact.",
      color: "text-purple-500"
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Global CDN with 99.9% uptime ensures your links redirect instantly worldwide with sub-second response times.",
      color: "text-yellow-500"
    }
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Active Users" },
    { icon: Link2, value: "1000+", label: "Links Created" },
    { icon: Globe, value: "150+", label: "Countries" },
    { icon: Clock, value: "99.9%", label: "Uptime" }
  ];

  const timeline = [
    {
      year: "2024",
      title: "AI-Powered Analytics",
      description: "Launched machine learning insights and predictive analytics for link performance."
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Reached 150+ countries with localized CDN infrastructure and multi-language support."
    },
    {
      year: "2022",
      title: "Enterprise Features",
      description: "Introduced team collaboration, custom domains, and advanced security features."
    },
    {
      year: "2021",
      title: "Platform Launch",
      description: "Clipo was born with a mission to revolutionize URL shortening and analytics."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-accent/5 rounded-full blur-2xl"
        />
        
        {/* Dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_2px,transparent_0)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            About Clipo
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Revolutionizing</span> Link Management
            <br />
            <span className="text-foreground">for Modern Teams</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're building the future of URL shortening with intelligent analytics, 
            enterprise security, and lightning-fast performance. Join thousands of companies 
            who trust Clipo for their link management needs.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">Clipo</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for performance, designed for teams, trusted by enterprises worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GradientCard className="p-8 h-full">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-background/50 ${feature.color}`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </GradientCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <GradientCard className="p-12 text-center" gradient="from-primary/10 via-accent/10 to-primary/10">
            <Target className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              To democratize link intelligence and empower businesses of all sizes with 
              professional-grade URL management tools. We believe every click tells a story, 
              and we're here to help you understand it.
            </p>
          </GradientCard>
        </motion.div>


        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <GradientCard className="p-12 text-center" gradient="from-accent/20 to-primary/20">
            <Award className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience the Future?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and see why Clipo is the 
              preferred choice for professional link management.
            </p>
            <Button
              size="xl"
              variant="gradient"
              onClick={() => navigate('/register')}
              className="px-8 py-4 text-lg"
            >
              Get Started Today
            </Button>
          </GradientCard>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;