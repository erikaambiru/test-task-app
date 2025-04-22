import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import { Task, TaskStatus, TaskPriority } from '../../types/Task';
import { AddIcon } from '../icons';
import { GradientBox } from '../ui';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => Promise<void>;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('low');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        title,
        description,
        status,
        priority
      });
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('low');
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalBg = useColorModeValue(
    'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    'linear-gradient(135deg, #2c3e50 0%, #4c5c68 100%)'
  );

  return (
    <>
      <Box textAlign="right" mb={4}>
        <Button
          aria-label="新しいタスクを追加"
          colorScheme="purple"
          size="lg"
          onClick={onOpen}
          borderRadius="full"
          boxShadow="md"
          px={6}
          py={3}
          fontSize="md"
          fontWeight="bold"
          _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            as="span"
            color="white"
            mr={2}
            fontSize="2xl"
            fontWeight="extrabold"
            display="flex"
            alignItems="center"
            justifyContent="center"
            lineHeight="1"
            position="relative"
            top="-1px"
          >
            +
          </Box>
          <Box as="span">新しいタスク</Box>
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgGradient={modalBg}>
          <ModalHeader>新しいタスクを作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired mb={4}>
                <FormLabel>タイトル</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="タスクのタイトルを入力"
                  bg="whiteAlpha.800"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>説明</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="タスクの詳細を入力"
                  bg="whiteAlpha.800"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>ステータス</FormLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  bg="whiteAlpha.800"
                >
                  <option value="todo">未着手</option>
                  <option value="in-progress">進行中</option>
                  <option value="done">完了</option>
                </Select>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>優先度</FormLabel>
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  bg="whiteAlpha.800"
                >
                  <option value="low">低</option>
                  <option value="medium">中</option>
                  <option value="high">高</option>
                </Select>
              </FormControl>

              <ModalFooter px={0}>
                <Button
                  type="submit"
                  colorScheme="purple"
                  mr={3}
                  isLoading={isSubmitting}
                >
                  作成
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  キャンセル
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
