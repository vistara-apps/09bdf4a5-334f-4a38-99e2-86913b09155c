'use client';

import { ReactNode } from 'react';
import { Home, Plus, MessageCircle, User, Settings2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/post-task', icon: Plus, label: 'Post' },
    { href: '/messages', icon: MessageCircle, label: 'Messages' },
    { href: '/profile', icon: User, label: 'Profile' },
    { href: '/settings', icon: Settings2, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <main className="pb-20">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border">
        <div className="max-w-xl mx-auto px-4">
          <div className="flex justify-around py-2">
            {navItems.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'text-accent bg-accent/10' 
                      : 'text-text-secondary hover:text-fg hover:bg-surface'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs mt-1">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
