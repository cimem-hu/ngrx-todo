import { Actions } from "@ngrx/effects";
import { TodoService } from "../todo.service";
import * as TodoActions from "./todo.actions";
import { TodoEffects } from "./todo.effects";
import { of, take, throwError } from "rxjs";

describe("Todo Effects", () => {
  let todoService: jest.Mocked<TodoService>;
  let actions$: Actions;
  let todoEffects: TodoEffects;

  describe("Add Todo", () => {
    beforeEach(() => {
      todoService = {
        addTodo: jest.fn()
      } as unknown as jest.Mocked<TodoService>;

      const newTodo = { name: "Todo", done: false };
      actions$ = new Actions(of(TodoActions.addTodoStarted(newTodo)));
      todoEffects = new TodoEffects(actions$, todoService);
    });

    it("should dispatch addTodoSuccess when todoService.addTodo is successful", (done) => {
      const todo = { id: 1, name: "Todo", done: false };
      const dispatchedAction = TodoActions.addTodoSuccess(todo);

      todoService.addTodo.mockReturnValue(of(todo));

      const action = todoEffects.handleAddTodoSideEffects$;
      action.pipe(take(1)).subscribe((nextAction) => {
        expect(nextAction).toEqual(dispatchedAction);
        done();
      });
    });

    it("should dispatch addTodoError when todService.addTodo throws an error", (done) => {
      const error = new Error("Error");
      const dispatchedAction = TodoActions.addTodoError({ message: error.message });

      todoService.addTodo.mockReturnValue(throwError(() => error));

      const action = todoEffects.handleAddTodoSideEffects$;
      action.pipe(take(1)).subscribe((nextAction) => {
        expect(nextAction).toEqual(dispatchedAction);
        done();
      });
    });
  });
  describe("Remove Todo", () => {
    beforeEach(() => {
      todoService = {
        removeTodo: jest.fn()
      } as unknown as jest.Mocked<TodoService>;

      const removeTodo = { id: 1 };
      actions$ = new Actions(of(TodoActions.removeTodoStarted(removeTodo)));
      todoEffects = new TodoEffects(actions$, todoService);
    });

    it("should dispatch removeTodoSuccess when todoService.removeTodo is successful", (done) => {
      const todo = { id: 1 };
      const dispatchedAction = TodoActions.removeTodoSuccess(todo);

      todoService.removeTodo.mockReturnValue(of(todo));

      const action = todoEffects.handleRemoveTodoSideEffects$;
      action.pipe(take(1)).subscribe((nextAction) => {
        expect(nextAction).toEqual(dispatchedAction);
        done();
      });
    });

    it("should dispatch removeTodoError when todService.removeTodo throws an error", (done) => {
      const error = new Error("Error");
      const dispatchedAction = TodoActions.removeTodoError({ message: error.message });

      todoService.removeTodo.mockReturnValue(throwError(() => error));

      const action = todoEffects.handleRemoveTodoSideEffects$;
      action.pipe(take(1)).subscribe((nextAction) => {
        expect(nextAction).toEqual(dispatchedAction);
        done();
      });
    });
  });
});
