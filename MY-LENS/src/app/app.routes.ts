import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { FloraComponent } from './components/flora/flora.component';
import { FaunaComponent } from './components/fauna/fauna.component';


import { AboutMeComponent } from './components/about-me/about-me.component';
import { FungaComponent } from './components/funga/funga.component';
import { SkyComponent } from './components/sky/sky.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'flora',
    component: FloraComponent,
  },
  {
    path: 'fauna',
    component: FaunaComponent,
  },
  {
    path: 'sky',
    component: SkyComponent,
  },
  {
    path: 'funga',
    component: FungaComponent,
  },
  {
    path: 'about-me',
    component: AboutMeComponent,
  },

  { path: '**', redirectTo: 'home' },
];
