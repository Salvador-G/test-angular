import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [FormsModule, CommonModule], // Añade FormsModule aquí
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent {
  tasks: { id: number, name: string, completed: boolean }[] = [];
  nextId: number = 1;

  addTask(taskName: string) {
    if (taskName) {
      this.tasks.push({ id: this.nextId++, name: taskName, completed: false });
    }
  }

  updateTask(id: number, newName: string) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.name = newName;
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
