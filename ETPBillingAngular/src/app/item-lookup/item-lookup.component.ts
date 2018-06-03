import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CommonService } from '../common.service';
import { SharedService } from '../shared.service';
import { itemModel } from '../Models/item.model';


@Component({
  selector: 'app-item-lookup',
  templateUrl: './item-lookup.component.html',
  styleUrls: ['./item-lookup.component.css']
})
export class ItemLookupComponent implements OnInit {

  @ViewChild('childModal') public childModal: ModalDirective;
  @Input() title?: string;
  //objItem = [];
  objItem: itemModel[] = [];
  url_productInfo = 'http://110.173.181.78:6040/ETPStoreServiceV5.5_REST/rest/Service/GET_PRODUCT_INFO';
  json_productInfo = './assets/data/getProductInfo.json';

  public itemNumber = '';
  name = '';
  itemType = '';
  prodGroup = '';
  salesPrice = '';

  tmpIndex = -1;
  currentIndex = -1;
  currentItemObj = [];

  constructor(private commonService: CommonService, private sharedService: SharedService) { }

  ngOnInit() {

  }

  show() {
    console.log('In show');
    console.log(this.childModal);
    this.cancel();
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

    this.tmpIndex = -1;
    this.currentIndex = -1;
    this.currentItemObj = [];
  }

  searchProduct() {
    // console.log(this.itemNumber);

    // //// To be used in DEV environment with JSON file. Comment when using real API
    // this.commonService.getJSON(this.json_productInfo)
    //   .subscribe(data => {
    //     console.log('Response data from JSON');
    //     console.log(data);
    //     console.log(data[0].productInfo);
    //     this.objItem = data[0].productInfo;
    //   });
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

    console.log('Request for GET_PRODUCT_INFO service');
    console.log(body);

    // To be used with real API

    this.commonService.Get_item_Data_Server(this.url_productInfo, body)
      .subscribe(data => {
        console.log('Response from GET_PRODUCT_INFO service');
        console.log(data);
        this.objItem = data.productInfo;
        console.log(this.objItem);
      });
  }

  selectData(event, data) {
    // Call shared service to pass product data to Billing screen
    console.log(event.type);
    console.log(data);

    if (event.type === 'dblclick') {
      this.sharedService.changeProductInfo(data);
    } else if (event.type === 'click') {
      console.log(this.currentItemObj);
      this.sharedService.changeProductInfo(this.currentItemObj);
    }

    this.hide();
  }

  selectRow(event, data, index) {
    console.log(event.type);
    this.currentIndex = index;
    this.currentItemObj = data;
  }

}
