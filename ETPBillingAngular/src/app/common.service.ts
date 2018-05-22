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

  url_login = 'http://110.173.181.78:6040/ETPStoreServiceV5.5_REST/rest/Service/VALIDATE_LOGIN';
  
  headers;
  httpOptions;

  constructor(private http: Http) {
    let obj;
    // this.getJSON().subscribe(data => obj = data, error => console.log(error));

    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.httpOptions = new RequestOptions({ headers: this.headers });

  }

  public getJSON(json_productInfo): Observable<any> {
    return this.http.get(json_productInfo)
      .map((res: any) => res.json())
      .catch((error: any) => error);

  }

  public postURL(url: string, body): Observable<any> {
    return this.http.post(url, body, this.httpOptions)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  extractData(res: Response) {
    const body = res.json();
    console.log('postURL extractData');
    console.log(body);
    return body || {};
  }

  handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
