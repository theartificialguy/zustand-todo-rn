// @ts-nocheck
import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsynStorage from '@react-native-async-storage/async-storage';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoState {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>(
  persist(
    set => ({
      todos: [],
      addTodo: todo => {
        set(state => ({
          todos: [todo, ...state.todos],
        }));
      },
      removeTodo: id => {
        set(state => ({
          todos: state.todos.filter(todo => todo.id !== id),
        }));
      },
      toggleTodo: id => {
        set(state => ({
          todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        }));
      },
    }),
    {
      name: 'todo-storage',
      getStorage: () => AsynStorage,
    },
  ),
);
