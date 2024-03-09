import { of, throwError } from "rxjs";
import { take } from "rxjs/operators";
import { Actions } from "@ngrx/effects";
import { TodoService } from "../todo.service";
import { getTodosError, getTodosStarted, getTodosSuccess } from "./todo.actions";
import { todoEffects } from "./todo.effects";

describe("Todo Effects", () => {
  let todoService: jest.Mocked<TodoService>;
  let actions$: Actions;

  beforeEach(() => {
    todoService = {
      getTodos: jest.fn()
    } as any;

    actions$ = new Actions(of(getTodosStarted()));
  });

  it("should dispatch getTodosSuccess when todoService.getTodos is successful", (done) => {
    const todo = { id: 1, name: "Test Todo", done: false };
    const outcome = getTodosSuccess({ todos: [todo] });

    todoService.getTodos.mockReturnValue(of([todo]));

    const action = todoEffects.handleGetTodosSideEffects$(actions$, todoService);
    action.pipe(take(1)).subscribe((outputActions) => {
      expect(outputActions).toEqual(outcome);
      done();
    });
  });

  it("should dispatch getTodosError when todoService.getTodos fails", (done) => {
    const error = new Error("Error");
    const outcome = getTodosError({ message: error.message });

    todoService.getTodos.mockReturnValue(throwError(() => error));

    const action = todoEffects.handleGetTodosSideEffects$(actions$, todoService);
    action.pipe(take(1)).subscribe((outputActions) => {
      expect(outputActions).toEqual(outcome);
      done();
    });
  });
});
