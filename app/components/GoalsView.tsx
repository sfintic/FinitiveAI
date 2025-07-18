import React from 'react';
import { Plus } from 'lucide-react';
import { Goal } from '../page';

export type GoalsViewProps = {
  goals: Goal[];
  archiveGoal: (goalId: number) => void;
  restoreGoal: (goalId: number) => void;
  showArchivedGoals: boolean;
  setShowArchivedGoals: (show: boolean) => void;
  archivedGoals: Goal[];
};

export const GoalsView: React.FC<GoalsViewProps> = ({
  goals,
  archiveGoal,
  restoreGoal,
  showArchivedGoals,
  setShowArchivedGoals,
  archivedGoals,
}) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-100">Your Goals</h1>
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-200 ${showArchivedGoals ? 'bg-cyan-400 text-slate-900 border-cyan-400' : 'bg-slate-800 text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10'}`}
          onClick={() => setShowArchivedGoals(!showArchivedGoals)}
        >
          {showArchivedGoals ? 'Hide Archived' : 'Show Archived'}
        </button>
        <button className="bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-cyan-300 transition-all duration-200 font-medium">
          <Plus className="w-4 h-4" />
          New Goal
        </button>
      </div>
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
          <button
            onClick={() => archiveGoal(goal.id)}
            className="ml-2 px-2 py-1 text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-400/30 rounded hover:bg-yellow-500/20 transition-all"
            title="Archive Goal"
          >
            Archive
          </button>
        </div>
      </div>
    ))}

    {/* Archived Goals Section */}
    {showArchivedGoals && (
      <div className="mt-6">
        <h3 className="text-lg font-bold text-gray-300 mb-2">Archived Goals</h3>
        {archivedGoals.length === 0 ? (
          <p className="text-gray-500 text-sm">No archived goals.</p>
        ) : (
          <div className="space-y-2">
            {archivedGoals.map(goal => (
              <div key={goal.id} className="flex items-center justify-between bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2">
                <span className="text-gray-400 text-sm truncate">{goal.title}</span>
                <button
                  onClick={() => restoreGoal(goal.id)}
                  className="ml-4 px-2 py-1 text-xs bg-green-500/10 text-green-400 border border-green-400/30 rounded hover:bg-green-500/20 transition-all"
                  title="Restore Goal"
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
);
