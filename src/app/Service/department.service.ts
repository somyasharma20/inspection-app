import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var window: any;

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    private BASE_API_URL = environment.BASE_API_URL;
    private BASE_API_URL_static = environment.BASE_API_URL_static;

    private _controllerName: string = "Department/";
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


    GetAllDepartment(): Observable<any> {

        this._methodName = "GetAllDepartment/";
        this._param = {};
        return this._http.post<any>(
            this._url + this._methodName, this._param
        );
    }
    GetAllDepartmentSam(obj: any): Observable<any> {
        debugger
        this._methodName = "GetAllDepartmentSam/";
        this._param = obj;
        return this._http.post<any>(
            this._url + this._methodName, this._param
        );
    }

    GetAllDepartmentByBranch(branchID: number): Observable<any> {
        debugger;
        this._methodName = "GetAllDepartmentByBranch/" + branchID;
        this._param = {};
        return this._http.post<any>(
            this._url + this._methodName, this._param
        );
    }

    SaveDepartment(_obj: any): Observable<any> {
        debugger
        this._methodName = "SaveDepartment/";
        this._param = _obj;
        return this._http.post<any>(
            this._url + this._methodName, this._param
        );
    }

    SaveBranchDepartment(_obj: any): Observable<any> {
        debugger
        this._methodName = "SaveBranchDepartment/";
        this._param = _obj;
        return this._http.post<any>(
            this._url + this._methodName, this._param
        );
    }

    GetAllDepartmentByUser(_obj: any): Observable<any> {
        debugger;
        this._methodName = "GetAllDepartmentByUser/";
        this._param = _obj;
        return this._http.post<any>(
            this._url + this._methodName, this._param
        );
    }

    SaveUserDepartment(_obj: any): Observable<any> {
        debugger
        this._methodName = "SaveUserDepartment/";
        this._param = _obj;
        return this._http.post<any>(
            this._url + this._methodName, this._param
        );
    }

}