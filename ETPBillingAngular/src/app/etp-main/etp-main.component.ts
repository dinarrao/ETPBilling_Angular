import { Component, OnInit, ViewChild, Input, ViewContainerRef } from '@angular/core';
import { ItemLookupComponent } from '../item-lookup/item-lookup.component';
import { CustomerLookupComponent } from '../customer-lookup/customer-lookup.component';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import { SharedService } from '../shared.service';
import { debug } from 'util';

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

  productInfoObj = [];
  public NoOfRows: Number;
  public TotalQty: Number;
  public GrossAmount: number;
  public Discount: Number;
  public editQtyNum;
  currentIndex;
  currentItemObj;
  idx = -1;

  constructor(private viewContainerRef: ViewContainerRef, private sharedService: SharedService) { }

  ngOnInit() {
    console.log(this.productInfoObj);

    this.sharedService.productInfo.subscribe(res => {
      //alert('Hello')
      console.log('whats res')
      console.log(res);
      
      if (res !== undefined && res.length !== 0) {
        console.log('Check this Aslo')
        console.log(this.productInfoObj);
        // this.productInfoObj.push(res);
        
          let matchFound = false;
          this.productInfoObj.forEach(element1 => {
            
            if(res.itemNumber === element1.itemNumber){
              matchFound = true;
              element1.quantity+=1;
            }
          });
          if(!matchFound){
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
  }

  openModel(event) {
    // this.myModal.nativeElement.className = 'modal fade show';
    document.getElementById('openModalButton').click();
  }
  closeModel() {
    //this.myModal.nativeElement.className = 'modal hide';
  }
  selectRow(event, data, index) {
    console.log(event.type);
    console.log(data);
    console.log(index)
    
    this.currentIndex = index;
    this.currentItemObj = data;
  }
  deleteSelectedObj(){
    this.productInfoObj.splice(this.currentIndex,1);
    this.CalculateFigures();
  }
  editQty(product){
    this.editQtyNum = product.quantity;
    this.productInfoObj.forEach(element => {
      if(element.itemNumber == product.itemNumber){
        element['isQtyEditable'] = true;
      }
      else{
        element['isQtyEditable'] = false;
      }
    });
    //document.getElementById('exampleModal').className = 'modal fade show';
  }
  changedQty(event,product,idx){
    let val = document.getElementById('qty'+idx);
    this.productInfoObj.forEach(element => {
      if(element.itemNumber == product.itemNumber){
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
  // }

  // show() {
  //   this.childModal.show();
  // }
  // hide() {
  //   this.childModal.hide();
  // }

}
