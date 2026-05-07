import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Todo } from '../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  isLoading = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-toss-card rounded-toss shadow-sm overflow-hidden"
    >
      {isLoading && todos.length === 0 ? (
        <div className="py-12 text-center">
          <div className="text-toss-text-light text-sm">로딩 중...</div>
        </div>
      ) : todos.length === 0 ? (
        <div className="py-12 text-center">
          <div className="text-toss-text-light text-sm">
            할 일이 없습니다. 새로운 할 일을 추가해보세요!
          </div>
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  );
};
