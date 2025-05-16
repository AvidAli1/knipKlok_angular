import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"

interface Testimonial {
  quote: string
  name: string
  designation: string
  image: string
}

@Component({
  selector: "app-testimonials",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="testimonial-area" id="testimonial">
      <div class="container">
        <h2>WOORDEN VAN ONZE KAPPERS</h2>
        <div class="testimonial-wrap">
          <div class="testimonial-slider">
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
      </div>
      <div class="shape-holder">
        <img src="assets/images/shape.svg" alt="shape">
      </div>
    </div>
  `,
  styles: [],
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = []

  ngOnInit(): void {
    this.loadTestimonials()
  }

  loadTestimonials(): void {
    this.testimonials = [
      {
        quote:
          "Ik vind knipklok ideaal omdat klanten hun eigen tijd kunnen bepalen en een herinnerings sms ontvangen. Top site!",
        name: "Hasan Aydin",
        designation: "Barber Hasan",
        image: "assets/images/testimonials/hasan.jpg",
      },
      {
        quote:
          "Top service, scheelt mij een hoop telefoontjes op een dag. Ideaal voor de klant in een paar klikken is de afspraak gepland.",
        name: "SSuii",
        designation: "Chaci Barbershop",
        image: "assets/images/testimonials/suii.jpg",
      },
      {
        quote:
          "Het is heel handig voor mij omdat het tijd en moeite bespaard. Voor mijn klanten is het ook heel makkelijk, zij bepalen zelf hun dag en tijd.",
        name: "Emre",
        designation: "HairQuality By Emre",
        image: "assets/images/testimonials/emre.jpg",
      },
      {
        quote: "Mijn klanten en ik zijn gewend aan knipklok, wij kunnen niet meer zonder.",
        name: "Mohammed",
        designation: "Herenkapper Confiance",
        image: "assets/images/testimonials/mo.jpg",
      },
      {
        quote:
          "Door knipklok is alle stress verdwenen en hebben we meer aandacht voor de klant. Geen pen en papier meer, vanaf nu mobiel en TV scherm!",
        name: "Hassan",
        designation: "Barbershop0318",
        image: "assets/images/testimonials/hassan.jpg",
      },
      // Add more testimonials as needed
    ]
  }
}
