import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ClassUtils } from '../ClassUtils';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public _Data: Boolean;

  constructor(private _DataService: DataService, private router: Router) {


  }

  ngOnInit() {
  }


  authencateMe = function (ev: Event) {

    var isproblem = false;

    if (!ClassUtils.ValidateNonEmpty($("#txtusername")))
      isproblem = true;
    if (!ClassUtils.ValidateNonEmpty($("#txtpassword")))
      isproblem = true;

    if (isproblem)
      return;

    var username = $("#txtusername").val();
    var password = $("#txtpassword").val();

    this.authenticate_User_Server(username, password);

  };

  validateNonEmpty(obj: Object) {
    ClassUtils.ValidateNonEmpty($(obj));
  };

  /* Server Call  */

  authenticate_User_Server(_UserName: string, _Password: string): void {

    this._DataService.Authenticate_User_Server(_UserName, _Password).subscribe(data => {
      this._Data = data;
      if (this._Data == true)
        this.router.navigateByUrl('dashboard');
      else
        alert('Invalid User Name or Password !!!');
    })

  }

}
