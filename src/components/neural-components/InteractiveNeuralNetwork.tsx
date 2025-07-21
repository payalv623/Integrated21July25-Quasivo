import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import NeuralNetworkCore from './NeuralNetworkCore';
import ResumeScanner from './ResumeScanner';
import ScorecardsOutput from './ScorecardsOutput';
import { Link } from "react-router-dom";
import logo from "../../assets/images/LOGO.png";


interface InteractiveNeuralNetworkProps {
  className?: string;
}

const InteractiveNeuralNetwork: React.FC<InteractiveNeuralNetworkProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPhase, setCurrentPhase] = useState<'scanning' | 'processing' | 'output' | 'learning'>('scanning');
  const [isVisible, setIsVisible] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Intersection Observer for initial trigger
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startContinuousAnimation();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const startContinuousAnimation = () => {
    // Initial fade in animation
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2, ease: "power2.out" }
    );

    // Start the continuous loop
    runAnimationCycle();
  };

  const runAnimationCycle = () => {
    const timeline = gsap.timeline({ 
      delay: 1,
      onComplete: () => {
        setCycleCount(prev => prev + 1);
        // Restart the cycle after a brief pause
        setTimeout(() => runAnimationCycle(), 2000);
      }
    });
    
    timeline
      // Phase 1: Scanning (8 seconds)
      .call(() => setCurrentPhase('scanning'))
      .to({}, { duration: 8 })
      
      // Phase 2: Processing through neural network (12 seconds)
      .call(() => setCurrentPhase('processing'))
      .to({}, { duration: 12 })
      
      // Phase 3: Output generation (6 seconds)
      .call(() => setCurrentPhase('output'))
      .to({}, { duration: 6 })
      
      // Phase 4: Learning/Feedback (4 seconds)
      .call(() => setCurrentPhase('learning'))
      .to({}, { duration: 4 });
  };

  const getPhaseDescription = () => {
    switch (currentPhase) {
      case 'scanning':
        return 'AI Resume Parsing & Virtual Interview Setup...';
      case 'processing':
        return 'Comprehensive Skill Assessment & Behavioral Analysis...';
      case 'output':
        return 'Generating Hiring Recommendations & Interview Insights...';
      case 'learning':
        return 'Continuous Learning from Hiring Outcomes & Feedback...';
      default:
        return '';
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden ${className}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <Link to="/">
      <img
        src={logo}
        alt="Quasivo"
        className="
          w-auto 
          mt-1 sm:mt-5 md:mt-6 lg:mt-8 xl:mt-4 xl:ml-1
          h-[3rem] sm:h-[4rem] md:h-[5rem] lg:h-[6rem] xl:h-[5rem] 
          max-w-[12rem] opacity-90
        "
      />
    </Link>


      {/* Section Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-20">
        <h1 className="text-5xl font-bold text-white mb-2">
          KnackHire
        </h1>
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
          End-to-End AI Hiring Platform
        </h2>
        <p className="text-lg text-gray-300 max-w-4xl mb-2">
          Complete hiring solution with AI-powered resume screening, virtual interviews, 
          skill assessments, and automated candidate evaluation
        </p>
        <div className="flex justify-center space-x-6 text-sm text-gray-400">
          <span>📄 Resume Analysis</span>
          <span>🎥 Virtual Interviews</span>
          <span>🧠 AI Assessment</span>
          <span>📊 Smart Scoring</span>
          <span>🤝 Team Collaboration</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8 p-8 pt-32 min-h-screen">
        
        {/* Resume Scanner Section */}
        <div className="lg:col-span-1 flex items-center justify-center">
          <ResumeScanner 
            phase={currentPhase}
            isVisible={isVisible}
            cycleCount={cycleCount}
          />
        </div>

        {/* Neural Network Core Section */}
        <div className="lg:col-span-2 flex items-center justify-center">
          <NeuralNetworkCore 
            phase={currentPhase}
            isVisible={isVisible}
            cycleCount={cycleCount}
          />
        </div>

        {/* Scorecards Output Section */}
        <div className="lg:col-span-1 flex items-center justify-center">
          <ScorecardsOutput 
            phase={currentPhase}
            isVisible={isVisible}
            cycleCount={cycleCount}
          />
        </div>
      </div>

      {/* Phase Indicator and Description */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-20">
        <div className="flex justify-center space-x-4 mb-4">
          {['scanning', 'processing', 'output', 'learning'].map((phase, index) => (
            <div
              key={phase}
              className={`w-4 h-4 rounded-full transition-all duration-500 ${
                currentPhase === phase 
                  ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50 scale-125' 
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
          <p className="text-white font-medium text-lg">
            {getPhaseDescription()}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Cycle {cycleCount + 1} • Continuous Learning Process
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveNeuralNetwork;