import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";

import { AppStore } from "../app.state";
import { getTodosDone, getTodosNotDone } from "./store/todo.selectors";

@Component({
  selector: "app-todo-count",
  standalone: true,
  imports: [CommonModule],
  template: ` <h2>Todos to finish: {{ notDoneCount$ | async }}</h2>
    <h3>Todos done: {{ doneCount$ | async }}</h3>`
})
export class TodoCountComponent {
  private readonly store = inject(Store<AppStore>);

  notDoneCount$ = this.store.select(getTodosNotDone);
  doneCount$ = this.store.select(getTodosDone);
}
