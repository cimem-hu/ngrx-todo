import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

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

@Injectable()
export class TodoEffects {
  constructor(private readonly actions$: Actions, private readonly todoService: TodoService) {}

  handleAddTodoSideEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodoStarted),
      exhaustMap((todo: AddTodoRequest) =>
        this.todoService.addTodo(todo).pipe(
          map((todo) => addTodoSuccess(todo)),
          catchError(({ message }: HttpErrorResponse) => {
            return of(addTodoError({ message }));
          })
        )
      )
    )
  );

  handleGetTodosSideEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTodosStarted),
      exhaustMap(() =>
        this.todoService.getTodos().pipe(
          map((todo) => getTodosSuccess({ todos: todo })),
          catchError(({ message }: HttpErrorResponse) => {
            return of(getTodosError({ message }));
          })
        )
      )
    )
  );

  handleRemoveTodoSideEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTodoStarted),
      exhaustMap(({ id }: RemoveTodoRequest) =>
        this.todoService.removeTodo(id).pipe(
          map(() => removeTodoSuccess({ id })),
          catchError(({ message }: HttpErrorResponse) => {
            return of(removeTodoError({ message }));
          })
        )
      )
    )
  );

  handleToggleTodoSideEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleTodoStarted),
      exhaustMap(({ id, done }: ToggleTodoRequest) =>
        this.todoService.toggleTodo(id, done).pipe(
          map(({ id, done }) => toggleTodoSuccess({ id, done })),
          catchError(({ message }: HttpErrorResponse) => {
            return of(toggleTodoError({ message }));
          })
        )
      )
    )
  );
}
