import { createAction, props } from "@ngrx/store";
import { Todo } from "../todo.component";

export type GetTodosResponse = { todos: Todo[] };
export type GetTodosError = { message: string };

const getTodosStarted = createAction("[Todo Get] Started");
const getTodosSuccess = createAction("[Todo Get] Success", props<GetTodosResponse>());
const getTodosError = createAction("[Todo Get] Error", props<GetTodosError>());

export type AddTodoRequest = { name: string; done: boolean };
export type AddTodoResponse = { id: number; name: string; done: boolean };
export type AddTodoError = { message: string };

const addTodoStarted = createAction("[Todo Add] Started", props<AddTodoRequest>());
const addTodoSuccess = createAction("[Todo Add] Success", props<AddTodoResponse>());
const addTodoError = createAction("[Todo Add] Error", props<AddTodoError>());

export type RemoveTodoRequest = { id: number };
export type RemoveTodoResponse = { id: number };
export type RemoveTodoError = { message: string };

const removeTodoStarted = createAction("[Todo Remove] Started", props<RemoveTodoRequest>());
const removeTodoSuccess = createAction("[Todo Remove] Success", props<RemoveTodoResponse>());
const removeTodoError = createAction("[Todo Remove] Error", props<RemoveTodoError>());

export type ToggleTodoRequest = { id: number; done: boolean };
export type ToggleTodoResponse = { id: number; done: boolean };
export type ToggleTodoError = { message: string };

const toggleTodoStarted = createAction("[Todo Toggle] Started", props<ToggleTodoRequest>());
const toggleTodoSuccess = createAction("[Todo Toggle] Success", props<ToggleTodoResponse>());
const toggleTodoError = createAction("[Todo Toggle] Error", props<ToggleTodoError>());

export {
  addTodoError,
  addTodoSuccess,
  addTodoStarted,
  toggleTodoError,
  toggleTodoSuccess,
  toggleTodoStarted,
  removeTodoError,
  removeTodoStarted,
  removeTodoSuccess,
  getTodosStarted,
  getTodosSuccess,
  getTodosError
};
