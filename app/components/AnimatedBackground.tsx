import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {/* Gradient Orbs */}
    <motion.div 
      className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
      animate={{
        x: [0, 50, 0],
        y: [0, -30, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div 
      className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
      animate={{
        x: [0, -50, 0],
        y: [0, 30, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    {/* Rotating Gears */}
    <motion.div
      className="absolute top-20 right-20 opacity-5"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      <svg width="200" height="200" viewBox="0 0 200 200">
        <path
          d="M100,20 L110,40 L130,35 L135,55 L155,60 L150,80 L170,90 L160,110 L175,125 L155,140 L165,160 L145,165 L140,185 L120,180 L110,195 L90,180 L80,185 L60,165 L55,160 L45,140 L55,125 L40,110 L50,90 L30,80 L35,60 L55,55 L60,35 L80,40 L90,20 L100,20 Z"
          fill="currentColor"
          className="text-cyan-400"
        />
        <circle cx="100" cy="100" r="40" fill="#0b0f1a" />
      </svg>
    </motion.div>
    <motion.div
      className="absolute bottom-40 left-20 opacity-5"
      animate={{ rotate: -360 }}
      transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
    >
      <svg width="150" height="150" viewBox="0 0 200 200">
        <path
          d="M100,20 L110,40 L130,35 L135,55 L155,60 L150,80 L170,90 L160,110 L175,125 L155,140 L165,160 L145,165 L140,185 L120,180 L110,195 L90,180 L80,185 L60,165 L55,160 L45,140 L55,125 L40,110 L50,90 L30,80 L35,60 L55,55 L60,35 L80,40 L90,20 L100,20 Z"
          fill="currentColor"
          className="text-purple-400"
        />
        <circle cx="100" cy="100" r="40" fill="#0b0f1a" />
      </svg>
    </motion.div>
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
    {/* Animated Particles */}
    {typeof window !== 'undefined' && [...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 10,
        }}
        animate={{
          y: -10,
          x: Math.random() * window.innerWidth,
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 10,
        }}
      />
    ))}
  </div>
);

export default AnimatedBackground;
