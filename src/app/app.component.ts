import { Component } from '@angular/core';
import {TranslationService} from "./services/translation.service";
import {UtilService} from "./services/util.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lampo-Yakkonen';
  constructor(public translation: TranslationService, public util: UtilService) {
  }
}
