import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CommonService } from '../common.service';
import { ClassUtils } from '../ClassUtils';
@Component({
  selector: 'app-customer-creation',
  templateUrl: './customer-creation.component.html',
  styleUrls: ['./customer-creation.component.css']
})
export class CustomerCreationComponent implements OnInit {

  @ViewChild('childModalCustCreate') public childModalCustCreate: ModalDirective;
  @Input() title?: string;
  objItem = [];
  json_customerInfo = './assets/data/getCustomerInfo.json';  // To be replaced by getCustomerInfo.json

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.getJSON(this.json_customerInfo)
      .subscribe(data => {
        console.log(data[0]);
        if (data[0].customerInfo !== undefined) {
          console.log(data[0].customerInfo);
          this.objItem = data;
        }
      });

  }
  save = function (ev: Event) {

    var isproblem = false;

    if (!ClassUtils.ValidateNonEmpty($("#txtname")))
      isproblem = true;
      if (!ClassUtils.ValidateNonEmpty($("#txtemail")))
      isproblem = true;
      if (!ClassUtils.ValidateNonEmpty($("#txtmobileno")))
      isproblem = true;

    if (!ClassUtils.ValidateNonEmpty($("#txtaddress")))
      isproblem = true;

    if (isproblem)
      return;

  };

  validateNonEmpty(obj: Object) {
    ClassUtils.ValidateNonEmpty($(obj));
  };
  show() {
    console.log('In show');
    console.log(this.childModalCustCreate);
    this.childModalCustCreate.show();
  }
  hide() {
    this.childModalCustCreate.hide();
  }

  searchCustomer() {
    
  }

}
