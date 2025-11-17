'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Inbox, Calendar, MapPin } from 'lucide-react';

interface EmptyStateProps {
  icon?: 'search' | 'inbox' | 'calendar' | 'location';
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
}

export function EmptyState({
  icon = 'inbox',
  title,
  description,
  action,
  children,
}: EmptyStateProps) {
  const iconMap = {
    search: Search,
    inbox: Inbox,
    calendar: Calendar,
    location: MapPin,
  };

  const Icon = iconMap[icon];

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[--primary]/20 to-[--secondary]/20 blur-3xl rounded-full"></div>
        <div className="relative bg-gradient-to-br from-[--primary]/10 to-[--secondary]/10 p-8 rounded-full">
          <Icon className="h-16 w-16 text-[--primary]" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mb-6">{description}</p>

      {action && (
        <Button onClick={action.onClick} size="lg" className="gap-2">
          {action.label}
        </Button>
      )}

      {children}
    </div>
  );
}
