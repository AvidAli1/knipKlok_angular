import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-app-download",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="apps-area">
      <div class="shape-holder">
        <img src="assets/images/shape.svg" alt="shape">
      </div>
      <div class="container">
        <div class="image-holder">
          <img src="assets/images/iphone-mockup1.png" alt="iPhone mockup">
          <form action="#" class="form-search">
            <input type="search" placeholder="Zoeken...">
            <input type="submit" value="Vind mijn kapper" class="btn btn-green">
          </form>
        </div>
        <div class="text-holder">
          <h2>DOWNLOAD ONZE APP</h2>
          <ul class="list-apps">
            <li>
              <a href="https://play.google.com/store/apps/details?id=nl.sinasoft.knipklok_1&hl=da">
                <img src="assets/images/android.svg" alt="Google play">
              </a>
            </li>
            <li>
              <a href="https://itunes.apple.com/nl/app/knipklok/id1449965397?l=en&mt=8">
                <img src="assets/images/applestore.svg" alt="App Store">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AppDownloadComponent {}