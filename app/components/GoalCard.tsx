import React from 'react';

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

interface GoalCardProps {
  goal: Goal;
  detailed?: boolean;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, detailed }) => (
  detailed ? (
    <div className="glass-card rounded-xl p-6 hover:shadow-lg hover:shadow-cyan-400/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{goal.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-gray-100 mb-1">{goal.title}</h2>
            <p className="text-gray-400">{goal.timeline} timeline • {goal.category}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-cyan-400">{goal.progress}%</div>
          <div className="text-sm text-gray-500">complete</div>
        </div>
      </div>
      <div className="w-full bg-slate-800/50 rounded-full h-3 mb-4 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-cyan-400 to-blue-400 h-3 rounded-full relative"
          style={{ width: `${goal.progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-cyan-400/10 border border-cyan-400/20 p-3 rounded-lg">
          <h4 className="font-semibold text-cyan-300 mb-1 text-sm md:text-base">Current Phase</h4>
          <p className="text-gray-300 text-xs md:text-sm">{goal.currentPhase}</p>
        </div>
        <div className="bg-blue-400/10 border border-blue-400/20 p-3 rounded-lg">
          <h4 className="font-semibold text-blue-300 mb-1 text-sm md:text-base">Next Milestone</h4>
          <p className="text-gray-300 text-xs md:text-sm">{goal.nextMilestone}</p>
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
  ) : (
    <div className="border border-slate-700/50 rounded-lg p-4 bg-slate-900/30 hover:bg-slate-900/50 transition-all duration-200 group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{goal.icon}</span>
          <h3 className="font-semibold text-gray-200 group-hover:text-cyan-300 transition-colors">{goal.title}</h3>
        </div>
        <span className="text-sm text-gray-400">{goal.daysLeft} days left</span>
      </div>
      <div className="w-full bg-slate-800/50 rounded-full h-2 mb-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full relative"
          style={{ width: `${goal.progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">{goal.currentPhase}</span>
        <span className="text-cyan-400 font-medium">{goal.progress}%</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">Next: {goal.nextMilestone}</p>
    </div>
  )
);

export default GoalCard;
