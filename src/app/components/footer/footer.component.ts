import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { Router } from "@angular/router"

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="footer-wrap">
      <div class="block-badges">
        <div class="container">
          <h2>-</h2>
          <div class="badges-area">
            <ul class="list-badges">
              <li>
                <a routerLink="/login">
                  <div class="wrap">
                    <i class="icon icon-list"></i>
                    <span class="text">Agenda</span>
                  </div>
                </a>
              </li>
              <li>
                <a routerLink="/statistieken">
                  <div class="wrap">
                    <i class="icon icon-stat"></i>
                    <span class="text">Statistieken</span>
                  </div>
                </a>
              </li>
              <li>
                <a routerLink="/vaste-klanten">
                  <div class="wrap">
                    <i class="icon icon-menu-recurring"></i>
                    <span class="text">Vaste Afspraken</span>
                  </div>
                </a>
              </li>
              <li>
                <a routerLink="/instellingen">
                  <div class="wrap">
                    <i class="icon icon-setting"></i>
                    <span class="text">Instellingen</span>
                  </div>
                </a>
              </li>
              <li>
                <a routerLink="/customers">
                  <div class="wrap">
                    <i class="icon icon-preson"></i>
                    <span class="text">Contacten</span>
                  </div>
                </a>
              </li>
              <li>
                <a routerLink="/updates">
                  <div class="wrap">
                    <i class="icon icon-cloud"></i>
                    <span class="text">Updates</span>
                  </div>
                </a>
              </li>
              <li>
                <a routerLink="/logout">
                  <div class="wrap">
                    <i class="icon icon-logout"></i>
                    <span class="text">Log Uit</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="login-area">
        <div class="container">
          <a routerLink="/auth/login" class="btn-outline" (click)="navigateToLogin($event)">Login voor kappers</a>
        </div>
      </div>
    </div>
    <footer id="footer">
      <div class="container">
        <ul class="footer-links">
          <li>
            <a routerLink="/registreren-informatie">Registreren informatie</a>
          </li>
          <li><a routerLink="/terms-conditions">Algemene voorwaarden</a></li>
          <li><a routerLink="/privacy-policy">Privacy Policy</a></li>
          <li><a routerLink="/contact">Contact</a></li>
        </ul>
        <ul class="social-networks">
          <li>
            <a href="https://www.instagram.com/knipklok.nl/">
              <i class="icon icon-instagram"></i>Volg ons op instagram
            </a>
          </li>
        </ul>
      </div>
      <div class="copy-right">
        <div class="container">
          <p>&copy; {{ currentYear }}. Onder alle rechten voorbehouden</p>
        </div>
      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {
  currentYear = new Date().getFullYear()

  constructor(private router: Router) {}
  
  // Explicit navigation method as a fallback
  navigateToLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/auth/login']);
  }
}
