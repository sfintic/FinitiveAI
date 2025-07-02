'use client';

import React, { useState, useEffect } from 'react';
import { Target, Calendar, CheckCircle, Circle, Clock, Lightbulb, Zap, TrendingUp, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from './lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import AuthWrapper from './components/AuthWrapper';

// Types for Supabase data
export type Goal = {
  id: number;
  title: string;
  timeline: string;
  progress: number;
  status: string;
  category: string;
  currentPhase: string;
  nextMilestone: string;
  daysLeft: number;
  user_id: string;
};

export type Task = {
  id: number;
  text: string;
  completed: boolean;
  goalId: number;
  timeEstimate: string;
  aiNote?: string;
  user_id: string;
};

// Animated Background Component with Gears
const AnimatedBackground = () => (
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

function FinitiveApp() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [mounted, setMounted] = useState(false);
  // Supabase user and loading state
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Goals and tasks from Supabase
  const [goals, setGoals] = useState<Goal[]>([]);
  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);

  // AI messages state (restore)
  const [aiMessages, setAiMessages] = useState([
    {
      id: 1,
      type: 'motivation',
      message: '🔥 Seven days strong! Your consistency is building real momentum.',
      timestamp: 'Earlier today',
    },
    {
      id: 2,
      type: 'adjustment',
      message: "I noticed you skipped yesterday's networking task. Want to try a different approach? Maybe coffee chats work better than cold emails for you.",
      timestamp: 'Yesterday',
      hasAction: true,
      actionText: 'Adjust Strategy',
    },
    {
      id: 3,
      type: 'celebration',
      message: "Nice work on that case study draft! 🎉 You're ahead of schedule on your PM goal.",
      timestamp: '2 days ago',
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Check if user is logged in and load data
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        loadUserData(user.id);
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const loadUserData = async (userId: string) => {
    // Load goals
    const { data: goalsData } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId);
    setGoals(goalsData || []);

    // Load tasks
    const { data: tasksData } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId);
    setTodaysTasks(tasksData || []);
  };

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

  // Track if confetti has been shown
  const [hasShownConfetti, setHasShownConfetti] = useState(false);

  if (!mounted || loading) {
    return null;
  }
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] text-gray-200">
        <p>Please log in to view your dashboard.</p>
      </div>
    );
  }

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
  const progressPercent = todaysTasks.length > 0 ? Math.round((completedCount / todaysTasks.length) * 100) : 0;

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Header with greeting - Futuristic Style */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-cyan-500/20 p-6 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2 text-gray-100">Good morning, {user?.email || 'User'}! ☀️</h1>
          <p className="text-gray-300">Ready to make today count?</p>

          <div className="mt-4 flex items-center gap-4">
            <div className="bg-slate-800/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-600/50">
              <div className="text-sm text-gray-400">Today's Progress</div>
              <div className="text-xl font-bold text-cyan-400">{completedCount}/{todaysTasks.length}</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-600/50">
              <div className="text-sm text-gray-400">Streak</div>
              <div className="text-xl font-bold text-cyan-400">—</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights - Futuristic */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-cyan-400/20 shadow-xl rounded-xl p-4 hover:shadow-cyan-400/10 transition-all duration-300">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-cyan-400/10 border border-cyan-400/20">
            <Lightbulb className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold text-cyan-300 mb-1">AI Insight</h3>
            <p className="text-gray-300 text-sm">You're crushing your morning tasks this week! I've noticed you work best between 9-11am. Want me to schedule more important tasks during this time?</p>
            <button className="mt-2 text-sm bg-cyan-400 text-slate-900 px-3 py-1 rounded-lg hover:bg-cyan-300 transition-all duration-200 font-medium">
              Yes, optimize my schedule
            </button>
          </div>
        </div>
      </div>

      {/* Today's Tasks - Futuristic */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-100">Today's Focus</h2>
          <div className="text-sm text-cyan-400 font-medium">{progressPercent}% complete</div>
        </div>
        
        <div className="w-full bg-slate-800/50 rounded-full h-2 mb-6 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="space-y-3">
          {todaysTasks.map(task => (
            <div key={task.id} className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-lg p-3 hover:bg-slate-800/80 hover:border-cyan-400/30 transition-all duration-200">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500 hover:text-cyan-400" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                    {task.text}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.timeEstimate}
                    </span>
                    <span className="text-xs text-gray-400">
                      {goals.find(g => g.id === task.goalId)?.title}
                    </span>
                  </div>
                  {task.aiNote && (
                    <p className="text-xs text-gray-400 mt-1 italic">💡 {task.aiNote}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Celebration message */}
        {progressPercent === 100 && (
          <div className="mb-4 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-400/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <p className="text-cyan-300 font-medium">System Synced! All tasks completed!</p>
                <span className="text-2xl">🚀</span>
              </div>
              <button 
                onClick={triggerCelebration}
                className="text-xs bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-300 px-3 py-1 rounded-md transition-colors"
              >
                🎊 Celebrate Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Goals Overview - Futuristic */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-gray-100 mb-4">Active Goals</h2>
        <div className="space-y-4">
          {goals.map(goal => (
            <div key={goal.id} className="border border-slate-700/50 rounded-lg p-4 bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-200">{goal.title}</h3>
                <span className="text-sm text-gray-400">{goal.daysLeft} days left</span>
              </div>
              
              <div className="w-full bg-slate-800/50 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{goal.currentPhase}</span>
                <span className="text-cyan-400 font-medium">{goal.progress}%</span>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">Next: {goal.nextMilestone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const GoalsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-100">Your Goals</h1>
        <button className="bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-cyan-300 transition-all duration-200 font-medium">
          <Plus className="w-4 h-4" />
          New Goal
        </button>
      </div>

      {goals.map(goal => (
        <div key={goal.id} className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-100 mb-1">{goal.title}</h2>
              <p className="text-gray-400">{goal.timeline} timeline • {goal.category}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-cyan-400">{goal.progress}%</div>
              <div className="text-sm text-gray-500">complete</div>
            </div>
          </div>

          <div className="w-full bg-slate-800/50 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-400 h-3 rounded-full"
              style={{ width: `${goal.progress}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-cyan-400/10 border border-cyan-400/20 p-3 rounded-lg">
              <h4 className="font-semibold text-cyan-300 mb-1">Current Phase</h4>
              <p className="text-gray-300 text-sm">{goal.currentPhase}</p>
            </div>
            <div className="bg-blue-400/10 border border-blue-400/20 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-300 mb-1">Next Milestone</h4>
              <p className="text-gray-300 text-sm">{goal.nextMilestone}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg hover:bg-cyan-300 transition-all duration-200 text-sm font-medium">
              View Breakdown
            </button>
            <button className="border border-cyan-400/30 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-400/10 text-sm transition-all duration-200">
              Adjust Timeline
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const AiCoachView = () => (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl border border-purple-500/30 p-6">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-pink-500/10"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2 text-gray-100">AI Coach 🤖</h1>
          <p className="text-purple-200">Your personal success strategist, here to help you navigate challenges and celebrate wins.</p>
        </div>
      </div>

      <div className="space-y-4">
        {aiMessages.map(message => (
          <div key={message.id} className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 hover:shadow-lg hover:shadow-cyan-400/10 transition-all duration-300">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${
                message.type === 'motivation' ? 'bg-green-400/20' :
                message.type === 'adjustment' ? 'bg-yellow-400/20' : 'bg-blue-400/20'
              }`}>
                {message.type === 'motivation' ? <Zap className="w-4 h-4 text-green-400" /> :
                 message.type === 'adjustment' ? <TrendingUp className="w-4 h-4 text-yellow-400" /> :
                 <Target className="w-4 h-4 text-blue-400" />}
              </div>
              
              <div className="flex-1">
                <p className="text-gray-200 mb-2">{message.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                  {message.hasAction && (
                    <button className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-400 transition-all duration-200">
                      {message.actionText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/90 backdrop-blur-xl border-2 border-dashed border-slate-600 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-colors duration-300">
        <h3 className="font-semibold text-gray-200 mb-2">Need guidance?</h3>
        <p className="text-gray-400 text-sm mb-4">Ask your AI coach anything about your goals, productivity, or motivation.</p>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-400 hover:to-pink-400 transition-all duration-200">
          Start Conversation
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0f1a]">
      {/* Animated Background Effects */}
      <AnimatedBackground />

      <div className="relative z-10 max-w-4xl mx-auto h-auto pb-24 md:pb-6">
        {/* Top Navigation - Futuristic */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#0b0f1a]/80 border-b border-slate-800/50">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 text-gray-300">
                  <img src="/finitive_logo_only.png" alt="Finitive Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">Finitive</span>
              </div>
              <div className="flex gap-1 p-1 bg-slate-900/50 rounded-lg backdrop-blur-sm">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === 'dashboard' ? 'bg-cyan-400 text-slate-900' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentView('goals')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === 'goals' ? 'bg-cyan-400 text-slate-900' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Goals
                </button>
                <button
                  onClick={() => setCurrentView('coach')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === 'coach' ? 'bg-cyan-400 text-slate-900' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  AI Coach
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6 pb-24 md:pb-6">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'goals' && <GoalsView />}
          {currentView === 'coach' && <AiCoachView />}
        </div>

        {/* Bottom Navigation - Mobile Futuristic */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#0b0f1a]/90 backdrop-blur-xl border-t border-slate-800/50 p-4 md:hidden">
          <div className="flex justify-center gap-8">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                currentView === 'dashboard' ? 'text-cyan-400' : 'text-gray-500'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs">Today</span>
            </button>
            <button
              onClick={() => setCurrentView('goals')}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                currentView === 'goals' ? 'text-cyan-400' : 'text-gray-500'
              }`}
            >
              <Target className="w-5 h-5" />
              <span className="text-xs">Goals</span>
            </button>
            <button
              onClick={() => setCurrentView('coach')}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                currentView === 'coach' ? 'text-cyan-400' : 'text-gray-500'
              }`}
            >
              <Lightbulb className="w-5 h-5" />
              <span className="text-xs">AI Coach</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-30px) translateX(50px); }
          66% { transform: translateY(20px) translateX(-20px); }
        }
        .gear-rotate-slow {
          transform-origin: 40px 40px;
          animation: gear-spin 24s linear infinite;
        }
        .gear-rotate-fast {
          transform-origin: 30px 30px;
          animation: gear-spin 10s linear infinite reverse;
        }
        @keyframes gear-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        html {
          scroll-behavior: smooth;
        }
        /* Custom scrollbar styles */
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #00d9ff 0%, #0080ff 100%);
          border-radius: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0b0f1a;
        }
        /* For Firefox */
        html {
          scrollbar-color: #00d9ff #0b0f1a;
          scrollbar-width: thin;
        }
      `}</style>
    </div>
  );
}

export default function FinitivePage() {
  return (
    <AuthWrapper>
      <FinitiveApp />
    </AuthWrapper>
  );
}