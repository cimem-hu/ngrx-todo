import { Component, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { getTodosStarted } from "./todo/store/todo.actions";

import { TodoComponent } from "./todo/todo.component";
import { AppStore } from "./app.state";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [TodoComponent],
  template: `<app-todo></app-todo>`
})
export class AppComponent implements OnInit {
  constructor(private readonly store: Store<AppStore>) {}

  ngOnInit(): void {
    this.store.dispatch(getTodosStarted());
  }
  title = "Todo App";
}
