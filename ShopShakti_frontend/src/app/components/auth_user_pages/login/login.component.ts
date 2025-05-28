import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.errorMessage = null;

    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.http.post<any>('https://localhost:7171/api/users/login', { email, password }).subscribe({
      next: (response) => {
        // You might store a JWT token or user ID
        localStorage.setItem('user', JSON.stringify(response));

        // Navigate to homepage or dashboard
        this.router.navigate(['/']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password.';
        } else {
          this.errorMessage = 'Login failed. Please try again later.';
        }
        console.error('Login error:', error);
      }
    });
  }
}