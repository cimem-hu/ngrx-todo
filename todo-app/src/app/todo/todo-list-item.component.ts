import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Todo } from './todo.component';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  imports: [CommonModule],
  template: ` @if (todo) {
    <div>
      <input
        type="checkbox"
        [checked]="todo.done"
        (change)="onToggleTodo(todo.id)"
      />
      {{ todo.name }}
      <button (click)="onDeleteTodo(todo.id)">Delete</button>
    </div>
    }`,
})
export class TodoListItemComponent {
  private readonly todoService = inject(TodoService);

  @Input() todo?: Todo;
  onDeleteTodo(id: number) {
    this.todoService.removeTodo(id);
  }

  onToggleTodo(id: number) {
    this.todoService.toggleDone(id);
  }
}
