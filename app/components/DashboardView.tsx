import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import TaskCard from './TaskCard';
import GoalCard from './GoalCard';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  goalId: number;
  timeEstimate: string;
  aiNote?: string;
  icon: string;
}

interface Goal {
  id: number;
  title: string;
  timeline: string;
  progress: number;
  status: string;
  category: string;
  icon: string;
  currentPhase: string;
  nextMilestone: string;
  daysLeft: number;
}

interface DashboardViewProps {
  user: { name: string; streak: number; };
  todaysTasks: Task[];
  goals: Goal[];
  progressPercent: number;
  completedCount: number;
  triggerCelebration: () => void;
  toggleTask: (taskId: number) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ user, todaysTasks, goals, progressPercent, completedCount, triggerCelebration, toggleTask }) => (
  <div className="space-y-6">
    {/* Header with greeting */}
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-cyan-500/20 p-4 md:p-6">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10"></div>
      <div className="relative z-10">
        <h1 className="text-xl md:text-2xl font-bold mb-2 text-gray-100">Good morning, {user.name}! ☀️</h1>
        <p className="text-gray-400 text-sm md:text-base">Ready to make today count? You're on a {user.streak}-day streak!</p>
        <div className="mt-4 flex items-center gap-4">
          <motion.div 
            className="glass-card px-4 py-3 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-sm text-gray-400">Today's Progress</div>
            <div className="text-xl font-bold text-cyan-400">{completedCount}/{todaysTasks.length}</div>
          </motion.div>
          <motion.div 
            className="glass-card px-4 py-3 rounded-lg flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div>
              <div className="text-sm text-gray-400">Streak</div>
              <div className="text-xl font-bold text-cyan-400">{user.streak} days</div>
            </div>
            <motion.span 
              className="text-2xl relative"
              animate={{ 
                scale: [1, 1.2, 1],
                filter: [
                  "drop-shadow(0 0 0px transparent)",
                  "drop-shadow(0 0 20px #ff6b35)",
                  "drop-shadow(0 0 0px transparent)"
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🔥
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
    {/* AI Insights */}
    <div className="glass-card border border-cyan-400/30 shadow-xl rounded-xl p-4 group hover:shadow-cyan-400/20 transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-cyan-400/10">
          <Lightbulb className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
            <span>💡 AI Insight</span>
          </h3>
          <p className="text-gray-300 text-sm">You're crushing your morning tasks this week! I've noticed you work best between 9-11am. Want me to schedule more important tasks during this time?</p>
          <button className="mt-3 bg-cyan-400 text-slate-900 px-4 py-1.5 rounded-lg hover:bg-cyan-300 transition-all duration-200 font-medium text-sm">
            Yes, optimize my schedule
          </button>
        </div>
      </div>
    </div>
    {/* Today's Tasks */}
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-100">Today's Focus</h2>
        <div className="text-sm text-cyan-400 font-medium">{progressPercent}% complete</div>
      </div>
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
      <div className="w-full bg-slate-800/50 rounded-full h-2 mb-6 overflow-hidden">
        <motion.div 
          className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] // easeOutExpo
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-white/20"
            animate={{ 
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
      <div className="space-y-3">
        {todaysTasks.map(task => (
          <TaskCard key={task.id} task={task} toggleTask={toggleTask} goals={goals} />
        ))}
      </div>
    </div>
    {/* Goals Overview */}
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-xl font-bold text-gray-100 mb-4">Active Goals</h2>
      <div className="space-y-4">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  </div>
);

export default DashboardView;
