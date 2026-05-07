import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TodoInputProps {
  onAdd: (content: string) => void;
  isLoading?: boolean;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd, isLoading = false }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="새로운 할 일을 입력하세요..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 bg-toss-card border border-toss-border rounded-toss focus:outline-none focus:ring-2 focus:ring-toss-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-toss-primary text-white rounded-toss font-medium transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '추가 중...' : '추가'}
        </motion.button>
      </div>
    </form>
  );
};
