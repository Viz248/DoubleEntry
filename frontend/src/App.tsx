import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StoryCard } from './components/StoryCard';
import { PredictiveInsights } from './components/PredictiveInsights';
import { PrivacyStats } from './components/PrivacyStats';
import { mockStoryEvents, mockCategoryData, mockFinancialData } from './data/mockData';
import { Sparkles, Baseline as Timeline, Eye } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'insights' | 'privacy'>('timeline');
  const [visibleEvents, setVisibleEvents] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleEvents(prev => 
        prev < mockStoryEvents.length ? prev + 1 : prev
      );
    }, 800);

    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'timeline', label: 'Story Timeline', icon: Timeline },
    { id: 'insights', label: 'Future Insights', icon: Sparkles },
    { id: 'privacy', label: 'Privacy View', icon: Eye }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-pink-500/10 to-transparent rounded-full animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10">
        <Header 
          balance={mockFinancialData.currentBalance}
          growthRate={mockFinancialData.growthRate}
        />

        {/* Navigation Tabs */}
        <div className="flex justify-center p-6">
          <div className="flex bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 pb-8">
          {/* Timeline View */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Your Financial Journey</h2>
                <p className="text-white/70">Every transaction tells a story</p>
              </div>
              
              <div className="space-y-6 max-w-4xl mx-auto">
                {mockStoryEvents.slice(0, visibleEvents).map((event, index) => (
                  <StoryCard key={event.id} event={event} index={index} />
                ))}
                
                {visibleEvents < mockStoryEvents.length && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center space-x-2 text-white/60">
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="ml-2">Loading more stories...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Insights View */}
          {activeTab === 'insights' && (
            <div className="max-w-2xl mx-auto">
              <PredictiveInsights
                currentSavings={mockFinancialData.currentBalance}
                monthlyIncome={mockFinancialData.monthlyIncome}
                monthlyExpenses={mockFinancialData.monthlyExpenses}
              />
            </div>
          )}

          {/* Privacy View */}
          {activeTab === 'privacy' && (
            <div className="max-w-2xl mx-auto">
              <PrivacyStats
                totalSpent={mockFinancialData.totalSpent}
                categories={mockCategoryData}
              />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;