import React from 'react';
import { Box, Flex, Heading, Text, Badge, Button, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Draggable } from '@hello-pangea/dnd';
import { Task, TaskStatus, TaskPriority } from '../../types/Task';
import { getPriorityIcon, getStatusIcon, DeleteIcon } from '../icons';
import { priorityColorMap, cardVariants, getPriorityGradient } from '../../utils/styles';

interface TaskCardProps {
  task: Task;
  index: number;
  onDelete: (taskId: string) => void;
  onClick: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  index, 
  onDelete,
  onClick 
}) => {
  const { colorMode } = useColorMode();
  
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            transition: 'all 0.3s ease',
            opacity: 1,
            transform: 'translateY(0)'
          }}
        >
          <Box
            width="full" 
            borderWidth={1} 
            borderRadius="xl" 
            p={4} 
            bgGradient={getPriorityGradient(task.priority || 'low')}
            boxShadow="md"
            transition="all 0.3s ease"
            _hover={{ boxShadow: "lg" }}
            onClick={() => onClick(task)}
            cursor="pointer"
          >
            <Flex direction="column">
              <Flex justify="space-between" align="center" mb={2}>
                <Badge 
                  colorScheme={priorityColorMap[task.priority || 'low']} 
                  mr={2}
                  display="flex"
                  alignItems="center"
                  px={2}
                  py={1}
                  borderRadius="full"
                  boxShadow="sm"
                >
                  <Box mr={1}>{getPriorityIcon(task.priority || 'low')}</Box>
                  {(task.priority || 'low') === 'low' ? '低' : (task.priority || 'low') === 'medium' ? '中' : '高'}
                </Badge>
                <Heading size="sm" flex={1} fontWeight="600">{task.title}</Heading>
              </Flex>
              <Text 
                mb={2} 
                fontSize="sm" 
                whiteSpace="pre-wrap"
                overflow="hidden"
                textOverflow="ellipsis"
                noOfLines={3}
                title={task.description} // ホバー時にフルテキストを表示
              >
                {task.description}
              </Text>
              <Flex justify="space-between" align="center">
                <Badge 
                  colorScheme={task.status === 'todo' ? 'purple' : task.status === 'in-progress' ? 'teal' : 'cyan'}
                  display="flex"
                  alignItems="center"
                  px={2}
                  py={1}
                  borderRadius="full"
                >
                  <Box mr={1}>{getStatusIcon(task.status)}</Box>
                  {task.status === 'todo' ? '未着手' : task.status === 'in-progress' ? '進行中' : '完了'}
                </Badge>
                <Button
                  aria-label="タスクを削除"
                  size="sm"
                  variant="solid"
                  colorScheme="red"
                  borderRadius="md"
                  boxShadow="sm"
                  px={2}
                  py={1}
                  _hover={{ transform: 'scale(1.05)', boxShadow: 'md' }}
                  transition="all 0.2s"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    onDelete(task.id);
                  }}
                >
                  削除
                </Button>
              </Flex>
            </Flex>
          </Box>
        </div>
      )}
    </Draggable>
  );
};
