import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-customer-lookup',
  templateUrl: './customer-lookup.component.html',
  styleUrls: ['./customer-lookup.component.css']
})
export class CustomerLookupComponent implements OnInit {

  @ViewChild('childModalCust') public childModalCust: ModalDirective;
  @Input() title?: string;
  objItem;
  json_customerInfo = './assets/data/getProductInfo.json';  // To be replaced by getCustomerInfo.json

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.getJSON(this.json_customerInfo)
      .subscribe(data => {
        console.log(data);
        console.log(data[0].productInfo[0]);
        this.objItem = data;
      });

  }

  show() {
    console.log('In show');
    console.log(this.childModalCust);
    this.childModalCust.show();
  }
  hide() {
    this.childModalCust.hide();
  }

}
