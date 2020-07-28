import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';


import { AngularTokenModule } from 'angular-token';
//import { NgHttpLoaderModule } from 'ng-http-loader';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ToastrModule } from 'ngx-toastr';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { InicioComponent } from './inicio/inicio.component';
import { FooterComponent } from './inicio/footer/footer.component';
import { HeaderComponent } from './inicio/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogModule } from './inicio/confirmation-dialog/confirmation-dialog.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './inicio/confirmation-dialog/confirmation-dialog.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent, InicioComponent, FooterComponent, HeaderComponent
  ],
  entryComponents: [ConfirmationDialogComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ConfirmationDialogModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    //NgHttpLoaderModule.forRoot(),
    NgbModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    AngularTokenModule.forRoot({
      apiBase:                     environment.API_URL,
         apiPath:                   null,

         signInPath:                 'auth/sign_in',
         signInRedirect:             'login',
         signInStoredUrlStorageKey:  'login',

         signOutPath:                'auth/sign_out',
         validateTokenPath:          'auth/validate_token',
         signOutFailedValidate:      false,

         registerAccountPath:        'auth',
         deleteAccountPath:          'auth',
         registerAccountCallback:    window.location.href,

         updatePasswordPath:         'auth',
         resetPasswordPath:          'auth/password',
         resetPasswordCallback:      window.location.href,

         userTypes:                 null,
         loginField:                'dni',

  }),

    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,

    ChartsModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
 exports: [AppComponent]
})
export class AppModule { }
