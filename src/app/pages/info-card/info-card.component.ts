import { Component, OnInit } from '@angular/core';
import {DataShareService} from "../../services/data-share.service";
import {UtilService} from "../../services/util.service";
import {MatDialog} from "@angular/material/dialog";
import {LastServiceDialogueComponentComponent} from "../last-service-dialogue-component/last-service-dialogue-component.component";
import * as _ from 'lodash';
@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {


  constructor(public dataShare:DataShareService, public utilService : UtilService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  removeLastProducts(product: any) {

    if (this.dataShare.products.length > 1) {
      this.dataShare.removeProduct(product);
      for(const el of this.dataShare.allProducts) {
        if (el.id === product.id) {
          el.checked = false;
        }
      }
      // _.find(this.dataShare.allProducts, {id : product.id});
      console.log('service removed',  _.find(this.dataShare.allProducts, {id : product.id}));
    } else {
      const dialogRef = this.dialog.open(LastServiceDialogueComponentComponent, {
        width: '250px',
        data: product
      });
      console.log('service not removed');
    }
  }



}
