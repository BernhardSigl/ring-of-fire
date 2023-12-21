import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({
    "projectId": "ring-of-fire-2ffe0",
    "appId": "1:553697082879:web:f34f81cba6cb969e417bca",
    "storageBucket": "ring-of-fire-2ffe0.appspot.com",
    "apiKey": "AIzaSyBVJUE9FtoyVwy6Vw69w2VHIykivwrmWO0",
    "authDomain": "ring-of-fire-2ffe0.firebaseapp.com", "messagingSenderId": "553697082879"
  }))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};