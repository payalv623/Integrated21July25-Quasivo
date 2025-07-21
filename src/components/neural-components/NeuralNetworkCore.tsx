import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface NeuralNetworkCoreProps {
  phase: 'scanning' | 'processing' | 'output' | 'learning';
  isVisible: boolean;
  cycleCount: number;
}

interface NodeData {
  id: string;
  x: number;
  y: number;
  layer: number;
  activation: number;
  label?: string;
}

interface ConnectionData {
  from: string;
  to: string;
  weight: number;
  active: boolean;
  strength: 'weak' | 'normal' | 'strong'; // For visual distinction
}

const NeuralNetworkCore: React.FC<NeuralNetworkCoreProps> = ({ phase, isVisible, cycleCount }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<NodeData[]>([]);
  const connectionsRef = useRef<ConnectionData[]>([]);

  // Initialize network structure
  useEffect(() => {
    // Input layer (4 nodes)
    const inputNodes: NodeData[] = [
      { id: 'i1', x: 100, y: 80, layer: 0, activation: 0, label: 'Skills' },
      { id: 'i2', x: 100, y: 160, layer: 0, activation: 0, label: 'Experience' },
      { id: 'i3', x: 100, y: 240, layer: 0, activation: 0, label: 'Education' },
      { id: 'i4', x: 100, y: 320, layer: 0, activation: 0, label: 'Projects' }
    ];

    // Hidden layer 1 (6 nodes)
    const hidden1Nodes: NodeData[] = [
      { id: 'h1_1', x: 250, y: 60, layer: 1, activation: 0, label: 'Tech Skills' },
      { id: 'h1_2', x: 250, y: 120, layer: 1, activation: 0, label: 'Leadership' },
      { id: 'h1_3', x: 250, y: 180, layer: 1, activation: 0, label: 'Problem Solving' },
      { id: 'h1_4', x: 250, y: 240, layer: 1, activation: 0, label: 'Communication' },
      { id: 'h1_5', x: 250, y: 300, layer: 1, activation: 0, label: 'Adaptability' },
      { id: 'h1_6', x: 250, y: 360, layer: 1, activation: 0, label: 'Innovation' }
    ];

    // Hidden layer 2 (4 nodes)
    const hidden2Nodes: NodeData[] = [
      { id: 'h2_1', x: 400, y: 100, layer: 2, activation: 0, label: 'Cultural Fit' },
      { id: 'h2_2', x: 400, y: 180, layer: 2, activation: 0, label: 'Technical Fit' },
      { id: 'h2_3', x: 400, y: 260, layer: 2, activation: 0, label: 'Growth Potential' },
      { id: 'h2_4', x: 400, y: 340, layer: 2, activation: 0, label: 'Team Dynamics' }
    ];

    // Output layer (3 nodes)
    const outputNodes: NodeData[] = [
      { id: 'o1', x: 550, y: 140, layer: 3, activation: 0, label: 'Skill Match' },
      { id: 'o2', x: 550, y: 220, layer: 3, activation: 0, label: 'Cultural Fit' },
      { id: 'o3', x: 550, y: 300, layer: 3, activation: 0, label: 'Recommendation' }
    ];

    nodesRef.current = [...inputNodes, ...hidden1Nodes, ...hidden2Nodes, ...outputNodes];

    // Create custom connections based on the specified structure
    const connections: ConnectionData[] = [];
    
    // Input to Hidden Layer 1 - Fully connected with varying strengths
    const inputToHidden1 = [
      // Skills (i1) connections - strong to Tech Skills
      { from: 'i1', to: 'h1_1', weight: 0.8, strength: 'strong' as const, active: false },
      { from: 'i1', to: 'h1_2', weight: 0.4, strength: 'normal' as const, active: false },
      { from: 'i1', to: 'h1_3', weight: 0.5, strength: 'normal' as const, active: false },
      { from: 'i1', to: 'h1_4', weight: 0.3, strength: 'normal' as const, active: false },
      { from: 'i1', to: 'h1_5', weight: 0.4, strength: 'normal' as const, active: false },
      { from: 'i1', to: 'h1_6', weight: 0.6, strength: 'normal' as const, active: false },

      // Experience (i2) connections - strong to Leadership & Problem Solving
      { from: 'i2', to: 'h1_1', weight: 0.5, strength: 'normal' as const, active: false },
      { from: 'i2', to: 'h1_2', weight: 0.9, strength: 'strong' as const, active: false },
      { from: 'i2', to: 'h1_3', weight: 0.8, strength: 'strong' as const, active: false },
      { from: 'i2', to: 'h1_4', weight: 0.6, strength: 'normal' as const, active: false },
      { from: 'i2', to: 'h1_5', weight: 0.7, strength: 'normal' as const, active: false },
      { from: 'i2', to: 'h1_6', weight: 0.5, strength: 'normal' as const, active: false },

      // Education (i3) connections - strong to Tech Skills & Communication
      { from: 'i3', to: 'h1_1', weight: 0.8, strength: 'strong' as const, active: false },
      { from: 'i3', to: 'h1_2', weight: 0.4, strength: 'normal' as const, active: false },
      { from: 'i3', to: 'h1_3', weight: 0.5, strength: 'normal' as const, active: false },
      { from: 'i3', to: 'h1_4', weight: 0.8, strength: 'strong' as const, active: false },
      { from: 'i3', to: 'h1_5', weight: 0.3, strength: 'normal' as const, active: false },
      { from: 'i3', to: 'h1_6', weight: 0.4, strength: 'normal' as const, active: false },

      // Projects (i4) connections - strong to Problem Solving & Innovation
      { from: 'i4', to: 'h1_1', weight: 0.6, strength: 'normal' as const, active: false },
      { from: 'i4', to: 'h1_2', weight: 0.5, strength: 'normal' as const, active: false },
      { from: 'i4', to: 'h1_3', weight: 0.9, strength: 'strong' as const, active: false },
      { from: 'i4', to: 'h1_4', weight: 0.4, strength: 'normal' as const, active: false },
      { from: 'i4', to: 'h1_5', weight: 0.6, strength: 'normal' as const, active: false },
      { from: 'i4', to: 'h1_6', weight: 0.9, strength: 'strong' as const, active: false }
    ];

    // Hidden Layer 1 to Hidden Layer 2 - Selective connections
    const hidden1ToHidden2 = [
      // Tech Skills (h1_1) → Technical Fit (h2_2)
      { from: 'h1_1', to: 'h2_2', weight: 0.9, strength: 'strong' as const, active: false },

      // Leadership (h1_2) → Cultural Fit (h2_1), Team Dynamics (h2_4)
      { from: 'h1_2', to: 'h2_1', weight: 0.8, strength: 'strong' as const, active: false },
      { from: 'h1_2', to: 'h2_4', weight: 0.8, strength: 'strong' as const, active: false },

      // Problem Solving (h1_3) → Technical Fit (h2_2), Growth Potential (h2_3)
      { from: 'h1_3', to: 'h2_2', weight: 0.7, strength: 'normal' as const, active: false },
      { from: 'h1_3', to: 'h2_3', weight: 0.8, strength: 'strong' as const, active: false },

      // Communication (h1_4) → Cultural Fit (h2_1), Team Dynamics (h2_4)
      { from: 'h1_4', to: 'h2_1', weight: 0.8, strength: 'strong' as const, active: false },
      { from: 'h1_4', to: 'h2_4', weight: 0.9, strength: 'strong' as const, active: false },

      // Adaptability (h1_5) → Growth Potential (h2_3), Team Dynamics (h2_4)
      { from: 'h1_5', to: 'h2_3', weight: 0.8, strength: 'strong' as const, active: false },
      { from: 'h1_5', to: 'h2_4', weight: 0.7, strength: 'normal' as const, active: false },

      // Innovation (h1_6) → Growth Potential (h2_3), Technical Fit (h2_2)
      { from: 'h1_6', to: 'h2_3', weight: 0.9, strength: 'strong' as const, active: false },
      { from: 'h1_6', to: 'h2_2', weight: 0.6, strength: 'normal' as const, active: false }
    ];

    // Hidden Layer 2 to Output - Direct logical connections
    const hidden2ToOutput = [
      // Cultural Fit (h2_1) → Cultural Fit (o2)
      { from: 'h2_1', to: 'o2', weight: 0.9, strength: 'strong' as const, active: false },

      // Technical Fit (h2_2) → Skill Match (o1)
      { from: 'h2_2', to: 'o1', weight: 0.9, strength: 'strong' as const, active: false },

      // Growth Potential (h2_3) → Recommendation (o3)
      { from: 'h2_3', to: 'o3', weight: 0.8, strength: 'strong' as const, active: false },

      // Team Dynamics (h2_4) → Cultural Fit (o2), Recommendation (o3)
      { from: 'h2_4', to: 'o2', weight: 0.7, strength: 'normal' as const, active: false },
      { from: 'h2_4', to: 'o3', weight: 0.8, strength: 'strong' as const, active: false }
    ];

    // Combine all connections
    connections.push(...inputToHidden1, ...hidden1ToHidden2, ...hidden2ToOutput);
    
    // Add active property to all connections
    connectionsRef.current = connections.map(conn => ({ ...conn, active: false }));
  }, []);

  // Reset network state when cycle changes
  useEffect(() => {
    const nodes = nodesRef.current;
    nodes.forEach(node => node.activation = 0);
    
    if (svgRef.current) {
      gsap.set('.neural-node', { scale: 1, opacity: 0.3 });
      gsap.set('.neural-connection', { opacity: 0.1, strokeWidth: 1 });
      // Remove any existing particles
      const particles = svgRef.current.querySelectorAll('.data-particle, .backprop-particle');
      particles.forEach(particle => particle.remove());
    }
  }, [cycleCount]);

  // Animation effects based on phase
  useEffect(() => {
    if (!isVisible || !svgRef.current) return;

    switch (phase) {
      case 'scanning':
        // Dim the network during scanning
        gsap.to('.neural-node', { opacity: 0.3, scale: 1, duration: 2 });
        gsap.to('.neural-connection', { opacity: 0.1, duration: 2 });
        break;

      case 'processing':
        animateForwardPass();
        break;

      case 'output':
        animateOutputActivation();
        break;

      case 'learning':
        animateBackpropagation();
        break;
    }
  }, [phase, isVisible, cycleCount]);

  const animateForwardPass = () => {
    const timeline = gsap.timeline();
    
    // Step 1: Activate input layer slowly (2 seconds)
    timeline.to('.input-node', {
      scale: 1.4,
      opacity: 1,
      duration: 0.8,
      stagger: 0.3,
      ease: "power2.out"
    });

    // Step 2: Data flow from input to hidden1 (3 seconds)
    timeline.call(() => {
      animateDataFlow(0, 1, 3); // Input to Hidden1
    }, [], 1);

    // Step 3: Data flow from hidden1 to hidden2 (3 seconds)
    timeline.call(() => {
      animateDataFlow(1, 2, 3); // Hidden1 to Hidden2
    }, [], 4);

    // Step 4: Data flow from hidden2 to output (3 seconds)
    timeline.call(() => {
      animateDataFlow(2, 3, 3); // Hidden2 to Output
    }, [], 7);
  };

  const animateDataFlow = (fromLayer: number, toLayer: number, duration: number = 2) => {
    const fromNodes = nodesRef.current.filter(n => n.layer === fromLayer);
    const toNodes = nodesRef.current.filter(n => n.layer === toLayer);
    
    // Get only the connections that exist in our custom structure
    const relevantConnections = connectionsRef.current.filter(
      conn => {
        const fromNode = nodesRef.current.find(n => n.id === conn.from);
        const toNode = nodesRef.current.find(n => n.id === conn.to);
        return fromNode?.layer === fromLayer && toNode?.layer === toLayer;
      }
    );

    // Activate connections with different intensities based on strength
    relevantConnections.forEach((conn, i) => {
      const opacity = conn.strength === 'strong' ? 0.8 : conn.strength === 'normal' ? 0.5 : 0.3;
      const strokeWidth = conn.strength === 'strong' ? 4 : conn.strength === 'normal' ? 2.5 : 1.5;
      
      gsap.to(`[data-connection="${conn.from}-${conn.to}"]`, {
        opacity: opacity,
        strokeWidth: strokeWidth,
        delay: i * 0.05,
        duration: 0.8
      });
    });
    
    // Create and animate particles only for existing connections
    relevantConnections.forEach((conn, i) => {
      const fromNode = nodesRef.current.find(n => n.id === conn.from);
      const toNode = nodesRef.current.find(n => n.id === conn.to);
      
      if (!fromNode || !toNode) return;
      
      // Create particles based on connection strength
      const particleCount = conn.strength === 'strong' ? 3 : conn.strength === 'normal' ? 2 : 1;
      
      for (let k = 0; k < particleCount; k++) {
        setTimeout(() => {
          const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          particle.setAttribute('r', conn.strength === 'strong' ? '5' : '4');
          particle.setAttribute('fill', conn.strength === 'strong' ? '#06b6d4' : '#3b82f6');
          particle.setAttribute('cx', fromNode.x.toString());
          particle.setAttribute('cy', fromNode.y.toString());
          particle.classList.add('data-particle');
          particle.style.filter = `drop-shadow(0 0 6px ${conn.strength === 'strong' ? '#06b6d4' : '#3b82f6'})`;
          
          if (svgRef.current) {
            svgRef.current.appendChild(particle);
            
            gsap.to(particle, {
              attr: { cx: toNode.x, cy: toNode.y },
              opacity: 0,
              duration: duration * 0.6,
              delay: i * 0.1,
              ease: "power1.inOut",
              onComplete: () => {
                particle.remove();
                // Activate target node
                gsap.to(`[data-node-id="${toNode.id}"]`, {
                  scale: 1.3,
                  opacity: 1,
                  duration: 0.5,
                  ease: "back.out(1.7)"
                });
              }
            });
          }
        }, k * 150);
      }
    });
  };

  const animateOutputActivation = () => {
    const outputNodes = nodesRef.current.filter(n => n.layer === 3);
    
    outputNodes.forEach((node, i) => {
      const activation = Math.random() * 0.4 + 0.6; // 60-100%
      node.activation = activation;
      
      gsap.to(`[data-node-id="${node.id}"]`, {
        scale: 1.6,
        opacity: 1,
        delay: i * 0.5,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      });
    });
  };

  const animateBackpropagation = () => {
    const timeline = gsap.timeline();
    
    // Reverse flow animation with purple particles
    timeline.call(() => {
      animateBackwardFlow(3, 2, 1.5); // Output to Hidden2
    });

    timeline.call(() => {
      animateBackwardFlow(2, 1, 1.5); // Hidden2 to Hidden1
    }, [], 1);

    timeline.call(() => {
      animateBackwardFlow(1, 0, 1.5); // Hidden1 to Input
    }, [], 2);
  };

  const animateBackwardFlow = (fromLayer: number, toLayer: number, duration: number = 1) => {
    // Get only the connections that exist in our custom structure (reversed)
    const relevantConnections = connectionsRef.current.filter(
      conn => {
        const fromNode = nodesRef.current.find(n => n.id === conn.from);
        const toNode = nodesRef.current.find(n => n.id === conn.to);
        return fromNode?.layer === toLayer && toNode?.layer === fromLayer;
      }
    );

    relevantConnections.forEach((conn, i) => {
      const fromNode = nodesRef.current.find(n => n.id === conn.to); // Reversed
      const toNode = nodesRef.current.find(n => n.id === conn.from); // Reversed
      
      if (!fromNode || !toNode) return;
      
      // Create backward flowing particle
      const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      particle.setAttribute('r', '3');
      particle.setAttribute('fill', '#a855f7');
      particle.setAttribute('cx', fromNode.x.toString());
      particle.setAttribute('cy', fromNode.y.toString());
      particle.classList.add('backprop-particle');
      particle.style.filter = 'drop-shadow(0 0 4px #a855f7)';
      
      if (svgRef.current) {
        svgRef.current.appendChild(particle);
        
        gsap.to(particle, {
          attr: { cx: toNode.x, cy: toNode.y },
          opacity: 0,
          duration: duration,
          delay: i * 0.08,
          ease: "power2.out",
          onComplete: () => particle.remove()
        });
      }
    });

    // Update connection weights visually
    relevantConnections.forEach(conn => {
      conn.weight += (Math.random() - 0.5) * 0.1; // Smaller weight adjustment
      const newOpacity = conn.strength === 'strong' ? 0.6 : conn.strength === 'normal' ? 0.4 : 0.2;
      const newStrokeWidth = conn.strength === 'strong' ? 3 : conn.strength === 'normal' ? 2 : 1;
      
      gsap.to(`[data-connection="${conn.from}-${conn.to}"]`, {
        strokeWidth: newStrokeWidth,
        opacity: newOpacity,
        duration: 0.8
      });
    });
  };

  const getNodeColor = (node: NodeData) => {
    if (node.layer === 0) return '#06b6d4'; // Cyan for input
    if (node.layer === 3) return '#10b981'; // Green for output
    return '#8b5cf6'; // Purple for hidden layers
  };

  const getConnectionColor = (connection: ConnectionData) => {
    if (connection.strength === 'strong') return '#06b6d4';
    if (connection.strength === 'normal') return '#3b82f6';
    return '#6b7280';
  };

  return (
    <div className="relative w-full h-96">
      <svg
        ref={svgRef}
        viewBox="0 0 650 420"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definitions */}
        <defs>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="70%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
          </radialGradient>
          
          <linearGradient id="strongConnection" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
          
          <linearGradient id="normalConnection" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
          </linearGradient>
          
          <linearGradient id="weakConnection" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6b7280" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Render Connections */}
        {connectionsRef.current.map(connection => {
          const fromNode = nodesRef.current.find(n => n.id === connection.from);
          const toNode = nodesRef.current.find(n => n.id === connection.to);
          
          if (!fromNode || !toNode) return null;
          
          const gradientId = connection.strength === 'strong' ? 'strongConnection' : 
                           connection.strength === 'normal' ? 'normalConnection' : 'weakConnection';
          
          return (
            <line
              key={`${connection.from}-${connection.to}`}
              data-connection={`${connection.from}-${connection.to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={`url(#${gradientId})`}
              strokeWidth={connection.strength === 'strong' ? "2" : connection.strength === 'normal' ? "1.5" : "1"}
              opacity="0.1"
              className="neural-connection transition-all duration-500"
            />
          );
        })}

        {/* Render Nodes */}
        {nodesRef.current.map(node => (
          <g key={node.id}>
            <circle
              data-node-id={node.id}
              cx={node.x}
              cy={node.y}
              r="14"
              fill={getNodeColor(node)}
              opacity="0.3"
              className={`neural-node ${node.layer === 0 ? 'input-node' : ''} transition-all duration-500`}
              style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
            />
            
            {/* Node Labels */}
            {node.label && (
              <text
                x={node.x}
                y={node.y - 25}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                className="font-medium opacity-70"
              >
                {node.label}
              </text>
            )}
            
            {/* Activation Values */}
            {node.activation > 0 && (
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fill="white"
                fontSize="9"
                className="font-bold"
              >
                {Math.round(node.activation * 100)}%
              </text>
            )}
          </g>
        ))}

        {/* Layer Labels */}
        <text x="100" y="30" textAnchor="middle" fill="#06b6d4" fontSize="14" className="font-semibold">
          
        </text>
        <text x="250" y="30" textAnchor="middle" fill="#8b5cf6" fontSize="14" className="font-semibold">
          
        </text>
        <text x="400" y="30" textAnchor="middle" fill="#8b5cf6" fontSize="14" className="font-semibold">
          
        </text>
        <text x="550" y="30" textAnchor="middle" fill="#10b981" fontSize="14" className="font-semibold">
          
        </text>
      </svg>

      {/* Phase Status */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
          <span className="text-white font-medium">
            {phase === 'scanning' && 'Network Ready - Waiting for Data...'}
            {phase === 'processing' && 'Processing Data Through Neural Layers...'}
            {phase === 'output' && 'Generating Predictions...'}
            {phase === 'learning' && 'Updating Weights - Learning from Feedback...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetworkCore;