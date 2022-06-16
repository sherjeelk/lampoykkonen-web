import { Component, OnInit } from '@angular/core';
import {DataShareService} from "../services/data-share.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLiner = true;

  constructor( public dataShare: DataShareService ) { }

  ngOnInit(): void {
    this.dataShare.calculateTax();
  }

}
