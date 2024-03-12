import {
  AddTodoRequest,
  AddTodoResponse,
  addTodoError,
  addTodoStarted,
  addTodoSuccess,
  removeTodoError,
  removeTodoStarted,
  removeTodoSuccess,
  toggleTodoError,
  toggleTodoStarted,
  toggleTodoSuccess,
  ToggleTodoRequest
} from "./todo.actions";
import { initialState, todoStore } from "./todo.reducers";

describe("todoStore reducer", () => {
  it("should handle addTodoStarted action", () => {
    const newTodo: AddTodoRequest = { name: "Test", done: false };
    const action = addTodoStarted(newTodo);

    const state = todoStore(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it("should handle addTodoSuccess action", () => {
    //Arrange
    const todo: AddTodoResponse = { id: 1, name: "Test", done: false };
    const action = addTodoSuccess(todo);

    //Act
    const state = todoStore(initialState, action);

    //Assert
    expect(state).toEqual({ ...initialState, isLoading: false, todos: [todo] });
  });

  it("should handle addTodoError action", () => {
    const error = "Test Error";
    const action = addTodoError({ message: error });

    const state = todoStore(initialState, action);

    expect(state).toEqual({ ...initialState, error, isLoading: false });
  });

  it("should handle removeTodoStarted action", () => {
    const removeTodo = { id: 1 };
    const action = removeTodoStarted(removeTodo);

    const state = todoStore(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it("should handle removeTodoSuccess action", () => {
    //Arrange
    const todos = [{ id: 1, name: "Test", done: false }];
    const initialStateWithTodos = { ...initialState, todos };
    const action = removeTodoSuccess({ id: todos[0].id });

    //Act
    const state = todoStore(initialStateWithTodos, action);

    //Assert
    expect(state).toEqual({ ...initialState, isLoading: false, todos: [] });
  });

  it("should handle removeTodoError action", () => {
    const error = "Test Error";
    const action = removeTodoError({ message: error });

    const state = todoStore(initialState, action);

    expect(state).toEqual({ ...initialState, error, isLoading: false });
  });
});

it("should handle toggleTodoStarted action", () => {
  const toggleTodo: ToggleTodoRequest = { id: 1, done: true };
  const action = toggleTodoStarted(toggleTodo);

  const state = todoStore(initialState, action);

  expect(state).toEqual({ ...initialState, isLoading: true });
});

it("should handle toggleTodoSuccess action", () => {
  //Arrange
  const todos = [{ id: 1, name: "Test", done: false }];
  const initialStateWithTodos = { ...initialState, todos };
  const action = toggleTodoSuccess({ id: todos[0].id, done: true });

  //Act
  const state = todoStore(initialStateWithTodos, action);

  //Assert
  expect(state).toEqual({ ...initialState, isLoading: false, todos: [{ id: 1, name: "Test", done: true }] });
});

it("should handle toggleTodoError action", () => {
  const error = "Test Error";
  const action = toggleTodoError({ message: error });

  const state = todoStore(initialState, action);

  expect(state).toEqual({ ...initialState, error, isLoading: false });
});
