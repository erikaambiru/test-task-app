import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Stack,
  Box,
  useColorModeValue
} from '@chakra-ui/react';
import { Task, TaskStatus, TaskPriority } from '../../types/Task';
import { getPriorityIcon } from '../icons';

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (updatedTask: Task) => Promise<void>;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onUpdate
}) => {
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!onUpdate) return;
    
    setIsSubmitting(true);
    try {
      await onUpdate(editedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalBg = useColorModeValue(
    'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    'linear-gradient(135deg, #2c3e50 0%, #4c5c68 100%)'
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bgGradient={modalBg}>
        <ModalHeader
          fontWeight="bold"
          display="flex"
          alignItems="center"
        >
          <Box mr={2}>{getPriorityIcon(task.priority || 'low')}</Box>
          {isEditing ? (
            <Input
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              size="lg"
              fontWeight="bold"
              bg="whiteAlpha.800"
            />
          ) : (
            task.title
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4} align="start">
            {isEditing ? (
              <>
                <FormControl>
                  <FormLabel>説明</FormLabel>
                  <Textarea
                    name="description"
                    value={editedTask.description || ''}
                    onChange={handleChange}
                    placeholder="タスクの詳細を入力"
                    bg="whiteAlpha.800"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>ステータス</FormLabel>
                  <Select
                    name="status"
                    value={editedTask.status}
                    onChange={handleChange}
                    bg="whiteAlpha.800"
                  >
                    <option value="todo">未着手</option>
                    <option value="in-progress">進行中</option>
                    <option value="done">完了</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>優先度</FormLabel>
                  <Select
                    name="priority"
                    value={editedTask.priority || 'low'}
                    onChange={handleChange}
                    bg="whiteAlpha.800"
                  >
                    <option value="low">低</option>
                    <option value="medium">中</option>
                    <option value="high">高</option>
                  </Select>
                </FormControl>
              </>
            ) : (
              <>
                <Box>
                  <strong>説明:</strong> 
                  <Box mt={2} p={3} borderWidth="1px" borderRadius="md" whiteSpace="pre-wrap">
                    {task.description || 'なし'}
                  </Box>
                </Box>
                <Box>
                  <strong>ステータス:</strong> {
                    task.status === 'todo' ? '未着手' : 
                    task.status === 'in-progress' ? '進行中' : '完了'
                  }
                </Box>
                <Box>
                  <strong>優先度:</strong> {
                    (task.priority || 'low') === 'low' ? '低' : 
                    (task.priority || 'low') === 'medium' ? '中' : '高'
                  }
                </Box>
              </>
            )}
          </Stack>
        </ModalBody>
        <ModalFooter>
          {isEditing ? (
            <>
              <Button
                colorScheme="purple"
                mr={3}
                onClick={handleSubmit}
                isLoading={isSubmitting}
              >
                保存
              </Button>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                キャンセル
              </Button>
            </>
          ) : (
            <>
              {onUpdate && (
                <Button
                  colorScheme="purple"
                  mr={3}
                  onClick={() => setIsEditing(true)}
                >
                  編集
                </Button>
              )}
              <Button variant="ghost" onClick={onClose}>
                閉じる
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
