import { Component, OnInit } from '@angular/core';
import { TaskRecord, TodoRecord } from './models/todo.model';
import { PocketbaseService } from 'src/app/services/pocketbase.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pocketbase-todo',
  templateUrl: './pocketbase-todo.component.html',
  styleUrls: ['./pocketbase-todo.component.scss']
})
export class PocketbaseTodoComponent implements OnInit {
  newTodoTitle: string = "";
  newTaskDescription: string = "";

  todos: TodoRecord[] = []

  constructor(private readonly pocketbaseService: PocketbaseService, private readonly snackbar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    const response = await this.pocketbaseService.pocketbase.collection('todos').getFullList({ expand: 'tasks' }) as any;

    for (const todo of response) {
      todo.tasks = todo.expand.tasks;
    }

    this.todos = response as TodoRecord[];
  }

  finishedChanged(event: any) {
    const task = event.options[0].value as TaskRecord;

    task.finished = !task.finished;

    this.pocketbaseService.pocketbase.collection('tasks').update(task.id, task);
  }

  finishedTasksPercentage(todo: TodoRecord): number {
    if (!todo.tasks || (todo.tasks?.length === 0)) return 0;
    const finishedTasksPercentage = todo.tasks.filter((t: any) => t.finished).length / todo.tasks.length * 100
    return Math.round(todo.tasks?.length ? (finishedTasksPercentage || 0) : (finishedTasksPercentage || 100));
  }

  async addTodo(): Promise<void> {
    if (!this.pocketbaseService.pocketbase.authStore.isValid) {
      this.snackbar.open("You need to be logged in to add a todo!", "Okay", { duration: 3000, panelClass: ['snackbar-error'] })
      return;
    }

    if (!this.newTodoTitle) return;

    const result = await this.pocketbaseService.pocketbase.collection('todos').create({
      "title": this.newTodoTitle,
      "tasks": []
    })

    this.todos.push(result as any);

    this.newTodoTitle = "";
  }

  async addTask(todoId: string): Promise<void> {

    if (!this.pocketbaseService.pocketbase.authStore.isValid) {
      this.snackbar.open("You need to be logged in to add a task!", "Okay", { duration: 3000, panelClass: ['snackbar-error'] })
      return;
    }

    if (!this.newTaskDescription) return;
    const todo = this.todos.find(t => t.id == todoId);
    if (!todo) return;

    const newTask = await this.pocketbaseService.pocketbase.collection('tasks').create({
      "description": this.newTaskDescription,
      "finished": false
    } as any);

    const todoTaskIds = todo.tasks?.map(t => t.id) ?? [];
    await this.pocketbaseService.pocketbase.collection('todos').update(todoId, { ...todo, tasks: [...todoTaskIds, newTask.id] } as any);

    if (todo.tasks === undefined) todo.tasks = [];

    todo.tasks.push(newTask as any);

    this.newTaskDescription = "";
  }

  async removeTodoById(id: string): Promise<void> {

    if (!this.pocketbaseService.pocketbase.authStore.isValid) {
      this.snackbar.open("You need to be logged in to remove a todo!", "Okay", { duration: 3000, panelClass: ['snackbar-error'] })
      return;
    }

    this.todos = this.todos.filter(t => t.id !== id);
    await this.pocketbaseService.pocketbase.collection('todos').delete(id);
  }

  async removeTaskById(todoId: string, taskId: string): Promise<void> {


    if (!this.pocketbaseService.pocketbase.authStore.isValid) {
      this.snackbar.open("You need to be logged in to remove a task!", "Okay", { duration: 3000, panelClass: ['snackbar-error'] })
      return;
    }

    const todo = this.todos.find(t => t.id === todoId);
    if (!todo) return;

    todo.tasks = todo.tasks.filter(t => t.id !== taskId);
    await this.pocketbaseService.pocketbase.collection('tasks').delete(taskId);
  }
}
