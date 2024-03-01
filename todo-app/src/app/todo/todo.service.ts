import { Injectable } from '@angular/core';
import { Todo } from './todo.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  todoToBeDoneCount: BehaviorSubject<number> = new BehaviorSubject(0);
  todoFinishedCount: BehaviorSubject<number> = new BehaviorSubject(0);

  addTodo(todoName: string) {
    const todo: Todo = {
      name: todoName,
      id: Math.floor(Math.random() * 10000),
      done: false,
    };
    this.todos.next([todo, ...this.todos.value]);
    this.todoToBeDoneCount.next(
      this.todos.value.filter((todo) => !todo.done).length
    );
    this.todoFinishedCount.next(
      this.todos.value.filter((todo) => todo.done).length
    );
  }

  removeTodo(id: number) {
    this.todos.next(this.todos.value.filter((todo) => todo.id !== id));
    this.todoToBeDoneCount.next(
      this.todos.value.filter((todo) => !todo.done).length
    );
    this.todoFinishedCount.next(
      this.todos.value.filter((todo) => todo.done).length
    );
  }

  toggleDone(id: number) {
    this.todos.next(
      this.todos.value.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      })
    );

    this.todoToBeDoneCount.next(
      this.todos.value.filter((todo) => !todo.done).length
    );
    this.todoFinishedCount.next(
      this.todos.value.filter((todo) => todo.done).length
    );
  }
}
