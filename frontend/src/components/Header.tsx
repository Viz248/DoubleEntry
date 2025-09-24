import React from 'react';
import { User, Bell, Settings } from 'lucide-react';

interface HeaderProps {
  balance: number;
  growthRate: number;
}

export const Header: React.FC<HeaderProps> = ({ balance, growthRate }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-white/10">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-white text-xl font-semibold">Financial Story</h1>
          <p className="text-white/60 text-sm">Your money's journey</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            ₹{balance.toLocaleString()}
          </div>
          <div className="flex items-center space-x-1">
            <span className={`text-sm ${growthRate >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {growthRate >= 0 ? '+' : ''}{growthRate}%
            </span>
            <span className="text-white/60 text-xs">this month</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <Bell className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};