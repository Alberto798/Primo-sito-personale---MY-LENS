import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Photo } from '../../photo.interface';
import { PhotoService } from '../../photo.service';




@Component({
  selector: 'app-gallery',
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {


    cloudName = 'immagini-sito-Fotografia'

    AllPhotos$!: Observable<Photo[]>;
   
   

    constructor(private servicePhotos : PhotoService) {

    }


  ngOnInit() {

    this.AllPhotos$ = this.servicePhotos.photos$;
    
     
  }

  getOptimizedUrl(publicId: string, width: number): string {
  return this.servicePhotos.getOptimizedUrl(publicId, width);
}

}
