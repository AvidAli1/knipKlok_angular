import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./layouts/main-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout.component";

export const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      {
        path: "home",
        loadComponent: () =>
          import("./pages/home/home.component").then(m => m.HomeComponent),
      },
      {
        path: "kapperszaak/:id",
        loadComponent: () =>
          import("./pages/barber-detail/barber-detail.component").then(
            m => m.BarberDetailComponent
          ),
      },
      {
        path: "register",
        loadComponent: () =>
          import("./pages/register/register.component").then(
            m => m.RegisterComponent
          ),
      },
    ],
  },
  {
    path: "auth",
    component: AuthLayoutComponent,
    children: [
      {
        path: "login",
        loadComponent: () =>
          import("./pages/login/login.component").then(m => m.LoginComponent),
      },
    ],
  },
];