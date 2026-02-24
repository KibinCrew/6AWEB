import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-demo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive.html',
  styleUrl: './reactive.css',
})
export class Reactive {
  roles = ['Admin', 'User', 'Guest'];
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]{4,12}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
      role: ['', Validators.required],
      gender: ['', Validators.required],
      status: ['', Validators.required],
      comments: ['']
    });
  }
  submittedData: any = null;

  onSubmit() {
    if (this.form.valid) {
      this.submittedData = { ...this.form.value };
      console.log("Form Submitted:", this.submittedData);
    } else {
      this.form.markAllAsTouched();
    }
  }

  isInvalid(name: string) {
    const control = this.form.get(name);
    return control?.touched && control?.invalid;
  }
}
