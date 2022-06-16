import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Service} from "../models/Service";
import {AppConstants} from "../AppConstants";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public getAllService(): Observable<Service[]> {
    return this.http.get<Service[]>(AppConstants.API.All_SERVICES);
  }
  public getAllPricing(): Observable<any[]> {
    return this.http.get<any[]>(AppConstants.API.All_PRICING);
  }

  public getAllProducts(type: string, min: number, max: number, deviceType: any): Observable<any[]> {
    return this.http.get<any[]>(AppConstants.API.All_PRODUCTS + '?type=' + type +
      '&minArea_gte=' + min + '&maxArea_lte=' + max + '&deviceType=' + deviceType);
  }

  public order(body: any): Observable<any> {
    return this.http.post<any>(AppConstants.API.Order, body);
  }

  public getSlots(): Observable<any[]> {
    return this.http.get<any[]>(AppConstants.API.SLOTS + '?available=true&key=' + AppConstants.COMPANY_KEY);
  }

  getPostCode(postCode: any): Observable<any> {
    return this.http.get(AppConstants.API.POSTCODE + `?postcode=${postCode}`);
  }

  public updateSlot(body: any, id: any): Observable<any> {
    return this.http.put<any>(AppConstants.API.BOOK_SLOT + id + AppConstants.COMPANY_KEY, body);
  }

  public discountCoupon(body: any): Observable<any> {
    return this.http.post<any>(AppConstants.API.COUPON, body);
  }


}
