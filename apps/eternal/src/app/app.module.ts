import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de-AT';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Configuration } from '@eternal/shared/config';
import { BaseUrlInterceptor } from '@eternal/shared/http';
import { SharedMasterDataModule } from '@eternal/shared/master-data';
import { SecurityModule } from '@eternal/shared/security';
import {
  LoadingInterceptor,
  SharedUiMessagingModule,
} from '@eternal/shared/ui-messaging';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppComponentModule } from './app.component.module';
import {
  LocalStorageEffects,
  localStorageReducer,
} from '@eternal/core/local-storage-state';
import {
  DefaultDataServiceConfig,
  EntityCollectionReducerMethodsFactory,
  EntityDataModule,
  PersistenceResultHandler,
} from '@ngrx/data';
import { AdditionalPersistenceResultHandler } from '../../../../libs/customers/data/src/lib/entity-data/additional-persistence-result-handler';
import { AdditionalEntityCollectionReducerMethodsFactory } from '../../../../libs/customers/data/src/lib/entity-data/additional-entity-collection-reducer-methods-factory';

registerLocaleData(localeDe, 'de-AT');

@NgModule({
  imports: [
    AppComponentModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: [
          localStorageReducer('customers', 'holidays', 'security', 'master'),
        ],
      }
    ),
    EffectsModule.forRoot([LocalStorageEffects]),
    EntityDataModule.forRoot({ pluralNames: { Holiday: 'Holiday' } }),
    StoreDevtoolsModule.instrument(),
    SecurityModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      validationMessages: [
        {
          name: 'required',
          message: 'This field is mandatory',
        },
      ],
    }),
    FormlyMaterialModule,
    SharedMasterDataModule,
    SharedUiMessagingModule,
  ],
  providers: [
    {
      provide: Configuration,
      useFactory: () => new Configuration(environment.baseUrl),
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-AT',
    },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: BaseUrlInterceptor },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: LoadingInterceptor },
    { provide: LOCALE_ID, useValue: 'de-AT' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: DefaultDataServiceConfig,
      useValue: { root: environment.baseUrl },
    },
    {
      provide: PersistenceResultHandler,
      useClass: AdditionalPersistenceResultHandler,
    },
    {
      provide: EntityCollectionReducerMethodsFactory,
      useClass: AdditionalEntityCollectionReducerMethodsFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
