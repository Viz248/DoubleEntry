export interface StoryEvent {
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

export interface CategorySpending {
  category: string;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  emoji: string;
}

export const mockStoryEvents: StoryEvent[] = [
  {
    id: '1',
    date: 'January 15, 2024',
    title: 'First Salary Celebration',
    description: '🎉 You spent your first salary on that amazing dinner with friends. The memories were worth every rupee!',
    amount: 3500,
    category: 'Dining',
    emoji: '🎉',
    type: 'expense'
  },
  {
    id: '2',
    date: 'February 2, 2024',
    title: 'Smart Investment Move',
    description: '📈 Started your SIP journey! You began investing ₹5,000 monthly in mutual funds.',
    amount: 5000,
    category: 'Investment',
    emoji: '📈',
    type: 'expense',
    trend: 'up'
  },
  {
    id: '3',
    date: 'February 28, 2024',
    title: 'Freelance Success',
    description: '💰 Your side project paid off! Earned from freelance work this month.',
    amount: 15000,
    category: 'Freelance',
    emoji: '💰',
    type: 'income',
    trend: 'up'
  },
  {
    id: '4',
    date: 'March 10, 2024',
    title: 'Tech Upgrade',
    description: '💻 Invested in a new laptop for better productivity. Your future self will thank you!',
    amount: 45000,
    category: 'Technology',
    emoji: '💻',
    type: 'expense'
  },
  {
    id: '5',
    date: 'March 25, 2024',
    title: 'Savings Milestone',
    description: '🎯 Hit your first ₹50,000 savings milestone! You started saving more consistently.',
    amount: 12000,
    category: 'Savings',
    emoji: '🎯',
    type: 'income',
    trend: 'up'
  },
  {
    id: '6',
    date: 'April 5, 2024',
    title: 'Health Investment',
    description: '🏥 Got comprehensive health insurance. Protecting your future was a wise choice!',
    amount: 8500,
    category: 'Health',
    emoji: '🏥',
    type: 'expense'
  },
  {
    id: '7',
    date: 'April 18, 2024',
    title: 'Weekend Getaway',
    description: '✈️ Treated yourself to a well-deserved vacation. Work-life balance is important!',
    amount: 18000,
    category: 'Travel',
    emoji: '✈️',
    type: 'expense'
  },
  {
    id: '8',
    date: 'May 1, 2024',
    title: 'Salary Increment',
    description: '🚀 Your hard work paid off with a 20% salary increase! Time to level up your savings game.',
    amount: 25000,
    category: 'Salary',
    emoji: '🚀',
    type: 'income',
    trend: 'up'
  }
];

export const mockCategoryData: CategorySpending[] = [
  {
    category: 'Food & Dining',
    percentage: 28,
    trend: 'up',
    emoji: '🍔'
  },
  {
    category: 'Transportation',
    percentage: 15,
    trend: 'stable',
    emoji: '🚗'
  },
  {
    category: 'Entertainment',
    percentage: 12,
    trend: 'down',
    emoji: '🎬'
  },
  {
    category: 'Shopping',
    percentage: 20,
    trend: 'up',
    emoji: '🛍️'
  },
  {
    category: 'Utilities',
    percentage: 18,
    trend: 'stable',
    emoji: '⚡'
  },
  {
    category: 'Health & Fitness',
    percentage: 7,
    trend: 'up',
    emoji: '💪'
  }
];

export const mockFinancialData = {
  currentBalance: 125350,
  monthlyIncome: 68000,
  monthlyExpenses: 42000,
  growthRate: 8.5,
  totalSpent: 156000
};