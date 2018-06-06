import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CommonService } from '../common.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @ViewChild('childModalPayment') public childModalPayment: ModalDirective;
  @Input() title?: string;
  objItem = [];

  url_productInfo = 'http://110.173.181.78:6040/ETPStoreServiceV5.5_REST/rest/Service/GET_PRODUCT_INFO';
  json_productInfo = './assets/data/getProductInfo.json';

  public itemNumber = '';
  name = '';
  itemType = '';
  prodGroup = '';
  salesPrice = '';
  mode;
  tmpIndex = -1;
  currentIndex = -1;
  currentItemObj = [];
  amountObj :Object;
  grossAmt;
  cashAmt;
  creditAmt;
  balanceAmt;
  received;
  cashAmount;

  constructor(private commonService: CommonService, private sharedService: SharedService) {
    this.cashAmount = 0;
   this. cashAmt=0;
  this.creditAmt=0;
  this.balanceAmt=0;
   }

  ngOnInit() {

this.mode = 'CASH';


this.sharedService.grossAmountValue.subscribe(grossAmount => {
     // this.amountObj['gross']=grossAmount;
     this.grossAmt=grossAmount;
    });
  }
  acceptCash(){
    this.cashAmt = this.cashAmount;
    this.balanceAmt = this.grossAmt - this.cashAmt - this.creditAmt;
  }
  show() {
    console.log('In show');
    console.log(this.childModalPayment);
    this.cancel();
    this.childModalPayment.show();
  }

  hide() {
    this.childModalPayment.hide();
  }

  cancel() {
  }

  selectRow(event, data, index) {
    console.log(event.type);
    this.currentIndex = index;
    this.currentItemObj = data;
  }

}
