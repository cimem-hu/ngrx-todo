import { createReducer, on } from "@ngrx/store";

import { Todo } from "../todo.component";
import {
  addTodoError,
  addTodoStarted,
  addTodoSuccess,
  getTodosError,
  getTodosStarted,
  getTodosSuccess,
  removeTodoError,
  removeTodoStarted,
  removeTodoSuccess,
  toggleTodoError,
  toggleTodoStarted,
  toggleTodoSuccess
} from "./todo.actions";

export type TodoState = {
  todos: Todo[];
  isLoading: boolean;
  error: string;
};

export const initialState: TodoState = {
  todos: [],
  error: "",
  isLoading: false
};

const todoStore = createReducer(
  initialState,

  //getTodos

  // or grouped actions
  // on(getTodosStarted, toggleTodoStarted, removeTodoStarted, addTodoStarted, (state) => ({ ...state, isLoading: true })),

  on(getTodosStarted, (state) => ({ ...state, isLoading: true })),
  on(getTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    isLoading: false
  })),
  on(getTodosError, (state, { message }) => ({ ...state, error: message, isLoading: false })),

  //addTodo
  on(addTodoStarted, (state) => ({ ...state, isLoading: true })),
  on(addTodoSuccess, (state, { id, name, done }) => ({
    ...state,
    todos: [...state.todos, { id, name, done }],
    isLoading: false
  })),
  on(addTodoError, (state, { message }) => ({ ...state, error: message, isLoading: false })),

  //removeTodo
  on(removeTodoStarted, (state) => ({ ...state, isLoading: true })),
  on(removeTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => {
      console.log(todo.id, id);
      return id !== todo.id;
    }),
    isLoading: false
  })),
  on(removeTodoError, (state, { message }) => ({ ...state, error: message, isLoading: false })),

  //toggleTodo
  on(toggleTodoStarted, (state) => ({ ...state, isLoading: true })),
  on(toggleTodoSuccess, (state, { id, done }) => ({
    ...state,
    todos: state.todos.map((todo) => (todo.id === id ? { ...todo, done } : todo)),
    isLoading: false
  })),
  on(toggleTodoError, (state, { message }) => ({ ...state, error: message, isLoading: false }))
);

export { todoStore };
