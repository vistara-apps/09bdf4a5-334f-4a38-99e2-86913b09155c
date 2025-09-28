'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { TaskCard } from './components/TaskCard';
import { Button } from './components/Button';
import { Avatar } from './components/Avatar';
import { mockTasks, getCurrentUser } from '@/lib/mock-data';
import { Task } from '@/lib/types';
import { Search, Filter, MapPin } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'grocery' | 'delivery' | 'pet_care' | 'cleaning' | 'other'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const currentUser = getCurrentUser();

  useEffect(() => {
    // Filter tasks to show only posted tasks (available for runners)
    const availableTasks = mockTasks.filter(task => task.status === 'posted');
    setTasks(availableTasks);
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.taskType === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleTaskClick = (task: Task) => {
    // Navigate to task details (would be implemented with router)
    console.log('Navigate to task:', task.taskId);
  };

  return (
    <AppShell>
      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-fg">ErrandMate</h1>
              <p className="text-text-secondary">Your neighborhood helper network</p>
            </div>
            <Wallet>
              <ConnectWallet>
                <Avatar name={currentUser.displayName} size="md" />
              </ConnectWallet>
            </Wallet>
          </div>

          {/* Welcome Message */}
          <div className="glass-card p-4 rounded-lg mb-6">
            <div className="flex items-center space-x-3">
              <MapPin className="text-accent" size={20} />
              <div>
                <p className="text-fg font-medium">Welcome back, {currentUser.displayName}!</p>
                <p className="text-text-secondary text-sm">
                  {filteredTasks.length} tasks available in your area
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[
              { key: 'all', label: 'All Tasks' },
              { key: 'grocery', label: 'Grocery' },
              { key: 'delivery', label: 'Delivery' },
              { key: 'pet_care', label: 'Pet Care' },
              { key: 'cleaning', label: 'Cleaning' },
              { key: 'other', label: 'Other' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  filter === key
                    ? 'bg-accent text-white'
                    : 'bg-surface text-text-secondary border border-border hover:bg-accent/10'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="glass-card p-8 rounded-lg">
                <Filter className="mx-auto text-text-secondary mb-4" size={48} />
                <h3 className="text-lg font-semibold text-fg mb-2">No tasks found</h3>
                <p className="text-text-secondary mb-4">
                  {searchQuery || filter !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'Be the first to post a task in your neighborhood!'
                  }
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery('');
                  setFilter('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.taskId}
                task={task}
                onClick={() => handleTaskClick(task)}
              />
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 mb-6">
          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-fg mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="primary" className="w-full">
                Post New Task
              </Button>
              <Button variant="outline" className="w-full">
                Become a Runner
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
