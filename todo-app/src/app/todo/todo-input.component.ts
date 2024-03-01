import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { TodoService } from "./todo.service";

@Component({
  selector: "app-todo-input",
  standalone: true,
  imports: [FormsModule],
  template: `<input type="text" [(ngModel)]="todoName" />
    <button [disabled]="!todoName.trim().length" (click)="onAddTodo()">Add</button>`
})
export class TodoInputComponent {
  private readonly todoService = inject(TodoService);
  todoName = "";

  onAddTodo() {
    if (!this.todoName.trim()) {
      return;
    }
    this.todoService.addTodo(this.todoName);
    this.todoName = "";
  }
}
