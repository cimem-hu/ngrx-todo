import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TodoService } from "./todo.service";

@Component({
  selector: "app-todo-count",
  standalone: true,
  imports: [CommonModule],
  template: ` <h2>Todos to finish: {{ todoCount$ | async }}</h2>
    <h3>Todos done: {{ doneCount$ | async }}</h3>`
})
export class TodoCountComponent {
  private readonly todoService = inject(TodoService);

  todoCount$ = this.todoService.todoToBeDoneCount;
  doneCount$ = this.todoService.todoFinishedCount;
}
