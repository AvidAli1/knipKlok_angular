import { Component, OnInit } from "@angular/core";
import { RouterOutlet, Router } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // 👈 Add this
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}