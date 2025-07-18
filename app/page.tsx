'use client';

import React, { useState, useEffect } from 'react';
import { Target, Calendar, CheckCircle, Circle, Clock, Lightbulb, Zap, TrendingUp, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from './lib/supabaseClient';
import { DashboardView } from './components/DashboardView';
import { GoalsView } from './components/GoalsView';
import { AiCoachView, AiMessage } from './components/AiCoachView';
import { AnimatedBackground } from './components/AnimatedBackground';
import CalendarPage from './calendar/page';

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

function FinitiveApp() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [mounted, setMounted] = useState(false);
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
    // Load all goals and tasks (no user gating)
    const loadData = async () => {
      const { data: goalsData } = await supabase
        .from('goals')
        .select('*')
        .eq('deleted', false);
      setGoals(goalsData || []);

      const { data: tasksData } = await supabase
        .from('tasks')
        .select('*')
        .eq('deleted', false);
      setTodaysTasks(tasksData || []);
    };
    loadData();
  }, []);

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

  // Soft delete (archive) a task
  const archiveTask = async (taskId: number) => {
    await supabase
      .from('tasks')
      .update({ deleted: true })
      .eq('id', taskId);
    // Refresh tasks
    const { data: tasksData } = await supabase
      .from('tasks')
      .select('*')
      .eq('deleted', false);
    setTodaysTasks(tasksData || []);
  };

  // Show/hide archived tasks
  const [showArchived, setShowArchived] = useState(false);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (showArchived) {
      supabase
        .from('tasks')
        .select('*')
        .eq('deleted', true)
        .then(({ data }) => setArchivedTasks(data || []));
    }
  }, [showArchived]);

  // Restore a task
  const restoreTask = async (taskId: number) => {
    await supabase
      .from('tasks')
      .update({ deleted: false })
      .eq('id', taskId);
    // Refresh archived tasks
    supabase
      .from('tasks')
      .select('*')
      .eq('deleted', true)
      .then(({ data }) => setArchivedTasks(data || []));
    // Refresh active tasks
    const { data: tasksData } = await supabase
      .from('tasks')
      .select('*')
      .eq('deleted', false);
    setTodaysTasks(tasksData || []);
  };

  // Soft delete (archive) a goal
  const archiveGoal = async (goalId: number) => {
    await supabase
      .from('goals')
      .update({ deleted: true })
      .eq('id', goalId);
    // Refresh goals
    const { data: goalsData } = await supabase
      .from('goals')
      .select('*')
      .eq('deleted', false);
    setGoals(goalsData || []);
  };

  // Show/hide archived goals
  const [showArchivedGoals, setShowArchivedGoals] = useState(false);
  const [archivedGoals, setArchivedGoals] = useState<Goal[]>([]);

  useEffect(() => {
    if (showArchivedGoals) {
      supabase
        .from('goals')
        .select('*')
        .eq('deleted', true)
        .then(({ data }) => setArchivedGoals(data || []));
    }
  }, [showArchivedGoals]);

  // Restore a goal
  const restoreGoal = async (goalId: number) => {
    await supabase
      .from('goals')
      .update({ deleted: false })
      .eq('id', goalId);
    // Refresh archived goals
    supabase
      .from('goals')
      .select('*')
      .eq('deleted', true)
      .then(({ data }) => setArchivedGoals(data || []));
    // Refresh active goals
    const { data: goalsData } = await supabase
      .from('goals')
      .select('*')
      .eq('deleted', false);
    setGoals(goalsData || []);
  };

  if (!mounted) {
    return null;
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
                  onClick={() => setCurrentView('calendar')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === 'calendar' ? 'bg-cyan-400 text-slate-900' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Calendar
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
          {currentView === 'dashboard' && (
            <DashboardView
              goals={goals}
              todaysTasks={todaysTasks}
              completedCount={completedCount}
              progressPercent={progressPercent}
              toggleTask={toggleTask}
              triggerCelebration={triggerCelebration}
              archiveTask={archiveTask}
              restoreTask={restoreTask}
              showArchived={showArchived}
              setShowArchived={setShowArchived}
              archivedTasks={archivedTasks}
            />
          )}
          {currentView === 'calendar' && <CalendarPage />}
          {currentView === 'goals' && (
            <GoalsView
              goals={goals}
              archiveGoal={archiveGoal}
              restoreGoal={restoreGoal}
              showArchivedGoals={showArchivedGoals}
              setShowArchivedGoals={setShowArchivedGoals}
              archivedGoals={archivedGoals}
            />
          )}
          {currentView === 'coach' && <AiCoachView aiMessages={aiMessages as AiMessage[]} />}
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
              onClick={() => setCurrentView('calendar')}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                currentView === 'calendar' ? 'text-cyan-400' : 'text-gray-500'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span className="text-xs">Calendar</span>
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
  return <FinitiveApp />;
}