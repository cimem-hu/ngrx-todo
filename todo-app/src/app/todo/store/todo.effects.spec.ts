import { of, throwError } from "rxjs";
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
  let todoService: jest.Mocked<TodoService>;
  let actions$: Actions;
  let todoEffects: TodoEffects;

  describe("Add Todo", () => {
    beforeEach(() => {
      todoService = {
        addTodo: jest.fn()
      } as unknown as jest.Mocked<TodoService>;

      const newTodo = { name: "Test Todo", done: false };
      actions$ = new Actions(of(addTodoStarted(newTodo)));
      todoEffects = new TodoEffects(actions$, todoService);
    });

    it("should dispatch addTodoSuccess when todoService.addTodo is successful", (done) => {
      const todo = { id: 1, name: "Test Todo", done: false };
      const outcome = addTodoSuccess(todo);

      todoService.addTodo.mockReturnValue(of(todo));

      const action = todoEffects.handleAddTodoSideEffects$;
      action.pipe(take(1)).subscribe((outputActions) => {
        expect(outputActions).toEqual(outcome);
        done();
      });
    });

    it("should dispatch addTodoSuccess when todoService.addTodo fails", (done) => {
      const error = new Error("Error");
      const outcome = addTodoError({ message: error.message });

      todoService.addTodo.mockReturnValue(throwError(() => error));

      const action = todoEffects.handleAddTodoSideEffects$;
      action.pipe(take(1)).subscribe((outputActions) => {
        expect(outputActions).toEqual(outcome);
        done();
      });
    });
  });

  describe("Get Todos", () => {
    beforeEach(() => {
      todoService = {
        getTodos: jest.fn()
      } as unknown as jest.Mocked<TodoService>;

      actions$ = new Actions(of(getTodosStarted()));
      todoEffects = new TodoEffects(actions$, todoService);
    });

    it("should dispatch getTodosSuccess when todoService.getTodos is successful", (done) => {
      const todo = { id: 1, name: "Test Todo", done: false };
      const outcome = getTodosSuccess({ todos: [todo] });

      todoService.getTodos.mockReturnValue(of([todo]));

      const action = todoEffects.handleGetTodosSideEffects$;
      action.pipe(take(1)).subscribe((outputActions) => {
        expect(outputActions).toEqual(outcome);
        done();
      });
    });

    it("should dispatch getTodosError when todoService.getTodos fails", (done) => {
      const error = new Error("Error");
      const outcome = getTodosError({ message: error.message });

      todoService.getTodos.mockReturnValue(throwError(() => error));

      const action = todoEffects.handleGetTodosSideEffects$;
      action.pipe(take(1)).subscribe((outputActions) => {
        expect(outputActions).toEqual(outcome);
        done();
      });
    });
  });

  describe("Remove Todo", () => {
    beforeEach(() => {
      todoService = {
        removeTodo: jest.fn()
      } as unknown as jest.Mocked<TodoService>;

      const todo = { id: 1 };
      actions$ = new Actions(of(removeTodoStarted(todo)));
      todoEffects = new TodoEffects(actions$, todoService);
    });

    it("should dispatch removeTodoSuccess when todoService.removeTodo is successful", (done) => {
      const todo = { id: 1 };
      const outcome = removeTodoSuccess(todo);

      todoService.removeTodo = jest.fn().mockReturnValue(of(null));

      const action = todoEffects.handleRemoveTodoSideEffects$;
      action.pipe(take(1)).subscribe((outputActions) => {
        expect(outputActions).toEqual(outcome);
        done();
      });
    });

    it("should dispatch removeTodoError when todoService.removeTodo fails", (done) => {
      const error = new Error("Error");
      const outcome = removeTodoError({ message: error.message });

      todoService.removeTodo.mockReturnValue(throwError(() => error));

      const action = todoEffects.handleRemoveTodoSideEffects$;
      action.pipe(take(1)).subscribe((outputActions) => {
        expect(outputActions).toEqual(outcome);
        done();
      });
    });
  });

  describe("Toggle Todo", () => {
    beforeEach(() => {
      todoService = {
        toggleTodo: jest.fn()
      } as unknown as jest.Mocked<TodoService>;

      const todo = { id: 1, done: false };
      actions$ = new Actions(of(toggleTodoStarted(todo)));
      todoEffects = new TodoEffects(actions$, todoService);
    });

    it("should dispatch toggleTodoSuccess when todoService.toggleTodo is successful", (done) => {
      const updatedTodo = { id: 1, done: true };
      const outcome = toggleTodoSuccess(updatedTodo);

      todoService.toggleTodo = jest.fn().mockReturnValue(of(updatedTodo));

      const action = todoEffects.handleToggleTodoSideEffects$;
      action.pipe(take(1)).subscribe((outputActions) => {
        expect(outputActions).toEqual(outcome);
        done();
      });
    });

    it("should dispatch toggleTodoError when todoService.toggleTodo fails", (done) => {
      const error = new Error("Error");
      const outcome = toggleTodoError({ message: error.message });

      todoService.toggleTodo.mockReturnValue(throwError(() => error));

      const action = todoEffects.handleToggleTodoSideEffects$;
      action.pipe(take(1)).subscribe((outputActions) => {
        expect(outputActions).toEqual(outcome);
        done();
      });
    });
  });
});
