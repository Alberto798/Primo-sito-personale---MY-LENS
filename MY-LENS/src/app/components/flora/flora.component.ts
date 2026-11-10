import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

import { Observable } from 'rxjs';

import { AsyncPipe, CommonModule } from '@angular/common';
import { PhotoService } from '../../photo.service';
import { Photo } from '../../photo.interface';

@Component({
  selector: 'app-flora',
  imports: [HeaderComponent, FooterComponent, AsyncPipe, CommonModule],
  templateUrl: './flora.component.html',
  styleUrl: './flora.component.css',
  providers: [PhotoService],
})
export class FloraComponent implements OnInit {
  categories: string[] = ['Fauna', 'Flora', 'Cielo', 'Funga'];

  constructor(private service: PhotoService) {}

  floraPhotos$!: Observable<Photo[]>;

  ngOnInit() {
    this.floraPhotos$ = this.service.getPhotosByCategory('Flora');
  }

  getOptimizedUrl(publicId: string, width: number): string {
    return this.service.getOptimizedUrl(publicId, width);
  }

  getSrcSet(publicId: string): string {
  return this.service.getImgSet(publicId);
}
}
