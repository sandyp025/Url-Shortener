import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Shield, Zap, Link2, Globe, Sparkles } from "lucide-react";

import { useStoreContext } from "../contextApi/ContextApi";
import { Button } from "./ui/Button";
import { GradientCard, GlassCard } from "./ui/GradientCard";
import { Badge } from "./ui/Badge";
import { LinkAnalyticsIllustration, NetworkIllustration } from "./ui/ModernIllustration";
import { cn } from "../lib/utils";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();

  const dashBoardNavigateHandler = () => {
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const features = [
    {
      icon: Link2,
      title: "Simple URL Shortening",
      desc: "Create short, memorable URLs in seconds with our intuitive interface. No complex setup required."
    },
    {
      icon: BarChart3,
      title: "Powerful Analytics",
      desc: "Track clicks, geographical data, and referral sources to optimize your marketing strategies."
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      desc: "Advanced encryption and security measures ensure your links and data remain protected."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "High-performance infrastructure guarantees fast redirects and 99.9% uptime reliability."
    }
  ];

  const stats = [
    { number: "1000+", label: "Links Created" },
    { number: "500+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "5+", label: "Countries" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="secondary" className="mb-4">
                  <Sparkles className="w-4 h-4 mr-1" />
                  New Analytics Dashboard
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="gradient-text">Clipo</span> Simplifies{" "}
                  <span className="text-foreground">URL Shortening</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-muted-foreground leading-relaxed max-w-lg"
              >
                Transform long URLs into powerful, trackable links. Built for modern teams who need 
                reliable link management with advanced analytics.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  size="lg" 
                  variant="gradient"
                  onClick={dashBoardNavigateHandler}
                  className="group"
                >
                  {token ? "Go to Dashboard" : "Start Free Trial"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold gradient-text">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <LinkAnalyticsIllustration className="w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">Clipo</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by individuals and teams at the world's best companies for reliable link management.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GradientCard className="p-6 h-full">
                  <div className="flex flex-col items-start space-y-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </GradientCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Visualization Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Connect Your Digital <span className="gradient-text">Ecosystem</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Seamlessly integrate with your existing tools and workflows. Our platform scales with your needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <NetworkIllustration className="max-w-2xl" />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GradientCard className="text-center p-12" gradient="from-primary/20 via-accent/20 to-primary/20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Links?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust Clipo for their link management needs.
                Start creating powerful, trackable links today.
              </p>
              <Button 
                size="xl" 
                variant="gradient" 
                onClick={dashBoardNavigateHandler}
                className="group"
              >
                {token ? "Go to Dashboard" : "Get Started Free"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </GradientCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;