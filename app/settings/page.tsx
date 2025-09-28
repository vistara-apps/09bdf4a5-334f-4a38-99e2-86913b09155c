'use client';

import { AppShell } from '../components/AppShell';
import { Button } from '../components/Button';
import { useTheme } from '../components/ThemeProvider';
import { ArrowLeft, Bell, Shield, CreditCard, HelpCircle, LogOut, Palette } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { key: 'default', label: 'ErrandMate (Default)', color: '#ff6b6b' },
    { key: 'celo', label: 'Celo', color: '#fbcc5c' },
    { key: 'solana', label: 'Solana', color: '#dc1fff' },
    { key: 'base', label: 'Base', color: '#0052ff' },
    { key: 'coinbase', label: 'Coinbase', color: '#0052ff' },
  ];

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: Palette,
          label: 'Theme',
          description: 'Choose your preferred color theme',
          action: 'theme-selector',
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          description: 'Get notified about task updates',
          action: 'toggle',
          enabled: true,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          icon: Shield,
          label: 'Privacy & Security',
          description: 'Manage your privacy settings',
          action: 'navigate',
        },
        {
          icon: CreditCard,
          label: 'Payment Methods',
          description: 'Manage your wallet connections',
          action: 'navigate',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          description: 'Get help and contact support',
          action: 'navigate',
        },
      ],
    },
  ];

  return (
    <AppShell>
      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/profile" className="p-2 hover:bg-surface rounded-lg transition-colors duration-200">
            <ArrowLeft className="text-fg" size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-fg">Settings</h1>
            <p className="text-text-secondary">Customize your ErrandMate experience</p>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h2 className="text-lg font-semibold text-fg">{section.title}</h2>
              <div className="glass-card rounded-lg overflow-hidden">
                {section.items.map((item, index) => (
                  <div key={item.label}>
                    <div className="p-4 hover:bg-surface/50 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <item.icon className="text-accent" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-fg">{item.label}</h3>
                          <p className="text-sm text-text-secondary">{item.description}</p>
                          
                          {/* Theme Selector */}
                          {item.action === 'theme-selector' && (
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              {themes.map((themeOption) => (
                                <button
                                  key={themeOption.key}
                                  onClick={() => setTheme(themeOption.key as any)}
                                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                                    theme === themeOption.key
                                      ? 'border-accent bg-accent/10'
                                      : 'border-border hover:border-accent/50'
                                  }`}
                                >
                                  <div 
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: themeOption.color }}
                                  />
                                  <span className="text-sm font-medium text-fg">
                                    {themeOption.label}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Toggle Switch */}
                        {item.action === 'toggle' && (
                          <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                            item.enabled ? 'bg-accent' : 'bg-border'
                          }`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                              item.enabled ? 'translate-x-6' : 'translate-x-0.5'
                            } mt-0.5`} />
                          </div>
                        )}
                      </div>
                    </div>
                    {index < section.items.length - 1 && (
                      <div className="border-b border-border" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Danger Zone */}
        <div className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-fg">Account Actions</h2>
          <div className="glass-card p-4 rounded-lg border-red-500/20">
            <button className="flex items-center space-x-4 w-full text-left hover:bg-red-500/5 p-2 rounded-lg transition-colors duration-200">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <LogOut className="text-red-400" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-red-400">Sign Out</h3>
                <p className="text-sm text-text-secondary">Sign out of your account</p>
              </div>
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="mt-8 text-center text-text-secondary text-sm">
          <p>ErrandMate v1.0.0</p>
          <p>Built on Base • Powered by OnchainKit</p>
        </div>
      </div>
    </AppShell>
  );
}
