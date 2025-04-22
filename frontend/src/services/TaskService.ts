import axios from 'axios';
import { Task, TaskPriority, TaskStatus } from '../types/Task';

const API_URL = 'http://localhost:8081';

export const TaskService = {
  async getTasks(): Promise<Task[]> {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  },

  async createTask(task: Task): Promise<Task> {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  },

  async updateTask(task: Task): Promise<Task> {
    const response = await axios.put(`${API_URL}/tasks/${task.id}`, task);
    return response.data;
  },

  async deleteTask(taskId: string): Promise<void> {
    await axios.delete(`${API_URL}/tasks/${taskId}`);
  }
};
