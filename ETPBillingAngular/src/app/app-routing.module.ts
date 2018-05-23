import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EtpMainComponent } from './etp-main/etp-main.component';

const routes: Routes = [
  // { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'index', component: EtpMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
