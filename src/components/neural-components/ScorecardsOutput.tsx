import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface ScorecardsOutputProps {
  phase: 'scanning' | 'processing' | 'output' | 'learning';
  isVisible: boolean;
  cycleCount: number;
}

interface ScoreData {
  id: string;
  label: string;
  value: number;
  maxValue: number;
  color: string;
  icon: string;
  description: string;
}

const ScorecardsOutput: React.FC<ScorecardsOutputProps> = ({ phase, isVisible, cycleCount }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scores, setScores] = useState<ScoreData[]>([
    {
      id: 'skill-match',
      label: 'Skill Match',
      value: 0,
      maxValue: 100,
      color: '#06b6d4',
      icon: '🎯',
      description: 'Technical skills alignment'
    },
    {
      id: 'cultural-fit',
      label: 'Cultural Fit',
      value: 0,
      maxValue: 100,
      color: '#8b5cf6',
      icon: '🤝',
      description: 'Team and company culture match'
    },
    {
      id: 'growth-potential',
      label: 'Growth Potential',
      value: 0,
      maxValue: 100,
      color: '#10b981',
      icon: '📈',
      description: 'Learning and development capacity'
    },
    {
      id: 'communication',
      label: 'Communication',
      value: 0,
      maxValue: 100,
      color: '#f59e0b',
      icon: '💬',
      description: 'Communication and collaboration skills'
    }
  ]);

  const [recommendation, setRecommendation] = useState<{
    status: 'pending' | 'approved' | 'rejected';
    confidence: number;
    reasoning: string[];
  }>({
    status: 'pending',
    confidence: 0,
    reasoning: []
  });

  // Reset scores when new cycle starts
  useEffect(() => {
    setScores(prevScores => 
      prevScores.map(score => ({ ...score, value: 0 }))
    );
    setRecommendation({
      status: 'pending',
      confidence: 0,
      reasoning: []
    });
  }, [cycleCount]);

  useEffect(() => {
    if (!isVisible) return;

    // Always show the container
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 1,
        ease: "power2.out"
      });
    }

    if (phase === 'output') {
      animateScoreCards();
    } else if (phase === 'learning') {
      generateRecommendation();
    }
  }, [phase, isVisible, cycleCount]);

  const animateScoreCards = () => {
    const targetScores = [88, 76, 82, 79]; // Target values for each score
    
    scores.forEach((score, index) => {
      const targetValue = targetScores[index];
      
      // Slow counter animation (4 seconds)
      gsap.to(score, {
        value: targetValue,
        duration: 4,
        delay: index * 0.8,
        ease: "power2.out",
        onUpdate: function() {
          setScores(prevScores => 
            prevScores.map(s => 
              s.id === score.id 
                ? { ...s, value: Math.round(this.targets()[0].value) }
                : s
            )
          );
        }
      });

      // Card entrance animation
      gsap.fromTo(`[data-score-card="${score.id}"]`,
        { y: 50, opacity: 0, scale: 0.8 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 1.2, 
          delay: index * 0.4,
          ease: "back.out(1.7)"
        }
      );
    });
  };

  const generateRecommendation = () => {
    const averageScore = scores.reduce((sum, score) => sum + score.value, 0) / scores.length;
    
    let status: 'approved' | 'rejected' = averageScore >= 75 ? 'approved' : 'rejected';
    let confidence = Math.min(95, Math.max(60, averageScore + Math.random() * 10));
    
    const reasoning = [
      `Strong technical skills match (${scores[0].value}%)`,
      `Good cultural alignment (${scores[1].value}%)`,
      `High growth potential (${scores[2].value}%)`,
      averageScore >= 80 ? 'Exceeds minimum requirements' : 'Meets basic requirements'
    ];

    setRecommendation({ status, confidence, reasoning });

    // Animate recommendation card
    gsap.fromTo('[data-recommendation]',
      { y: 30, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1.5, 
        ease: "elastic.out(1, 0.5)"
      }
    );
  };

  const getScoreColor = (value: number, baseColor: string) => {
    if (value >= 80) return '#10b981'; // Green
    if (value >= 60) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  const CircularProgress: React.FC<{ score: ScoreData }> = ({ score }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score.value / score.maxValue) * circumference;

    return (
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="6"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={getScoreColor(score.value, score.color)}
            strokeWidth="6"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${getScoreColor(score.value, score.color)})`
            }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            {score.value}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="w-full max-w-sm space-y-4">
      {/* Score Cards */}
      <div className="space-y-3">
        {scores.map((score) => (
          <div
            key={score.id}
            data-score-card={score.id}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-2xl opacity-0"
          >
            <div className="flex items-center space-x-4">
              {/* Icon and Progress */}
              <div className="flex-shrink-0">
                <div className="text-2xl mb-2">{score.icon}</div>
                <CircularProgress score={score} />
              </div>
              
              {/* Score Info */}
              <div className="flex-1">
                <h4 className="text-white font-semibold text-lg">{score.label}</h4>
                <p className="text-gray-300 text-sm mb-2">{score.description}</p>
                
                {/* Score Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${score.value}%`,
                      backgroundColor: getScoreColor(score.value, score.color),
                      boxShadow: `0 0 8px ${getScoreColor(score.value, score.color)}`
                    }}
                  />
                </div>
                
                {/* Score Value */}
                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-400 text-xs">Score</span>
                  <span 
                    className="font-bold text-sm"
                    style={{ color: getScoreColor(score.value, score.color) }}
                  >
                    {score.value}/{score.maxValue}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation Card */}
      {recommendation.status !== 'pending' && (
        <div
          data-recommendation
          className={`bg-gradient-to-r ${
            recommendation.status === 'approved' 
              ? 'from-green-500/20 to-emerald-500/20 border-green-400/30' 
              : 'from-red-500/20 to-orange-500/20 border-red-400/30'
          } backdrop-blur-md rounded-xl p-6 border shadow-2xl opacity-0`}
        >
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">
              {recommendation.status === 'approved' ? '✅' : '❌'}
            </div>
            <h3 className="text-xl font-bold text-white">
              {recommendation.status === 'approved' ? 'Recommended' : 'Not Recommended'}
            </h3>
            <p className="text-gray-300">
              Confidence: {Math.round(recommendation.confidence)}%
            </p>
          </div>

          {/* Reasoning */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-sm">Key Factors:</h4>
            {recommendation.reasoning.map((reason, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-cyan-400 text-xs mt-1">•</span>
                <span className="text-gray-300 text-xs">{reason}</span>
              </div>
            ))}
          </div>

          {/* Confidence Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-400 text-xs">Confidence Level</span>
              <span className="text-white text-xs font-medium">
                {Math.round(recommendation.confidence)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                  recommendation.status === 'approved' 
                    ? 'bg-green-400 shadow-lg shadow-green-400/50' 
                    : 'bg-red-400 shadow-lg shadow-red-400/50'
                }`}
                style={{ width: `${recommendation.confidence}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Phase Status */}
      <div className="absolute -bottom-12 left-0 right-0 text-center">
        <div className="inline-flex items-center space-x-2">
          {(phase === 'scanning' || phase === 'processing') && (
            <>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-400">Waiting for Analysis...</span>
            </>
          )}
          {phase === 'output' && (
            <>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-blue-400">Generating Scores...</span>
            </>
          )}
          {phase === 'learning' && (
            <>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-400">Final Recommendation Ready</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScorecardsOutput;