import { TodoState } from "./todo/store/todo.reducers";

export type AppStore = {
  todo: TodoState;
};
