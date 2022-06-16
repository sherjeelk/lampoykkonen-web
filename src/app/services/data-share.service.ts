import {Injectable} from '@angular/core';
import * as moment from 'moment';
import * as _ from "lodash";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  public apiService: any;
  public sizeValue = 0;
  public spaceHeatedValue: any;
  public filterSelectedValue: any;
  public deviceSelectedValue: any;
  public contactDiv = false;
  public couponBody: any;
  public allProducts:any[] = [];
  selectedServiceValue: any;
  contactMe = false;
  step = {service: false, calendar: false, order: false};
  index = 0;
  public startDate: any;
  public customService: any = [];

  public products: any = [];
  public totalPrice = 0;
  public coupon: any;
  couponValue: any;

  service_stepData: any = {
    selectedServiceValue: '',
    spaceHeatedValue: '',
    filterSelectedValue: '',
    deviceSelectedValue: '',
    sizeValue: 0,
    products: []
  }

  scheduleContactForm: any = {
    phone: '',
    email: '',
    date: '',
    time: ''
  }
  calendarStep: any = {
    startDate: '',
    slotsSelected: ''
  }
  slotsSelected: any;
  public subTotal = 0;
  public percentageCharge = 0;
  public absoluteCharge = 0;

  constructor(public api: ApiService) {
  }

  getTime(date: any) {
    return moment.utc(date).format('HH:mm')
  }


  /**
   * This function is responsible for calculating the total of complete order before checkout
   */
  calculateTotal() {
    this.totalPrice = 0
    this.subTotal = 0
    for (let product of this.products) {
      this.subTotal = this.subTotal + product.price;
      // this.totalPrice = this.totalPrice + product.taxed_price;
    }
    this.totalPrice = this.subTotal + this.absoluteCharge;
    return this.subTotal;
  }

  /**
   * Use this function to apply coupon
   * @param discount Discount amount
   */
  applyCoupon(discount: number) {
    console.log('this is percentage charge', this.percentageCharge)
    console.log('this is absolute charge', this.absoluteCharge)
    console.log('this is subtotal', this.subTotal)
    const originalPrice = (100 * ((this.subTotal - this.absoluteCharge) / (100 + this.percentageCharge)))
    console.log('this is original price', originalPrice)

    if (discount > 0) {
        let discountedTotal: number;
        discountedTotal =  originalPrice - discount;
        this.totalPrice = discountedTotal + (discountedTotal * (this.percentageCharge/100)) + this.absoluteCharge;
      }
    }



  removeProduct(product: any) {
    console.log('this is service to be removed', this.products);
    _.remove(this.products, {id: product.id});
    for(const el of this.allProducts) {
      if (el.id === product.id) {
        el.checked = false;
      }
    }
    this.calculateTotal();
    console.log('product removed from selected services array');
  }

  /**
   * pass original amount
   * Function to loop through all the percentage and absolute charges to be added in total bill
   **/

  calculateTax() {
    this.api.getAllPricing().subscribe((charge: any) => {
      console.log('these are all pricing', charge);
      let percentageCharge = 0
      let absoluteCharge = 0
      charge.forEach((el:any) => {
        if (el.enable && el.type.toLowerCase() === 'percentage') {
          percentageCharge = percentageCharge + el.value;
          this.percentageCharge = percentageCharge
        } else if (el.enable && el.type.toLowerCase() === 'absolute') {
          absoluteCharge = absoluteCharge + el.value;
          this.absoluteCharge = absoluteCharge
        }
      })

    }, (error: any) => {
      console.log('An error occurred while getting all charges', error);
    })
  }


}
