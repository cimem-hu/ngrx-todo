import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";

import { TodoListItemComponent } from "./todo-list-item.component";
import { TodoCountComponent } from "./todo-count.component";
import { TodoInputComponent } from "./todo-input.component";
import { AppStore } from "../app.state";
import { getTodos, hasError, isLoading } from "./store/todo.selectors";

export type Todo = {
  id: number;
  name: string;
  done: boolean;
};

@Component({
  selector: "app-todo",
  standalone: true,
  imports: [CommonModule, TodoListItemComponent, TodoCountComponent, TodoInputComponent],
  template: `
    @if(hasError$ | async) {
    <h1>Something went wrong!</h1>
    } @else { @if(isLoading$ | async) {
    <h3>Loading...</h3>
    }
    <app-todo-count></app-todo-count>
    <app-todo-input></app-todo-input>
    @for (todo of todos$ | async; track todo.id) {
    <app-todo-list-item [todo]="todo"></app-todo-list-item>
    } }
  `
})
export class TodoComponent {
  private readonly store = inject(Store<AppStore>);
  todos$ = this.store.select(getTodos);
  isLoading$ = this.store.select(isLoading);
  hasError$ = this.store.select(hasError);
}
