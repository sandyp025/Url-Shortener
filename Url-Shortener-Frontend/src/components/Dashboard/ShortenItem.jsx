import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Calendar, 
  Copy, 
  Check, 
  BarChart3, 
  MousePointer,
  Eye,
  Share2,
  TrendingUp,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../contextApi/ContextApi';
import Graph from './Graph';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GradientCard';
import { Badge } from '../ui/Badge';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { cn } from '../../lib/utils';
import toast from 'react-hot-toast';

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [analyticsData, setAnalyticsData] = useState([]);

  const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(/^https?:\/\//, '');

  const copyShortUrl = async () => {
    const text = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed', e);
      toast.error('Failed to copy link');
    }
  };

  const analyticsHandler = (s) => {
    if (!analyticToggle) {
      setSelectedUrl(s);
    }
    setAnalyticToggle(!analyticToggle);
  };

  const fetchMyShortUrl = async () => {
    setLoader(true);
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${selectedUrl}?startDate=2024-12-01T00:00:00&endDate=2025-12-31T23:59:59`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setAnalyticsData(data);
      setSelectedUrl('');
    } catch (error) {
      console.error(error);
      navigate('/error');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedUrl) {
      fetchMyShortUrl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUrl]);

  const formatUrl = (url) => {
    if (url.length > 60) {
      return url.substring(0, 60) + '...';
    }
    return url;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <GlassCard className="p-6 hover:shadow-card-hover transition-all duration-300 group">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Link Information */}
          <div className="flex-1 space-y-3">
            {/* Short URL */}
            <div className="flex items-center gap-2">
              <a
                href={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group"
              >
                <span className="font-mono">{subDomain}/s/{shortUrl}</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <Badge variant="secondary" className="text-xs">
                Active
              </Badge>
            </div>

            {/* Original URL */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-sm">{formatUrl(originalUrl)}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-green-500/10">
                  <MousePointer className="w-3.5 h-3.5 text-green-600" />
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-foreground">{clickCount}</span>
                  <span className="text-muted-foreground ml-1">
                    {clickCount === 0 || clickCount === 1 ? 'click' : 'clicks'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-blue-500/10">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {dayjs(createdDate).format('MMM DD, YYYY')}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={isCopied ? "default" : "outline"}
                size="sm"
                onClick={copyShortUrl}
                className={cn(
                  "min-w-[90px]",
                  isCopied && "bg-green-600 hover:bg-green-700"
                )}
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={analyticToggle ? "default" : "secondary"}
                size="sm"
                onClick={() => analyticsHandler(shortUrl)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
                {analyticToggle ? (
                  <ChevronUp className="w-4 h-4 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-2" />
                )}
              </Button>
            </motion.div>

            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Analytics Panel */}
        <AnimatePresence>
          {analyticToggle && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-border"
            >
              {loader ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center space-y-4">
                    <LoadingSpinner size="lg" />
                    <p className="text-muted-foreground">Loading analytics...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Performance Analytics
                    </h4>
                    <Badge variant="secondary">
                      <Eye className="w-3 h-3 mr-1" />
                      Real-time
                    </Badge>
                  </div>
                  
                  <div className="h-64 rounded-lg bg-background/50 p-4 relative">
                    {analyticsData.length === 0 ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
                          <BarChart3 className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold mb-2">No analytics data yet</h3>
                        <p className="text-sm text-muted-foreground text-center max-w-md">
                          Share your short link to start collecting engagement data and insights
                        </p>
                      </div>
                    ) : (
                      <Graph graphData={analyticsData} />
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
};

export default ShortenItem;