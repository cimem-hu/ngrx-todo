import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { TodoService } from "../todo.service";
import {
  AddTodoRequest,
  RemoveTodoRequest,
  ToggleTodoRequest,
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

const handleAddTodoSideEffects$ = createEffect(
  (action$ = inject(Actions), todoService = inject(TodoService)) => {
    return action$.pipe(
      ofType(addTodoStarted),
      exhaustMap((todo: AddTodoRequest) =>
        todoService.addTodo(todo).pipe(
          map((todo) => addTodoSuccess(todo)),
          catchError(({ message }: HttpErrorResponse) => {
            return of(addTodoError({ message }));
          })
        )
      )
    );
  },
  { functional: true }
);

const handleGetTodosSideEffects$ = createEffect(
  (action$ = inject(Actions), todoService = inject(TodoService)) => {
    return action$.pipe(
      ofType(getTodosStarted),
      exhaustMap(() =>
        todoService.getTodos().pipe(
          map((todo) => getTodosSuccess({ todos: todo })),
          catchError(({ message }: HttpErrorResponse) => {
            return of(getTodosError({ message }));
          })
        )
      )
    );
  },
  { functional: true }
);

const handleRemoveTodoSideEffects$ = createEffect(
  (action$ = inject(Actions), todoService = inject(TodoService)) => {
    return action$.pipe(
      ofType(removeTodoStarted),
      exhaustMap(({ id }: RemoveTodoRequest) =>
        todoService.removeTodo(id).pipe(
          map(() => removeTodoSuccess({ id })),
          catchError(({ message }: HttpErrorResponse) => {
            return of(removeTodoError({ message }));
          })
        )
      )
    );
  },
  { functional: true }
);

const handleToggleTodoSideEffects$ = createEffect(
  (action$ = inject(Actions), todoService = inject(TodoService)) => {
    return action$.pipe(
      ofType(toggleTodoStarted),
      exhaustMap(({ id, done }: ToggleTodoRequest) =>
        todoService.toggleTodo(id, done).pipe(
          map(({ id, done }) => toggleTodoSuccess({ id, done })),
          catchError(({ message }: HttpErrorResponse) => {
            return of(toggleTodoError({ message }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const todoEffects = {
  handleAddTodoSideEffects$,
  handleGetTodosSideEffects$,
  handleRemoveTodoSideEffects$,
  handleToggleTodoSideEffects$
};
