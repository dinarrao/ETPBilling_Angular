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
    $("#sidebar").css("visibility","hidden");
    $(".wrapper").css("background-color","#464b8b");
    $("#footerbar").css("visibility","hidden");
    // $(".col-md-6 col-sm-6 col-xs-6  ").css("background-color","#E0E0E0");
    // $(".col-md-6 col-sm-6 col-xs-6").css("background-color","#E0E0E0");
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
      {
        this.router.navigateByUrl('index');
        $("#sidebar").css("visibility","visible");
        $(".wrapper").css("background-color","#E0E0E0");
        $("#footerbar").css("visibility","visible");
       // $(".container-fluid").css("background-color","#464b8b");
      }
      else
        alert('Invalid User Name or Password !!!');
    })

  }

}
