import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

import { Observable } from 'rxjs';

import { AsyncPipe, CommonModule } from '@angular/common';
import { PhotoService } from '../../photo.service';
import { Photo } from '../../photo.interface';




@Component({
  selector: 'app-sky',
  imports: [HeaderComponent, FooterComponent, AsyncPipe, CommonModule],
  templateUrl: './sky.component.html',
  styleUrl: './sky.component.css'
})
export class SkyComponent implements OnInit {

  categories : string[] = ['Fauna', 'Flora', 'Cielo', 'Funga']

  constructor(private service: PhotoService){

  }

  cloudName = 'immagini-sito-Fotografia'
 

   skyPhotos$!: Observable<Photo[]>;

   ngOnInit(){
    this.skyPhotos$ = this.service.getPhotosByCategory('Cielo');
   }

   getOptimizedUrl(publicId: string, width: number): string {
  return this.service.getOptimizedUrl(publicId, width);
}

   
  

}
