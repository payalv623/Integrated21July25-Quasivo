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

const RADIUS = 400; // Distance from center (increased for more space)
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
      {/* Render L-shaped lines from center to each tile, behind video and tiles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {hasSpread && agents.map((agent) => {
          const angleRad = (agent.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * RADIUS;
          const y = Math.sin(angleRad) * RADIUS;
          // L-shape: first vertical, then horizontal, both segments should meet at the tile edge
          // The tile size is scaled, so let's estimate half the tile size (radius) for offset
          const TILE_HALF = 60 * TILE_SCALE / 2; // 60px is approx tile size
          // The L will go vertical to y, then horizontal to x
          // To make the line touch the tile, extend the horizontal segment to the tile center
          const isHovered = hoveredAgent === agent.id;
          // The vertical segment goes from (0,0) to (0, y)
          // The horizontal segment goes from (0, y) to (x, y)
          // To make the glow seamless, use the same color and shadow for both segments
          // Arrow (particle) animation
          // We'll animate an arrow along the L path: first down/up, then right/left
          // Use CSS keyframes for a dot/arrow moving from center to tile
          // Glowing O (circle) SVG
          const circleSvg = (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="7" stroke="#22d3ee" strokeWidth="3" fill="none" filter="url(#glow)" />
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
          );
          // Animation duration
          const duration = 1.8 + agent.id * 0.2;
          // For vertical segment: animate from (0,0) to (0, y)
          // For horizontal segment: animate from (0, y) to (x, y)
          // We'll use a single arrow that moves along both segments in sequence
          // Calculate total path length
          const verticalLen = Math.abs(y);
          const horizontalLen = Math.abs(x);
          // Keyframes for vertical then horizontal
          // We'll use inline style for the animation
          // The arrow moves down vertical, then right horizontal
          // Use a wrapper div for the arrow, and animate its top/left
          // We'll use a CSS animation for this effect
          return (
            <div
              key={agent.id + '-l-line'}
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{ width: 0, height: 0 }}
            >
              {/* Vertical segment */}
              <div
                className={`absolute w-1 ${isHovered ? 'bg-cyan-300 shadow-[0_0_24px_8px_rgba(34,211,238,0.8)]' : 'bg-gradient-to-b from-cyan-400/40 to-transparent'} origin-top transition-all duration-300`}
                style={{
                  height: verticalLen,
                  left: 0,
                  top: 0,
                  transform: `translateY(${y < 0 ? y : 0}px)`,
                  zIndex: 0,
                  opacity: hasSpread ? 1 : 0,
                  transitionDelay: `${agent.delay + 0.5}s`,
                }}
              />
              {/* Horizontal segment */}
              <div
                className={`absolute h-1 ${isHovered ? 'bg-cyan-300 shadow-[0_0_24px_8px_rgba(34,211,238,0.8)]' : 'bg-gradient-to-r from-cyan-400/40 to-transparent'} origin-left transition-all duration-300`}
                style={{
                  width: horizontalLen,
                  left: 0,
                  top: y,
                  transform: `translateX(${x < 0 ? x : 0}px)`,
                  zIndex: 0,
                  opacity: hasSpread ? 1 : 0,
                  transitionDelay: `${agent.delay + 0.5}s`,
                }}
              />
              {/* Moving O particle */}
              <style>{`
                @keyframes moveO${agent.id} {
                  0% {
                    top: 0px;
                    left: 0px;
                    opacity: 0;
                  }
                  10% {
                    opacity: 1;
                  }
                  50% {
                    top: ${y}px;
                    left: 0px;
                    opacity: 1;
                  }
                  60% {
                    opacity: 1;
                  }
                  100% {
                    top: ${y}px;
                    left: ${x}px;
                    opacity: 0;
                  }
                }
              `}</style>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 18,
                  height: 18,
                  zIndex: 2,
                  pointerEvents: 'none',
                  animation: `moveO${agent.id} ${duration}s linear infinite`,
                  filter: 'drop-shadow(0 0 12px #22d3ee)',
                  opacity: hasSpread ? 1 : 0,
                  transition: 'opacity 0.5s',
                  transitionDelay: `${agent.delay + 0.5}s`,
                }}
              >
                {circleSvg}
              </div>
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
