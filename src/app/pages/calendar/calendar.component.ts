import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {TooltipPosition} from "@angular/material/tooltip";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {DataShareService} from "../../services/data-share.service";
import {ApiService} from "../../services/api.service";
import * as _ from 'lodash'
import * as moment from 'moment';
import {InfoDialogComponent} from "../../info-dialog/info-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FaqComponentComponent} from "../../faq-component/faq-component.component";
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective | undefined;

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  contactForm = false;
  ContactUs: FormGroup;
  daysRequired = 6;
  public timeSlot: any[] = [];
  private slots: any = [];
  currentDate: any = moment();
  ready = false;
  hideCal = false;


  constructor(public dialog: MatDialog,private fb: FormBuilder, public dataShare: DataShareService, private apiService: ApiService, private change: ChangeDetectorRef,public util: UtilService) {
    this.ContactUs = this.fb.group({
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
          });
  }


  ngOnInit(): void {

      this.getSlots();
    // console.log('slots upcoming', this.getSlots());
  }
  clockTheme = {
    container: {
      bodyBackgroundColor: '#fafafa',
      buttonColor: '#e50000'
    },
    dial: {
      dialActiveColor: '#fff',
      dialBackgroundColor: '#e50000'
    },
    clockFace: {
      clockFaceBackgroundColor: '#f0f0f0',
      clockHandColor: '#e50000',
      clockFaceTimeInactiveColor: '#e50000'
    }
  };

  onSubmit() {
    this.dataShare.scheduleContactForm = this.ContactUs.value;
    console.log('form ki details', this.dataShare.scheduleContactForm);

  }

  public getSlots() {
    this.apiService.getSlots().subscribe(data => {

      console.log('contact div value is true now', this.dataShare.contactDiv);
      const grouped = _.chain(data).groupBy('date').map((value, key) => ({date: key, slots: value})).value();
      this.slots = grouped;
      for (const slot of this.slots) {
        slot.mDate = moment(slot.date);
        slot.date = moment(slot.date).format('dddd') + ' ' + moment(slot.date).format('DD.MM');
        for (const mSlot of slot.slots) {
          mSlot.label = moment(mSlot.start).format('HH:mm');
        }
      }
      console.log('these are slots', grouped);
     this.getNextSlots(moment().startOf('day'), false)


    })
  }

  moveNextTab(): void {
    console.log('contact form data value', this.ContactUs.value);
    if (this.ContactUs.valid || this.dataShare.contactMe) {
      this.dataShare.contactMe = true;
      this.onSubmit();
      this.dataShare.index = 1;
      this.dataShare.step.calendar = true;
      setTimeout(() => {
        this.dataShare.index = 2;
      }, 30);

    } else {
      console.log('bhai contact ki details fill kar de');
    }
  }

  /**
   * Get next or previous slots
   * @param startDate Start date which you want to use for starting the slots
   * @param reverse Reverse is the flag which is use to run backward
   */
  getNextSlots(startDate: any, reverse: boolean): void {
    const mStart = startDate.clone();
    if (reverse) {
      mStart.subtract(6, 'days');
    }
    this.timeSlot = [];
    for (let i = 0; i <= this.daysRequired; i++) {
      const cur = mStart.clone().add(i, 'days').startOf('day');
      this.timeSlot.push({
        day: cur.format('dddd') + ' ' + cur.format('DD.MM'),
        date: cur,
        slots: this.isSlotExists(cur),
      });
    }
    this.ready = true;
  }


  private isSlotExists(date: any) {
    for (const item of this.slots) {
      if (date.isSame(item.mDate, 'day')) {
        return item.slots;
      }
    }
    return [];
  }

  getSlotValue(item: any) {
    console.log('slot value', item);
    this.dataShare.slotsSelected = item;
    this.dataShare.contactMe = false;
    console.log('contact Me value is false now', this.dataShare.contactMe);
    console.log('slot seletected date', this.dataShare.slotsSelected.date);
    console.log('slot value is selected', moment(this.dataShare.slotsSelected.start).format('hh:mm'));
    console.log('slot value is selected', moment(this.dataShare.slotsSelected.end).format('hh:mm'));
  }

  startdateSelection($event: any) {
    this.dataShare.startDate = $event.checked;
    console.log($event.checked);

    if ($event.checked) {
      this.hideCal = true;
      console.log('if block is executed');
    } else if (!$event.checked) {
      this.hideCal = false;
      console.log('false')
    }
  }

  continueCalendar() {
    const valid = this.dataShare.slotsSelected ;
    console.log('start date selected', this.dataShare.startDate);
    console.log('slots selected value', this.dataShare.slotsSelected);
    if (valid) {
      this.dataShare.index = 1;
      this.dataShare.step.calendar = true;
      setTimeout(() => {
        this.dataShare.index = 2;
      }, 30);
    } else {
      console.log('correct form details of calendar');
    }


  }

  openContactForm() {
    this.contactForm = !this.contactForm

    // this.ContactUs.get('phone')?.setErrors(null);
    // this.ContactUs.get('email')?.setErrors(null);
    // this.ContactUs.get('date')?.setErrors(null);
    // this.ContactUs.get('time')?.setErrors(null);

  }

  openDialog() {
    const dialogRef = this.dialog.open(FaqComponentComponent, {
      width: '1000px',
      maxHeight: '70vh',
      // panelClass: 'scroll',
      // data: item
    });
  }
}
