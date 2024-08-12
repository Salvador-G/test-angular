import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './user-form/login/login.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            LoginComponent,
            TaskManagerComponent
            ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Test Angular';
}
