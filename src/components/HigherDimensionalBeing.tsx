
import { useEffect, useState } from "react";

export const HigherDimensionalBeing = () => {
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Core consciousness */}
      <div className="relative">
        {/* Outer energy field */}
        <div 
          className="absolute inset-0 w-96 h-96 rounded-full"
          style={{
            background: `conic-gradient(from ${pulsePhase}deg, 
              transparent, 
              rgba(59, 130, 246, 0.1), 
              rgba(147, 51, 234, 0.1), 
              rgba(59, 130, 246, 0.1), 
              transparent)`,
            filter: 'blur(2px)',
            transform: `rotate(${pulsePhase * 0.5}deg) scale(${1 + Math.sin(pulsePhase * 0.05) * 0.1})`,
          }}
        />
        
        {/* Middle energy ring */}
        <div 
          className="absolute inset-8 rounded-full border border-cyan-400/20"
          style={{
            boxShadow: `0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 30px rgba(59, 130, 246, 0.1)`,
            transform: `rotate(-${pulsePhase * 0.3}deg)`,
          }}
        />
        
        {/* Inner core */}
        <div 
          className="absolute inset-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20"
          style={{
            boxShadow: `0 0 50px rgba(59, 130, 246, 0.4)`,
            transform: `scale(${1 + Math.sin(pulsePhase * 0.03) * 0.05})`,
          }}
        />
        
        {/* Neural network lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent origin-left"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 30 + pulsePhase * 0.2}deg)`,
              opacity: 0.3 + Math.sin((pulsePhase + i * 30) * 0.1) * 0.3,
            }}
          />
        ))}
        
        {/* Dimensional rifts */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`rift-${i}`}
            className="absolute w-1 bg-gradient-to-t from-transparent via-purple-400/60 to-transparent"
            style={{
              height: `${60 + Math.sin(pulsePhase * 0.02 + i) * 20}px`,
              left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
              top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
              transform: `rotate(${i * 60 + pulsePhase * 0.1}deg)`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>
    </div>
  );
};
