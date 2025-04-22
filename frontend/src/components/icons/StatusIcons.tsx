import React from 'react';
import { TaskStatus } from '../../types/Task';

export const TodoIcon: React.FC = () => <span>🗒️</span>;
export const InProgressIcon: React.FC = () => <span>⏳</span>;
export const DoneIcon: React.FC = () => <span>✅</span>;

export const getStatusIcon = (status: TaskStatus) => {
  switch(status) {
    case 'todo': return <TodoIcon />;
    case 'in-progress': return <InProgressIcon />;
    case 'done': return <DoneIcon />;
    default: return <TodoIcon />;
  }
};
