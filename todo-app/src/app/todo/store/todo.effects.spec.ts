import { beforeEach, describe, expect, it, vitest } from "vitest";
import { lastValueFrom, of, throwError } from "rxjs";
import { take } from "rxjs/operators";
import { Actions } from "@ngrx/effects";
import { TodoService } from "../todo.service";
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
import { TodoEffects } from "./todo.effects";

describe("Todo Effects", () => {
  let todoService: TodoService;
  let actions$: Actions;
  let todoEffects: TodoEffects;

  describe("Add Todo", () => {
    beforeEach(() => {
      todoService = {
        addTodo: vitest.fn()
      } as unknown as TodoService;

      const newTodo = { name: "Test Todo", done: false };
      actions$ = new Actions(of(addTodoStarted(newTodo)));
      todoEffects = new TodoEffects(actions$, todoService);
    });

    it("should dispatch addTodoSuccess when todoService.addTodo is successful", async () => {
      const todo = { id: 1, name: "Test Todo", done: false };
      const outcome = addTodoSuccess(todo);

      todoService.addTodo = vitest.fn().mockReturnValue(of(todo));

      const action = todoEffects.handleAddTodoSideEffects$;
      action.pipe(take(1)).subscribe((outputActions) => {
        expect(outputActions).toEqual(outcome);
      });
    });

    it("should dispatch addTodoError when todoService.addTodo fails", async () => {
      const error = new Error("Error");
      const outcome = addTodoError({ message: error.message });

      todoService.addTodo = vitest.fn().mockReturnValue(throwError(() => error));

      const action = todoEffects.handleAddTodoSideEffects$;
      const outputAction = await lastValueFrom(action.pipe(take(1)));
      expect(outputAction).toEqual(outcome);
    });
  });

  describe("Get Todos", () => {
    beforeEach(() => {
      todoService = {
        getTodos: vitest.fn()
      } as unknown as TodoService;

      actions$ = new Actions(of(getTodosStarted()));
      todoEffects = new TodoEffects(actions$, todoService);
    });

    it("should dispatch getTodosSuccess when todoService.getTodos is successful", async () => {
      const todo = { id: 1, name: "Test Todo", done: false };
      const outcome = getTodosSuccess({ todos: [todo] });

      todoService.getTodos = vitest.fn().mockReturnValue(of([todo]));

      const action = todoEffects.handleGetTodosSideEffects$;
      const outputAction = await lastValueFrom(action.pipe(take(1)));
      expect(outputAction).toEqual(outcome);
    });

    it("should dispatch getTodosError when todoService.getTodos fails", async () => {
      const error = new Error("Error");
      const outcome = getTodosError({ message: error.message });

      todoService.getTodos = vitest.fn().mockReturnValue(throwError(() => error));

      const action = todoEffects.handleGetTodosSideEffects$;
      const outputAction = await lastValueFrom(action.pipe(take(1)));
      expect(outputAction).toEqual(outcome);
    });
  });

  describe("Remove Todo", () => {
    beforeEach(() => {
      todoService = {
        removeTodo: vitest.fn()
      } as unknown as TodoService;

      const todo = { id: 1 };
      actions$ = new Actions(of(removeTodoStarted(todo)));
      todoEffects = new TodoEffects(actions$, todoService);
    });

    it("should dispatch removeTodoSuccess when todoService.removeTodo is successful", async () => {
      const todo = { id: 1 };
      const outcome = removeTodoSuccess(todo);

      todoService.removeTodo = vitest.fn().mockReturnValue(of(null));

      const action = todoEffects.handleRemoveTodoSideEffects$;
      const outputAction = await lastValueFrom(action.pipe(take(1)));
      expect(outputAction).toEqual(outcome);
    });

    it("should dispatch removeTodoError when todoService.removeTodo fails", async () => {
      const error = new Error("Error");
      const outcome = removeTodoError({ message: error.message });

      todoService.removeTodo = vitest.fn().mockReturnValue(throwError(() => error));

      const action = todoEffects.handleRemoveTodoSideEffects$;
      const outputAction = await lastValueFrom(action.pipe(take(1)));
      expect(outputAction).toEqual(outcome);
    });
  });

  describe("Toggle Todo", () => {
    beforeEach(() => {
      todoService = {
        toggleTodo: vitest.fn()
      } as unknown as TodoService;

      const todo = { id: 1, done: false };
      actions$ = new Actions(of(toggleTodoStarted(todo)));
      todoEffects = new TodoEffects(actions$, todoService);
    });

    it("should dispatch toggleTodoSuccess when todoService.toggleTodo is successful", async () => {
      const updatedTodo = { id: 1, done: true };
      const outcome = toggleTodoSuccess(updatedTodo);

      todoService.toggleTodo = vitest.fn().mockReturnValue(of(updatedTodo));

      const action = todoEffects.handleToggleTodoSideEffects$;
      const outputAction = await lastValueFrom(action.pipe(take(1)));
      expect(outputAction).toEqual(outcome);
    });

    it("should dispatch toggleTodoError when todoService.toggleTodo fails", async () => {
      const error = new Error("Error");
      const outcome = toggleTodoError({ message: error.message });

      todoService.toggleTodo = vitest.fn().mockReturnValue(throwError(() => error));

      const action = todoEffects.handleToggleTodoSideEffects$;

      const outputAction = await lastValueFrom(action.pipe(take(1)));
      expect(outputAction).toEqual(outcome);
    });
  });
});
