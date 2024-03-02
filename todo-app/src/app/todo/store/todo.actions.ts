import { createAction, props } from "@ngrx/store";

import { Todo } from "../todo.component";

const addTodo = createAction("[Todo] Add", props<Todo>());
const removeTodo = createAction("[Todo] Remove", props<{ id: number }>());
const toggleTodo = createAction("[Todo] Toggle", props<{ id: number }>());

export { addTodo, removeTodo, toggleTodo };
