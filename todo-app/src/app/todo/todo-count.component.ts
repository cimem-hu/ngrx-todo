import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";

import { AppStore } from "../app.state";
import { countTodosDone, countTodosNotDone } from "./store/todo.selectors";

@Component({
  selector: "app-todo-count",
  standalone: true,
  imports: [CommonModule],
  template: ` <h2>Todos to finish: {{ countNotDone$ | async }}</h2>
    <h3>Todos done: {{ countDone$ | async }}</h3>`
})
export class TodoCountComponent {
  private readonly store = inject(Store<AppStore>);

  countNotDone$ = this.store.select(countTodosDone);
  countDone$ = this.store.select(countTodosNotDone);
}
