export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskSortType = 'priority' | 'createdAt' | 'updatedAt' | 'title';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: TaskPriority;
  createdAt?: Date;
  updatedAt?: Date;
}
