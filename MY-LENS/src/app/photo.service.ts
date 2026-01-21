import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { map, Observable, of, Subscriber } from 'rxjs';

import {
  collection,
  collectionData,
  Firestore,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  where,
} from '@angular/fire/firestore';
import { Photo } from './photo.interface';
import { BackgroundAndIcons } from './background.icons.interface';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {

  private firestore: Firestore = inject(Firestore);
  

  private readonly COLLECTION_NAME = 'Gallery';
  private readonly CLOUD_NAME = 'immagini-sito-fotografia';
  private readonly BASE_URL = `https://res.cloudinary.com/${this.CLOUD_NAME}/image/upload/`;

  private readonly BACKGROUND_HEADER_STATIC: { [key: string]: BackgroundAndIcons } = {
    'background-header':{
      publicId: 'background-header-top', // Public ID di Cloudinary
      title: 'background-header',
      width: 5472 ,
      height: 3648,
      order: 1,
    },
    'instagram-logo':{
      publicId: 'instagram-logo', // Public ID di Cloudinary
      title: 'instagram-logo',
      width: 64,
      height: 64,
      order: 2,
    },
    'foto-profilo':{
      publicId: 'foto-profilo', // Public ID di Cloudinary
      title: 'foto-profilo',
      width: 3600,
      height: 3239,
      order: 3,
    },
    'ragazzo_nerd_al_pc':{
      publicId: 'ragazzo_nerd_al_pc', // Public ID di Cloudinary
      title: 'ragazzo nerd al pc',
      width: 1024,
      height: 1024,
      order: 4,
    },
    'sfondo-verticale-naturale':{
      publicId: 'sfondo-verticale-naturale', // Public ID di Cloudinary
        title: 'sfondo verticale naturale',
        width: 4024, 
        height: 6036,
        order: 5
    },
    'logo-sito':{
      publicId: 'logo-sito', // Public ID di Cloudinary
        title: 'logo-sito-personale',
        width: 500, 
        height: 500,
        order: 6
    }
  }


  private photosCollection = collection(this.firestore, this.COLLECTION_NAME);
  private photosQuery = query(this.photosCollection, orderBy("order", "asc"));
  readonly photos$ = collectionData(this.photosQuery, { idField: 'id' }) as Observable<Photo[]>;

  

  getPhotosByCategory(categoryName: string): Observable<Photo[]> {
    const photoRef = collection(this.firestore, this.COLLECTION_NAME);

    const constraints: QueryConstraint[] = [
      where('category', '==', categoryName),

      orderBy('order', 'asc'),
    ];

    const q = query(photoRef, ...constraints);

    return collectionData(q, { idField: 'id' }) as Observable<Photo[]>;
  }

  // getPhotosByCategoryAndOrder(categoryName: string): Observable<Photo[]> {
  //   const photoRef = collection(this.firestore, this.COLLECTION_NAME);

  //   const constraints: QueryConstraint[] = [
  //     where('category', '==', categoryName),

  //     orderBy('order', 'asc'),

  //     limit(3),
  //   ];

  //   const q = query(photoRef, ...constraints);

  //   return collectionData(q, { idField: 'id' }) as Observable<Photo[]>;
  // }

  private injector= inject(Injector)

  getPhotosByCategoryAndOrder(categoryName: string): Observable<Photo[]> {

    return runInInjectionContext(this.injector, () => {
      const q = query(
        this.photosCollection,
        where('category', '==', categoryName),
        orderBy('order', 'asc'),
        limit(3)
      );

      return collectionData(q, { idField: 'id' }) as Observable<Photo[]>;
    });
  }


  getBackgroundAndIcons(key:string): Observable<BackgroundAndIcons | undefined> {

    const item = this.BACKGROUND_HEADER_STATIC[key];

    return of(item);
  }

  getOptimizedUrl(publicId: string, width: number = 1920): string {
  const cloudName = 'immagini-sito-Fotografia';
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
  
  // Proviamo prima senza filigrana per essere sicuri che funzioni
  // Nota bene: NON ci sono barre all'inizio o alla fine qui
  const transformations = `w_${width},c_scale,f_auto,q_auto`;
  
  // Costruiamo l'URL finale assemblando i pezzi con le barre nel posto giusto
  const finalUrl = `${baseUrl}/${transformations}/${publicId}`;
  
  return finalUrl;
}


 
}
