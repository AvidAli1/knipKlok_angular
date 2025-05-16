import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class TranslationService {
  private translationDict: any = {}
  private currentLanguage = "nl"

  constructor() {
    this.loadTranslations()
  }

  private loadTranslations(): void {
    // This would typically be loaded from an API or JSON file
    this.translationDict = {
      forgot_password: {
        title: "Wachtwoord vergeten",
        header: "Nieuwe wachtwoord aanvragen",
        label_email: "E-mail adres",
        // ... more translations
      },
      common: {
        loading: "Laden",
        empty: "Leeg",
        no_treatment_found: "Geen behandeling gevonden",
        select_treatment: "Kies behandeling",
        // ... more translations
      },
      // ... more translation categories
    }
  }

  translate(key: string, data: any = {}): string {
    const keys = key.split(".")
    let result: any = this.translationDict

    for (const k of keys) {
      if (result && result[k]) {
        result = result[k]
      } else {
        return key // Return the key if translation not found
      }
    }

    if (typeof result === "string") {
      // Replace placeholders with data
      Object.keys(data).forEach((dataKey) => {
        result = result.replace(`:${dataKey}`, data[dataKey])
      })
      return result
    }

    return key
  }

  setLanguage(lang: string): void {
    this.currentLanguage = lang
    // In a real app, this would reload translations for the new language
  }

  getCurrentLanguage(): string {
    return this.currentLanguage
  }
}
