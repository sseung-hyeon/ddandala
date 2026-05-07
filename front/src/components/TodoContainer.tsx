import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Todo } from '../types';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';
import { todoAPI } from '../api/todoAPI';

export const TodoContainer: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 모든 To-do 조회
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await todoAPI.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError('할 일을 불러올 수 없습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 로드 시 To-do 조회
  useEffect(() => {
    fetchTodos();
  }, []);

  // To-do 추가
  const handleAdd = async (content: string) => {
    try {
      setIsAdding(true);
      setError(null);
      const newTodo = await todoAPI.createTodo({ content });
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('할 일을 추가할 수 없습니다.');
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  // To-do 상태 토글
  const handleToggle = async (id: string) => {
    try {
      setError(null);
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const updatedTodo = await todoAPI.updateTodo(id, {
        isCompleted: !todo.isCompleted,
      });

      setTodos(
        todos.map((t) => (t.id === id ? updatedTodo : t))
      );
    } catch (err) {
      setError('할 일을 수정할 수 없습니다.');
      console.error(err);
    }
  };

  // To-do 삭제
  const handleDelete = async (id: string) => {
    try {
      setError(null);
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError('할 일을 삭제할 수 없습니다.');
      console.error(err);
    }
  };

  // 통계 정보
  const completedCount = todos.filter((t) => t.isCompleted).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-toss-bg py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-toss-text mb-2">
            My To-do List
          </h1>
          <p className="text-toss-text-light text-sm">
            {totalCount === 0
              ? '아직 할 일이 없습니다'
              : `${completedCount}/${totalCount} 완료됨`}
          </p>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-toss text-red-700 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* 입력 폼 */}
        <TodoInput onAdd={handleAdd} isLoading={isAdding} />

        {/* To-do 리스트 */}
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          isLoading={isLoading}
        />

        {/* 완료 진행률 */}
        {totalCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-4 bg-toss-card rounded-toss"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-toss-text">
                진행 상황
              </span>
              <span className="text-sm text-toss-text-light">
                {Math.round((completedCount / totalCount) * 100)}%
              </span>
            </div>
            <div className="w-full bg-toss-border rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(completedCount / totalCount) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-toss-primary"
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
