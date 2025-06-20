import React from 'react';
import { Plus } from 'lucide-react';
import GoalCard from './GoalCard';

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

interface GoalsViewProps {
  goals: Goal[];
}

const GoalsView: React.FC<GoalsViewProps> = ({ goals }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-100">Your Goals</h1>
      <button className="bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-cyan-300 transition-all duration-200 font-medium">
        <Plus className="w-4 h-4" />
        New Goal
      </button>
    </div>
    {goals.map(goal => (
      <GoalCard key={goal.id} goal={goal} detailed />
    ))}
  </div>
);

export default GoalsView;
