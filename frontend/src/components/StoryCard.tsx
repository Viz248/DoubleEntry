import React from 'react';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

interface StoryEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  amount: number;
  category: string;
  emoji: string;
  type: 'income' | 'expense';
  trend?: 'up' | 'down';
}

interface StoryCardProps {
  event: StoryEvent;
  index: number;
}

export const StoryCard: React.FC<StoryCardProps> = ({ event, index }) => {
  const isIncome = event.type === 'income';
  
  return (
    <div 
      className={`relative p-6 rounded-2xl backdrop-blur-sm border border-white/20 transition-all duration-500 hover:scale-105 hover:border-white/40 ${
        isIncome 
          ? 'bg-gradient-to-br from-emerald-500/20 to-green-500/10' 
          : 'bg-gradient-to-br from-rose-500/20 to-red-500/10'
      }`}
      style={{
        animationDelay: `${index * 150}ms`,
        animation: 'slideInUp 0.8s ease-out forwards'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{event.emoji}</div>
          <div>
            <h3 className="text-white font-semibold text-lg">{event.title}</h3>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <Calendar size={14} />
              <span>{event.date}</span>
            </div>
          </div>
        </div>
        {event.trend && (
          <div className={`p-2 rounded-lg ${event.trend === 'up' ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
            {event.trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-rose-400" />
            )}
          </div>
        )}
      </div>
      
      <p className="text-white/80 mb-4">{event.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-white/60 text-sm bg-white/10 px-3 py-1 rounded-full">
          {event.category}
        </span>
        <span className={`font-bold text-lg ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isIncome ? '+' : '-'}₹{Math.abs(event.amount).toLocaleString()}
        </span>
      </div>
    </div>
  );
};