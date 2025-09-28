'use client';

import { useTheme } from '../components/ThemeProvider';
import { Button } from '../components/Button';
import { TaskCard } from '../components/TaskCard';
import { Avatar } from '../components/Avatar';
import { RatingStars } from '../components/RatingStars';
import { mockTasks } from '@/lib/mock-data';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { key: 'default', label: 'ErrandMate (Default)', description: 'Warm community theme with coral accents' },
    { key: 'celo', label: 'Celo', description: 'Black background with yellow accents' },
    { key: 'solana', label: 'Solana', description: 'Dark purple with magenta accents' },
    { key: 'base', label: 'Base', description: 'Dark blue with Base blue accents' },
    { key: 'coinbase', label: 'Coinbase', description: 'Dark navy with Coinbase blue accents' },
  ];

  const sampleTask = mockTasks[0];

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/settings" className="p-2 hover:bg-surface rounded-lg transition-colors duration-200">
            <ArrowLeft className="text-fg" size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-fg">Theme Preview</h1>
            <p className="text-text-secondary">Choose your preferred theme</p>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {themes.map((themeOption) => (
            <button
              key={themeOption.key}
              onClick={() => setTheme(themeOption.key as any)}
              className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                theme === themeOption.key
                  ? 'border-accent bg-accent/10'
                  : 'border-border bg-surface hover:border-accent/50'
              }`}
            >
              <h3 className="font-semibold text-fg mb-1">{themeOption.label}</h3>
              <p className="text-sm text-text-secondary">{themeOption.description}</p>
              {theme === themeOption.key && (
                <div className="mt-2 text-accent text-sm font-medium">✓ Active</div>
              )}
            </button>
          ))}
        </div>

        {/* Preview Components */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-fg mb-4">Component Preview</h2>
            
            {/* Buttons */}
            <div className="glass-card p-6 rounded-lg mb-6">
              <h3 className="text-lg font-medium text-fg mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="destructive">Destructive Button</Button>
              </div>
            </div>

            {/* Task Card */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-fg mb-4">Task Card</h3>
              <TaskCard task={sampleTask} />
            </div>

            {/* User Profile Elements */}
            <div className="glass-card p-6 rounded-lg mb-6">
              <h3 className="text-lg font-medium text-fg mb-4">User Elements</h3>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <Avatar name="John Doe" size="md" />
                  <div>
                    <p className="font-medium text-fg">John Doe</p>
                    <p className="text-sm text-text-secondary">Verified Runner</p>
                  </div>
                </div>
                <RatingStars rating={4.5} />
              </div>
            </div>

            {/* Form Elements */}
            <div className="glass-card p-6 rounded-lg mb-6">
              <h3 className="text-lg font-medium text-fg mb-4">Form Elements</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Sample input field"
                  className="input-field"
                />
                <textarea
                  placeholder="Sample textarea"
                  className="input-field resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Status Badges */}
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-medium text-fg mb-4">Status Badges</h3>
              <div className="flex flex-wrap gap-3">
                <span className="status-posted">Posted</span>
                <span className="status-accepted">Accepted</span>
                <span className="status-completed">Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-fg mb-4">Color Palette</h2>
          <div className="glass-card p-6 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-full h-12 bg-bg rounded border border-border"></div>
                <p className="text-sm text-text-secondary">Background</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-12 bg-surface rounded border border-border"></div>
                <p className="text-sm text-text-secondary">Surface</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-12 bg-accent rounded"></div>
                <p className="text-sm text-text-secondary">Accent</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-12 bg-primary rounded"></div>
                <p className="text-sm text-text-secondary">Primary</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
