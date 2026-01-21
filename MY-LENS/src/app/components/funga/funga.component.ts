import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { PhotoService } from '../../photo.service';
import { Observable } from 'rxjs';
import { Photo } from '../../photo.interface';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-funga',
  imports: [FooterComponent, HeaderComponent, AsyncPipe, CommonModule],
  templateUrl: './funga.component.html',
  styleUrl: './funga.component.css',
})
export class FungaComponent {
  categories: string[] = ['Fauna', 'Flora', 'Cielo', 'Funga'];

  constructor(private service: PhotoService) {}


  fungaPhotos$!: Observable<Photo[]>;

  ngOnInit() {
    this.fungaPhotos$ = this.service.getPhotosByCategory('Funga');
  }

  getOptimizedUrl(publicId: string, width: number): string {
  return this.service.getOptimizedUrl(publicId, width);
}
}
