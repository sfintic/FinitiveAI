import React from 'react';
import AiMessageCard from './AiMessageCard';
import { Zap, TrendingUp, Target } from 'lucide-react';

interface AiMessage {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  hasAction?: boolean;
  actionText?: string;
}

interface AiCoachViewProps {
  aiMessages: AiMessage[];
}

const AiCoachView: React.FC<AiCoachViewProps> = ({ aiMessages }) => (
  <div className="space-y-6">
    {/* AI Coach header */}
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl border border-purple-500/30 p-6">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-pink-500/10"></div>
      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-2 text-gray-100">AI Coach 🤖</h1>
        <p className="text-purple-200">Your personal success strategist, here to help you navigate challenges and celebrate wins.</p>
      </div>
    </div>
    {/* AI messages */}
    <div className="space-y-4">
      {aiMessages.map(message => (
        <AiMessageCard key={message.id} message={message} />
      ))}
    </div>
    {/* Guidance card */}
    <div className="glass-card border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-colors duration-300">
      <h3 className="font-semibold text-gray-200 mb-2">Need guidance?</h3>
      <p className="text-gray-400 text-sm mb-4">Ask your AI coach anything about your goals, productivity, or motivation.</p>
      <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-400 hover:to-pink-400 transition-all duration-200 font-medium">
        Start Conversation
      </button>
    </div>
  </div>
);

export default AiCoachView;
