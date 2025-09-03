import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Link2, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe,
  Eye,
  MousePointer
} from 'lucide-react'
import Graph from './Graph'
import { dummyData } from '../../dummyData/data'
import { useStoreContext } from '../../contextApi/ContextApi'
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery'
import ShortenPopUp from './ShortenPopUp'
import ShortenUrlList from './ShortenUrlList'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'
import { Button } from '../ui/Button'
import { GradientCard, GlassCard } from '../ui/GradientCard'
import { Badge } from '../ui/Badge'
import { LoadingSpinner } from '../ui/LoadingSpinner'

const DashboardLayout = () => {
    // const refetch = false;
    const { token } = useStoreContext();
    const navigate = useNavigate();
    const [shortenPopUp, setShortenPopUp] = useState(false);

    // console.log(useFetchTotalClicks(token, onError));

    const {isLoading, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, onError)
    
    const {isLoading: loader, data: totalClicks} = useFetchTotalClicks(token, onError)

    function onError() {
      navigate("/error");
    }

  const statsData = [
    { 
      icon: Link2, 
      label: 'Total Links', 
      value: myShortenUrls?.length || 0,
      change: '+12%',
      changeType: 'positive'
    },
    { 
      icon: MousePointer, 
      label: 'Total Clicks', 
      value: totalClicks?.reduce((sum, item) => sum + item.count, 0) || 0,
      change: '+23%',
      changeType: 'positive'
    },
    { 
      icon: TrendingUp, 
      label: 'CTR', 
      value: '12.5%',
      change: '+5.2%',
      changeType: 'positive'
    },
    { 
      icon: Users, 
      label: 'Unique Visitors', 
      value: '2.4K',
      change: '+18%',
      changeType: 'positive'
    }
  ]

  return (
    <div className="min-h-screen bg-hero-gradient">
      <div className="container mx-auto px-4 py-8">
        {loader ? ( 
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="xl" />
          </div>
        ) : ( 
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8"
            >
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
                <p className="text-muted-foreground">
                  Monitor your link performance and engagement metrics
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  variant="gradient" 
                  size="sm"
                  onClick={() => setShortenPopUp(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Link
                </Button>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard className="p-6 hover:shadow-card-hover transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                      <Badge 
                        variant={stat.changeType === 'positive' ? 'success' : 'destructive'}
                        className="text-xs"
                      >
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
              {/* Main Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="xl:col-span-2"
              >
                <GradientCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Click Analytics</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Live</Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative h-80">
                    {totalClicks.length === 0 ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
                            <BarChart3 className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">No data yet</h3>
                            <p className="text-sm text-muted-foreground">
                              Share your short links to start seeing analytics
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Graph graphData={totalClicks} />
                    )}
                  </div>
                </GradientCard>
              </motion.div>

              {/* Side Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-6"
              >
                {/* Top Countries */}
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Top Countries
                  </h3>
                  <div className="space-y-3">
                    {['United States', 'United Kingdom', 'Germany', 'Canada'].map((country, index) => (
                      <div key={country} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm">{country}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 1000)}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Quick Actions */}
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setShortenPopUp(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Link
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Links List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <GradientCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Recent Links</h3>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                
                {!isLoading && myShortenUrls.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center mb-4">
                      <Link2 className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">No links created yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create your first short link to get started
                    </p>
                    <Button 
                      variant="gradient"
                      onClick={() => setShortenPopUp(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create First Link
                    </Button>
                  </div>
                ) : (
                  <ShortenUrlList data={myShortenUrls} />
                )}
              </GradientCard>
            </motion.div>
          </>
        )}

        <ShortenPopUp
          refetch={refetch}
          open={shortenPopUp}
          setOpen={setShortenPopUp}
        />
      </div>
    </div>
  )
}

export default DashboardLayout