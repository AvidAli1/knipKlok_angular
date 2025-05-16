import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute } from "@angular/router"
import { BarberService, Barber } from "../../services/barber.service"

@Component({
  selector: "app-barber-detail",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="barber-detail" *ngIf="barber">
      <div class="container">
        <div class="barber-header">
          <h1>{{ barber.name }}</h1>
          <div class="rating">
            <span class="stars">
              <i class="icon icon-star"></i>
              {{ barber.rating.toFixed(1) }}
            </span>
            <span class="reviews">{{ barber.reviewCount }} Beoordelingen</span>
          </div>
          <div class="location">
            <i class="icon icon-location"></i>
            {{ barber.location }}
          </div>
          <div class="status" *ngIf="barber.isOpen">
            <span class="tag open">Open</span>
          </div>
          <div class="status" *ngIf="!barber.isOpen">
            <span class="tag closed">Gesloten</span>
          </div>
        </div>

        <div class="barber-content">
          <div class="row">
            <div class="col-md-8">
              <div class="barber-description">
                <h2>Welkom bij {{ barber.name }}</h2>
                <p>{{ barber.description }}</p>
                <button class="btn btn-green">Maak een afspraak</button>
              </div>

              <div class="barber-treatments">
                <h2>Onze behandelingen</h2>
                <div class="treatments-list">
                  <div *ngFor="let treatment of barber.treatments" class="treatment-item">
                    <div class="treatment-name">{{ treatment.name }}</div>
                    <div class="treatment-details">
                      <span class="treatment-duration">{{ treatment.duration }} minuten</span>
                      <span class="treatment-price">€{{ treatment.price.toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="barber-opening-hours">
                <h2>Openingstijden</h2>
                <ul class="opening-hours-list">
                  <li>
                    <span class="day">Maandag</span>
                    <span class="hours">{{ barber.openingHours?.monday }}</span>
                  </li>
                  <li>
                    <span class="day">Dinsdag</span>
                    <span class="hours">{{ barber.openingHours?.tuesday }}</span>
                  </li>
                  <li>
                    <span class="day">Woensdag</span>
                    <span class="hours">{{ barber.openingHours?.wednesday }}</span>
                  </li>
                  <li>
                    <span class="day">Donderdag</span>
                    <span class="hours">{{ barber.openingHours?.thursday }}</span>
                  </li>
                  <li>
                    <span class="day">Vrijdag</span>
                    <span class="hours">{{ barber.openingHours?.friday }}</span>
                  </li>
                  <li>
                    <span class="day">Zaterdag</span>
                    <span class="hours">{{ barber.openingHours?.saturday }}</span>
                  </li>
                  <li>
                    <span class="day">Zondag</span>
                    <span class="hours">{{ barber.openingHours?.sunday }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div *ngIf="!barber" class="loading">
      <p>Laden...</p>
    </div>
  `,
  styles: [],
})
export class BarberDetailComponent implements OnInit {
  barber: Barber | undefined

  constructor(
    private route: ActivatedRoute,
    private barberService: BarberService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id")
      if (id) {
        this.barberService.getBarberById(id).subscribe((barber) => {
          this.barber = barber
        })
      }
    })
  }
}
