import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Response, RequestOptions, Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { catchError, map, tap } from 'rxjs/operators';
// import { ClassCsrReport } from './class-csr-report';
// import { ClassDcrmReport } from './class-dcrm-report';
// import { ClassDcsrReport } from './class-dcsr-report';
// import { ClassDsrReport } from './class-dsr-report';
// import { ClassDssrReport } from './class-dssr-report';
// import { ClassStoreDetails } from './class-storedetails';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',

  }),
};


@Injectable()
export class DataService {

  private login_api = "http://110.173.181.78:6040/Management_Reports/rest/reportService/login";
  private getStoreDetails_api = "http://110.173.181.78:6040/Management_Reports/rest/reportService/getStoreDetails";
  private dsr_api = "http://110.173.181.78:6040/Management_Reports/rest/reportService/dsr";
  private dssr_api = "http://110.173.181.78:6040/Management_Reports/rest/reportService/dssr";
  private dcsr_api = "http://110.173.181.78:6040/Management_Reports/rest/reportService/dcsr";
  private dcrm_api = "http://110.173.181.78:6040/Management_Reports/rest/reportService/dcrm";
  private csr_api = "http://110.173.181.78:6040/Management_Reports/rest/reportService/csr";

  constructor(private http: HttpClient) {

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  Authenticate_User_Server(_UserName: string, _Password: string): Observable<any> {
    return this.http.post<Boolean>(this.login_api, "{\"username\" : \"" + _UserName + "\",\"password\" : \"" + _Password + "\"}",
      httpOptions).pipe(
        catchError(this.handleError('Authenticate_User_Server', null))
      );
  }

  // Get_StoreDetails_Data_Server(_SearchText: string): Observable<any> {
  //   return this.http.post<ClassStoreDetails>(this.getStoreDetails_api, "{\"searchText\" : \"" + _SearchText + "\"}", httpOptions).pipe(
  //     catchError(this.handleError('Get_StoreDetails_Data_Server', null))
  //   );
  // }

  // Get_Dsr_Data_Server(_Date: string): Observable<any> {
  //   return this.http.post<ClassDsrReport>(this.dsr_api, "{\"date\" : \"" + _Date + "\"}", httpOptions).pipe(
  //     catchError(this.handleError('Get_Dsr_Data_Server', null))
  //   );
  // }

  // Get_Dssr_Data_Server(_Date: string, _Warehouse: String): Observable<any> {

  //   return this.http.post<ClassDssrReport>(this.dssr_api, "{\"date\" : \"" + _Date + "\",  \"warehouse\":\"" + _Warehouse + "\"}", httpOptions).pipe(
  //     catchError(this.handleError('Get_Dssr_Data_Server', null))
  //   );
  // }

  // Get_Dcsr_Data_Server(_Date: string, _Category: String): Observable<any> {
  //   return this.http.post<ClassDcsrReport>(this.dcsr_api, "{\"date\" : \"" + _Date + "\",  \"category\":\"" + _Category + "\"}", httpOptions).pipe(
  //     catchError(this.handleError('Get_Dcsr_Data_Server', null))
  //   );
  // }

  // Get_Dcrm_Data_Server(_Date: string): Observable<any> {
  //   return this.http.post<ClassDcrmReport>(this.dcrm_api, "{\"date\" : \"" + _Date + "\"}", httpOptions).pipe(
  //     catchError(this.handleError('Get_Dcrm_Data_Server', null))
  //   );
  // }

  // Get_Csr_Data_Server(_Division: String): Observable<any> {
  //   return this.http.post<ClassCsrReport>(this.csr_api, "{\"division\" : \"" + _Division + "\"}", httpOptions).pipe(
  //     catchError(this.handleError('Get_Csr_Data_Server', null))
  //   );
  // }

}
