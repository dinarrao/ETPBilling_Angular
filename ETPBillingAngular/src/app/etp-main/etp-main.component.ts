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

  @ViewChild('childModal') childModal: ItemLookupComponent;
  @ViewChild('childModalCust') childModalCust: CustomerLookupComponent;

  productInfoObj = [];
  public NoOfRows: Number;
  public TotalQty: Number;
  public GrossAmount: Number;
  public Discount: Number;

  idx = -1;

  constructor(private viewContainerRef: ViewContainerRef, private sharedService: SharedService) { }

  ngOnInit() {
    console.log(this.productInfoObj);

    this.sharedService.productInfo.subscribe(res => {
      console.log(res);

      if (res !== undefined) {
        this.productInfoObj.push(res);
        this.NoOfRows = this.productInfoObj.length;
        this.CalculateFigures();
      }

    });
  }

  CalculateFigures() {
    this.NoOfRows = this.productInfoObj.length;
    this.TotalQty = this.productInfoObj.length;
    this.GrossAmount = 0;
    this.Discount = 0;

    for (const entry of this.productInfoObj) {
      if (entry.salesPrice !== undefined) {

        this.GrossAmount += entry.salesPrice;
      }

    }
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
