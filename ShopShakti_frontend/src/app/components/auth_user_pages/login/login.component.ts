import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
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

    // Simulate login - Replace with actual auth API
    if (email === 'demo@example.com' && password === 'password123') {
      alert('Login successful!');
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }
}