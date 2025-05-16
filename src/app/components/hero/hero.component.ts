import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface City {
  value: string
  label: string
}

interface Testimonial {
  quote: string
  name: string
  designation: string
  image: string
}

@Component({
  selector: "app-hero",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="visual bg-black">
      <div class="shape-holder top-left"><img src="assets/images/img-visual-left.png" alt="shape"></div>
      <div class="shape-holder top-right"><img src="assets/images/img-visual-top-r.png" alt="shape"></div>
      <div class="shape-holder bottom-right"><img src="assets/images/img-visual-b-right.png" alt="shape"></div>
      <div class="container">
        <h1><span class="text">Welkom bij</span>Knipklok</h1>
        <form method="get" class="form-search" id="form-search">
          <div class="field">
            <input type="search" name="query" placeholder="Zoek..">
          </div>
          <div class="select-holder">
            <select (change)="setCountryCode($event)" name="country" id="homeCountry">
              <option value="nl" selected>Nederland</option>
              <option value="be">België</option>
            </select>
          </div>
          <div class="select-holder style">
            <select (change)="setCity($event)" id="homeCitySelect" name="city">
              <option value="Alle">Alle</option>
              <option *ngFor="let city of cities" [value]="city.value">{{ city.label }}</option>
            </select>
          </div>
          <button type="submit"><span class="text-search">Search</span><i class="icon icon-search"></i></button>
        </form>
      </div>
      <div class="slider-area">
        <div class="text-slider">
          <div *ngFor="let testimonial of testimonials" class="slide">
            <blockquote>
              <q class="">
                <span>
                  <span class="img-qoute"><i class="icon icon-qoute"></i></span>
                  {{ testimonial.quote }}
                </span>
              </q>
              <cite>
                <span class="img">
                  <img [src]="testimonial.image" [alt]="testimonial.name">
                </span>
                <span class="text-holder">
                  <span class="name"><span>{{ testimonial.name }}</span></span>
                  <span class="designation"><span>{{ testimonial.designation }}</span></span>
                </span>
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class HeroComponent implements OnInit {
  cities: City[] = []
  testimonials: Testimonial[] = []

  ngOnInit(): void {
    this.loadCities()
    this.loadTestimonials()
  }

  loadCities(): void {
    // In a real app, this might come from an API
    this.cities = [
      { value: "Amsterdam", label: "Amsterdam" },
      { value: "Rotterdam", label: "Rotterdam" },
      { value: "Den Haag", label: "Den Haag" },
      { value: "Utrecht", label: "Utrecht" },
      // Add more cities as needed
    ]
  }

  loadTestimonials(): void {
    this.testimonials = [
      {
        quote:
          "Sinds knipklok is er meer structuur in mijn werk ontstaan. voorheen was het lastig om de telefoontjes en whatsapp berichten te beantwoorden tijdens het knippen.",
        name: "jays",
        designation: "Jays Barbershop",
        image: "assets/images/testimonials/jay.jpg",
      },
      {
        quote:
          "Ik vind knipklok ideaal omdat klanten hun eigen tijd kunnen bepalen en een herinnerings sms ontvangen. Top site!",
        name: "Hasan Aydin",
        designation: "Barber Hasan",
        image: "assets/images/testimonials/hasan.jpg",
      },
      {
        quote:
          "Het is heel handig voor mij omdat het tijd en moeite bespaard. Voor mijn klanten is het ook heel makkelijk, zij bepalen zelf hun dag en tijd.",
        name: "Emre",
        designation: "HairQuality By Emre",
        image: "assets/images/testimonials/emre.jpg",
      },
      // Add more testimonials as needed
    ]
  }

  setCountryCode(event: Event): void {
    const select = event.target as HTMLSelectElement
    console.log(`Country code set to: ${select.value}`)
    // Implement country code change functionality
  }

  setCity(event: Event): void {
    const select = event.target as HTMLSelectElement
    console.log(`City set to: ${select.value}`)
    // Implement city change functionality
  }
}
