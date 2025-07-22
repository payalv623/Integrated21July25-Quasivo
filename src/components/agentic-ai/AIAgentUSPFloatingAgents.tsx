import { useState, useEffect } from 'react';
import { Globe, LineChart, Hashtag, FileText, PenLine, MonitorSmartphone } from 'lucide-react';

const agents = [
  {
    id: 1,
    name: 'Web Search',
    icon: Globe,
    description: 'Real-time discovery',
    angle: 90, // Top right
    delay: 0.2,
  },
  {
    id: 2,
    name: 'Trend Analysis',
    icon: LineChart,
    description: 'Pattern + topic ID',
    angle: 18, // Top left
    delay: 0.5,
  },
  {
    id: 3,
    name: 'Summarization',
    icon: FileText,
    description: 'Insight distillation',
    angle: 162, // Bottom left
    delay: 0.7,
  },
  {
    id: 4,
    name: 'Post Generation',
    icon: PenLine,
    description: 'Generates unique posts',
    angle: 234, // Bottom right
    delay: 0.11,
  },
  {
    id: 5,
    name: 'Publishing',
    icon: MonitorSmartphone,
    description: 'Multi-platform output',
    angle: 306, // Bottom right
    delay: 0.13,
  },
];

const RADIUS = 350; // Distance from center
const TILE_SCALE = 1.25; // 25% larger

export const AIAgentUSPFloatingAgents = () => {
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
      {/* Render lines from center to each tile, behind video and tiles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {hasSpread && agents.map((agent) => {
          const angleRad = (agent.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * RADIUS;
          const y = Math.sin(angleRad) * RADIUS;
          return (
            <div
              key={agent.id + '-line'}
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{ width: 0, height: 0 }}
            >
              <div
                className={`absolute w-1 bg-gradient-to-r from-cyan-400/40 to-transparent origin-top transition-opacity duration-700 ${hasSpread ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  height: Math.sqrt(x * x + y * y),
                  transform: `rotate(${agent.angle}deg)`,
                  left: 0,
                  top: 0,
                  transformOrigin: 'top center',
                  animationDelay: `${agent.delay + 0.5}s`,
                  animationFillMode: 'forwards',
                  zIndex: 0,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Render agent tiles above the lines */}
      {agents.map((agent) => {
        const Icon = agent.icon;
        const angleRad = (agent.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * RADIUS;
        const y = Math.sin(angleRad) * RADIUS;
        return (
          <div
            key={agent.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out z-20"
            style={{
              left: hasSpread ? `calc(50% + ${x}px)` : '50%',
              top: hasSpread ? `calc(50% + ${y}px)` : '50%',
              transitionDelay: `${agent.delay}s`,
            }}
            onMouseEnter={() => setHoveredAgent(agent.id)}
            onMouseLeave={() => setHoveredAgent(null)}
          >
            <div
              className="relative group cursor-pointer transition-opacity duration-1000 ease-out"
              style={{
                opacity: hasSpread ? 1 : 0.1,
                transitionDelay: `${agent.delay}s`,
                transform: `scale(${TILE_SCALE})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg transform group-hover:scale-110 transition-transform duration-300" />
              <div
                className={`relative bg-black/60 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${
                  hoveredAgent === agent.id
                    ? 'border-cyan-400/60 scale-105 shadow-lg shadow-cyan-400/20'
                    : 'border-cyan-400/20'
                }`}
                style={{
                  animation: hasSpread
                    ? `float 4s ease-in-out infinite ${agent.delay}s`
                    : 'none',
                }}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <Icon className="w-10 h-10 text-cyan-400" />
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md animate-pulse" />
                  </div>
                  <div className="text-center">
                    <h4 className="text-base font-semibold text-cyan-300 mb-1">
                      {agent.name}
                    </h4>
                    <p className="text-sm text-cyan-300/60">
                      {agent.description}
                    </p>
                  </div>

                  {/* Status indicator */}
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm text-green-400">Active</span>
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
