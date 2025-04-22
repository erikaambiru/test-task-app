import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { DropResult } from '@hello-pangea/dnd';
import { Task, TaskStatus } from '../../types/Task';
import { TaskColumn } from './TaskColumn';

interface TaskListProps {
  tasks: Task[];
  onTaskDelete: (taskId: string) => void;
  onTaskClick: (task: Task) => void;
  onDragEnd?: (result: DropResult) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskDelete,
  onTaskClick
}) => {
  const statuses: TaskStatus[] = ['todo', 'in-progress', 'done'];

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
      {statuses.map(status => (
        <GridItem key={status}>
          <TaskColumn
            status={status}
            tasks={tasks}
            onTaskDelete={onTaskDelete}
            onTaskClick={onTaskClick}
          />
        </GridItem>
      ))}
    </Grid>
  );
};
