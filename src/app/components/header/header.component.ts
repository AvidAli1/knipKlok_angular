import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header id="header">
      <div class="container">
        <a href="#" class="nav-opener"></a>
        <strong class="logo">
          <a routerLink="/"><img src="assets/images/logo.png" alt="Knipklok"></a>
        </strong>
        <div class="lan-open-close">
          <a href="#" class="opener">
            <span class="img">
              <img src="assets/images/dutch-flag.png" alt="nl">
            </span>
          </a>
          <div class="slide">
            <ul>
              <li>
                <a (click)="changeLanguage('en')" href="#">
                  <span class="img">
                    <img src="assets/images/img-flag.jpg" alt="eng">
                  </span>
                </a>
              </li>
              <li>
                <a (click)="changeLanguage('nl')" href="#">
                  <span class="img">
                    <img src="assets/images/dutch-flag.png" alt="nl">
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="nav-drop">
          <nav id="nav">
            <ul class="menu">
              <li><a routerLink="/informatie">Info</a></li>
              <li><a routerLink="/contact" class="pr-0">Contact</a></li>
              <li><a routerLink="/register" class="btn radius-6">Kapperszaak Registreren</a></li>
              <li>
                <a href="https://shop.knipklok.nl/" class="pr-0">
                  Shop
                  <span style="background-color: #ac7b22; color:white; font-size:10px; padding:2px; border: 1px solid orange; border-radius:2px;"> NEW</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  changeLanguage(lang: string): void {
    console.log(`Changing language to: ${lang}`)
    // Implement language change functionality
  }
}
