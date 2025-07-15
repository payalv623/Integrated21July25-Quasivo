
import { HigherDimensionalBeing } from "@/components/HigherDimensionalBeing";
import { AgentOrchestrator } from "@/components/AgentOrchestrator";
import { FloatingAgents } from "@/components/FloatingAgents";

const Index = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
      
      {/* Higher Dimensional Being in background */}
      <HigherDimensionalBeing />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Neural Network Orchestrator
        </h1>
        <p className="text-cyan-300/80 text-center mb-12 text-lg">
          Higher dimensional intelligence coordinating autonomous agents
        </p>
        
        {/* Agent Orchestrator */}
        <AgentOrchestrator />
        
        {/* Floating Agents */}
        <FloatingAgents />
      </div>
      
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
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
