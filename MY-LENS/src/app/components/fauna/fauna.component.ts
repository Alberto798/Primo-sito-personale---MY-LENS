import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

import { Observable } from 'rxjs';

import { AsyncPipe, CommonModule } from '@angular/common';
import { PhotoService } from '../../photo.service';
import { Photo } from '../../photo.interface';




@Component({
  selector: 'app-fauna',
  imports: [HeaderComponent, FooterComponent, AsyncPipe, CommonModule],
  templateUrl: './fauna.component.html',
  styleUrl: './fauna.component.css'
})
export class FaunaComponent implements OnInit {

  categories : string[] = ['Fauna', 'Flora', 'Cielo', 'Funga']

  constructor(private service: PhotoService){

  }

  cloudName = 'immagini-sito-Fotografia'
 

   faunaPhotos$!: Observable<Photo[]>;

   ngOnInit(){
    this.faunaPhotos$ = this.service.getPhotosByCategory('Fauna');
   }

   getOptimizedUrl(publicId: string, width: number): string {
  return this.service.getOptimizedUrl(publicId, width);
}
   
  

}
