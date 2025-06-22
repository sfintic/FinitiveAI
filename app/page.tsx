import React, { useState, useEffect } from 'react';
import { Target, Calendar, CheckCircle, Circle, Clock, Lightbulb, Zap, TrendingUp, Plus } from 'lucide-react';

export default function FinitivePrototype() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [mounted, setMounted] = useState(false);
  
  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  const [user, setUser] = useState({
    name: 'Alex',
    streak: 7,
    completedToday: 3,
    totalToday: 5
  });

  // Sample goals and tasks data
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Land a Product Manager Role",
      timeline: "6 months",
      progress: 35,
      status: "active",
      category: "career",
      currentPhase: "Building portfolio & networking",
      nextMilestone: "Complete 2 case studies",
      daysLeft: 127
    },
    {
      id: 2,
      title: "Get Fit & Healthy",
      timeline: "4 months",
      progress: 60,
      status: "active",
      category: "health",
      currentPhase: "Consistent workout routine",
      nextMilestone: "Run 5K without stopping",
      daysLeft: 89
    }
  ]);

  const [todaysTasks, setTodaysTasks] = useState([
    { id: 1, text: "Research 3 PM job openings", completed: true, goalId: 1, timeEstimate: "30 min", aiNote: "Great start! I found some companies that might interest you." },
    { id: 2, text: "Draft case study outline", completed: true, goalId: 1, timeEstimate: "45 min", aiNote: "Your structure looks solid. Ready for the next step?" },
    { id: 3, text: "30min cardio workout", completed: true, goalId: 2, timeEstimate: "30 min", aiNote: "That's 7 days straight! Your body is adapting well." },
    { id: 4, text: "Review networking contacts", completed: false, goalId: 1, timeEstimate: "20 min", aiNote: "This will help you identify warm introductions." },
    { id: 5, text: "Meal prep for tomorrow", completed: false, goalId: 2, timeEstimate: "25 min", aiNote: "Consistency is key - you've got this!" }
  ]);

  const [aiMessages, setAiMessages] = useState([
    {
      id: 1,
      type: "motivation",
      message: "🔥 Seven days strong! Your consistency is building real momentum.",
      timestamp: "Earlier today"
    },
    {
      id: 2,
      type: "adjustment",
      message: "I noticed you skipped yesterday's networking task. Want to try a different approach? Maybe coffee chats work better than cold emails for you.",
      timestamp: "Yesterday",
      hasAction: true,
      actionText: "Adjust Strategy"
    },
    {
      id: 3,
      type: "celebration",
      message: "Nice work on that case study draft! 🎉 You're ahead of schedule on your PM goal.",
      timestamp: "2 days ago"
    }
  ]);

  if (!mounted) {
    return null;
  }

  const toggleTask = (taskId) => {
    setTodaysTasks(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedCount = todaysTasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / todaysTasks.length) * 100);

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Header with greeting */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-6 rounded-2xl border border-gray-600">
        <h1 className="text-2xl font-bold mb-2">Good morning, {user.name}! ☀️</h1>
        <p className="text-gray-300">Ready to make today count? You're on a {user.streak}-day streak!</p>

        <div className="mt-4 flex items-center gap-4">
          <div className="bg-gray-600/50 px-3 py-2 rounded-lg border border-gray-500">
            <div className="text-sm text-gray-300">Today's Progress</div>
            <div className="text-xl font-bold">{completedCount}/{todaysTasks.length}</div>
          </div>
          <div className="bg-gray-600/50 px-3 py-2 rounded-lg border border-gray-500">
            <div className="text-sm text-gray-300">Streak</div>
            <div className="text-xl font-bold">{user.streak} days</div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gray-800 border border-gray-600 p-4 rounded-xl">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-200 mb-1">AI Insight</h3>
            <p className="text-gray-300 text-sm">You're crushing your morning tasks this week! I've noticed you work best between 9-11am. Want me to schedule more important tasks during this time?</p>
            <button className="mt-2 text-sm bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-500 border border-gray-500">
              Yes, optimize my schedule
            </button>
          </div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-100">Today's Focus</h2>
          <div className="text-sm text-gray-400">{progressPercent}% complete</div>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-to-r from-gray-500 to-gray-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="space-y-3">
          {todaysTasks.map(task => (
            <div key={task.id} className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors border border-gray-700">
              <button
                onClick={() => toggleTask(task.id)}
                className="mt-1 flex-shrink-0"
              >
                {task.completed ? (
                  <CheckCircle className="w-5 h-5 text-gray-400" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-500 hover:text-gray-300" />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                  {task.text}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.timeEstimate}
                  </span>
                  <span className="text-xs text-gray-400">
                    {goals.find(g => g.id === task.goalId)?.title}
                  </span>
                </div>
                {task.aiNote && (
                  <p className="text-xs text-gray-400 mt-1 italic">💡 {task.aiNote}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals Overview */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-100 mb-4">Active Goals</h2>
        <div className="space-y-4">
          {goals.map(goal => (
            <div key={goal.id} className="border border-gray-600 rounded-lg p-4 bg-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-200">{goal.title}</h3>
                <span className="text-sm text-gray-400">{goal.daysLeft} days left</span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div 
                  className="bg-gray-500 h-2 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{goal.currentPhase}</span>
                <span className="text-gray-300 font-medium">{goal.progress}%</span>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">Next: {goal.nextMilestone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const GoalsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Your Goals</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          New Goal
        </button>
      </div>

      {goals.map(goal => (
        <div key={goal.id} className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{goal.title}</h2>
              <p className="text-gray-600">{goal.timeline} timeline • {goal.category}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{goal.progress}%</div>
              <div className="text-sm text-gray-500">complete</div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
              style={{ width: `${goal.progress}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-1">Current Phase</h4>
              <p className="text-blue-800 text-sm">{goal.currentPhase}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-1">Next Milestone</h4>
              <p className="text-green-800 text-sm">{goal.nextMilestone}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
              View Breakdown
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">
              Adjust Timeline
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const AiCoachView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl">
        <h1 className="text-2xl font-bold mb-2">AI Coach 🤖</h1>
        <p className="text-purple-100">Your personal success strategist, here to help you navigate challenges and celebrate wins.</p>
      </div>

      <div className="space-y-4">
        {aiMessages.map(message => (
          <div key={message.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${
                message.type === 'motivation' ? 'bg-green-100' :
                message.type === 'adjustment' ? 'bg-yellow-100' : 'bg-blue-100'
              }`}>
                {message.type === 'motivation' ? <Zap className="w-4 h-4 text-green-600" /> :
                 message.type === 'adjustment' ? <TrendingUp className="w-4 h-4 text-yellow-600" /> :
                 <Target className="w-4 h-4 text-blue-600" />}
              </div>
              
              <div className="flex-1">
                <p className="text-gray-900 mb-2">{message.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                  {message.hasAction && (
                    <button className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700">
                      {message.actionText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
        <h3 className="font-semibold text-gray-700 mb-2">Need guidance?</h3>
        <p className="text-gray-600 text-sm mb-4">Ask your AI coach anything about your goals, productivity, or motivation.</p>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          Start Conversation
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-black min-h-screen">
      {/* Top Navigation */}
      <div className="bg-gray-900 border-b border-gray-700 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 text-gray-300">
                <svg viewBox="0 0 100 60" className="w-full h-full">
                  <path d="M15,30 Q15,15 30,15 L40,15 Q55,15 55,30 Q55,45 40,45 L35,45 L35,30 L40,30 Q45,30 45,25 Q45,20 40,20 L30,20 Q25,20 25,25 Q25,30 30,30 L35,30 L35,45 L30,45 Q15,45 15,30 Z" fill="currentColor"/>
                  <path d="M85,30 Q85,15 70,15 L60,15 Q45,15 45,30 Q45,45 60,45 L65,45 L65,30 L60,30 Q55,30 55,25 Q55,20 60,20 L70,20 Q75,20 75,25 Q75,30 70,30 L65,30 L65,45 L70,45 Q85,45 85,30 Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-100">Finitive</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  currentView === 'dashboard' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setCurrentView('goals')}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  currentView === 'goals' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Goals
              </button>
              <button
                onClick={() => setCurrentView('coach')}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  currentView === 'coach' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                AI Coach
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'goals' && <GoalsView />}
        {currentView === 'coach' && <AiCoachView />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex justify-center gap-8">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex flex-col items-center gap-1 ${
              currentView === 'dashboard' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Today</span>
          </button>
          <button
            onClick={() => setCurrentView('goals')}
            className={`flex flex-col items-center gap-1 ${
              currentView === 'goals' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Target className="w-5 h-5" />
            <span className="text-xs">Goals</span>
          </button>
          <button
            onClick={() => setCurrentView('coach')}
            className={`flex flex-col items-center gap-1 ${
              currentView === 'coach' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Lightbulb className="w-5 h-5" />
            <span className="text-xs">AI Coach</span>
          </button>
        </div>
      </div>
    </div>
  );
}