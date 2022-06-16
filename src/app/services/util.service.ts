import {Injectable} from '@angular/core';
import {AppConstants} from "../AppConstants";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public BASE_URL = AppConstants.BASE_URL;
  private language = {};
  public lang = 1;

  constructor(private snackBar: MatSnackBar) { }
  public titleCase(text: any): string {
    return text.replace(/\w\S*/g,  (txt: any) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
  public presentSnackBar(msg: string, duration = 5000): void {
    this.snackBar.open(msg, 'ok', {duration});
  }

  public getIndianDate(date: any): string{
    return moment(date).format('DD-MM-YYYY')
  }
  public getDayName(date:any) {

    let splitted = date.split(" ", 2);
    if ('Monday' === splitted[0]) {
       return {day:  splitted[0] , time:  splitted[1]
       };
    } else if ('Tuesday' === splitted[0]) {
      return {day:  splitted[0] , time:  splitted[1]};
    }else if ('Wednesday' === splitted[0]) {
      return {day:  splitted[0] , time:  splitted[1]};
    }else if ('Thursday' === splitted[0]) {
      return {day:  splitted[0] , time:  splitted[1]};
    }else if ('Friday' === splitted[0]) {
      return {day:  splitted[0] , time:  splitted[1]};
    }else if ('Saturday' === splitted[0]) {
      return {day:  splitted[0] , time:  splitted[1]};
    }else if ('Sunday' === splitted[0]) {
      return {day:  splitted[0] , time:  splitted[1]};
    }
    return {day: '', time: ''}
  }

}
