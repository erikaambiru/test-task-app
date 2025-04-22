import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { Task } from '../types/Task';
import { TaskService } from '../services/TaskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const toast = useToast();

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedTasks = await TaskService.getTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      toast({
        title: 'タスク取得エラー',
        description: err instanceof Error ? err.message : '不明なエラー',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const createTask = async (task: Omit<Task, 'id'>): Promise<void> => {
    setIsLoading(true);
    try {
      // idとcreatedAtを追加してTaskServiceに渡す
      const now = new Date();
      const taskWithId = { 
        ...task, 
        id: 'temp-' + Date.now(),
        createdAt: now,
        updatedAt: now
      } as Task;
      
      console.log('Creating task with createdAt:', taskWithId);
      const newTask = await TaskService.createTask(taskWithId);
      setTasks(prevTasks => [...prevTasks, newTask]);
      toast({
        title: 'タスク作成成功',
        description: 'タスクが正常に作成されました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      toast({
        title: 'タスク作成エラー',
        description: err instanceof Error ? err.message : '不明なエラー',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (task: Task): Promise<void> => {
    setIsLoading(true);
    try {
      const updatedTask = await TaskService.updateTask(task);
      setTasks(prevTasks => 
        prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t)
      );
      toast({
        title: 'タスク更新成功',
        description: 'タスクが正常に更新されました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      toast({
        title: 'タスク更新エラー',
        description: err instanceof Error ? err.message : '不明なエラー',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    setIsLoading(true);
    try {
      await TaskService.deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
      toast({
        title: 'タスク削除成功',
        description: 'タスクが正常に削除されました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      toast({
        title: 'タスク削除エラー',
        description: err instanceof Error ? err.message : '不明なエラー',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    fetchTasks
  };
};
