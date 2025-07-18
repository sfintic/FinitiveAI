import React from 'react';
import { Zap, TrendingUp, Target } from 'lucide-react';

export type AiMessage = {
  id: number;
  type: 'motivation' | 'adjustment' | 'celebration';
  message: string;
  timestamp: string;
  hasAction?: boolean;
  actionText?: string;
};

export type AiCoachViewProps = {
  aiMessages: AiMessage[];
};

export const AiCoachView: React.FC<AiCoachViewProps> = ({ aiMessages }) => (
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
