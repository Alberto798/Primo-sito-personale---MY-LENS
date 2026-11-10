import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { async, Observable } from 'rxjs';
import { PhotoService } from '../../photo.service';
import { CommonModule } from '@angular/common';
import { BackgroundAndIcons } from '../../background.icons.interface';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  logoSito$!: Observable<BackgroundAndIcons | undefined>;

  constructor(
    private route: Router,
    private service: PhotoService,
  ) {}

  backGroundHeader: string =
    'https://res.cloudinary.com/immagini-sito-fotografia/image/upload/w_1920,c_limit,f_auto,q_auto/v1768658913/sfondo-di-foglie-verdi_1_umpoga.jpg';

  ngOnInit() {
    this.logoSito$ = this.service.getBackgroundAndIcons('logo-sito');
    // this.service.getBackgroundAndIcons('background-header-top').subscribe(sfondo =>{
    //   if(sfondo){
    //   this.backGroundHeader = this.getOptimizedUrl(sfondo.publicId, 1920)
    //   }
    // })
  }

  getOptimizedUrl(publicId: string, width: number): string {
    return this.service.getOptimizedUrl(publicId, width);
  }
}
