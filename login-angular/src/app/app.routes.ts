import { Routes } from '@angular/router';
import { LoginComponent } from './user-form/login/login.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'tasks', component: TaskManagerComponent },
    { path: '**', redirectTo: 'login' }
];
