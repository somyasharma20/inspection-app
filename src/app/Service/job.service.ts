import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private BASE_API_URL = environment.BASE_API_URL;
    private BASE_API_URL_static = environment.BASE_API_URL_static;
  private _controllerName: string = 'job/';
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = '';
  private _param: {} = {};
  constructor(private _http: HttpClient) {

    console.log(window.location.host);
    //this._url = this.BASE_API_URL + this._controllerName;

    var host = window.location.host;

    if (host == "192.168.0.77") {
      this._url = this.BASE_API_URL + this._controllerName;

    }
    else if (host == "182.77.63.44") {
      this._url = this.BASE_API_URL_static + this._controllerName;

    }
    else {
      this._url = this.BASE_API_URL + this._controllerName;

    }

  }

  GetAllJob(): Observable<any> {
    this._methodName = 'GetAllJob/';
    this._param = {};
    return this._http.post<any>(this._url + this._methodName, this._param);
  }

  SaveJob(_obj: any): Observable<any> {
    debugger
    this._methodName = 'SaveJob/';
    this._param = _obj;
    return this._http.post<any>(this._url + this._methodName, this._param);
  }
  GetAllJobDetail(_obj: any): Observable<any> {
    this._methodName = 'GetAllJobDetail/';
    this._param = _obj
    return this._http.post<any>(this._url + this._methodName, this._param);
  }
  SaveJobDetail(_obj: any): Observable<any> {
    debugger;
    this._methodName = 'SaveJobDetail/';
    this._param = _obj;
    return this._http.post<any>(this._url + this._methodName, this._param);
  }

  DeleteJobDetail(_obj: any): Observable<any> {
    debugger;
    this._methodName = 'DeleteJobDetail/';
    this._param = _obj;
    return this._http.post<any>(this._url + this._methodName, this._param);
  }
}
