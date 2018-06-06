import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private productInfoObj = new BehaviorSubject<any>([]);
  productInfo = this.productInfoObj.asObservable();

  private grossAmount = new BehaviorSubject<any>([]);
  grossAmountValue = this.grossAmount.asObservable();

  constructor() { }

  changeProductInfo(productInfo) {
    this.productInfoObj.next(productInfo);
  }

  setGrossAmount(value){
    this.grossAmount.next(value);
  }
  // getGrossAmount(){
  //    return this.grossAmount.getValue();
  // }

}
