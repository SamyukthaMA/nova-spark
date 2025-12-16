import React, { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Cinematic Sequence
    const t1 = setTimeout(() => setStage(1), 500);  // Lines Expand
    const t2 = setTimeout(() => setStage(2), 1200); // Text Reveal (Slow)
    const t3 = setTimeout(() => setStage(3), 2000); // Tagline Fade
    const t4 = setTimeout(() => setStage(4), 2800); // Graph Line Draw
    const t5 = setTimeout(() => setStage(5), 3800); // Arrow Head Snap
    const t6 = setTimeout(() => setStage(6), 5000); // Fade Out Scene
    const t7 = setTimeout(() => onComplete(), 5800); // Unmount

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000 ease-in-out ${stage === 6 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className={`relative flex flex-col items-center justify-center w-full max-w-lg p-10 transition-transform duration-[2000ms] ease-out ${stage >= 1 ? 'scale-100' : 'scale-110'}`}>
        
        {/* Logo Container */}
        <div className="relative w-full h-40">
           
           {/* Trend Arrow SVG - Graph Line - Layer 0 (Background) */}
           <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible" viewBox="0 0 400 140">
              {/* Zig Zag Line */}
              <path 
                d="M 20 120 L 100 80 L 180 110 L 380 20" 
                fill="none" 
                stroke="#3f3f46" /* Zinc-700 */
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-100"
                style={{ 
                    strokeDasharray: 600, 
                    strokeDashoffset: stage >= 4 ? 0 : 600,
                    transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)' // Cinematic Ease-out
                }}
              />
              
              {/* Arrow Head - Drawing outwards from tip */}
              <g className="opacity-100">
                 {/* Upper Arm */}
                 <path 
                    d="M 380 20 L 320 20" 
                    fill="none" 
                    stroke="#3f3f46"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        strokeDasharray: 100,
                        strokeDashoffset: stage >= 5 ? 0 : 100,
                        transition: 'stroke-dashoffset 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Snap effect
                    }}
                 />
                 {/* Lower Arm */}
                 <path 
                    d="M 380 20 L 340 70" 
                    fill="none" 
                    stroke="#3f3f46"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        strokeDasharray: 100,
                        strokeDashoffset: stage >= 5 ? 0 : 100,
                        transition: 'stroke-dashoffset 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Snap effect
                    }}
                 />
              </g>
           </svg>

           {/* Top Line - Layer 10 */}
           <div className={`absolute top-4 left-0 h-[2px] bg-white transition-all duration-[1500ms] cubic-bezier(0.22, 1, 0.36, 1) z-10 ${stage >= 1 ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>

           {/* Text NOVA - Layer 20 (Foreground) */}
           <div className="absolute inset-0 flex items-center justify-center z-20">
                <h1 className={`text-8xl font-serif font-bold tracking-[0.05em] text-white transition-all duration-[1200ms] ease-out transform ${stage >= 2 ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm'}`}>
                  NOVA
                </h1>
           </div>

           {/* Bottom Line - Layer 10 */}
           <div className={`absolute bottom-4 right-0 h-[1px] bg-white transition-all duration-[1500ms] cubic-bezier(0.22, 1, 0.36, 1) delay-200 z-10 ${stage >= 1 ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
           
        </div>

        {/* Tagline - White */}
        <div className={`mt-8 text-center transition-all duration-1000 transform ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-sm font-sans tracking-[0.4em] text-white uppercase font-bold">
            BET BIG. BOT SAUCE.
          </h2>
        </div>
      </div>
    </div>
  );
};