import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BackgroundAndIcons } from '../../background.icons.interface';
import { PhotoService } from '../../photo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  constructor(private service: PhotoService){

  }

  InstagramLogo$!: Observable<BackgroundAndIcons | undefined>;

   cloudName = 'immagini-sito-Fotografia';

  ngOnInit() {
   this.InstagramLogo$ = this.service.getBackgroundAndIcons('instagram-logo')
  }

  

  getOptimizedUrl(publicId: string, width: number): string {
    // Implementa qui la logica per costruire l'URL
    // Usando: this.cloudName, publicId, e width
    const transformation = `w_${width},q_auto`;
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${transformation}/${publicId}`;
  }

}
