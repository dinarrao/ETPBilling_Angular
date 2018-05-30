import { Component, OnInit, ViewChild, Input, ViewContainerRef } from '@angular/core';
import * as $ from 'jquery';
import { ItemLookupComponent } from '../app/item-lookup/item-lookup.component';
import { CustomerLookupComponent } from '../app/customer-lookup/customer-lookup.component';
import { CustomerCreationComponent } from '../app/customer-creation/customer-creation.component';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import { SharedService } from '../app/shared.service';
import { debug } from 'util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  @ViewChild('childModal') childModal: ItemLookupComponent;
  @ViewChild('childModalCust') childModalCust: CustomerLookupComponent;
  @ViewChild('childModalCustCreate') childModalCustCreate: CustomerCreationComponent;
  
  constructor() {
    // alert('Hiiii');
  }

  sidebarCollapseClick(): void {
    //event.preventDefault();
    $('#sidebar').toggleClass('active');
    $('#content').addClass('active');
   
  }
}
