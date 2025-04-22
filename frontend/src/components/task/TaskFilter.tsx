import React from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { TaskStatus, TaskPriority, TaskSortType } from '../../types/Task';
import { SearchIcon } from '../icons';
import { GradientBox } from '../ui';

interface TaskFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: TaskStatus | 'all';
  onStatusFilterChange: (value: TaskStatus | 'all') => void;
  filterPriority: TaskPriority | 'all';
  onPriorityFilterChange: (value: TaskPriority | 'all') => void;
  sortType: TaskSortType;
  onSortChange: (value: TaskSortType) => void;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onStatusFilterChange,
  filterPriority,
  onPriorityFilterChange,
  sortType,
  onSortChange
}) => {
  const bgColor = useColorModeValue('white', 'gray.700');

  return (
    <GradientBox gradientType="header" p={4} mb={4}>
      <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            placeholder="タスクを検索..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            bg={bgColor}
            borderRadius="md"
          />
        </InputGroup>

        <Select
          placeholder="ステータスでフィルター"
          value={filterStatus}
          onChange={(e) => onStatusFilterChange(e.target.value as TaskStatus | 'all')}
          bg={bgColor}
          borderRadius="md"
        >
          <option value="all">すべてのステータス</option>
          <option value="todo">未着手</option>
          <option value="in-progress">進行中</option>
          <option value="done">完了</option>
        </Select>

        <Select
          placeholder="優先度でフィルター"
          value={filterPriority}
          onChange={(e) => onPriorityFilterChange(e.target.value as TaskPriority | 'all')}
          bg={bgColor}
          borderRadius="md"
        >
          <option value="all">すべての優先度</option>
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </Select>

        <Select
          placeholder="並べ替え"
          value={sortType}
          onChange={(e) => onSortChange(e.target.value as TaskSortType)}
          bg={bgColor}
          borderRadius="md"
        >
          <option value="priority">優先度順</option>
          <option value="createdAt">作成日順</option>
          <option value="updatedAt">更新日順</option>
          <option value="title">タイトル順</option>
        </Select>
      </Stack>
    </GradientBox>
  );
};
