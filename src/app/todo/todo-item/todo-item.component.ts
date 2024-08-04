import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TodoService} from "../todo.service";
import {TodoModel} from "../todo.model";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() todo!: TodoModel;

  constructor(private todoService: TodoService) {
  }

  toggleCheck(): void {
    this.todoService.toggleTodoCompletion(this.todo.id);
  }

  deleteTodo(): void {
    this.todoService.deleteTodo(this.todo.id);
  }
}
