import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Wifi, WifiOff } from 'lucide-react';
const ChewbaccaSilhouette = () => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-24 w-auto text-wookiee-fur"
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3.5-9c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5s.67 1.5 1.5 1.5zm7 0c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-3.5 4c-1.93 0-3.5-1.57-3.5-3.5h7c0 1.93-1.57 3.5-3.5 3.5z" />
    <path d="M12,2.5c-5.25,0-9.5,4.25-9.5,9.5s4.25,9.5,9.5,9.5s9.5-4.25,9.5-9.5S17.25,2.5,12,2.5z M12,20.5 c-4.69,0-8.5-3.81-8.5-8.5s3.81-8.5,8.5-8.5s8.5,3.81,8.5,8.5S16.69,20.5,12,20.5z M8.5,10C9.33,10,10,9.33,10,8.5 S9.33,7,8.5,7S7,7.67,7,8.5S7.67,10,8.5,10z M15.5,10c0.83,0,1.5-0.67,1.5-1.5S16.33,7,15.5,7S14,7.67,14,8.5S14.67,10,15.5,10z M12,16.5c-2.21,0-4-1.79-4-4h8C16,14.71,14.21,16.5,12,16.5z" fill="#4A2C2A" />
    <path d="M12,4c-4.41,0-8,3.59-8,8s3.59,8,8,8s8-3.59,8-8S16.41,4,12,4z M8.5,11.5C7.67,11.5,7,10.83,7,10s0.67-1.5,1.5-1.5 s1.5,0.67,1.5,1.5S9.33,11.5,8.5,11.5z M12,17.5c-2.76,0-5-2.24-5-5h10C17,15.26,14.76,17.5,12,17.5z M15.5,11.5 c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5S16.33,11.5,15.5,11.5z" />
  </svg>
);
const BandolierIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 20"
    className="h-8 w-auto text-wookiee-bandolier"
    fill="currentColor"
  >
    <rect x="5" y="2" width="90" height="16" rx="2" fill="#4A2C2A" />
    <rect x="10" y="0" width="10" height="20" />
    <rect x="30" y="0" width="10" height="20" />
    <rect x="50" y="0" width="10" height="20" />
    <rect x="70" y="0" width="10" height="20" />
    <rect x="90" y="0" width="10" height="20" />
  </svg>
);
const BlinkingCursor = () => (
  <span className="inline-block w-2 h-5 bg-wookiee-comms animate-blinking-cursor ml-1" />
);
export function HomePage() {
  const [serverName, setServerName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [glitchKey, setGlitchKey] = useState(0);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setServerName(null);
    try {
      const response = await fetch('/api/signal');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      if (!data.serverName) {
        throw new Error("Invalid API response format");
      }
      setServerName(data.serverName);
      setGlitchKey(prev => prev + 1); // Trigger glitch animation
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      console.error("Failed to fetch server name:", errorMessage, e);
      setError("Signal Lost");
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleRefresh = () => {
    fetchData();
  };
  const renderStatus = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center">
          <p>Acquiring Signal...</p>
          <BlinkingCursor />
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center justify-center text-red-500">
          <WifiOff className="mr-2 h-5 w-5" />
          <p>{error}</p>
        </div>
      );
    }
    if (serverName) {
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key={glitchKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center animate-glitch"
          >
            <Wifi className="mr-2 h-5 w-5 text-green-400" />
            <p>{serverName}</p>
          </motion.div>
        </AnimatePresence>
      );
    }
    return <p>-- Comms Offline --</p>;
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 font-mono">
      <Card className="w-full max-w-2xl bg-black/50 border-neutral-600 backdrop-blur-sm shadow-2xl shadow-black/50 animate-fade-in">
        <CardHeader className="items-center text-center space-y-4 pt-8">
          <ChewbaccaSilhouette />
          <CardTitle className="text-3xl font-display text-wookiee-comms text-glow tracking-widest pt-2">
            Wookiee Outpost Comms
          </CardTitle>
          <div className="w-1/2">
            <BandolierIcon />
          </div>
        </CardHeader>
        <CardContent className="space-y-8 text-center">
          <div className="border-t border-b border-neutral-700 py-8 px-4 bg-black/30">
            <p className="text-sm text-wookiee-bandolier uppercase tracking-wider mb-3">
              Receiving Signal From:
            </p>
            <div className="text-2xl text-wookiee-comms text-glow h-8">
              {renderStatus()}
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              className={cn(
                "font-mono uppercase tracking-widest text-lg px-8 py-6 bg-wookiee-fur border-2 border-neutral-600 text-wookiee-bandolier hover:bg-neutral-800 hover:border-wookiee-comms hover:text-wookiee-comms transition-all duration-200 active:scale-95",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? 'Scanning...' : 'Refresh Signal'}
            </Button>
          </div>
        </CardContent>
      </Card>
      <footer className="absolute bottom-4 text-center text-neutral-500 text-sm">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
    </main>
  );
}