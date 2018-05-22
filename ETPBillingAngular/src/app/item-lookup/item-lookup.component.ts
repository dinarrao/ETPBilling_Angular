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
  objItem;

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.getJSON()
      .subscribe(data => {
        console.log(data);
        console.log(data[0].productInfo[0]);
        this.objItem = data;
      });

  }

  show() {
    console.log('In show');
    console.log(this.childModal);
    this.childModal.show();
  }
  hide() {
    this.childModal.hide();
  }

}
