'use client';

import { Task } from '@/lib/types';
import { Clock, MapPin, DollarSign, User } from 'lucide-react';
import { Avatar } from './Avatar';

interface TaskCardProps {
  task: Task;
  variant?: 'posting' | 'assigned';
  onClick?: () => void;
}

export function TaskCard({ task, variant = 'posting', onClick }: TaskCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'posted': return 'status-posted';
      case 'accepted': return 'status-accepted';
      case 'in_progress': return 'status-accepted';
      case 'completed': return 'status-completed';
      default: return 'status-posted';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div 
      className="task-card cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <Avatar 
            src={task.poster?.profilePictureUrl} 
            name={task.poster?.displayName || 'User'} 
            size="sm" 
          />
          <div>
            <h3 className="font-semibold text-fg text-lg">{task.title}</h3>
            <p className="text-text-secondary text-sm">
              by {task.poster?.displayName || 'Anonymous'}
            </p>
          </div>
        </div>
        <span className={getStatusColor(task.status)}>
          {task.status.replace('_', ' ')}
        </span>
      </div>

      <p className="text-text-secondary mb-4 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between text-sm text-text-secondary">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <MapPin size={16} />
            <span>{task.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{formatTimeAgo(task.createdAt)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 text-accent font-semibold">
          <DollarSign size={16} />
          <span>${task.budget}</span>
        </div>
      </div>

      {variant === 'assigned' && task.runner && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <User size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              Runner: {task.runner.displayName}
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm">{task.runner.rating}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
