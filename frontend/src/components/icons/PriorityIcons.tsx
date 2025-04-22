import React from 'react';
import { TaskPriority } from '../../types/Task';

export const LowPriorityIcon: React.FC = () => <span>📕</span>;
export const MediumPriorityIcon: React.FC = () => <span>📗</span>;
export const HighPriorityIcon: React.FC = () => <span>📘</span>;

export const getPriorityIcon = (priority: TaskPriority) => {
  switch(priority) {
    case 'low': return <LowPriorityIcon />;
    case 'medium': return <MediumPriorityIcon />;
    case 'high': return <HighPriorityIcon />;
    default: return <LowPriorityIcon />;
  }
};
