import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { EtpMainComponent } from './etp-main/etp-main.component';
import { ItemLookupComponent } from './item-lookup/item-lookup.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import { CommonService } from './common.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EtpMainComponent,
    ItemLookupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
