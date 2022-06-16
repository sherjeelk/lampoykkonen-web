import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TooltipPosition} from "@angular/material/tooltip";
import {FormControl} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {DataShareService} from "../../services/data-share.service";
import {MatCheckboxChange} from "@angular/material/checkbox";
import * as _ from 'lodash';
import {MatDialog} from "@angular/material/dialog";
import {DialogcontentComponent} from "../dialogcontent/dialogcontent.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslationService} from "../../services/translation.service";
import {UtilService} from "../../services/util.service";
import {InfoDialogComponent} from "../../info-dialog/info-dialog.component";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  serviceValue: any;
  airFilterSelectedValue: any;
  spaceHeatedSelectedValue: any;
  deviceSelectedValue: any;
  customServiceName = '';
  customServiceDesc = '';
  contactForm = false;
  public chosenServices: any[] = [];

  spaceHeated: any = [

    {id: 1, size: "0- 50 m²", checked: false},
    {id: 2, size: "50-80 m²", checked: false},
    {id: 3, size: "8-120 m²", checked: false},
    {id: 4, size: "120-150 m²", checked: false},
    {id: 5, size: "150-180 m²", checked: false},
  ];
  wantDevice: any = [
    {id: 1, deviceName: "Lammitykseen ja villennykseen", checked: false},
    {id: 2, deviceName: "Vain villennykseen", checked: false},
  ];
  airFilteration: any = [
    {id: 1, filterName: "Karkeä suödätus", checked: false},
    {id: 2, filterName: "Sähkosudätus", checked: false},

  ];
  event: any;
  private dialogcontent: any;

  constructor(private apiService: ApiService, public dataShare: DataShareService, public dialog: MatDialog,
              private snackBar: MatSnackBar, public translation: TranslationService, public util: UtilService) {

  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  ngOnInit(): void {
    this.getServices();
  }


  public getServices() {

    this.apiService.getAllService().subscribe(data => {
      // this.allService = data;
      this.dataShare.apiService = data;
      console.log('all services', data);
    })
  }


  public getProducts() {
    if (!this.dataShare.selectedServiceValue) {
      this.openSnackBar(this.translation.getLang() === 'en'? 'Please Select Service which you want' : 'Valitse haluamasi palvelu', 'Ok');
    } else if (!this.dataShare.spaceHeatedValue) {
      // open snackbar
      this.openSnackBar(this.translation.getLang() === 'en'? ' Please Select space heated value' : 'Valitse tilalämmityksen arvo', 'Ok');
    } else if (!this.dataShare.deviceSelectedValue) {
      this.openSnackBar(this.translation.getLang() === 'en'? 'Please Choose device requirement' : 'Valitse laitevaatimus', 'Ok');
    } else if (!this.dataShare.filterSelectedValue) {
      this.openSnackBar(this.translation.getLang() === 'en' ? 'Please choose electrical weaving' : 'Valitse sähköinen suodatus', 'Ok');
    }
    const type = this.dataShare.filterSelectedValue === 'Sähkosudätus' ? '2' : '1';
    const min = Number(this.dataShare.spaceHeatedValue.split('-')[0]);
    const max = Number(this.dataShare.spaceHeatedValue.split('-')[1]);
    this.apiService.getAllProducts(type, min, max, this.dataShare.deviceSelectedValue).subscribe(data => {
        // this.dataShare.allProducts=data;

        this.dataShare.allProducts = data;
        if (this.dataShare.allProducts.length === 0) {
          this.util.presentSnackBar(this.translation.getLang() === 'en' ? 'No products found' : 'Tuotteita ei löytynyt');
        } else {
          this.dataShare.allProducts.forEach((el: { checked: boolean; }) => {
            el.checked = false;
          });
        }
        console.log('data of all products', data);
      }, error => {
      this.util.presentSnackBar(this.translation.getLang() === 'en' ? 'No products found' : 'Tuotteita ei löytynyt');
        console.log('No products found');
      }
    )

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  changeValue(event: any) {
    console.log(event);
    this.dataShare.selectedServiceValue = event.value;
    console.log('service value', this.dataShare.selectedServiceValue);
  }


  continueServiceStep() {
    const valid = this.dataShare.selectedServiceValue &&
      this.dataShare.spaceHeatedValue &&
      this.dataShare.deviceSelectedValue &&
      this.dataShare.filterSelectedValue
      && (this.dataShare.products.length > 0 || this.dataShare.customService.length > 0)


    if (valid) {
      this.dataShare.index = 0;
      this.dataShare.step.service = true;
      console.log('if block executed');
      setTimeout(() => {
        this.dataShare.index = 1;
      }, 30);
    } else {
      console.log('correct form details');
    }

  }

  openDialog(item: any) {
    const dialogRef = this.dialog.open(DialogcontentComponent, {
      width: '1000px',
      maxHeight: '70vh',
      // panelClass: 'scroll',
      data: item
    });
  }

  addProduct($event: MatCheckboxChange, item: any) {
    console.log($event);
      const selectedProduct = {
        id: item.id,
        name: item.name,
        image: item.image,
        bestseller: item.bestseller,
        price: item.price,
        tag: item.tag,
        type: item.type,
        deviceType: item.deviceType,
        desc: item.desc
      }
    if ($event.checked) {
      this.dataShare.products.push(selectedProduct);
      for(const el of this.dataShare.allProducts) {
        if (el.id === item.id) {
          el.checked = true;
        }
      }
      console.log('all products selected', this.dataShare.products);
      this.dataShare.calculateTotal();
      console.log('total price', this.dataShare.totalPrice);
      console.log('checked')

    } else {
      console.log('unchecked')
      _.remove(this.dataShare.products, {id: item.id});
      this.dataShare.calculateTotal();
    }
    this.dataShare.service_stepData.products = this.dataShare.products;
  }

  addCustomService(serviceName: any, desc: any) {
    console.log('custom service data', serviceName, desc);
    const serviceBody = {
      serviceName,
      shortName: serviceName,
      desc,
      description: desc,
      type: 'custom',
      price: 0
    };
    this.chosenServices.push(serviceBody);
    this.dataShare.customService = this.chosenServices;
    console.log('new added custom service', this.dataShare.customService);
    this.customServiceName = '';
    this.customServiceDesc = '';

    this.contactForm = false;


  }

  removeCustomService(service: any) {
    _.remove(this.chosenServices, service);
    this.dataShare.customService = this.chosenServices;
    console.log('choosen service after remove products', this.dataShare.customService);
  }

  openCustomDialog() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '500px',
      maxHeight: '70vh',
      // panelClass: 'scroll',
      // data: item
    });
  }
}
