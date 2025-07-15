
import { useState } from "react";
import { Search, Cog, FileText, Share2, Zap } from "lucide-react";

const agents = [
  {
    id: 1,
    name: "Web Search",
    icon: Search,
    description: "Intelligent web crawler",
    position: { x: -300, y: -100 },
    delay: 0,
  },
  {
    id: 2,
    name: "Agent Logic",
    icon: Cog,
    description: "Decision processing core",
    position: { x: 300, y: -150 },
    delay: 0.5,
  },
  {
    id: 3,
    name: "Content Creator",
    icon: FileText,
    description: "Autonomous content generation",
    position: { x: -250, y: 150 },
    delay: 1,
  },
  {
    id: 4,
    name: "Social Media",
    icon: Share2,
    description: "Multi-platform distribution",
    position: { x: 280, y: 120 },
    delay: 1.5,
  },
];

export const FloatingAgents = () => {
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-4xl">
      {agents.map((agent) => {
        const Icon = agent.icon;
        return (
          <div
            key={agent.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `calc(50% + ${agent.position.x}px)`,
              top: `calc(50% + ${agent.position.y}px)`,
              animation: `float 4s ease-in-out infinite ${agent.delay}s`,
            }}
            onMouseEnter={() => setHoveredAgent(agent.id)}
            onMouseLeave={() => setHoveredAgent(null)}
          >
            {/* Connection line to center */}
            <div
              className="absolute w-0.5 bg-gradient-to-r from-cyan-400/20 to-transparent origin-bottom"
              style={{
                height: Math.sqrt(agent.position.x ** 2 + agent.position.y ** 2),
                transform: `rotate(${Math.atan2(-agent.position.y, -agent.position.x) * 180 / Math.PI + 90}deg)`,
                left: '50%',
                top: '50%',
                transformOrigin: 'top center',
              }}
            />
            
            {/* Agent card */}
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg transform group-hover:scale-110 transition-transform duration-300" />
              <div 
                className={`relative bg-black/60 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${
                  hoveredAgent === agent.id 
                    ? 'border-cyan-400/60 scale-105 shadow-lg shadow-cyan-400/20' 
                    : 'border-cyan-400/20'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <Icon className="w-8 h-8 text-cyan-400" />
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md animate-pulse" />
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-1">
                      {agent.name}
                    </h4>
                    <p className="text-xs text-cyan-300/60">
                      {agent.description}
                    </p>
                  </div>
                  
                  {/* Status indicator */}
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
      `}</style>
    </div>
  );
};
