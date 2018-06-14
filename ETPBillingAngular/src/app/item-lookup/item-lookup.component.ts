import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CommonService } from '../common.service';
import { SharedService } from '../shared.service';
import { itemModel } from '../Models/item.model';
import { ordeItmLineInfo } from '../Models/ordeItmLineInfo.model';
import { brDtls } from '../Models/brDtls.model';
import { brInfo } from '../Models/brInfo.model';

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
  //url for promotion details
  url_promotionInfo = "http://110.173.181.78:6040/ETPStoreServiceV5.5_REST/rest/Service/GET_PROMOTION_DETAIL";

  objOrdeItmLineInfo: ordeItmLineInfo[];
  public totalChargeAmount: number;
  public taxesInfo: number;
  public discAmt: number;
  public results: brDtls;
  public itemNumber = '';

  name = '';
  itemType = '';
  prodGroup = '';
  salesPrice = '';

  tmpIndex = -1;
  currentIndex = -1;
  currentItemObj = [];

  constructor(private commonService: CommonService, private sharedService: SharedService) {

  }

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
      //       brinfolst :brInfo[];

      //      // type MyArrayType = Array<{id: number, text: string}>;

      //   brinfolst  = [ {BRID:1,BRNm:  'Sentence 2',SP:3}, 
      //  {BRID:2,BRNm:  'Sentence 2',SP:2},
      //  {BRID:3,BRNm:  'Sentence 5',SP: 3}

      // ];


      // this.getPromocode(data);

      data["promocode"] = true;
      //data[""]
      //       
      //       let txtinfo:number;
      //       txtinfo=this.taxesInfo;
      //      let objItemModel = new itemModel;
      //      objItemModel.discountAmount= 50;
      //      
      //      objItemModel.brDtls=null;//this.results.brDtls;
      //       objItemModel.totalChargeAmount= 10;//this.totalChargeAmount;
      //       objItemModel.TAXAmount= 20;
      //      objItemModel.itemName=data.itemName;
      //      objItemModel.HSNCode =  data.HSNCode;
      //      objItemModel.UOM= data.UOM;
      //      objItemModel.balance=data.balance;
      // objItemModel.imageFileName= data.imageFileName;
      // objItemModel.itemDescription= data.itemDescription;
      // objItemModel.itemNumber= data.itemNumber;
      // objItemModel.salesPrice= data.salesPrice; 
      // objItemModel.productGroup= data.productGroup;   
      // objItemModel.location= data.location;

      //promo functinality code should be do
      alert(data);
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

  getPromocode(items) {
    let body = {
      "billProcStatus": "N",
      "eventCode": "2",
      "itemSeach": "N",
      "paramContainer": {
        "cmpnyInfo": {
          "CmpnyID": "999",
          "CntNo": "1",
          "Div": "888",
          "Wh": "US01"
        },
        "custInfo": {
          "CustId": "WALK-IN",
          "CustNm": "WALKIN"
        },
        "ordHdr": {
          "CCAmt": [],
          "InvGrsAmt": "1060",
          "InvHdrDiscAmt": [],
          "InvTtlAmt": "1060",
          "taxFlag": "Collect"
        },
        "ordItmDtls": {
          "ordeItmLineInfo": {
            "balance": items.balance,
            "businessArea": [],
            "configCode": "0",
            "discFlg": "0",
            "discountGroupItem": [],
            "distrGrpTech": [],
            "envGrp": [],
            "ff1": [],
            "ff2": [],
            "ff3": [],
            "ff4": [],
            "ff5": [],
            "hierarchyID": [],
            "itemDescription": items.itemDescription,
            "itemGrp": [],
            "itemName": items.itemName,
            "itemNo": items.itemNumber,
            "itemTotalDiscAmt": "0.0",
            "itemType": [],
            "itmLineNo": "1",
            "lineAmt": "1060.0",
            "lineAmtAftrDisc": "0.0",
            "lineEditFlag": "0",
            "lineQty": "1.0",
            "location": items.location,
            "lotNo": [],
            "procGrp": [],
            "prodGroup": items.productGroup,
            "sp": items.salesPrice,
            "salesCampaign": "0",
            "styleNo": [],
            "tranType": [],
            "uom": items.UOM
          }
        },
        "pagecount": "0",
        "paymentDtls": [],
        "promotionExecutionID": "0",
        "totalPageCount": "0",
        "userInfo": {
          "boddate": "28/02/2018",
          "loginName": "SUPERADMIN",
          "shiftNo": "1",
          "userName": "Admin User"
        }
      },
      "promotionExecutionID": "0",
      "requestInfo": {
        "requestKey": "UNpMbqpWd0wIdNuNBugWmVlUnMNvwTPobwvZcXFXZZ2WXiIdWKSRsnGVTpi0dsAB"
      },
      "updHeaderChargeFlag": "N",
      "updHeaderDisc": "N",
      "updPromoFlag": "N"

    };

    this.commonService.Get_ordeItmLineInfo_Data_Server(this.url_promotionInfo, body)
      // .map((res:Response) => res.json())
      .subscribe(data => {
        // setTimeout(()=>{
        console.log('Response from GET_PRODUCT_INFO service');
        console.log(data);

        alert(data);
        // console.log(data.paramContainer.ordItmDtls.ordeItmLineInfo);
        //this.objOrdeItmLineInfo =  data.paramContainer.ordItmDtls.ordeItmLineInfo;

        //  this.calculateCharges(this.objOrdeItmLineInfo);
        //  this.taxInfoData(this.objOrdeItmLineInfo);
        // this.brInfoData(this.objOrdeItmLineInfo);
        //   this.results=  this.objOrdeItmLineInfo[0].result;
        // }
        //, 10000)

      });
    // this.objItem = data.paramContainer.ordItmDtls.ordeItmLineInfo;
    console.log(this.objOrdeItmLineInfo);

  }

  calculateCharges(objOrdeItmLineInfo) {
    this.totalChargeAmount = 0;
    this.objOrdeItmLineInfo.forEach(x => (x.chargeDetails != undefined)
      && x.chargeDetails.forEach(x =>
        this.totalChargeAmount = this.totalChargeAmount + x.amount)

    );

  }
  taxInfoData(objOrdeItmLineInfo) {
    this.taxesInfo = 0;
    this.objOrdeItmLineInfo.forEach(e => (
      this.taxesInfo = this.taxesInfo + e.taxesBean.taxesInfo.TAXAmount))
    alert(this.taxesInfo);
  }
  brInfoData(objOrdeItmLineInfo) {
    this.discAmt = 0;
    for (let objInfo of this.objOrdeItmLineInfo) {
      if (objInfo != undefined && objInfo.result != undefined) {
        for (let ObjectInfoItems of objInfo.result.brDtls) {
          if (ObjectInfoItems.Type == 1) { this.discAmt = ObjectInfoItems.DiscAmt; }
          else { this.discAmt = ObjectInfoItems.DiscPercentage; }
          alert(this.discAmt);
        }
      }
    }
  }
  //if(this.objOrdeItmLineInfo.forEach(e=>e.result !=undefined && this.results=e.resultult ) 
  // for(let results of this.objOrdeItmLineInfo )
  // {    for(let brDtls of results )
  //     {
  //       if(brDtls.Type==1)
  //       {  this.discAmt= brDtls.DiscAmt;}
  //       else{ this.discAmt= brDtls.DiscPercentage;}
  //      alert(this.discAmt);   
  //     }
  //   }   


}



