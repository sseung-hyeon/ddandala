// 타입 정의
export interface Todo {
  id: string;
  content: string;
  isCompleted: boolean;
  createdAt: number;
}

export interface CreateTodoRequest {
  content: string;
}

export interface UpdateTodoRequest {
  isCompleted?: boolean;
  content?: string;
}
