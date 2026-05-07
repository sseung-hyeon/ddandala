import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import todoStore from './store';
import { CreateTodoRequest, UpdateTodoRequest } from './types';

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);

// Routes

// GET /api/todos - 모든 To-do 조회
app.get('/api/todos', (req: Request, res: Response) => {
  try {
    const todos = todoStore.getAllTodos();
    res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch todos',
    });
  }
});

// POST /api/todos - To-do 추가
app.post('/api/todos', (req: Request, res: Response) => {
  try {
    const { content } = req.body as CreateTodoRequest;

    if (!content || typeof content !== 'string' || content.trim() === '') {
      res.status(400).json({
        success: false,
        error: 'Content is required and must be a non-empty string',
      });
      return;
    }

    const newTodo = todoStore.createTodo({ content: content.trim() });
    res.status(201).json({
      success: true,
      data: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create todo',
    });
  }
});

// GET /api/todos/:id - 특정 To-do 조회
app.get('/api/todos/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = todoStore.getTodoById(id);

    if (!todo) {
      res.status(404).json({
        success: false,
        error: 'Todo not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch todo',
    });
  }
});

// PATCH /api/todos/:id - To-do 수정 (상태 토글 또는 내용 수정)
app.patch('/api/todos/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isCompleted, content } = req.body as UpdateTodoRequest;

    const updatedTodo = todoStore.updateTodo(id, { isCompleted, content });

    if (!updatedTodo) {
      res.status(404).json({
        success: false,
        error: 'Todo not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update todo',
    });
  }
});

// DELETE /api/todos/:id - To-do 삭제
app.delete('/api/todos/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = todoStore.deleteTodo(id);

    if (!success) {
      res.status(404).json({
        success: false,
        error: 'Todo not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete todo',
    });
  }
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
