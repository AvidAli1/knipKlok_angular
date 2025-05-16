import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  template: `
    <!-- Login form section -->
    <div class="login-section">
      <div class="container">
        <div class="login-form-container">
          <h2>Login</h2>
          <form (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="username">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                [(ngModel)]="username" 
                placeholder="Enter your username" 
                required
              >
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                [(ngModel)]="password" 
                placeholder="Enter your password" 
                required
              >
            </div>
            <button type="submit" class="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-section {
      min-height: calc(100vh - 400px); /* Adjust based on your header/footer height */
      display: flex;
      align-items: center;
      background-color: #f8f9fa;
      padding: 60px 0;
    }

    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 15px;
    }

    .login-form-container {
      max-width: 400px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
      font-weight: 600;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #555;
    }

    input {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.3s;
    }

    input:focus {
      outline: none;
      border-color: #007bff;
    }

    .login-button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .login-button:hover {
      background-color: #0069d9;
    }
  `]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    // Handle login logic here
    console.log('Login attempt:', this.username);
    // In a real application, you would use a service to authenticate the user
    // this.authService.login(this.username, this.password).subscribe(...)
  }
}