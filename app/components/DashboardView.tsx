import React from 'react';
import { CheckCircle, Circle, Clock, Lightbulb } from 'lucide-react';
import { Goal, Task } from '../page';

export type DashboardViewProps = {
  goals: Goal[];
  todaysTasks: Task[];
  completedCount: number;
  progressPercent: number;
  toggleTask: (taskId: number) => void;
  triggerCelebration: () => void;
  archiveTask: (taskId: number) => void;
  restoreTask: (taskId: number) => void;
  showArchived: boolean;
  setShowArchived: (show: boolean) => void;
  archivedTasks: Task[];
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  goals,
  todaysTasks,
  completedCount,
  progressPercent,
  toggleTask,
  triggerCelebration,
  archiveTask,
  restoreTask,
  showArchived,
  setShowArchived,
  archivedTasks,
}) => (
  <div className="space-y-6">
    {/* Header with greeting - Futuristic Style */}
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-cyan-500/20 p-6 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10"></div>
      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-2 text-gray-100">Good morning, User! ☀️</h1>
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
        <div className="flex items-center gap-2">
          <div className="text-sm text-cyan-400 font-medium">{progressPercent}% complete</div>
          <button
            className={`ml-4 px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-200 ${showArchived ? 'bg-cyan-400 text-slate-900 border-cyan-400' : 'bg-slate-800 text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10'}`}
            onClick={() => setShowArchived(!showArchived)}
          >
            {showArchived ? 'Hide Archived' : 'Show Archived'}
          </button>
        </div>
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
              <button
                onClick={() => archiveTask(task.id)}
                className="ml-2 px-2 py-1 text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-400/30 rounded hover:bg-yellow-500/20 transition-all"
                title="Archive Task"
              >
                Archive
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Archived Tasks Section */}
      {showArchived && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-300 mb-2">Archived Tasks</h3>
          {archivedTasks.length === 0 ? (
            <p className="text-gray-500 text-sm">No archived tasks.</p>
          ) : (
            <div className="space-y-2">
              {archivedTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2">
                  <span className="text-gray-400 text-sm truncate">{task.text}</span>
                  <button
                    onClick={() => restoreTask(task.id)}
                    className="ml-4 px-2 py-1 text-xs bg-green-500/10 text-green-400 border border-green-400/30 rounded hover:bg-green-500/20 transition-all"
                    title="Restore Task"
                  >
                    Restore
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
