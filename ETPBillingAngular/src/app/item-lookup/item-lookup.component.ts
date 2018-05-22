import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-item-lookup',
  templateUrl: './item-lookup.component.html',
  styleUrls: ['./item-lookup.component.css']
})
export class ItemLookupComponent implements OnInit {

  @ViewChild('childModal') public childModal: ModalDirective;
  @Input() title?: string;
  objItem = [];

  url_productInfo = 'http://110.173.181.78:6040/ETPStoreServiceV5.5_REST/rest/Service/GET_PRODUCT_INFO';
  json_productInfo = './assets/data/getProductInfo.json';

  public itemNumber = '';
  name = '';
  itemType = '';
  prodGroup = '';
  salesPrice = '';

  constructor(private commonService: CommonService) { }

  ngOnInit() {

  }

  show() {
    console.log('In show');
    console.log(this.childModal);
    this.childModal.show();
  }

  hide() {
    this.childModal.hide();
  }

  cancel() {
    this.itemNumber = '';
    this.name = '';
    this.itemType = '';
    this.prodGroup = '';
    this.salesPrice = '';

    this.objItem = [];
  }

  searchProduct() {
    // console.log(this.itemNumber);

    //// To be used in DEV environment with JSON file. Comment when using real API
    this.commonService.getJSON(this.json_productInfo)
      .subscribe(data => {
        console.log('Response data from JSON');
        console.log(data);
        console.log(data[0].productInfo);
        this.objItem = data[0].productInfo;
      });
    //// end

    let body = {
      "companyInfo": {
        "counterNumber": 1,
        "companyID": "999",
        "division": "888",
        "warehouse": "US01"
      },
      "productInputInfo": {
        "itemDescription": this.itemType,
        "itemNumber": this.itemNumber,
        "itemName": this.name,
        "itemGroup": this.prodGroup,
        "aliasNumber": "",
        "inputParameter": ""
      },
      "messageInfo": {

      },
      "requestInfo": {
        "requestKey": "UNpMbqpWd0wIdNuNBugWmVlUnMNvwTPobwvZcXFXZZ2WXiIdWKSRsnGVTpi0dsAB"
      }
    };

    // console.log('Request for GET_PRODUCT_INFO service');
    // console.log(body);

    //// To be used with real API

    // this.commonService.postURL(this.url_productInfo, body)
    //   .subscribe(data => {
    //     console.log('Response from GET_PRODUCT_INFO service');
    //     console.log(data);
    //     this.objItem = data[0].productInfo;
    //   });
  }

  selectData() {
    // Call shared service to pass product data to Billing screen
  }

}
