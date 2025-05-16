import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HeroComponent } from "../../components/hero/hero.component"
import { BestInAreaComponent } from "../../components/best-in-area/best-in-area.component"
import { HowItWorksComponent } from "../../components/how-it-works/how-it-works.component"
import { TestimonialsComponent } from "../../components/testimonials/testimonials.component"
import { AppDownloadComponent } from "../../components/app-download/app-download.component"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    BestInAreaComponent,
    HowItWorksComponent,
    TestimonialsComponent,
    AppDownloadComponent,
  ],
  template: `
    <app-hero></app-hero>
    <app-best-in-area></app-best-in-area>
    <app-how-it-works></app-how-it-works>
    <app-testimonials></app-testimonials>
  `,
  styles: [],
})
export class HomeComponent {}
