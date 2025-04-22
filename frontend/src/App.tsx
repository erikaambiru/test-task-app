import React, { useState } from 'react';
import { ChakraProvider, Container, VStack, useDisclosure } from '@chakra-ui/react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Task, TaskStatus, TaskPriority, TaskSortType } from './types/Task';
import { TaskService } from './services/TaskService';
import { Header } from './components/layout';
import { TaskForm, TaskList, TaskModal, TaskFilter } from './components/task';
import { useTasks } from './hooks';

const App: React.FC = () => {
  const { 
    tasks, 
    createTask, 
    updateTask, 
    deleteTask 
  } = useTasks();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all');
  const [sortType, setSortType] = useState<TaskSortType>('priority');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // フィルタリングロジック
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (task.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // 並べ替えロジック
  console.log('Current sort type:', sortType);
  console.log('Tasks before sorting:', filteredTasks);
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortType) {
      case 'priority':
        // 優先度の値を数値に変換
        const getPriorityValue = (priority: string | undefined): number => {
          switch(priority) {
            case 'high': return 0;
            case 'medium': return 1;
            case 'low': return 2;
            default: return 3; // 優先度がない場合は最低優先度
          }
        };
        
        const aValue = getPriorityValue(a.priority);
        const bValue = getPriorityValue(b.priority);
        console.log(`Comparing priorities: ${a.title} (${a.priority || 'none'}: ${aValue}) vs ${b.title} (${b.priority || 'none'}: ${bValue})`);
        return aValue - bValue;
      case 'createdAt':
        // createdAtが存在しない場合は現在時刻を使用
        const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        console.log(`Comparing dates: ${a.title} (${aDate}) vs ${b.title} (${bDate})`);
        return bDate - aDate; // 降順（新しい順）
      case 'title':
        console.log(`Comparing titles: ${a.title} vs ${b.title}`);
        return a.title.localeCompare(b.title);
      case 'updatedAt':
        // updatedAtが存在しない場合は現在時刻を使用
        const aUpdateDate = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const bUpdateDate = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        console.log(`Comparing update dates: ${a.title} (${aUpdateDate}) vs ${b.title} (${bUpdateDate})`);
        return bUpdateDate - aUpdateDate; // 降順（最近更新された順）
      default:
        return 0;
    }
  });
  
  console.log('Tasks after sorting:', sortedTasks);

  // ドラッグ&ドロップハンドラー
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // ドロップ先がない場合は何もしない
    if (!destination) return;

    // 同じ場所にドロップされた場合は何もしない
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    // ドラッグされたタスクを取得
    const task = tasks.find(t => t.id === draggableId);
    if (!task) return;

    // 新しいステータスを設定
    const updatedTask = {
      ...task,
      status: destination.droppableId as TaskStatus
    };

    // タスクを更新
    updateTask(updatedTask);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    onOpen();
  };

  return (
    <ChakraProvider>
      <Container maxW="1200px" p={[2, 4, 6]}>
        <VStack spacing={6} align="stretch">
          <Header />
          
          <TaskForm onSubmit={createTask} />
          
          <TaskFilter 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterStatus={filterStatus}
            onStatusFilterChange={setFilterStatus}
            filterPriority={filterPriority}
            onPriorityFilterChange={setFilterPriority}
            sortType={sortType}
            onSortChange={setSortType}
          />
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <TaskList 
              tasks={sortedTasks} 
              onTaskDelete={deleteTask} 
              onTaskClick={handleTaskClick}
              onDragEnd={handleDragEnd}
            />
          </DragDropContext>
          
          {selectedTask && (
            <TaskModal 
              task={selectedTask}
              isOpen={isOpen}
              onClose={onClose}
              onUpdate={updateTask}
            />
          )}
        </VStack>
      </Container>
    </ChakraProvider>
  );
};

export default App;
