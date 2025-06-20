import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock } from 'lucide-react';

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
}

interface TaskCardProps {
  task: Task;
  toggleTask: (taskId: number) => void;
  goals: Goal[];
}

const TaskCard: React.FC<TaskCardProps> = ({ task, toggleTask, goals }) => (
  <motion.div
    className="task-card group flex items-start gap-3 p-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/10 relative overflow-hidden"
    drag="x"
    dragConstraints={{ left: -100, right: 100 }}
    dragElastic={0.2}
    onDragEnd={(e, { offset }) => {
      if (Math.abs(offset.x) > 100) {
        toggleTask(task.id);
      }
    }}
    whileTap={{ scale: 0.98 }}
    animate={{ x: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  >
    {/* Swipe indicator backgrounds */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-transparent to-green-500/20 opacity-0"
      animate={{ opacity: task.completed ? 0 : 1 }}
    />
    <button
      onClick={() => toggleTask(task.id)}
      className="mt-0.5 flex-shrink-0 transition-transform duration-200 hover:scale-110 z-10"
    >
      {task.completed ? (
        <CheckCircle className="w-5 h-5 text-cyan-400" />
      ) : (
        <Circle className="w-5 h-5 text-gray-500 hover:text-cyan-400" />
      )}
    </button>
    <div className="flex-1 min-w-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-lg">{task.icon}</span>
        <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-200 group-hover:text-cyan-300'} transition-colors`}>
          {task.text}
        </p>
      </div>
      <div className="flex items-center gap-3 mt-1">
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {task.timeEstimate}
        </span>
        <span className="text-xs text-gray-400">
          {goals.find(g => g.id === task.goalId)?.title}
        </span>
      </div>
      {task.aiNote && (
        <p className="text-xs text-gray-400 mt-2 pl-1">{task.aiNote}</p>
      )}
    </div>
    {/* Mobile swipe hint */}
    <motion.div 
      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 3, delay: 1 }}
    >
      ← Swipe →
    </motion.div>
  </motion.div>
);

export default TaskCard;
