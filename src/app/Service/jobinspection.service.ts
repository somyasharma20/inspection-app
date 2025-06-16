import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class JobinspectionService {
  private BASE_API_URL = environment.BASE_API_URL;
  private BASE_API_URL_static = environment.BASE_API_URL_static;

  private _controllerName: string = 'jobinspection/';
  private _url!: string;
  private _methodName: string = '';
  private _param: {} = {};
  constructor(private _http: HttpClient) {
    // console.log(window.location.host);
    //this._url = this.BASE_API_URL + this._controllerName;

    var host = window.location.host;

    if (host == '192.168.0.77') {
      this._url = this.BASE_API_URL + this._controllerName;
    } else if (host == '182.77.63.44') {
      this._url = this.BASE_API_URL_static + this._controllerName;
    } else {
      this._url = this.BASE_API_URL + this._controllerName;
    }
  }

  SearchJobInspections(obj: any): Observable<any> {
    this._methodName = 'SearchJobInspections/';
    this._param = obj;
    return this._http.post<any>(this._url + this._methodName, this._param);
  }

  GetAllInspections(): Observable<any> {
    this._methodName = 'GetAllInspections/';
    this._param = {};
    return this._http.post<any>(this._url + this._methodName, this._param);
  }

  
  GetJobInspectionDetailReport(obj: any): Observable<any> {
    this._methodName = 'GetJobInspectionDetailReport/';
    this._param = {...obj, urlPath: environment.APIURL};
    return this._http.post<any>(this._url + this._methodName, this._param);
  }
  
  GetAllJobInspectionDetails(obj: any): Observable<any> {
    this._methodName = 'GetAllJobInspectionDetails/';
    this._param =obj;
    return this._http.post<any>(this._url + this._methodName, this._param);
  }
  
  DeleteJobInspectionDetails(obj: any): Observable<any> {
    this._methodName = 'DeleteJobInspectionDetails/';
    this._param =obj;
    return this._http.post<any>(this._url + this._methodName, this._param);
  }
}
