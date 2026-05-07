import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="border-b border-toss-border last:border-b-0 py-3 px-4"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center flex-1 cursor-pointer" onClick={() => onToggle(todo.id)}>
          {/* 상태 표시 아이콘 */}
          <div
            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
              todo.isCompleted
                ? 'bg-toss-primary border-toss-primary'
                : 'border-toss-border hover:border-toss-primary'
            }`}
          >
            {todo.isCompleted && <span className="text-white text-xs">✓</span>}
          </div>

          {/* 텍스트 */}
          <span
            className={`flex-1 transition-all ${
              todo.isCompleted
                ? 'line-through text-toss-text-light'
                : 'text-toss-text'
            }`}
          >
            {todo.content}
          </span>
        </div>

        {/* 삭제 버튼 */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(todo.id)}
          className={`p-1.5 rounded-lg transition-all ${
            isHovering
              ? 'bg-red-50 text-red-500 opacity-100'
              : 'text-toss-text-light opacity-0'
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};
