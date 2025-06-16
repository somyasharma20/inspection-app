import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var window: any;

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private BASE_API_URL = environment.BASE_API_URL;
    private BASE_API_URL_static = environment.BASE_API_URL_static;

    private _controllerName: string = "Item/";
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


    GetAllItem(): Observable<any> {
        debugger;
        this._methodName = "GetAllItem/";
        this._param = {};
        return this._http.post<any>(
            this._url + this._methodName, this._param
        );
    }

    SaveItem(_obj: any): Observable<any> {
        debugger
        this._methodName = "SaveItem/";
        this._param = _obj;
        return this._http.post<any>(
            this._url + this._methodName, this._param
        );
    }

}