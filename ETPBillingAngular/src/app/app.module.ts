import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { EtpMainComponent } from './etp-main/etp-main.component';
import { ItemLookupComponent } from './item-lookup/item-lookup.component';
import { CustomerLookupComponent } from './customer-lookup/customer-lookup.component';
import { CustomerCreationComponent } from './customer-creation/customer-creation.component';
import { AcceleratorComponent } from './accelerator/accelerator.component';
import { PaymentComponent } from './payment/payment.component';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import { CommonService } from './common.service';
import { SharedService } from './shared.service';
import { DataService } from './data.service';
import { ClassUtils } from './ClassUtils';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EtpMainComponent,
    ItemLookupComponent,
    CustomerLookupComponent,
    CustomerCreationComponent,
    AcceleratorComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    CommonService,
    SharedService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
