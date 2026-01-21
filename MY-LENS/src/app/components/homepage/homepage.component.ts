import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MainComponent } from "../main/main.component";
import { FooterComponent } from "../footer/footer.component";
import { GalleryComponent } from "../gallery/gallery.component";

@Component({
  selector: 'app-homepage',
  imports: [HeaderComponent, MainComponent, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  standalone: true
})
export class HomepageComponent {


  
}
