import { createReducer, on } from "@ngrx/store";

import { Todo } from "../todo.component";
import { addTodo, removeTodo, toggleTodo } from "./todo.actions";

export type TodoState = {
  todos: Todo[];
};

export const initialState: TodoState = {
  todos: []
};

const todoStore = createReducer(
  initialState,

  //addTodo
  on(addTodo, (state, { id, name, done }) => ({
    ...state,
    todos: [...state.todos, { id, name, done }]
  })),

  //removeTodo
  on(removeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => id !== todo.id)
  })),

  //toggleTodo
  on(toggleTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
  }))
);

export { todoStore };
