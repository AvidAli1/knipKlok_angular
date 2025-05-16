import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

interface Barber {
  id: string
  name: string
  rating: number
  reviewCount: number
  location: string
  isOpen: boolean
  image: string
}

@Component({
  selector: "app-best-in-area",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="area-holder">
      <div class="shape-holder">
        <img src="assets/images/shape.svg" alt="shape">
      </div>
      <div class="container">
        <h2>BESTE IN DE REGIO</h2>
      </div>
      <div class="area-wrap">
        <div class="area-frame">
          <button class="arrow-prev arrow arrow-desktop-prev">prev</button>
          <button class="arrow-next arrow arrow-desktop-next">next</button>
          <button class="arrow-prev arrow arrow-mobile-prev">prev</button>
          <button class="arrow-next arrow arrow-mobile-next">next</button>
          <div class="slide-box">
            <span class="img"><i class="icon icon-hand"></i> </span>
            <span class="text">Scroll</span>
          </div>
          <div class="area-slider" id="bestInAreaSlider">
            <div *ngFor="let barber of barbers" class="slide demo" [routerLink]="['/kapperszaak', barber.id]">
              <article class="article-area">
                <div class="image-holder image-loader">
                  <img [src]="barber.image" [alt]="barber.name">
                </div>
                <div class="text-holder">
                  <h3 class="text-loader"><span>{{ barber.name }}</span></h3>
                  <ul class="list-reviews text-loader">
                    <li>
                      <span class="img"><i class="icon icon-star"></i></span>
                      <span class="text">({{ barber.rating.toFixed(1) }})</span>
                    </li>
                    <li><a href="#">{{ barber.reviewCount }} Beoordelingen</a></li>
                  </ul>
                  <div class="tag-area text-loader">
                    <address>
                      <span class="img"><i class="icon icon-location"></i></span>
                      {{ barber.location }}
                    </address>
                    <span *ngIf="barber.isOpen" class="tag">Open</span>
                  </div>
                  <a [routerLink]="['/kapperszaak', barber.id]" class="btn-green text-loader">
                    Bekijk <i class="icon icon-arrowo-forward"></i>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      <a routerLink="/kapper-zoeken" class="link-more">
        <span class="text">Toon alle kappers (390+)</span>
        <i class="icon icon-arrow-right"></i>
      </a>
    </div>
  `,
  styles: [],
})
export class BestInAreaComponent implements OnInit {
  barbers: Barber[] = []

  ngOnInit(): void {
    this.loadBarbers()
  }

  loadBarbers(): void {
    // In a real app, this would come from an API
    this.barbers = [
      {
        id: "b-barbers",
        name: "B+ Barbers",
        rating: 5.0,
        reviewCount: 31,
        location: "Veenendaal",
        isOpen: true,
        image: "assets/images/barbeshop-placeholder.svg",
      },
      {
        id: "barber-nilet",
        name: "Barber Nilet",
        rating: 5.0,
        reviewCount: 7,
        location: "Oldenzaal",
        isOpen: true,
        image: "assets/images/barbeshop-placeholder.svg",
      },
      {
        id: "barberinos-barbershop",
        name: "Barberinos Barbershop",
        rating: 5.0,
        reviewCount: 3,
        location: "IJsselstein",
        isOpen: true,
        image: "assets/images/barbeshop-placeholder.svg",
      },
      {
        id: "barbershop-erivan",
        name: "Barbershop Erivan",
        rating: 5.0,
        reviewCount: 2,
        location: "den haag",
        isOpen: true,
        image: "assets/images/barbeshop-placeholder.svg",
      },
      {
        id: "barbershop-exclusive",
        name: "Barbershop Exclusive",
        rating: 5.0,
        reviewCount: 44,
        location: "Utrecht",
        isOpen: true,
        image: "assets/images/barbeshop-placeholder.svg",
      },
      // Add more barbers as needed
    ]
  }
}
