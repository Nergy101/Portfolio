import { Component } from '@angular/core';
import { nanoid } from 'nanoid'

@Component({
  selector: 'app-pocketbase-todo',
  templateUrl: './pocketbase-todo.component.html',
  styleUrls: ['./pocketbase-todo.component.scss']
})
export class PocketbaseTodoComponent {
  newTodoTitle: string = "";
  newTaskDescription: string = "";

  todos = [{
    "id": nanoid(),
    "title": "Pocketbase Todo",
    "tasks": [
      { "id": nanoid(), "description": "Description 1", "finished": true },
      { "id": nanoid(), "description": "Description 2", "finished": true },
      { "id": nanoid(), "description": "Description 3", "finished": true },
      { "id": nanoid(), "description": "Description 4", "finished": false },
      { "id": nanoid(), "description": "Description 5", "finished": false },
      { "id": nanoid(), "description": "Description 6", "finished": false },
      { "id": nanoid(), "description": "Description 7", "finished": false },
      { "id": nanoid(), "description": "Description 8", "finished": false },
      { "id": nanoid(), "description": "Description 9", "finished": false },
      { "id": nanoid(), "description": "Description 10", "finished": false }]
  }]

  finishedTasksPercentage(todo: any): number {
    return todo.tasks.filter((t: any) => t.finished).length / todo.tasks.length * 100;
  }

  addTodo(): void {
    if (!this.newTodoTitle) return;

    this.todos.push({
      "id": nanoid(),
      "title": this.newTodoTitle,
      "tasks": []
    } as any);

    this.newTodoTitle = "";
  }

  addTask(todoId: any): void {
    if (!this.newTaskDescription) return;
    const todo = this.todos.find((t: any) => t.id == todoId);
    if (!todo) return;

    todo.tasks.push({
      "id": nanoid(),
      "description": this.newTaskDescription,
      "finished": false
    } as any);

    this.newTaskDescription = "";
  }

  removeTodoById(id: string): void {
    this.todos = this.todos.filter((t: any) => t.id !== id);
  }

  removeTaskById(todoId: string, taskId: string): void {
    const todo = this.todos.find((t: any) => t.id === todoId);
    if (!todo) return;

    todo.tasks = todo.tasks.filter((t: any) => t.id !== taskId);

  }
}
