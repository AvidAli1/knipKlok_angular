// src/app/layouts/auth-layout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AuthHeroComponent } from '../components/auth-hero/auth-hero.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, AuthHeroComponent],
  template: `
  <app-header></app-header>
  <auth-hero></auth-hero>
  <router-outlet></router-outlet>
  <app-footer></app-footer>
  `,
})
export class AuthLayoutComponent {}
