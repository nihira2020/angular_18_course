import { ApplicationConfig, provideZoneChangeDetection, isDevMode, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideEnvironmentNgxMask} from 'ngx-mask'

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr'
import { tokenInterceptor } from './service/token.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProductReducer } from './_store/Product.Reducer';
import { ProductEffect } from './_store/Product.Effects';

export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(), provideRouter(routes),
    provideAnimationsAsync(), provideHttpClient(withInterceptors([tokenInterceptor])), provideToastr({ closeButton: true, preventDuplicates: true }),
     provideStore({'product':ProductReducer}), provideEffects([ProductEffect]), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
     provideEnvironmentNgxMask()]
};
