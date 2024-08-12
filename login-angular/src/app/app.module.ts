import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./user-form/login/login.component";

import { AuthService } from './auth.service';
import { TaskManagerComponent } from "./task-manager/task-manager.component";

@NgModule({

  declarations: [
    LoginComponent,
    TaskManagerComponent,
  ],
  imports: [

    // other imports ...
    ReactiveFormsModule,
    
  ],
  providers: [AuthService],
})
export class AppModule {}