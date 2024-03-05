import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  AddTodoRequest,
  AddTodoResponse,
  GetTodosResponse,
  RemoveTodoResponse,
  ToggleTodoResponse
} from "./store/todo.actions";
import { Todo } from "./todo.component";

@Injectable({ providedIn: "root" })
export class TodoService {
  private baseUrl = "http://localhost:3000/todos";
  private http = inject(HttpClient);

  getTodos() {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  addTodo(todo: AddTodoRequest) {
    return this.http.post<AddTodoResponse>(this.baseUrl, todo);
  }

  removeTodo(id: number) {
    return this.http.delete<RemoveTodoResponse>(`${this.baseUrl}/${id}`);
  }

  toggleTodo(id: number, done: boolean) {
    return this.http.put<ToggleTodoResponse>(`${this.baseUrl}/${id}`, { done });
  }
}
