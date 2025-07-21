import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FileText, Upload, Check } from 'lucide-react';

interface ResumeScannerProps {
  phase: 'scanning' | 'processing' | 'output' | 'learning';
  isVisible: boolean;
  cycleCount: number;
}

const ResumeScanner: React.FC<ResumeScannerProps> = ({ phase, isVisible, cycleCount }) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const [detectedKeywords, setDetectedKeywords] = useState<string[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showResume, setShowResume] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  
  const keywords = [
    'JavaScript', 'React', 'Node.js', 'Team Leader', 
    'Problem Solving', 'Communication', 'Python', 'AWS'
  ];

  const resumeContent = {
    name: "Hemanth Kumar Chittiprolu",
    title: "AI/ML Engineer",
    experience: "Fresher",
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
    achievements: [
      "Led team of 8 developers",
      "Google Hackathon Winner",
      "Implemented CI/CD pipeline"
    ]
  };

  // Reset everything when new cycle starts
  useEffect(() => {
    setDetectedKeywords([]);
    setScanProgress(0);
    setUploadProgress(0);
    setShowResume(false);
    setUploadComplete(false);
  }, [cycleCount]);

  useEffect(() => {
    if (!isVisible) return;

    if (phase === 'scanning') {
      // Small delay to ensure component is ready
      setTimeout(() => {
        startUploadAnimation();
      }, 100);
    }
  }, [phase, isVisible, cycleCount]);

  const startUploadAnimation = () => {
    console.log('Starting upload animation...');
    const timeline = gsap.timeline();
    
    // Show upload container with bounce effect
    if (uploadRef.current) {
      timeline.fromTo(uploadRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.7)"
        }
      );
    }

    // Ultra-fast upload progress animation (0.5 seconds)
    timeline.to({}, {
      duration: 0.5,
      ease: "power3.out",
      onUpdate: function() {
        const progress = this.progress();
        setUploadProgress(progress);
      },
      onComplete: () => {
        console.log('Upload complete, setting states...');
        setUploadComplete(true);
        // Show resume after upload completes
        setTimeout(() => {
          console.log('Setting showResume to true...');
          setShowResume(true);
          // Give React time to render the element
          setTimeout(() => {
            showResumeCard();
          }, 50);
        }, 300);
      }
    });
  };

  const showResumeCard = () => {
    console.log('showResumeCard called, resumeRef:', resumeRef.current);
    
    // Hide upload container with smooth scale down
    if (uploadRef.current) {
      gsap.to(uploadRef.current, {
        opacity: 0,
        scale: 0.8,
        y: -20,
        duration: 0.4,
        ease: "power2.in"
      });
    }

    // Show resume card with dramatic entrance - add delay to ensure upload hides first
    if (resumeRef.current) {
      console.log('Animating resume card...');
      gsap.fromTo(resumeRef.current,
        { opacity: 0, y: 30, scale: 0.85, rotationX: 10 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationX: 0,
          duration: 0.8, 
          ease: "back.out(1.2)",
          delay: 0.3,
          onComplete: () => {
            console.log('Resume animation complete');
            // Start scanning after resume is fully visible
            setTimeout(() => {
              startScanningAnimation();
            }, 300);
          }
        }
      );
    } else {
      console.log('Resume ref not found, retrying...');
      // Retry if element not found
      setTimeout(() => {
        showResumeCard();
      }, 100);
    }
  };

  const startScanningAnimation = () => {
    const timeline = gsap.timeline();
    
    // Show scanner line with glow effect
    timeline.fromTo(scannerRef.current,
      { y: -30, opacity: 0, scaleX: 0.5 },
      { 
        y: 0,
        opacity: 1,
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out"
      }
    );

    // Faster scanning motion (4 seconds instead of 6)
    timeline.to(scannerRef.current, {
      y: 350,
      duration: 4,
      ease: "power1.inOut",
      onUpdate: function() {
        const progress = this.progress();
        setScanProgress(progress);
        
        // More responsive keyword detection
        const keywordIndex = Math.floor(progress * keywords.length);
        
        if (keywordIndex < keywords.length && !detectedKeywords.includes(keywords[keywordIndex])) {
          setDetectedKeywords(prev => [...prev, keywords[keywordIndex]]);
          
          // Immediate particle effect - only after keyword is revealed
          setTimeout(() => {
            createParticleEffect(keywords[keywordIndex]);
          }, 200);
        }
      }
    });

    // Hide scanner with fade and scale
    timeline.to(scannerRef.current, {
      opacity: 0,
      scaleX: 0.3,
      duration: 0.6,
      ease: "power2.in"
    });
  };

  const createParticleEffect = (keyword: string) => {
    // Enhanced particle effect with multiple particles
    const particles = document.querySelectorAll(`[data-keyword="${keyword}"]`);
    particles.forEach(particle => {
      // Main glow effect
      gsap.fromTo(particle,
        { scale: 1, opacity: 1 },
        { 
          scale: 1.3, 
          opacity: 0.7, 
          duration: 0.3,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            // Only emit to neural network after keyword is fully revealed
            emitToNeuralNetwork(keyword);
          }
        }
      );

      // Create multiple flying particles only after keyword is revealed
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          createFlyingParticle(particle as HTMLElement);
        }, i * 100);
      }
    });
  };

  const createFlyingParticle = (sourceElement: HTMLElement) => {
    const particle = document.createElement('div');
    particle.className = 'fixed w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/70 z-50';
    
    const rect = sourceElement.getBoundingClientRect();
    
    // Position particle at the source element's location on screen
    particle.style.left = `${rect.left + rect.width/2}px`;
    particle.style.top = `${rect.top + rect.height/2}px`;
    
    // Append to body so it can flow outside the container
    document.body.appendChild(particle);
    
    // Reduced distance - stop at input layer (much shorter distance)
    gsap.to(particle, {
      x: 80 + Math.random() * 30, // Much shorter distance - stops at input layer
      y: Math.random() * 40 - 20,  // Less vertical spread
      opacity: 0,
      scale: 0.5,
      duration: 0.8, // Shorter duration
      ease: "power2.out",
      onComplete: () => particle.remove()
    });
  };

  const emitToNeuralNetwork = (keyword: string) => {
    // Create enhanced neural network particle that flows to input layer only
    const particle = document.createElement('div');
    particle.className = 'fixed w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50 z-50';
    
    // Get the resume container's position
    const containerRect = resumeRef.current?.getBoundingClientRect();
    if (containerRect) {
      // Start particle from the right edge of the resume container
      particle.style.left = `${containerRect.right}px`;
      particle.style.top = `${containerRect.top + containerRect.height/2}px`;
      
      // Append to body so it can flow outside the container
      document.body.appendChild(particle);
      
      // Reduced travel distance - stop at input layer
      gsap.to(particle, {
        x: 120 + Math.random() * 40, // Much shorter distance - stops at input layer
        y: Math.random() * 60 - 30,  // Less vertical spread
        opacity: 0,
        scale: 0.3,
        rotation: 180, // Less rotation
        duration: 1.5, // Shorter duration
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      {/* PDF Upload Animation */}
      {!showResume && (
        <div 
          ref={uploadRef}
          className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-2xl"
          style={{ opacity: 0, transform: 'scale(0.95)' }}
        >
          <div className="text-center">
            {/* Enhanced PDF Icon with animation */}
            <div className="relative mb-6">
              <div className="w-16 h-20 mx-auto relative">
                {/* PDF Document */}
                <div className="w-full h-full bg-gradient-to-b from-red-500 to-red-600 rounded-lg shadow-lg relative overflow-hidden">
                  {/* PDF Header */}
                  <div className="absolute top-0 left-0 right-0 h-4 bg-red-600 flex items-center justify-center">
                    <FileText className="w-3 h-3 text-white" />
                  </div>
                  
                  {/* PDF Content Lines with animation */}
                  <div className="absolute top-6 left-2 right-2 space-y-1">
                    <div className="h-1 bg-white/60 rounded animate-pulse"></div>
                    <div className="h-1 bg-white/60 rounded w-3/4 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="h-1 bg-white/60 rounded w-1/2 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-1 bg-white/60 rounded w-2/3 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                  
                  {/* Enhanced upload indicator */}
                  {!uploadComplete && (
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/30 to-transparent animate-pulse"></div>
                  )}
                </div>
                
                {/* Animated upload arrow */}
                {!uploadComplete && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <Upload className="w-7 h-7 text-cyan-400 animate-bounce" />
                  </div>
                )}
                
                {/* Enhanced success check */}
                {uploadComplete && (
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-400/50">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Upload Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                {uploadComplete ? 'Upload Complete! ✨' : 'Uploading Resume...'}
              </h3>
              
              <div className="text-sm text-gray-300 font-medium">
                📄 hemanth_resume.pdf
              </div>

              {/* Enhanced Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-3 shadow-inner">
                <div
                  className="h-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-200 shadow-lg shadow-cyan-400/50 relative overflow-hidden"
                  style={{ width: `${uploadProgress * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
              
              <div className="text-xs text-cyan-400 font-semibold">
                {uploadComplete ? '🚀 Processing...' : `${Math.round(uploadProgress * 100)}% uploaded`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Resume Card */}
      {showResume && (
        <div 
          ref={resumeRef}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-2xl relative"
          style={{ opacity: 0, transform: 'translateY(30px) scale(0.85)' }}
        >
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-400/5 pointer-events-none"></div>
          
          {/* Header */}
          <div className="text-center mb-4 relative z-10">
            <h3 className="text-xl font-bold text-white mb-1">{resumeContent.name}</h3>
            <p className="text-cyan-300 font-medium">{resumeContent.title}</p>
            <p className="text-gray-300 text-sm">{resumeContent.experience}</p>
          </div>

          {/* Skills Section */}
          <div className="mb-4 relative z-10">
            <h4 className="text-white font-semibold mb-3">💼 Skills</h4>
            <div className="flex flex-wrap gap-2">
              {resumeContent.skills.map((skill, index) => (
                <span
                  key={skill}
                  data-keyword={skill}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    detectedKeywords.includes(skill)
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-400/50 transform scale-105'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="relative z-10">
            <h4 className="text-white font-semibold mb-3">🏆 Key Achievements</h4>
            <ul className="space-y-2">
              {resumeContent.achievements.map((achievement, index) => (
                <li key={index} className="text-gray-300 text-sm flex items-start">
                  <span className="text-cyan-400 mr-2 font-bold">•</span>
                  <span 
                    data-keyword={keywords.find(k => achievement.includes(k)) || ''}
                    className={`transition-all duration-300 ${
                      detectedKeywords.some(k => achievement.includes(k))
                        ? 'text-cyan-300 font-medium bg-cyan-400/10 px-1 rounded'
                        : ''
                    }`}
                  >
                    {achievement}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Scanner Line */}
          <div
            ref={scannerRef}
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400/70 opacity-0"
            style={{ top: '20px' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Enhanced Phase Status */}
      <div className="absolute -bottom-12 left-0 right-0 text-center">
        <div className="inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
          {phase === 'scanning' && !showResume && (
            <>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
              <span className="text-sm font-medium text-blue-400">
                {uploadComplete ? '⚡ Processing Upload...' : '📤 Uploading Resume...'}
              </span>
            </>
          )}
          {phase === 'scanning' && showResume && (
            <>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
              <span className="text-sm font-medium text-cyan-400">🔍 Extracting Keywords...</span>
            </>
          )}
          {phase === 'processing' && (
            <>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" />
              <span className="text-sm font-medium text-purple-400">🧠 Sending to Input Layer</span>
            </>
          )}
          {(phase === 'output' || phase === 'learning') && (
            <>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-sm font-medium text-green-400">✅ Data Processing Complete</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeScanner;