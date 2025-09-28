'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { TaskCard } from '../components/TaskCard';
import { RatingStars } from '../components/RatingStars';
import { getCurrentUser, mockTasks } from '@/lib/mock-data';
import { Star, MapPin, Calendar, Award, Settings2, Edit3 } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Address } from '@coinbase/onchainkit/identity';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'posted' | 'completed' | 'stats'>('posted');
  const currentUser = getCurrentUser();

  // Filter tasks for current user
  const postedTasks = mockTasks.filter(task => task.posterId === currentUser.userId);
  const completedTasks = mockTasks.filter(task => 
    (task.posterId === currentUser.userId || task.runnerId === currentUser.userId) && 
    task.status === 'completed'
  );

  const stats = {
    tasksPosted: postedTasks.length,
    tasksCompleted: completedTasks.length,
    totalEarned: completedTasks
      .filter(task => task.runnerId === currentUser.userId)
      .reduce((sum, task) => sum + task.budget, 0),
    totalSpent: completedTasks
      .filter(task => task.posterId === currentUser.userId)
      .reduce((sum, task) => sum + task.budget, 0),
  };

  const tabs = [
    { key: 'posted', label: 'Posted Tasks', count: postedTasks.length },
    { key: 'completed', label: 'Completed', count: completedTasks.length },
    { key: 'stats', label: 'Statistics', count: null },
  ];

  return (
    <AppShell>
      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="glass-card p-6 rounded-lg mb-6">
          <div className="flex items-start space-x-4">
            <Avatar 
              src={currentUser.profilePictureUrl} 
              name={currentUser.displayName} 
              size="lg" 
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-bold text-fg">{currentUser.displayName}</h1>
                <Button variant="outline" size="sm">
                  <Edit3 size={16} className="mr-2" />
                  Edit
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 mb-3">
                <RatingStars rating={currentUser.rating} size="sm" />
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  currentUser.verificationStatus === 'verified' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {currentUser.verificationStatus === 'verified' ? '✓ Verified' : 'Pending'}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <Wallet>
                  <ConnectWallet>
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <MapPin size={16} />
                      <Address />
                    </div>
                  </ConnectWallet>
                </Wallet>
                
                <div className="flex items-center space-x-2 text-text-secondary">
                  <Calendar size={16} />
                  <span>Member since {currentUser.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{stats.tasksPosted}</div>
              <div className="text-sm text-text-secondary">Posted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{stats.tasksCompleted}</div>
              <div className="text-sm text-text-secondary">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{currentUser.rating.toFixed(1)}</div>
              <div className="text-sm text-text-secondary">Rating</div>
            </div>
          </div>
        </div>

        {/* Runner Toggle */}
        <div className="glass-card p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-fg">Runner Mode</h3>
              <p className="text-sm text-text-secondary">
                {currentUser.isRunner 
                  ? 'You can accept and complete tasks' 
                  : 'Enable to start earning by helping neighbors'
                }
              </p>
            </div>
            <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
              currentUser.isRunner ? 'bg-accent' : 'bg-border'
            }`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                currentUser.isRunner ? 'translate-x-6' : 'translate-x-0.5'
              } mt-0.5`} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-surface rounded-lg p-1">
          {tabs.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === key
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:text-fg'
              }`}
            >
              {label}
              {count !== null && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === key 
                    ? 'bg-white/20' 
                    : 'bg-border text-text-secondary'
                }`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'posted' && (
            <>
              {postedTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="glass-card p-8 rounded-lg">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-lg font-semibold text-fg mb-2">No tasks posted yet</h3>
                    <p className="text-text-secondary mb-4">
                      Start by posting your first task to get help from neighbors
                    </p>
                    <Button variant="primary">Post Your First Task</Button>
                  </div>
                </div>
              ) : (
                postedTasks.map((task) => (
                  <TaskCard key={task.taskId} task={task} variant="posting" />
                ))
              )}
            </>
          )}

          {activeTab === 'completed' && (
            <>
              {completedTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="glass-card p-8 rounded-lg">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-lg font-semibold text-fg mb-2">No completed tasks yet</h3>
                    <p className="text-text-secondary">
                      Complete your first task to see it here
                    </p>
                  </div>
                </div>
              ) : (
                completedTasks.map((task) => (
                  <TaskCard key={task.taskId} task={task} variant="assigned" />
                ))
              )}
            </>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-4">
              {/* Earnings & Spending */}
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-fg mb-4 flex items-center">
                  <Award className="mr-2 text-accent" size={20} />
                  Financial Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="text-2xl font-bold text-green-400">${stats.totalEarned}</div>
                    <div className="text-sm text-text-secondary">Total Earned</div>
                  </div>
                  <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-400">${stats.totalSpent}</div>
                    <div className="text-sm text-text-secondary">Total Spent</div>
                  </div>
                </div>
              </div>

              {/* Activity Stats */}
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-fg mb-4">Activity Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Tasks Posted</span>
                    <span className="font-semibold text-fg">{stats.tasksPosted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Tasks Completed</span>
                    <span className="font-semibold text-fg">{stats.tasksCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Success Rate</span>
                    <span className="font-semibold text-fg">
                      {stats.tasksPosted > 0 ? Math.round((stats.tasksCompleted / stats.tasksPosted) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Average Rating</span>
                    <div className="flex items-center space-x-2">
                      <RatingStars rating={currentUser.rating} size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
