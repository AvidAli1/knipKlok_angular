import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-how-it-works",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="three-cols">
      <div class="container">
        <h2>HOE HET WERKT</h2>
        <div class="row">
          <div class="col">
            <div class="image-holder">
              <a href="#">
                <img src="assets/images/ic-find-hair-dresser.svg" alt="Vind uw kapper">
              </a>
            </div>
            <div class="text-holder">
              <h3><a href="#">Vind uw kapper</a></h3>
              <p>Knipklok laat automatisch kappers zien gebasseerd op uw locatie. U kunt ook handmatig zoeken.</p>
            </div>
          </div>
          <div class="col">
            <div class="image-holder">
              <a href="#">
                <img src="assets/images/ic-make-appointment.svg" alt="Maak een afspraak">
              </a>
            </div>
            <div class="text-holder">
              <h3><a href="#">Maak een afspraak</a></h3>
              <p>Kies uw behandeling en een tijdstip dat u uitkomt om uw eigen plek te reserveren.</p>
            </div>
          </div>
          <div class="col">
            <div class="image-holder">
              <a href="#">
                <img src="assets/images/ic-take-advantage.svg" alt="Profiteer">
              </a>
            </div>
            <div class="text-holder">
              <h3><a href="#">Profiteer</a></h3>
              <p>Arriveer op tijd dankzij een herinnering, passeer de wachtlijn en geniet van uw behandeling.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="shape-holder">
        <img src="assets/images/shape.svg" alt="shape">
      </div>
    </div>
  `,
  styles: [],
})
export class HowItWorksComponent {}
