import {Component} from '@angular/core';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoHeaderComponent} from "./todo-header/todo-header.component";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    TodoListComponent,
    TodoHeaderComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

}
