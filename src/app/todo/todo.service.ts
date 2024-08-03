import {Injectable} from '@angular/core';
import {TodoModel} from '../todo/todo.model';
import {v4 as uuidv4} from 'uuid';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<TodoModel[]>([]);
  todos$: Observable<TodoModel[]> = this.todosSubject.asObservable();
  private filterSubject = new BehaviorSubject<string>('all');
  filter$: Observable<string> = this.filterSubject.asObservable();

  private todos: TodoModel[] = [{id: '1', title: 'sss11', completed: false}, {id: '2', title: 'sss', completed: true}];

  constructor() {
    this.todosSubject.next(this.todos);
  }

  getTodos(): Observable<TodoModel[]> {
    return this.todos$;
  }

  addTodo(title: string, completed: boolean): void {
    const newTodo: TodoModel = new TodoModel(uuidv4(), title, completed);
    this.todos.push(newTodo);
    this.todosSubject.next(this.todos);
  }

  deleteTodo(id: string): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todosSubject.next(this.todos);
  }

  toggleTodoCompletion(id: string): void {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  clearCompletedTodos(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.todosSubject.next(this.todos);
  }

  setFilter(filter: string): void {
    this.filterSubject.next(filter);
    this.updateTodos();
  }

  private updateTodos(): void {
    const filter = this.filterSubject.getValue();
    let filteredTodos: TodoModel[];

    switch (filter) {
      case 'active':
        filteredTodos = this.todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = this.todos.filter(todo => todo.completed);
        break;
      default:
        filteredTodos = this.todos;
    }

    this.todosSubject.next(filteredTodos);
  }

}
