import { AIAgentUSPHigherDimensionalBeing } from '../components/agentic-ai/AIAgentUSPHigherDimensionalBeing';
import { AIAgentUSPAgentOrchestrator } from '../components/agentic-ai/AgentOrchestrator';
import { AIAgentUSPFloatingAgents } from '../components/agentic-ai/AIAgentUSPFloatingAgents';
import { useRef, useEffect } from 'react';
import { CyberpunkTile } from '../components/agentic-ai/ui/CyberpunkTile';
import { UserCog, Zap } from 'lucide-react';

const AIAgentUSPPage = () => {
  const RADIUS = 280; // Same radius as in FloatingAgents
  const orchestratorAngle = 0; // Top position
  const orchestratorX = Math.cos((orchestratorAngle * Math.PI) / 180) * RADIUS;
  const orchestratorY = Math.sin((orchestratorAngle * Math.PI) / 180) * RADIUS;

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 2.05;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((error) => {
              console.log('Video play failed:', error);
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5, // Play when 50% of video is visible
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Background video placeholder */}
      {/* <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10 flex items-center justify-center">
          <div className="text-center text-cyan-400/30">
            <div className="w-32 h-32 border-2 border-dashed border-cyan-400/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-sm">Video Placeholder</span>
            </div>
            <p className="text-xs">Replace with your video</p>
          </div>
        </div>
        <video 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/path-to-your-video.mp4" type="video/mp4" />
        </video>
      </div> */}

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black/40 to-purple-900/20 z-1" />

      {/* Higher Dimensional Being in background */}
      <div className="absolute inset-0 z-2">
        <AIAgentUSPHigherDimensionalBeing />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-row items-center justify-center p-8">
        {/* Fixed left-side cyberpunk tiles */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col space-y-8 max-w-xs w-[420px] z-20 p-4
          sm:static sm:translate-y-0 sm:flex-row sm:space-y-0 sm:space-x-6 sm:w-full sm:max-w-full sm:mb-8">
          <CyberpunkTile
            title="AI-Driven Personal Branding"
            description={
              'Automated AI content generation and scheduling for LinkedIn. Powered by knackvibes.ai and Knack. Effortless, on-brand, and always active.'
            }
            icon={<UserCog />}
            status="Active"
          />
          <CyberpunkTile
            title="Workflow Automation & Smart Integrations"
            description={
              'Real-time news and web discovery, seamlessly integrated with Knack Flows, OpenAI, and YouTube for next-level automation.'
            }
            icon={<Zap />}
            status="Active"
          />
        </div>
        {/* Main orchestrator/agents content remains centered */}
        <div className="relative w-full max-w-6xl h-96 ml-[440px] sm:ml-0">
          {/* Central Orchestrator positioned at top */}
          {/* <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: `calc(50% + ${orchestratorX}px)`,
              top: `calc(50% + ${orchestratorY}px)`,
            }}
          >
            <AgentOrchestrator />
          </div> */}

          {/* Floating Agents spreading out from center */}
          <AIAgentUSPFloatingAgents />

          {/* Center space reserved for video */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-cyan-400/20 rounded-lg flex items-center justify-center z-0"
           style={{width: '450px', height: '300px'}}>
            {/* <span className="text-xs text-cyan-400/40">Video Space</span> */}
            <video
              ref={videoRef}
              muted
              
              playsInline
              controls={false}
              className="w-full h-full object-cover"
            >
              <source src="/videos/higher_being.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AIAgentUSPPage;
