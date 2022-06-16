import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ServiceComponent} from "./pages/service/service.component";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSliderModule} from "@angular/material/slider";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TermsconditionsComponent} from "./termsconditions/termsconditions.component";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {OrderSuccessComponent} from "./pages/order-success/order-success.component";

const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'pages/order-success',
    component: OrderSuccessComponent
  }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    declarations: [
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
