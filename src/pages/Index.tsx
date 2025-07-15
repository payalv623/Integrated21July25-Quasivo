
import { HigherDimensionalBeing } from "@/components/HigherDimensionalBeing";
import { AgentOrchestrator } from "@/components/AgentOrchestrator";
import { FloatingAgents } from "@/components/FloatingAgents";

const Index = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Background video placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10 flex items-center justify-center">
          <div className="text-center text-cyan-400/30">
            <div className="w-32 h-32 border-2 border-dashed border-cyan-400/30 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-sm">Video Placeholder</span>
            </div>
            <p className="text-xs">Replace with your video</p>
          </div>
        </div>
        {/* You can replace the above div with: */}
        {/* <video 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/path-to-your-video.mp4" type="video/mp4" />
        </video> */}
      </div>
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black/40 to-purple-900/20 z-1" />
      
      {/* Higher Dimensional Being in background */}
      <div className="absolute inset-0 z-2">
        <HigherDimensionalBeing />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Neural Network Orchestrator
        </h1>
        <p className="text-cyan-300/80 text-center mb-12 text-lg">
          Higher dimensional intelligence coordinating autonomous agents
        </p>
        
        {/* Container for orchestrator and agents */}
        <div className="relative w-full max-w-6xl h-96">
          {/* Central Agent Orchestrator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <AgentOrchestrator />
          </div>
          
          {/* Floating Agents spreading out from center */}
          <FloatingAgents />
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

export default Index;
