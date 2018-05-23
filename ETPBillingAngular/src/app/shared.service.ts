import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private productInfoObj = new BehaviorSubject<any>([]);
  productInfo = this.productInfoObj.asObservable();

  constructor() { }

  changeProductInfo(productInfo) {
    this.productInfoObj.next(productInfo);
  }
}
