import axios from 'axios';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoAPI = {
  // 모든 To-do 조회
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await apiClient.get('/todos');
    return response.data.data;
  },

  // 특정 To-do 조회
  getTodoById: async (id: string): Promise<Todo> => {
    const response = await apiClient.get(`/todos/${id}`);
    return response.data.data;
  },

  // To-do 추가
  createTodo: async (request: CreateTodoRequest): Promise<Todo> => {
    const response = await apiClient.post('/todos', request);
    return response.data.data;
  },

  // To-do 수정
  updateTodo: async (id: string, request: UpdateTodoRequest): Promise<Todo> => {
    const response = await apiClient.patch(`/todos/${id}`, request);
    return response.data.data;
  },

  // To-do 삭제
  deleteTodo: async (id: string): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
  },
};
