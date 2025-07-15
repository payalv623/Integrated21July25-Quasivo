
import { useState, useEffect } from "react";
import { Search, Cog, FileText, Share2, Zap } from "lucide-react";

const agents = [
  {
    id: 1,
    name: "Web Search",
    icon: Search,
    description: "Intelligent web crawler",
    angle: 0, // Top
    delay: 0,
  },
  {
    id: 2,
    name: "Agent Logic",
    icon: Cog,
    description: "Decision processing core",
    angle: 72, // Top right
    delay: 0.3,
  },
  {
    id: 3,
    name: "Content Creator",
    icon: FileText,
    description: "Autonomous content generation",
    angle: 144, // Bottom right
    delay: 0.6,
  },
  {
    id: 4,
    name: "Social Media",
    icon: Share2,
    description: "Multi-platform distribution",
    angle: 216, // Bottom left
    delay: 0.9,
  },
  {
    id: 5,
    name: "Analytics",
    icon: Zap,
    description: "Performance monitoring",
    angle: 288, // Top left
    delay: 1.2,
  },
];

const RADIUS = 250; // Distance from center

export const FloatingAgents = () => {
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);
  const [hasSpread, setHasSpread] = useState(false);

  useEffect(() => {
    // Trigger the spread animation after component mounts
    const timer = setTimeout(() => {
      setHasSpread(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      {agents.map((agent) => {
        const Icon = agent.icon;
        const angleRad = (agent.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * RADIUS;
        const y = Math.sin(angleRad) * RADIUS;
        
        return (
          <div
            key={agent.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out ${
              hasSpread ? '' : 'translate-x-0 translate-y-0'
            }`}
            style={{
              left: hasSpread ? `calc(50% + ${x}px)` : '50%',
              top: hasSpread ? `calc(50% + ${y}px)` : '50%',
              transitionDelay: `${agent.delay}s`,
            }}
            onMouseEnter={() => setHoveredAgent(agent.id)}
            onMouseLeave={() => setHoveredAgent(null)}
          >
            {/* Connection line to center - only visible after spread */}
            {hasSpread && (
              <div
                className="absolute w-0.5 bg-gradient-to-r from-cyan-400/20 to-transparent origin-bottom opacity-0 animate-fade-in"
                style={{
                  height: RADIUS,
                  transform: `rotate(${agent.angle + 180}deg)`,
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'top center',
                  animationDelay: `${agent.delay + 0.5}s`,
                  animationFillMode: 'forwards',
                }}
              />
            )}
            
            {/* Agent card */}
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg transform group-hover:scale-110 transition-transform duration-300" />
              <div 
                className={`relative bg-black/60 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${
                  hoveredAgent === agent.id 
                    ? 'border-cyan-400/60 scale-105 shadow-lg shadow-cyan-400/20' 
                    : 'border-cyan-400/20'
                }`}
                style={{
                  animation: hasSpread ? `float 4s ease-in-out infinite ${agent.delay}s` : 'none',
                }}
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
    </div>
  );
};
