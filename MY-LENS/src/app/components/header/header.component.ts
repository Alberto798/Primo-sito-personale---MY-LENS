import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { async, Observable } from 'rxjs';
import { PhotoService } from '../../photo.service';
import { CommonModule } from '@angular/common';
import { BackgroundAndIcons } from '../../background.icons.interface';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  cloudName = 'immagini-sito-Fotografia';

  logoSito$!: Observable<BackgroundAndIcons | undefined>;

  constructor(private route: Router, private service: PhotoService) {}

  backGroundHeader: string = 'https://res.cloudinary.com/immagini-sito-fotografia/image/upload/v1768658913/sfondo-di-foglie-verdi_1_umpoga.jpg'

  ngOnInit() {
    this.logoSito$ = this.service.getBackgroundAndIcons('logo-sito');
    this.service.getBackgroundAndIcons('background-header-top').subscribe(sfondo =>{
      if(sfondo){
      this.backGroundHeader = this.getOptimizedUrl(sfondo.publicId, 1920)
      }
    })
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
    const transformation = `w_${width},q_auto,f_auto`;
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${transformation}/${publicId}`;
  }
}
