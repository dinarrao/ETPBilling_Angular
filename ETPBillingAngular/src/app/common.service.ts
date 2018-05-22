import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: Http) {
    let obj;
    // this.getJSON().subscribe(data => obj = data, error => console.log(error));
  }

  public getJSON(): Observable<any> {
    return this.http.get('./assets/data/output_JSON.json')
      .map((res: any) => res.json())
      .catch((error: any) => error);

  }
}
