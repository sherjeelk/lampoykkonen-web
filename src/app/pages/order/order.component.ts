import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {DataShareService} from "../../services/data-share.service";
import {UtilService} from "../../services/util.service";
import {MatDialog} from "@angular/material/dialog";
import {TermsconditionsComponent} from "../../termsconditions/termsconditions.component";
import {TranslationService} from "../../services/translation.service";
import * as _ from 'lodash';
import {AppConstants} from "../../AppConstants";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderSubmit: FormGroup;
  public cancel = false;
  public acceptTerm = false;
  orderData: any;
  public couponInput = false;
  public slotsfalse: any;
  readButton = false;
  private body: any;
  applied = false;

  constructor(public dialog: MatDialog, public translation: TranslationService, private util: UtilService, private fb: FormBuilder, private apiService: ApiService, private router: Router, public dataShare: DataShareService) {
    this.orderSubmit = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^.+@[^\\.].*\\.[a-z]{2,}$')]],
      streetBuilding: ['', [Validators.required, Validators.minLength(5)]],
      postcode: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      city: ['', Validators.required],
      anyNote: ['', Validators.required],
      coupon: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    if (this.orderSubmit.valid) {
      let prod = this.dataShare.products.concat(this.dataShare.customService);
      prod = _.map(prod, item => {
        if (item.image) {
          item.image = AppConstants.BASE_URL + item.image.url;
        }

        return item;
      });
      console.log('form value', this.orderSubmit.value);
      const body = {
        f_name: this.orderSubmit.value.firstName,
        l_name: this.orderSubmit.value.lastName,
        phone: this.orderSubmit.value.phone,
        email: this.orderSubmit.value.email,
        address: this.orderSubmit.value.streetBuilding,
        postcode: this.orderSubmit.value.postcode,
        city: this.orderSubmit.value.city,
        note: this.orderSubmit.value.anyNote,
        service: this.dataShare.selectedServiceValue.name,
        heatedSpaceSize: this.dataShare.spaceHeatedValue,
        deviceRequirement: this.dataShare.deviceSelectedValue,
        airFiltration: this.dataShare.filterSelectedValue,
        product: prod,
        size: this.dataShare.sizeValue,
        contactPhone: this.dataShare.scheduleContactForm.phone,
        contactEmail: this.dataShare.scheduleContactForm.email,
        contactDate: this.dataShare.contactMe ? this.dataShare.scheduleContactForm.date : undefined,
        contactTime: this.dataShare.scheduleContactForm.time,
        startTime: this.dataShare.contactMe ? undefined : this.dataShare.getTime(this.dataShare.slotsSelected.start),
        endTime: this.dataShare.contactMe ? undefined : this.dataShare.getTime(this.dataShare.slotsSelected.end),
        slotId: this.dataShare.contactMe ? '' : this.dataShare.slotsSelected.id.toString(),
        total: this.dataShare.totalPrice,
        startDate: this.dataShare.startDate,
        contactMe: this.dataShare.contactMe,
      }
      console.log('slot id', body.slotId);


      console.log('This is body', body);

      //post order here
      this.apiService.order(body).subscribe(data => {
        this.orderData = data;
        console.log('form data has been submitted', data);
        this.router.navigateByUrl('/pages/order-success');
        //call api to make slots unavailable
        const slotBody = {
          available: false,
          booking: data.order.id,
          username: data.order.f_name + ' ' + data.order.l_name
        };
        if (!this.dataShare.contactMe) {
          // this.apiService.updateSlot(slotBody, this.dataShare.slotsSelected.id).subscribe(data => {
          //   this.slotsfalse = data;
          //   console.log('booked slot false successfully', this.slotsfalse);
          // }, error => {
          //   console.log('An error occurred', error);
          //   this.translation.getLang() === 'en' ? this.util.presentSnackBar('An error occurred while placing your order') : this.util.presentSnackBar('Tilausta tehdessä tapahtui virhe')
          // });
        }

        // this.router.navigateByUrl('/pages/order-success');

      }, error => {
        this.translation.getLang() === 'en' ? this.util.presentSnackBar('Data not submitted') : this.util.presentSnackBar('Tietoja ei toimitettu')
        console.log('data not submitted');
      });
    } else {
      console.log('bhai form bhar');

    }
  }

  acceptTerms($event: MatCheckboxChange) {
    this.acceptTerm = $event.checked;
    console.log('checked accept Terms', this.acceptTerm);
  }

  cancelPolicy($event: MatCheckboxChange) {
    this.cancel = $event.checked;
    console.log('checked Cancel ', this.cancel);
  }

  onSearchChange(value: any) {
    if (value.value.length === 5) {
      console.log('this is value of postcode', value.value);
      this.getPostCode(value.value);
    }

  }

  discountInput($event: any) {
    console.log('event vale', $event);
    this.couponInput = !!$event.checked;

  }

  applyCoupon(coupon: any) {
    this.dataShare.calculateTotal();
    const originalPrice = (100 * ((this.dataShare.totalPrice - this.dataShare.absoluteCharge) / (100 + this.dataShare.percentageCharge)))

    console.log(this.dataShare.coupon);
    // if (this.dataShare.coupon) {
    const body = {
      coupon: coupon.value,
      total: originalPrice
    }
       this.dataShare.couponValue = coupon.value;
        // this.dataShare.coupon = this.dataShare.coupon.value;
    this.apiService.discountCoupon(body).subscribe(data => {
        data.couponValue = coupon.value;
        this.dataShare.couponBody = data;
        console.log('this coupon is applied',  data.couponValue);
        console.log('asdasdasfasfasf', this.dataShare.couponBody);
        if (data.status === 0) {
          this.util.presentSnackBar(this.translation.getLang() === 'en'? 'Coupon Not Found' : 'Kuponkia ei löydy');
          this.dataShare.couponValue = '';

        } else if(data.status === 3) {
          this.util.presentSnackBar(this.translation.getLang() === 'en'? 'Offer Not Valid' : 'Tarjous ei ole voimassa');
        } else{
          this.dataShare.applyCoupon(this.dataShare.couponBody.discount);
          console.log('coupon value applied', data);
          this.util.presentSnackBar('Your coupon value has been applied successfully', 1000);
          this.applied = true;
          this.readButton = true;
          this.util.presentSnackBar(this.translation.getLang() === 'en'? 'Your coupon value has been applied successfully' : 'Kupongin arvo on käytetty onnistuneesti');
        }

      }, error => {
        console.log(error.message);
        this.util.presentSnackBar(error.message, 1000);
      }
    )
    coupon.value = '';
  }

  openDialog() {
    console.log('open dialog');
    const dialogRef = this.dialog.open(TermsconditionsComponent, {
      width: '600px',
      height: '600px'
    });
  }


  private getPostCode(postCode: any) {

    this.apiService.getPostCode(postCode).subscribe(data => {
      if (data.length > 0) {
        // this.postcodeError = false;
        this.orderSubmit.get('city')!.patchValue(this.util.titleCase(data[0].name));
      } else {
        // this.postcodeError = true;
        // this.customerDetailForm.get('city').setErrors({incorrect: true});
        this.orderSubmit.get('city')!.patchValue('');

        this.util.presentSnackBar(this.translation.getLang() === 'en'? 'Sorry, the ordering system is not yet available in the region you selected' : 'Valitettavasti tilausjärjestelmä ei toimi valitsemallasi alueella vielä');
      }
    });
  }

  removeCoupon(coupon: HTMLInputElement) {
    this.dataShare.calculateTotal();
    this.applied = false;
    this.readButton = false;
    this.dataShare.couponValue = '';



  }
}
