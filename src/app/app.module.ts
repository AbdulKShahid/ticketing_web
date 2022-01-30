import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { TicketComponent } from './ticket/ticket.component';
import {MatCardModule} from "@angular/material/card";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatButtonModule} from "@angular/material/button";
import { TicketDialogComponent } from './ticket-dialog/ticket-dialog.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {MatDatepickerModule} from "@angular/material/datepicker";
@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    TicketDialogComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    NgxMatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
