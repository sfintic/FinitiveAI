import React from 'react';
import { Zap, TrendingUp, Target } from 'lucide-react';

interface AiMessage {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  hasAction?: boolean;
  actionText?: string;
}

interface AiMessageCardProps {
  message: AiMessage;
}

const AiMessageCard: React.FC<AiMessageCardProps> = ({ message }) => (
  <div className="glass-card rounded-xl p-4 hover:shadow-lg hover:shadow-cyan-400/10 transition-all duration-300">
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
);

export default AiMessageCard;
