import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from "../todo.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [],
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.scss'
})

export class TodoFooterComponent implements OnInit, OnDestroy {
  activeCount: number = 0;
  todoSub: Subscription = new Subscription();
  filterSub: Subscription = new Subscription();
  filter: string = '';


  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoSub = this.todoService.getTodos().subscribe(todos => {
      this.activeCount = todos.filter(todo => !todo.completed).length;
    });
    this.filterSub = this.todoService.filter$.subscribe(filter => {
      this.filter = filter;
    });
  }

  clearCompleted(): void {
    this.todoService.clearCompletedTodos();
  }

  setFilter(filter: string): void {
    this.todoService.setFilter(filter);
  }

  ngOnDestroy(): void {
    this.todoSub.unsubscribe();
    this.filterSub.unsubscribe();
  }
}
