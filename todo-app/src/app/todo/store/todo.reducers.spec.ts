import { describe, it, expect } from "vitest";
import {
  addTodoStarted,
  addTodoSuccess,
  addTodoError,
  getTodosStarted,
  getTodosSuccess,
  getTodosError,
  removeTodoStarted,
  removeTodoSuccess,
  removeTodoError,
  toggleTodoStarted,
  toggleTodoSuccess,
  toggleTodoError
} from "./todo.actions";
import { todoStore, initialState } from "./todo.reducers";

describe("todoStore reducer", () => {
  it("should handle addTodoStarted action", () => {
    const newTodo = { name: "Test", done: false };
    const action = addTodoStarted(newTodo);
    const state = todoStore(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it("should handle addTodoSuccess action", () => {
    const todo = { id: 1, name: "Test", done: false };
    const action = addTodoSuccess(todo);
    const state = todoStore(initialState, action);

    expect(state).toEqual({
      ...initialState,
      todos: [todo],
      isLoading: false
    });
  });

  it("should handle addTodoError action", () => {
    const error = "Test error";
    const action = addTodoError({ message: error });
    const state = todoStore(initialState, action);

    expect(state).toEqual({
      ...initialState,
      error,
      isLoading: false
    });
  });

  it("should handle getTodoStarted action", () => {
    const action = getTodosStarted();
    const state = todoStore(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it("should handle getTodosSuccess action", () => {
    const todos = [{ id: 1, name: "Test", done: false }];
    const action = getTodosSuccess({ todos });
    const state = todoStore(initialState, action);

    expect(state).toEqual({
      ...initialState,
      todos: todos,
      isLoading: false
    });
  });

  it("should handle getTodosError action", () => {
    const error = "Test error";
    const action = getTodosError({ message: error });
    const state = todoStore(initialState, action);

    expect(state).toEqual({
      ...initialState,
      error,
      isLoading: false
    });
  });

  it("should handle removeTodoStarted action", () => {
    const todo = { id: 1 };
    const action = removeTodoStarted(todo);
    const state = todoStore(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it("should handle removeTodoSuccess action", () => {
    const todos = [{ id: 1, name: "Test", done: false }];
    const initialState = { isLoading: true, todos: todos, error: "" };
    const todo = { id: 1 };
    const action = removeTodoSuccess(todo);
    const state = todoStore(initialState, action);

    expect(state).toEqual({
      ...initialState,
      todos: [],
      isLoading: false
    });
  });

  it("should handle removeTodoError action", () => {
    const error = "Test error";
    const action = removeTodoError({ message: error });
    const state = todoStore(initialState, action);

    expect(state).toEqual({
      ...initialState,
      error,
      isLoading: false
    });
  });

  it("should handle toggleTodoStarted action", () => {
    const todo = { id: 1, done: false };
    const action = toggleTodoStarted(todo);
    const state = todoStore(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it("should handle toggleTodoSuccess action", () => {
    const todos = [
      { id: 1, name: "Test", done: true },
      { id: 2, name: "Test2", done: true }
    ];
    const initialState = { isLoading: true, todos: todos, error: "" };
    const todo = { id: 1, done: false };
    const action = toggleTodoSuccess(todo);
    const state = todoStore(initialState, action);
    const updatedTodos = [
      { id: 1, name: "Test", done: false },
      { id: 2, name: "Test2", done: true }
    ];

    expect(state).toEqual({
      ...initialState,
      todos: updatedTodos,
      isLoading: false
    });
  });

  it("should handle toggleTodoError action", () => {
    const error = "Test error";
    const action = toggleTodoError({ message: error });
    const state = todoStore(initialState, action);

    expect(state).toEqual({
      ...initialState,
      error,
      isLoading: false
    });
  });
});
