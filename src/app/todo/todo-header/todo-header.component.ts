import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TodoService} from "../todo.service";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-todo-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
    MatCheckbox
  ],
  templateUrl: './todo-header.component.html',
  styleUrl: './todo-header.component.scss'
})
export class TodoHeaderComponent {
  newTodoTitle: string = '';
  completed: boolean = false;

  constructor(private todoService: TodoService) {
  }

  addTodo(): void {
    if (this.newTodoTitle.trim().length) {
      this.todoService.addTodo(this.newTodoTitle, this.completed);
      this.newTodoTitle = '';
      this.completed = false
    }
  }

  toggleCheck(): void {
    this.completed = !this.completed;
  }
}
