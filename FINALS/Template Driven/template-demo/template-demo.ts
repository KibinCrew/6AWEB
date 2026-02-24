import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Required for *ngIf

@Component({
  selector: 'app-template-demo',
  standalone: true, // Modern Angular standard
  imports: [FormsModule, CommonModule],
  templateUrl: './template-demo.html',
  styleUrl: './template-demo.css',
})
export class TemplateDemo {
  title = "Template Driven Demo";

  // Form model properties
  username = '';
  email = '';
  password = '';
  role = '';
  gender = '';
  status = '';
  comments = '';

  submitted = false;
  submittedDate: Date | null = null;

  onSubmit() {
    this.submitted = true;
    this.submittedDate = new Date();

    console.log("Form submitted successfully!", {
      username: this.username,
      email: this.email,
      role: this.role,
      date: this.submittedDate
    });
  }
}
