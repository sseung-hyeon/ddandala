import { Todo, CreateTodoRequest, UpdateTodoRequest } from './types';

class TodoStore {
  private todos: Todo[] = [];

  // 모든 To-do 조회
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // 특정 To-do 조회
  getTodoById(id: string): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  // To-do 추가
  createTodo(request: CreateTodoRequest): Todo {
    const todo: Todo = {
      id: Math.random().toString(36).substring(2, 11),
      content: request.content,
      isCompleted: false,
      createdAt: Date.now(),
    };
    this.todos.push(todo);
    return todo;
  }

  // To-do 수정
  updateTodo(id: string, request: UpdateTodoRequest): Todo | null {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      return null;
    }

    if (request.content !== undefined) {
      todo.content = request.content;
    }
    if (request.isCompleted !== undefined) {
      todo.isCompleted = request.isCompleted;
    }

    return todo;
  }

  // To-do 삭제
  deleteTodo(id: string): boolean {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      return false;
    }
    this.todos.splice(index, 1);
    return true;
  }

  // 상태 토글
  toggleTodoStatus(id: string): Todo | null {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      return null;
    }
    todo.isCompleted = !todo.isCompleted;
    return todo;
  }
}

export default new TodoStore();
