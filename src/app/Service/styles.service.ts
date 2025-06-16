import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var window: any;

@Injectable({
    providedIn: 'root'
})
export class StylesService {
    private BASE_API_URL = environment.BASE_API_URL;
    private BASE_API_URL_static = environment.BASE_API_URL_static;

    private _controllerName: string = "Style/";
    private _url!: string;
    private _methodName: string = "";
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


    GetAllStyle(): Observable<any> {
        this._methodName = "GetAllStyle/";
        this._param = {};
        return this._http.post<any>(
            this._url + this._methodName, this._param
        );
    }

    GetAllStyleByCustomerID(_obj: any): Observable<any> {
        this._methodName = "GetAllStyleByCustomerID/";
        this._param = _obj
        return this._http.post<any>(
            this._url + this._methodName, this._param
        );
    }

    GetAllStyleByJobID(_obj: any): Observable<any> {
        this._methodName = "GetAllStyleByJobID/";
        this._param = _obj
        return this._http.post<any>(
            this._url + this._methodName, this._param
        );
    }
    

    SaveStyle(_obj: any): Observable<any> {
        this._methodName = "SaveStyle/";
        this._param = _obj;
        return this._http.post<any>(
            this._url + this._methodName, this._param
        );
    }

    SaveStyleSam(_obj: any): Observable<any> {
        debugger
        this._methodName = "SaveStyleSam/";
        this._param = _obj;
        return this._http.post<any>(
            this._url + this._methodName, this._param
        );
    }

}