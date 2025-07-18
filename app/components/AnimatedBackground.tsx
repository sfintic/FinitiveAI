import React from 'react';

export const AnimatedBackground: React.FC = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {/* Gradient Orbs */}
    <div 
      className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
      style={{
        animation: 'float 20s ease-in-out infinite'
      }}
    />
    <div 
      className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
      style={{
        animation: 'float 15s ease-in-out infinite reverse'
      }}
    />
    {/* Animated Gears */}
    <svg className="absolute left-10 top-10 opacity-20" width="80" height="80" viewBox="0 0 80 80">
      <g className="gear-rotate-slow">
        <circle cx="40" cy="40" r="30" fill="none" stroke="#00d9ff" strokeWidth="4" />
        <g>
          {[...Array(8)].map((_, i) => (
            <rect key={i} x="38" y="8" width="4" height="12" fill="#00d9ff" transform={`rotate(${i*45} 40 40)`} />
          ))}
        </g>
      </g>
    </svg>
    <svg className="absolute right-20 bottom-20 opacity-10" width="60" height="60" viewBox="0 0 60 60">
      <g className="gear-rotate-fast">
        <circle cx="30" cy="30" r="20" fill="none" stroke="#40e0d0" strokeWidth="3" />
        <g>
          {[...Array(6)].map((_, i) => (
            <rect key={i} x="28" y="4" width="4" height="8" fill="#40e0d0" transform={`rotate(${i*60} 30 30)`} />
          ))}
        </g>
      </g>
    </svg>
    {/* Grid Pattern */}
    <div className="absolute inset-0 opacity-[0.02]">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  </div>
);
