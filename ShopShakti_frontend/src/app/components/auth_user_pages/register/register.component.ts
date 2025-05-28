import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  get f() {
    return this.registerForm.controls;
  }

  passwordMatchValidator(group: FormGroup) {
    return group.get('password')!.value === group.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    this.isSubmitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) return;

    const formValues = this.registerForm.value;

    const newUser = {
      name: formValues.name,
      email: formValues.email,
      phone: formValues.phone,
      address: '',
      joinedDate: new Date().toISOString(),
      profileImage: '',
      password: formValues.password  // <-- Add this field
    };

    this.http.post('https://localhost:7171/api/users', newUser).subscribe({
      next: (response) => {
        this.successMessage = 'Registration successful!';
        this.registerForm.reset();
        this.isSubmitted = false;
      },
      error: (error) => {
        console.error('Registration error:', error);
        // Display detailed validation errors if available
        if (error.error && error.error.errors) {
          this.errorMessage = '';
          for (const key in error.error.errors) {
            if (error.error.errors.hasOwnProperty(key)) {
              this.errorMessage += `${key}: ${error.error.errors[key].join(', ')}\n`;
            }
          }
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      }
    });
  }
}
