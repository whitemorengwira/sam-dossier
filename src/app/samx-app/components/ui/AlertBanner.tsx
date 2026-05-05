"use client";

import React, { useState } from 'react';
import { X, AlertTriangle, AlertCircle, Info, LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

export type AlertType = 'critical' | 'warning' | 'info';

interface AlertBannerProps {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  route?: string;
  icon?: LucideIcon;
  onDismiss?: (id: string) => void;
}

export function AlertBanner({ id, type, title, message, route, icon: Icon, onDismiss }: AlertBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    if (onDismiss) onDismiss(id);
  };

  const DefaultIcon = type === 'critical' ? AlertCircle : type === 'warning' ? AlertTriangle : Info;
  const DisplayIcon = Icon || DefaultIcon;

  const content = (
    <div className={clsx(
      "alert-banner relative",
      `alert-banner--${type}`
    )}>
      <DisplayIcon className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 pr-8">
        <h4 className="font-semibold">{title}</h4>
        <p className="mt-1 opacity-90">{message}</p>
      </div>
      <button 
        onClick={handleDismiss}
        className="absolute top-3 right-3 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Dismiss alert"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );

  if (route) {
    return <Link href={route} className="block">{content}</Link>;
  }

  return content;
}
