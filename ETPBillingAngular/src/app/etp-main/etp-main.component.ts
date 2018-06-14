import { Component, OnInit, ViewChild, Input, ViewContainerRef } from '@angular/core';
import { ItemLookupComponent } from '../item-lookup/item-lookup.component';
import { CustomerLookupComponent } from '../customer-lookup/customer-lookup.component';
import { AcceleratorComponent } from '../accelerator/accelerator.component';
import { PaymentComponent } from '../payment/payment.component';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import { SharedService } from '../shared.service';
import { debug } from 'util';
import { ordeItmLineInfo } from '../Models/ordeItmLineInfo.model';
import { brDtls } from '../Models/brDtls.model';
import { brInfo } from '../Models/brInfo.model';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-etp-main',
  templateUrl: './etp-main.component.html',
  styleUrls: ['./etp-main.component.css']
})
export class EtpMainComponent implements OnInit {

  @Input() title?: string;
  @ViewChild('editQtyModal') editQtyModal: HTMLElement;
  @ViewChild('childModal') childModal: ItemLookupComponent;
  @ViewChild('childModalCust') childModalCust: CustomerLookupComponent;
  @ViewChild('childModalAccelerator') childModalAccelerator: AcceleratorComponent;
  @ViewChild('childModalPayment') childModalPayment: PaymentComponent;
  productInfoObj = [];
  public NoOfRows: Number;
  public TotalQty: Number;
  public GrossAmount: number;
  public Discount: Number;
  public editQtyNum;
  currentIndex;
  currentItemObj;
  idx = -1;
  url_promotionInfo = "http://110.173.181.78:6040/ETPStoreServiceV5.5_REST/rest/Service/GET_PROMOTION_DETAIL";

  objOrdeItmLineInfo: ordeItmLineInfo[];
  public totalChargeAmount: number;
  public taxesInfo: number;
  public discAmt: number;
  public results: brDtls;
  public itemNumber = '';

  constructor(private viewContainerRef: ViewContainerRef, private sharedService: SharedService, private commonService: CommonService) { }

  ngOnInit() {
    debugger;
    console.log(this.productInfoObj);




    this.sharedService.productInfo.subscribe(res => {
      //alert('Hello')
      console.log('whats res')
      console.log(res);
      debugger;

      if (res !== undefined && res.length !== 0) {
        console.log('Check this Aslo')
        console.log(this.productInfoObj);
        // this.productInfoObj.push(res);

        //if (res.promocode == true) { this.getPromocode(res); }//Add to get promocode

        // {
          this.getPromocode(res);
          res["totalChargeAmount"] = this.totalChargeAmount
        res["TAXAmount"] = this.taxesInfo;
        res["discountAmount"] = this.discAmt;
          let matchFound = false;
          this.productInfoObj.forEach(element1 => {

            if (res.itemNumber === element1.itemNumber) {
              matchFound = true;
              element1.quantity += 1;
            }
          });
          if (!matchFound) {
            //      alert("Hello")
            console.log(res)
            res['isQtyEditable'] = false;
            res['quantity'] = 1;
            this.productInfoObj.push(res);
          }

          console.log('Check this Aslo')
          console.log(this.productInfoObj);
          this.NoOfRows = this.productInfoObj.length;
          this.CalculateFigures();
        }
     // }
    });
  }

  CalculateFigures() {
    this.NoOfRows = this.productInfoObj.length;
    this.TotalQty = 0;
    this.productInfoObj.forEach(element => {
    this.TotalQty = this.TotalQty + element.quantity;   
  });
  
    this.GrossAmount = 0;
    let grossAm = 0
    this.productInfoObj.forEach(element => {
      let val = element.quantity * element.salesPrice;
      // alert(val)
      this.GrossAmount = this.GrossAmount + val;
      //alert(this.GrossAmount);
    });
    this.Discount = 0;

    // for (const entry of this.productInfoObj) {
    //   if (entry.salesPrice !== undefined) {

    //     this.GrossAmount += entry.salesPrice;
    //   }

    // }
    this.sharedService.setGrossAmount(this.GrossAmount);
  }

  openModel(event) {
    // this.myModal.nativeElement.className = 'modal fade show';
    document.getElementById('openModalButton').click();
  }
  closeModel() {
    //this.myModal.nativeElement.className = 'modal hide';
  }
  selectRow(event, data, index) {
    debugger;
    console.log(event.type);
    console.log(data);
    console.log(index)

    this.currentIndex = index;
    this.currentItemObj = data;

    //this.sharedService.changeProductInfo(data); //share data to accelerator
  }
  deleteSelectedObj() {
    this.productInfoObj.splice(this.currentIndex, 1);
    this.CalculateFigures();
  }
  editQty(product) {
    this.editQtyNum = product.quantity;
    this.productInfoObj.forEach(element => {
      if (element.itemNumber == product.itemNumber) {
        element['isQtyEditable'] = true;
      }
      else {
        element['isQtyEditable'] = false;
      }
    });
    //document.getElementById('exampleModal').className = 'modal fade show';
  }
  changedQty(event, product, idx) {
    let val = document.getElementById('qty' + idx);
    this.productInfoObj.forEach(element => {
      if (element.itemNumber == product.itemNumber) {
        element['quantity'] = this.editQtyNum;
      }
    });
  }
  // openModel(event) {
  //   // this.myModal.nativeElement.className = 'modal fade show';
  //   document.getElementById('openModalButton').click();
  // }
  // closeModel() {
  //   this.myModal.nativeElement.className = 'modal hide';
  // }f

  // show() {
  //   this.childModal.show();
  // }
  hide() {
    this.childModal.hide();
  }

  //Added for PromoCode
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
        this.objOrdeItmLineInfo = data.paramContainer.ordItmDtls.ordeItmLineInfo;

        // items["totalChargeAmount"] = this.calculateCharges(this.objOrdeItmLineInfo);
        // items["TAXAmount"] = this.taxInfoData(this.objOrdeItmLineInfo);
        // items["discountAmount"] = this.brInfoData(this.objOrdeItmLineInfo);
        this.totalChargeAmount = this.calculateCharges(this.objOrdeItmLineInfo);
        this.taxesInfo = this.taxInfoData(this.objOrdeItmLineInfo);
        this.discAmt = this.brInfoData(this.objOrdeItmLineInfo);
        
        this.results = this.objOrdeItmLineInfo[0].result;
        //this.CalculateFigures();
        //this.productInfoObj.push(items);

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
    return this.totalChargeAmount;
  }
  taxInfoData(objOrdeItmLineInfo) {
    this.taxesInfo = 0;
    this.objOrdeItmLineInfo.forEach(e => (
      this.taxesInfo = this.taxesInfo + e.taxesBean.taxesInfo.TAXAmount))
    return this.taxesInfo;
  }
  brInfoData(objOrdeItmLineInfo) {
    this.discAmt = 0;
    for (let objInfo of this.objOrdeItmLineInfo) {
      if (objInfo != undefined && objInfo.result != undefined) {
        for (let ObjectInfoItems of objInfo.result.brDtls) {
          if (ObjectInfoItems.Type == 1) {
            this.discAmt = ObjectInfoItems.DiscAmt;
          }
          else {
            this.discAmt = ObjectInfoItems.DiscPercentage;
          }
        }
      }
    }
    return this.discAmt;
  }

}
