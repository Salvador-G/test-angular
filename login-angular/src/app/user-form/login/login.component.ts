import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      try {
        const token = await this.authService.login(credentials);
        console.log('Login successful, token:', token);
        // Aquí puedes redirigir al usuario a otra página o realizar alguna acción adicional
        this.router.navigate(['/tasks']); // Redirige al usuario a la vista de tareas
      } catch (error) {
        console.error('Login failed:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    }
  }
}
