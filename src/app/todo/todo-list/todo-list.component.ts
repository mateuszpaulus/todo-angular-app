import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoModel} from "../todo.model";
import {CommonModule} from "@angular/common";
import {TodoItemComponent} from "../todo-item/todo-item.component";
import {TodoService} from "../todo.service";
import {DragDropModule, CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TodoFooterComponent} from "../todo-footer/todo-footer.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, DragDropModule, TodoFooterComponent, TodoFooterComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: TodoModel[] = [];
  todoSub: Subscription = new Subscription();

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoSub = this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  drop(event: CdkDragDrop<TodoModel[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy(): void {
    this.todoSub.unsubscribe();
  }
}
