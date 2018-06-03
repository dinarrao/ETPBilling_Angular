import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { catchError, map } from 'rxjs/operators';
import { catchError, map, tap } from 'rxjs/operators';
import { itemModel } from './Models/item.model';



// @Injectable({
//   providedIn: 'root'
// });

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',

  }),
};
@Injectable()
export class CommonService {

  url_login = 'http://110.173.181.78:6040/ETPStoreServiceV5.5_REST/rest/Service/VALIDATE_LOGIN';

  headers;
  //httpOptions;

  constructor(private http: HttpClient) {
   // let obj;
    // this.getJSON().subscribe(data => obj = data, error => console.log(error));

    // this.headers = new Headers({
    //   'Content-Type': 'application/json',
    // });

    // this.headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // this.headers.append('Accept', 'application/json');
    // this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    // this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200/');
    // this.headers.append('Access-Control-Allow-Headers',
    //   'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');

   // this.httpOptions = new RequestOptions({ headers: this.headers });
  }
  private handleError<T> (operation = 'operation', result?: T) 
  {
     return (error: any): Observable<T> => {
     return of(result as T);
    };
  }
  public getJSON(json_productInfo): Observable<any> {
    return this.http.get(json_productInfo)
      .map((res: any) => res.json())
      .catch((error: any) => error);

  }

  // public postURL(url: string, body): Observable<any> {
  //   console.log(url);
  //   console.log(body);
  //   return this.http.post(url, body, httpOptions)
  //     .map(this.extractData)
  //     .catch(this.handleErrorObservable);
  // }

  public Get_item_Data_Server(url: string, body): Observable<any> {
      console.log(url);
      console.log(body);
      return this.http.post<itemModel>(url,body, httpOptions).pipe(
        catchError(this.handleError('Get_item_Data_Server', null))
      );
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
