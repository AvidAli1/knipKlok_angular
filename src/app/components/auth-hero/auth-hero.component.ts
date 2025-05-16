import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "auth-hero",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="visual bg-black">
      <div class="shape-holder top-left"><img src="assets/images/img-visual-left.png" alt="shape"></div>
      <div class="shape-holder top-right"><img src="assets/images/img-visual-top-r.png" alt="shape"></div>
      <div class="shape-holder bottom-right"><img src="assets/images/img-visual-b-right.png" alt="shape"></div>
      <div class="container">
        <h1>Inloggen</h1>
      </div>
    </section>
  `,
  styles: [
    `
    .visual.bg-black {
      background-color: #000;
      padding-bottom: 30px; /* Adds vertical space below */
    }

    .container h1 {
      margin-bottom: 8rem;
    }
    
  `],
})
export class AuthHeroComponent implements OnInit {
    ngOnInit(): void {
        // Initialization logic here (if needed)
    }
}

