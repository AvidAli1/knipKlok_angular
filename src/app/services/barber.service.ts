import { Injectable } from "@angular/core"
import { type Observable, of } from "rxjs"

export interface Barber {
  id: string
  name: string
  rating: number
  reviewCount: number
  location: string
  isOpen: boolean
  image: string
  description?: string
  treatments?: Treatment[]
  team?: TeamMember[]
  openingHours?: OpeningHours
}

export interface Treatment {
  id: string
  name: string
  price: number
  duration: number
}

export interface TeamMember {
  id: string
  name: string
  image: string
  role?: string
}

export interface OpeningHours {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
}

@Injectable({
  providedIn: "root",
})
export class BarberService {
  private barbers: Barber[] = [
    {
      id: "b-barbers",
      name: "B+ Barbers",
      rating: 5.0,
      reviewCount: 31,
      location: "Veenendaal",
      isOpen: true,
      image: "assets/images/barbeshop-placeholder.svg",
      description: "B+ Barbers is een moderne kapperszaak in Veenendaal.",
      treatments: [
        { id: "haircut", name: "Heren Knipbeurt", price: 25, duration: 30 },
        { id: "beard", name: "Baard Trimmen", price: 15, duration: 15 },
        { id: "combo", name: "Knipbeurt + Baard", price: 35, duration: 45 },
      ],
      openingHours: {
        monday: "09:00 - 18:00",
        tuesday: "09:00 - 18:00",
        wednesday: "09:00 - 18:00",
        thursday: "09:00 - 21:00",
        friday: "09:00 - 18:00",
        saturday: "09:00 - 17:00",
        sunday: "Gesloten",
      },
    },
    // Add more barbers as needed
  ]

  getBarbers(): Observable<Barber[]> {
    return of(this.barbers)
  }

  getBarberById(id: string): Observable<Barber | undefined> {
    return of(this.barbers.find((barber) => barber.id === id))
  }

  searchBarbers(query: string, city?: string): Observable<Barber[]> {
    let results = this.barbers

    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(
        (barber) =>
          barber.name.toLowerCase().includes(lowerQuery) || barber.location.toLowerCase().includes(lowerQuery),
      )
    }

    if (city && city !== "Alle") {
      results = results.filter((barber) => barber.location.toLowerCase() === city.toLowerCase())
    }

    return of(results)
  }
}
