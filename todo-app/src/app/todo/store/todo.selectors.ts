import { AppStore } from "../../app.state";

export const getTodos = (state: AppStore) => state.todo.todos;
export const countTodosDone = (state: AppStore) => state.todo.todos.filter((todo) => todo.done).length;
export const countTodosNotDone = (state: AppStore) => state.todo.todos.filter((todo) => !todo.done).length;
