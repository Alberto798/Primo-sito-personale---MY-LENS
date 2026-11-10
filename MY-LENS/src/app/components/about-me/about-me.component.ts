import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { BackgroundAndIcons } from '../../background.icons.interface';
import { Observable } from 'rxjs';
import { PhotoService } from '../../photo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent implements OnInit {
  carattereGrande = '';

  fotoprofilo$!: Observable<BackgroundAndIcons | undefined>;
  profiloFotografo$!: Observable<BackgroundAndIcons | undefined>;
  ragazzoNerd$!: Observable<BackgroundAndIcons | undefined>;
  InstagramLogo$!: Observable<BackgroundAndIcons | undefined>;

  backgroundAboutrMe: string =
    'https://res.cloudinary.com/immagini-sito-fotografia/image/upload/v1763063226/sfondo-verticale-naturale.jpg';

  constructor(
    private service: PhotoService,
  ) {}
  ngOnInit() {
    this.fotoprofilo$ = this.service.getBackgroundAndIcons('foto-profilo');
    this.profiloFotografo$ = this.service.getBackgroundAndIcons(
      'immagine-profilo-fotografo',
    );
    this.ragazzoNerd$ =
      this.service.getBackgroundAndIcons('ragazzo_nerd_al_pc');
    this.InstagramLogo$ = this.service.getBackgroundAndIcons('instagram-logo');

    this.service
      .getBackgroundAndIcons('sfondo-verticale-naturale')
      .subscribe((sfondo) => {
        if (sfondo) {
          this.backgroundAboutrMe = this.getOptimizedUrl(sfondo.publicId, 1920);
        }
      });
  }

 

  getOptimizedUrl(publicId: string, width: number): string {
    return this.service.getOptimizedUrl(publicId, width);
  }
}
