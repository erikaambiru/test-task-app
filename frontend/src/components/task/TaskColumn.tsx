import React from 'react';
import { Box, Heading, Stack } from '@chakra-ui/react';
import { Droppable } from '@hello-pangea/dnd';
import { Task, TaskStatus } from '../../types/Task';
import { getStatusIcon } from '../icons';
import { GradientBox } from '../ui';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onTaskDelete: (taskId: string) => void;
  onTaskClick: (task: Task) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
  status,
  tasks,
  onTaskDelete,
  onTaskClick
}) => {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <GradientBox
          gradientType={status === 'todo' ? 'todo' : status === 'in-progress' ? 'inProgress' : 'done'}
          p={4}
          borderWidth={1}
          _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Heading 
            size="md" 
            mb={4} 
            textAlign="center"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="600"
          >
            <Box mr={2}>{getStatusIcon(status)}</Box>
            {status === 'todo' ? '未着手' : status === 'in-progress' ? '進行中' : '完了'}
          </Heading>
          <Stack spacing={4} width="full">
            {tasks
              .filter(task => task.status === status)
              .map((task, index) => (
                <TaskCard 
                  key={task.id}
                  task={task}
                  index={index}
                  onDelete={onTaskDelete}
                  onClick={onTaskClick}
                />
              ))}
            {provided.placeholder}
          </Stack>
        </GradientBox>
      )}
    </Droppable>
  );
};
