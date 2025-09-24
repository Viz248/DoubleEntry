import React from 'react';
import { Target, TrendingUp, Clock, Zap } from 'lucide-react';

interface PredictiveInsightsProps {
  currentSavings: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export const PredictiveInsights: React.FC<PredictiveInsightsProps> = ({
  currentSavings,
  monthlyIncome,
  monthlyExpenses
}) => {
  const monthlySavings = monthlyIncome - monthlyExpenses;
  const sixMonthProjection = currentSavings + (monthlySavings * 6);
  const wishlistItem = 85000; // Example wishlist item cost
  const monthsToAfford = Math.ceil((wishlistItem - currentSavings) / monthlySavings);

  const insights = [
    {
      icon: Target,
      title: "6-Month Projection",
      description: "At your current pace, you'll have",
      value: `₹${sixMonthProjection.toLocaleString()}`,
      subtext: "in 6 months",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: Clock,
      title: "Wishlist Goal",
      description: "You can afford your dream purchase in",
      value: `${monthsToAfford} months`,
      subtext: "Keep saving!",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Monthly Growth",
      description: "Your savings are growing by",
      value: `₹${monthlySavings.toLocaleString()}`,
      subtext: "every month",
      gradient: "from-emerald-500 to-cyan-500"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Zap className="w-6 h-6 text-yellow-400" />
        <h2 className="text-2xl font-bold text-white">Future Insights</h2>
      </div>
      
      <div className="grid gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl bg-gradient-to-r ${insight.gradient} bg-opacity-20 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105`}
            style={{
              animationDelay: `${(index + 1) * 200}ms`,
              animation: 'fadeInScale 0.8s ease-out forwards'
            }}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <insight.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">{insight.title}</h3>
                <p className="text-white/70 text-sm mb-2">{insight.description}</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-white">{insight.value}</span>
                  <span className="text-white/60 text-sm">{insight.subtext}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};