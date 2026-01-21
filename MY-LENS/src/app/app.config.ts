
// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'; // Rimosso provideZoneChangeDetection
import { provideRouter } from '@angular/router';

// *** Importa i moduli Firebase ***
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';


const firebaseConfig = {
  apiKey: 'AIzaSyCVfhxKzbPTpRC9JiZrjNJkJfUzh3Rxi4I',
  authDomain: 'sito-di-fotografia-alberto.firebaseapp.com',
  projectId: 'sito-di-fotografia-alberto',
  storageBucket: 'sito-di-fotografia-alberto.firebasestorage.app',
  messagingSenderId: '76307607839',
  appId: '1:76307607839:web:afa7c30a2feef01218402a', 
  measurementId: 'G-65RMK83443',
};

export const appConfig: ApplicationConfig = {
  providers: [
    // Rimosso provideZoneChangeDetection: non è necessario aggiungerlo esplicitamente
    // in un'app standalone, NgZone è fornito da bootstrapApplication.
    provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),

    // *** Aggiungi i provider Firebase ***
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    
  ]
};

