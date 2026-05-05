import React from 'react';
import clsx from 'clsx';

export type BadgeType = 'critical' | 'warning' | 'success' | 'info' | 'draft' | 'pending' | 'submitted';

interface BadgeProps {
  type: BadgeType;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ type, children, className }: BadgeProps) {
  return (
    <span className={clsx("badge", `badge--${type}`, className)}>
      {children}
    </span>
  );
}
