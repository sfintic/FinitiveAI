'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Calendar, CheckCircle, Circle, Clock, Users, Settings, Plus, ArrowRight, Lightbulb, Zap, TrendingUp, Briefcase, Brain, Heart } from 'lucide-react';
import DashboardView from './components/DashboardView';
import GoalsView from './components/GoalsView';
import AiCoachView from './components/AiCoachView';
import AnimatedBackground from './components/AnimatedBackground';

export default function FinitivePage() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [hasShownConfetti, setHasShownConfetti] = useState(false);
  const [user, setUser] = useState({
    name: 'Alex',
    streak: 7,
    completedToday: 3,
    totalToday: 5
  });

  // Sample goals and tasks data
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Land a Product Manager Role",
      timeline: "6 months",
      progress: 35,
      status: "active",
      category: "career",
      icon: "💼",
      currentPhase: "Building portfolio & networking",
      nextMilestone: "Complete 2 case studies",
      daysLeft: 127
    },
    {
      id: 2,
      title: "Get Fit & Healthy",
      timeline: "4 months",
      progress: 60,
      status: "active",
      category: "health",
      icon: "🏃",
      currentPhase: "Consistent workout routine",
      nextMilestone: "Run 5K without stopping",
      daysLeft: 89
    }
  ]);

  const [todaysTasks, setTodaysTasks] = useState([
    { id: 1, text: "Research 3 PM job openings", completed: true, goalId: 1, timeEstimate: "30 min", aiNote: "Great start! I found some companies that might interest you.", icon: "💼" },
    { id: 2, text: "Draft case study outline", completed: true, goalId: 1, timeEstimate: "45 min", aiNote: "Your structure looks solid. Ready for the next step?", icon: "🧠" },
    { id: 3, text: "30min cardio workout", completed: true, goalId: 2, timeEstimate: "30 min", aiNote: "That's 7 days straight! Your body is adapting well.", icon: "🏃" },
    { id: 4, text: "Review networking contacts", completed: false, goalId: 1, timeEstimate: "20 min", aiNote: "This will help you identify warm introductions.", icon: "💼" },
    { id: 5, text: "Meal prep for tomorrow", completed: false, goalId: 2, timeEstimate: "25 min", aiNote: "Consistency is key - you've got this!", icon: "🥗" }
  ]);

  const [aiMessages, setAiMessages] = useState([
    {
      id: 1,
      type: "motivation",
      message: "🔥 Seven days strong! Your consistency is building real momentum.",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "adjustment",
      message: "I noticed you skipped yesterday's networking task. Want to try a different approach? Maybe coffee chats work better than cold emails for you.",
      timestamp: "1 day ago",
      hasAction: true,
      actionText: "Adjust Strategy"
    },
    {
      id: 3,
      type: "celebration",
      message: "Nice work on that case study draft! 🎉 You're ahead of schedule on your PM goal.",
      timestamp: "2 days ago"
    }
  ]);

  // Confetti celebration function
  const triggerCelebration = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#00d9ff', '#00a6cc', '#0080ff', '#40e0d0', '#ffffff']
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    // Main burst
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: defaults.colors
      });
    }, 250);

    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: defaults.colors
      });
    }, 400);
  };

  const toggleTask = (taskId: number) => {
    setTodaysTasks(tasks => {
      const newTasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      
      // Check if all tasks are now completed
      const allCompleted = newTasks.every(task => task.completed);
      const completedCount = newTasks.filter(t => t.completed).length;
      const wasNotComplete = tasks.filter(t => t.completed).length < tasks.length;
      
      // Trigger confetti if we just reached 100% and haven't shown it yet
      if (allCompleted && wasNotComplete && !hasShownConfetti) {
        setHasShownConfetti(true);
        triggerCelebration();
      }
      
      // Reset confetti flag if tasks are uncompleted
      if (!allCompleted && hasShownConfetti) {
        setHasShownConfetti(false);
      }
      
      return newTasks;
    });
  };

  const completedCount = todaysTasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / todaysTasks.length) * 100);

  return (
    <div className="min-h-screen bg-[#0b0f1a]">
      {/* Animated Background Effects */}
      <AnimatedBackground />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Top Navigation */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#0b0f1a]/80 border-b border-slate-800/50">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 group cursor-pointer">
                <motion.div 
                  className="relative transition-transform duration-300 group-hover:scale-110"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image 
                    src="/finitive_logo_only.png"  
                    alt="Finitive Logo"
                    width={48}
                    height={48}
                    className="object-contain drop-shadow-[0_0_8px_#00d9ff] group-hover:drop-shadow-[0_0_12px_#00d9ff] transition-all duration-300 md:w-12 md:h-12 w-10 h-10"
                    priority
                  />
                </motion.div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent hidden sm:block">
                  FINITIVE
                </span>
              </div>
              <div className="flex gap-1 p-1 bg-slate-900/50 rounded-lg backdrop-blur-sm">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 relative ${
                    currentView === 'dashboard' 
                      ? 'bg-cyan-400 text-slate-900' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {currentView === 'dashboard' && (
                    <motion.div
                      className="absolute inset-0 bg-cyan-400 rounded-md"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative">Today</span>
                </button>
                <button
                  onClick={() => setCurrentView('goals')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 relative ${
                    currentView === 'goals' 
                      ? 'bg-cyan-400 text-slate-900' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {currentView === 'goals' && (
                    <motion.div
                      className="absolute inset-0 bg-cyan-400 rounded-md"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative">Goals</span>
                </button>
                <button
                  onClick={() => setCurrentView('coach')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 relative ${
                    currentView === 'coach' 
                      ? 'bg-cyan-400 text-slate-900' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {currentView === 'coach' && (
                    <motion.div
                      className="absolute inset-0 bg-cyan-400 rounded-md"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative">AI Coach</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6 pb-24 md:pb-6">
          <AnimatePresence mode="wait">
            {currentView === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardView
                  user={user}
                  todaysTasks={todaysTasks}
                  goals={goals}
                  progressPercent={progressPercent}
                  completedCount={completedCount}
                  triggerCelebration={triggerCelebration}
                  toggleTask={toggleTask}
                />
              </motion.div>
            )}
            {currentView === 'goals' && (
              <motion.div
                key="goals"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <GoalsView goals={goals} />
              </motion.div>
            )}
            {currentView === 'coach' && (
              <motion.div
                key="coach"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <AiCoachView aiMessages={aiMessages} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation - Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#0b0f1a]/90 backdrop-blur-xl border-t border-slate-800/50 p-4 md:hidden">
          <div className="flex justify-center gap-8">
            <motion.button
              onClick={() => setCurrentView('dashboard')}
              className={`flex flex-col items-center gap-1 transition-all duration-200 relative ${
                currentView === 'dashboard' ? 'text-cyan-400' : 'text-gray-500'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {currentView === 'dashboard' && (
                <motion.div
                  className="absolute -inset-4 bg-cyan-400/20 rounded-full blur-xl"
                  layoutId="activeGlow"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Calendar className="w-5 h-5 relative z-10" />
              <span className="text-xs relative z-10">Today</span>
            </motion.button>
            <motion.button
              onClick={() => setCurrentView('goals')}
              className={`flex flex-col items-center gap-1 transition-all duration-200 relative ${
                currentView === 'goals' ? 'text-cyan-400' : 'text-gray-500'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {currentView === 'goals' && (
                <motion.div
                  className="absolute -inset-4 bg-cyan-400/20 rounded-full blur-xl"
                  layoutId="activeGlow"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Target className="w-5 h-5 relative z-10" />
              <span className="text-xs relative z-10">Goals</span>
            </motion.button>
            <motion.button
              onClick={() => setCurrentView('coach')}
              className={`flex flex-col items-center gap-1 transition-all duration-200 relative ${
                currentView === 'coach' ? 'text-cyan-400' : 'text-gray-500'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {currentView === 'coach' && (
                <motion.div
                  className="absolute -inset-4 bg-cyan-400/20 rounded-full blur-xl"
                  layoutId="activeGlow"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Lightbulb className="w-5 h-5 relative z-10" />
              <span className="text-xs relative z-10">AI Coach</span>
            </motion.button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .glass-card {
          backdrop-filter: blur(8px);
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .task-card {
          backdrop-filter: blur(8px);
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(0, 217, 255, 0.1);
        }
        
        .task-card:hover {
          background-color: rgba(0, 217, 255, 0.05);
          border-color: rgba(0, 217, 255, 0.2);
        }
        
        /* Mobile-specific styles */
        @media (max-width: 768px) {
          .task-card {
            cursor: grab;
          }
          
          .task-card:active {
            cursor: grabbing;
          }
        }
        
        /* Prevent text selection on mobile when dragging */
        @media (max-width: 768px) {
          .task-card * {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
        }
      `}</style>
    </div>
  );
}