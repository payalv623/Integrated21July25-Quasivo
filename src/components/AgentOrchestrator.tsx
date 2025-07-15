
import { useState, useEffect } from "react";
import { Brain, Zap, Network } from "lucide-react";

export const AgentOrchestrator = () => {
  const [activeConnections, setActiveConnections] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnections(prev => {
        const newConnections = [...prev];
        const randomIndex = Math.floor(Math.random() * 5);
        if (newConnections.includes(randomIndex)) {
          return newConnections.filter(i => i !== randomIndex);
        } else {
          return [...newConnections, randomIndex];
        }
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Central orchestrator */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl transform group-hover:scale-110 transition-transform duration-500" />
        <div className="relative bg-black/60 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Brain className="w-10 h-10 text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md animate-pulse" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-cyan-300 text-center mb-2">
            Central Orchestrator
          </h3>
          <p className="text-cyan-300/70 text-center text-sm">
            Coordinating all agents
          </p>
          
          {/* Connection indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeConnections.includes(i) 
                    ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
                    : 'bg-cyan-400/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
