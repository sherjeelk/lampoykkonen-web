import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule} from "@angular/material/stepper";
import {CalendarComponent} from './pages/calendar/calendar.component';
import {OrderComponent} from './pages/order/order.component';
import {InfoCardComponent} from './pages/info-card/info-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import { TermsconditionsComponent } from './termsconditions/termsconditions.component';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import { DialogcontentComponent } from './pages/dialogcontent/dialogcontent.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import {LastServiceDialogueComponentComponent} from "./pages/last-service-dialogue-component/last-service-dialogue-component.component";
import { LanguagePipe } from './pipes/language.pipe';
import {ServiceComponent} from "./pages/service/service.component";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import { TermsofdeliveryComponent } from './termsofdelivery/termsofdelivery.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { FaqComponentComponent } from './faq-component/faq-component.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CalendarComponent,
    OrderComponent,
    InfoCardComponent,
    TermsconditionsComponent,
    DialogcontentComponent,
    OrderSuccessComponent,
    LastServiceDialogueComponentComponent,
    LanguagePipe,
    ServiceComponent,
    TermsofdeliveryComponent,
    InfoDialogComponent,
    FaqComponentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatCardModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatSnackBarModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,

  ],
  entryComponents: [DialogcontentComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  exports: [
    LanguagePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
