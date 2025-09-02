import React from 'react';

// Mendefinisikan tipe data untuk props
interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  onToggle: (id: number) => void; // Fungsi yang akan dipanggil saat item diklik
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  return (
    <li
      onClick={() => onToggle(todo.id)}
      style={{
        cursor: 'pointer',
        // Conditional rendering: Terapkan coretan jika 'completed' bernilai true
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? '#888' : '#000',
        listStyle: 'none',
        padding: '10px',
        fontSize: '1.2rem',
      }}
    >
      {todo.text}
    </li>
  );
};

export default TodoItem;