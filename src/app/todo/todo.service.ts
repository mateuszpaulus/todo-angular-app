import {Injectable} from '@angular/core';
import {TodoModel} from '../todo/todo.model';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: TodoModel[] = [];
  
  addTodo(title: string, completed: boolean): void {
    const newTodo: TodoModel = new TodoModel(uuidv4(), title, completed);
    this.todos.push(newTodo);
  }

}
