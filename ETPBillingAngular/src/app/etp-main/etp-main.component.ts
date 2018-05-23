import { Component, OnInit, ViewChild, Input, ViewContainerRef } from '@angular/core';
import { ItemLookupComponent } from '../item-lookup/item-lookup.component';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-etp-main',
  templateUrl: './etp-main.component.html',
  styleUrls: ['./etp-main.component.css']
})
export class EtpMainComponent implements OnInit {

  @ViewChild('myModal') myModal;
  // @ViewChild('childModal') public childModal: ModalDirective;
  @Input() title?: string;

  @ViewChild('childModal') childModal: ItemLookupComponent;

  productInfoObj = [];

  constructor(private viewContainerRef: ViewContainerRef, private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.productInfo.subscribe(res => {
      console.log(res);
      if (res !== undefined) {
        this.productInfoObj.push(res);
      }
    });
  }

  openModel(event) {
    // this.myModal.nativeElement.className = 'modal fade show';
    document.getElementById('openModalButton').click();
  }
  closeModel() {
    this.myModal.nativeElement.className = 'modal hide';
  }

  // show() {
  //   this.childModal.show();
  // }
  // hide() {
  //   this.childModal.hide();
  // }

}
