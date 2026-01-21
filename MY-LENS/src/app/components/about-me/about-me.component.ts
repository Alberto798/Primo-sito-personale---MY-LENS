import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { BackgroundAndIcons } from '../../background.icons.interface';
import { Observable } from 'rxjs';
import { PhotoService } from '../../photo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent implements OnInit {
  cloudName = 'immagini-sito-Fotografia';

  carattereGrande = '';

  fotoprofilo$!: Observable<BackgroundAndIcons | undefined>;
  ragazzoNerd$!: Observable<BackgroundAndIcons | undefined>;
  InstagramLogo$!: Observable<BackgroundAndIcons | undefined>;

  

  backgroundAboutrMe: string =
    'https://res.cloudinary.com/immagini-sito-fotografia/image/upload/v1763063226/sfondo-verticale-naturale.jpg';

  constructor(
    private route: Router,
    private http: HttpClient,
    private service: PhotoService
  ) {}
  ngOnInit() {
    this.fotoprofilo$ = this.service.getBackgroundAndIcons('foto-profilo');
    this.ragazzoNerd$ =
      this.service.getBackgroundAndIcons('ragazzo_nerd_al_pc');
    this.InstagramLogo$ = this.service.getBackgroundAndIcons('instagram-logo');

    this.service
      .getBackgroundAndIcons('sfondo-verticale-naturale')
      .subscribe((sfondo) => {
        if (sfondo) {
          this.backgroundAboutrMe = this.getOptimizedUrl(sfondo.publicId, 3000);
        }
      });
  }

  goToHome() {
    this.route.navigate(['home']);
  }

  goToGallery() {
    this.route.navigate(['gallery']);
  }

  goToAboutMe() {
    this.route.navigate(['about-me']);
  }

  getOptimizedUrl(publicId: string, width: number): string {
    // Implementa qui la logica per costruire l'URL
    // Usando: this.cloudName, publicId, e width
    const transformation = `w_${width},q_auto`;
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${transformation}/${publicId}`;
  }

 
}