import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="visual style bg-black">
      <div class="shape-holder top-left">
        <img src="assets/images/img-visual-shape.png" alt="eng">
      </div>
      <div class="shape-holder bottom-right">
        <img src="assets/images/img-visual-top-r.png" alt="eng">
      </div>
      <div class="container">
        <h1>Waarom Knipklok?</h1>
        <p>Laat het ons uitleggen</p>
      </div>
    </section>
    <main id="main">
      <div class="three-cols style">
        <div class="container">
          <header class="cols-head">
            <h2>Start vandaag</h2>
            <a routerLink="/kapperszaak-registreren/basis" class="btn btn-green">Start vandaag voor &euro;29</a>
          </header>
          <div class="row">
            <div class="col" *ngFor="let feature of features">
              <div class="image-holder">
                <img [src]="feature.icon" [alt]="feature.title">
              </div>
              <div class="text-holder">
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="shape-holder">
          <img src="assets/images/shape.svg" alt="eng">
        </div>
      </div>
      <div class="videos-area">
        <div class="container">
          <div class="wrap">
            <div class="image-holder" *ngFor="let video of videos">
              <img [src]="video.img" [alt]="video.alt">
              <a [href]="video.url" class="btn-play" target="_blank"></a>
            </div>
          </div>
        </div>
      </div>
      <div class="pricing-block">
        <div class="container">
          <div class="pricing-row">
            <div class="pricing-col">
              <strong class="title">Complete pakket</strong>
              <div class="detail-box">
                <a routerLink="/kapperszaak-registreren/basis" class="btn btn-green">
                  Start vandaag voor &euro;29
                </a>
                <ul class="list-features">
                  <li *ngFor="let item of pricingFeatures">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="payment-detail">
            <h2>Betaling en voorwaarden</h2>
            <p>
              Er wordt maandelijks gefactureerd in de eerste drie dagen van iedere maand. De facturen kunnen per (internet)bankieren overgemaakt worden of digitaal betaald worden. Alle genoemde prijzen zijn exclusief btw.
            </p>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    /* Add your styles here or import from a CSS file */
  `]
})
export class RegisterComponent {
  features = [
    {
      icon: 'assets/images/icon-notification.svg',
      title: 'Notificaties',
      description: 'Ontvang notificaties wanneer er afspraken worden gemaakt. De klanten ontvangen notificaties als herinnering om no-shows te voorkomen'
    },
    {
      icon: 'assets/images/icon-customers.svg',
      title: 'Vaste Afspraken',
      description: 'Stel vaste afspraken in die iedere week (of 2 weken) automatisch herhaald worden.'
    },
    {
      icon: 'assets/images/icon-digi.svg',
      title: 'Digi-box',
      description: 'Sluit onze Digi-box aan op uw tv en zie duidelijk wie er wanneer aan de beurt is.'
    },
    {
      icon: 'assets/images/icon-self.svg',
      title: 'Self-desk',
      description: 'Maak gebruik van onze Self-desk zodat klanten de volgende afspraak kunnen inplannen middels de grote touchscreen voordat ze de zaak verlaten.'
    },
    {
      icon: 'assets/images/icon-website.svg',
      title: 'Eigen website',
      description: 'Mogelijkheid om Knipklok te integreren in uw eigen website. Ook kunt u gebruik maken van onze prive-domein (www.voorbeeld.knipklok.nl)'
    },
    {
      icon: 'assets/images/icon-privacy.svg',
      title: 'Privacy',
      description: 'Privacy wordt gerespecteerd, oude data wordt automatisch verwijderd. U kunt er echter voor kiezen om uw data te bewaren door gebruik te maken van onze maandelijkse rapport functionaliteit.'
    }
  ];

  videos = [
    {
      img: 'assets/images/img6.jpg',
      url: 'https://www.youtube.com/watch?v=hai9aHOClCo',
      alt: 'Video 1'
    },
    {
      img: 'assets/images/img7.jpg',
      url: 'https://www.youtube.com/watch?v=JGTSv_6c1io',
      alt: 'Video 2'
    },
    {
      img: 'assets/images/img8.jpg',
      url: 'https://www.youtube.com/watch?v=jr36XDHRsx4',
      alt: 'Video 3'
    }
  ];

  pricingFeatures = [
    'Onbeperkt aantal afspraken',
    'Onbeperkt aantal notificaties',
    'Vaste afspraken functionaliteit',
    'Mogelijkheid om aan uw eigen website toe te voegen',
    'Maandelijkse rapport functionaliteit',
    'Kan maandelijks opgezegd worden'
  ];
}