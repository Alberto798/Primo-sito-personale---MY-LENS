import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';

import { Route, Router } from '@angular/router';
import { Photo } from '../../photo.interface';
import { PhotoService } from '../../photo.service';
import { orderBy } from 'firebase/firestore';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  imports: [CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true,
})
export class MainComponent implements OnInit {
  floraPhotos$!: Observable<Photo[]>;
  faunaPhotos$!: Observable<Photo[]>;
  skyPhotos$!: Observable<Photo[]>;
  fungaPhotos$!: Observable<Photo[]>;

  hoverFlora = false;
  hoverFauna = false;
  hoverSky = false;
  hoverFunga = false;

  hoveredLineaFlora = false;
  hoveredLineaFauna = false;
  hoveredLineaSky = false;
  hoveredLineaFunga = false;

  cloudName = 'immagini-sito-Fotografia';

  backgroundForm: string =
    'https://res.cloudinary.com/immagini-sito-fotografia/image/upload/v1768246615/Gemini_Generated_Image_34z7ks34z7ks34z7_tvtp28.png';

  endPointFormspree = 'https://formspree.io/f/mvgenadk';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private servicePhotos: PhotoService,
    private router: Router,
    private Http: HttpClient
  ) {}

  ngOnInit() {
    this.floraPhotos$ = this.servicePhotos.getPhotosByCategoryAndOrder('Flora');
    this.faunaPhotos$ = this.servicePhotos.getPhotosByCategoryAndOrder('Fauna');
    this.skyPhotos$ = this.servicePhotos.getPhotosByCategoryAndOrder('Cielo');
    this.fungaPhotos$ = this.servicePhotos.getPhotosByCategoryAndOrder('Funga');

    this.servicePhotos
      .getBackgroundAndIcons('background-form')
      .subscribe((sfondo) => {
        if (sfondo) {
          this.backgroundForm = this.getOptimizedUrl(sfondo.publicId, 500);
        }
      });
  }

  inHoverFlora() {
    this.hoverFlora = true;
    this.hoveredLineaFlora = true;
  }

  outHoverFlora() {
    this.hoverFlora = false;
    this.hoveredLineaFlora = false;
  }

  inHoverFauna() {
    this.hoverFauna = true;
    this.hoveredLineaFauna = true;
  }

  outHoverFauna() {
    this.hoverFauna = false;
    this.hoveredLineaFauna = false;
  }

  inHoverSky() {
    this.hoverSky = true;
    this.hoveredLineaSky = true;
  }

  outHoverSky() {
    this.hoverSky = false;
    this.hoveredLineaSky = false;
  }

  inHoverFunga() {
    this.hoverFunga = true;
    this.hoveredLineaFunga = true;
  }

  outHoverFunga() {
    this.hoverFunga = false;
    this.hoveredLineaFunga = false;
  }

  getOptimizedUrl(publicId: string, width: number): string {
    // Implementa qui la logica per costruire l'URL
    // Usando: this.cloudName, publicId, e width
    const transformation = `w_${width},q_auto`;
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${transformation}/${publicId}`;
  }

  goToFlora() {
    this.router.navigate(['/flora']);
  }

  goToFauna() {
    this.router.navigate(['/fauna']);
  }

  goToSky() {
    this.router.navigate(['/sky']);
  }

  goToFunga() {
    this.router.navigate(['/funga']);
  }

  onSubmit(form: NgForm) {
    this.successMessage = '';
    this.errorMessage = '';

    if (form.valid) {
      const formElement = form.form.getRawValue();
      const formData = new FormData();

      for (const key in formElement) {
        formData.append(key, formElement[key]);
      }

      this.Http.post(this.endPointFormspree, formData).subscribe({
        next: (response)=> {
          this.successMessage = 'Messaggio inviato con successo, Grazie!'
          form.resetForm();
        }, 
        error: (error) =>{
          this.errorMessage = 'Si è verificato un errore durante l\'invio del messaggio. Riprova più tardi.'
        }
      })
        
  }else{
      this.errorMessage = 'Per favore, compila tutti i campi richiesti prima di inviare il modulo.';
      console.log('Form non valido');
  }
}
}
