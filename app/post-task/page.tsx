'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { ArrowLeft, MapPin, DollarSign, Clock, Camera } from 'lucide-react';
import Link from 'next/link';
import { TaskType } from '@/lib/types';

export default function PostTaskPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    taskType: 'other' as TaskType,
    budget: '',
    urgency: 'normal',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const taskTypes = [
    { value: 'grocery', label: 'Grocery Shopping', icon: '🛒' },
    { value: 'delivery', label: 'Delivery', icon: '📦' },
    { value: 'pet_care', label: 'Pet Care', icon: '🐕' },
    { value: 'cleaning', label: 'Cleaning', icon: '🧹' },
    { value: 'other', label: 'Other', icon: '📝' },
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Flexible', description: 'Can wait a few days' },
    { value: 'normal', label: 'Normal', description: 'Within 24 hours' },
    { value: 'high', label: 'Urgent', description: 'ASAP' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        taskType: 'other',
        budget: '',
        urgency: 'normal',
      });
      
      alert('Task posted successfully!');
    } catch (error) {
      console.error('Error posting task:', error);
      alert('Failed to post task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/" className="p-2 hover:bg-surface rounded-lg transition-colors duration-200">
            <ArrowLeft className="text-fg" size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-fg">Post a Task</h1>
            <p className="text-text-secondary">Get help from your neighbors</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <Input
            label="Task Title"
            placeholder="What do you need help with?"
            value={formData.title}
            onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
            required
          />

          {/* Task Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-fg">
              Task Type <span className="text-accent">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {taskTypes.map(({ value, label, icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, taskType: value as TaskType }))}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    formData.taskType === value
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border bg-surface text-text-secondary hover:border-accent/50'
                  }`}
                >
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="text-sm font-medium">{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <Textarea
            label="Description"
            placeholder="Provide details about the task..."
            value={formData.description}
            onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
            rows={4}
            required
          />

          {/* Location */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-fg">
              Location <span className="text-accent">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
              <input
                type="text"
                placeholder="Where should this be done?"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-fg">
              Budget <span className="text-accent">*</span>
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
              <input
                type="number"
                placeholder="0"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="input-field pl-10"
                min="1"
                required
              />
            </div>
            <p className="text-text-secondary text-sm">
              Set a fair price for the task complexity and time required
            </p>
          </div>

          {/* Urgency */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-fg">
              Urgency
            </label>
            <div className="space-y-3">
              {urgencyOptions.map(({ value, label, description }) => (
                <label
                  key={value}
                  className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    formData.urgency === value
                      ? 'border-accent bg-accent/10'
                      : 'border-border bg-surface hover:border-accent/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="urgency"
                    value={value}
                    checked={formData.urgency === value}
                    onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                    className="text-accent focus:ring-accent"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-fg">{label}</div>
                    <div className="text-sm text-text-secondary">{description}</div>
                  </div>
                  <Clock size={20} className="text-text-secondary" />
                </label>
              ))}
            </div>
          </div>

          {/* Photo Upload (Optional) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-fg">
              Add Photo (Optional)
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent/50 transition-colors duration-200">
              <Camera className="mx-auto text-text-secondary mb-4" size={48} />
              <p className="text-text-secondary mb-2">Click to upload a photo</p>
              <p className="text-sm text-text-secondary">
                Help runners understand your task better
              </p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="inline-block mt-4 px-4 py-2 bg-surface border border-border rounded-lg text-text-secondary hover:bg-accent/10 hover:border-accent/50 cursor-pointer transition-all duration-200"
              >
                Choose File
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Posting Task...' : 'Post Task'}
            </Button>
            <p className="text-text-secondary text-sm text-center mt-3">
              Your task will be visible to verified runners in your area
            </p>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
