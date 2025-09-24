import React from 'react';
import { Shield, PieChart, BarChart3 } from 'lucide-react';

interface CategorySpending {
  category: string;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  emoji: string;
}

interface PrivacyStatsProps {
  totalSpent: number;
  categories: CategorySpending[];
}

export const PrivacyStats: React.FC<PrivacyStatsProps> = ({ totalSpent, categories }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Your Financial Fingerprint</h2>
      </div>
      
      <div className="grid gap-4">
        {categories.map((category, index) => (
          <div
            key={category.category}
            className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:border-white/40"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'slideInLeft 0.6s ease-out forwards'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{category.emoji}</span>
                <div>
                  <h3 className="text-white font-medium">{category.category}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-white/60 text-sm">
                      {category.percentage}% of your month
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      category.trend === 'up' ? 'bg-rose-500/20 text-rose-300' :
                      category.trend === 'down' ? 'bg-emerald-500/20 text-emerald-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {category.trend === 'up' ? '↑ trending up' :
                       category.trend === 'down' ? '↓ trending down' :
                       '→ stable'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="w-20 bg-white/10 rounded-full h-2 mb-1">
                  <div
                    className="h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-1000"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                <span className="text-white/60 text-xs">{category.percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-white/20 backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-2">
          <PieChart className="w-5 h-5 text-cyan-400" />
          <span className="text-white font-medium">Privacy Note</span>
        </div>
        <p className="text-white/70 text-sm">
          Your data is anonymized and presented as percentages and trends, 
          keeping your actual spending amounts private while providing meaningful insights.
        </p>
      </div>
    </div>
  );
};