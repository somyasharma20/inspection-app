import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BASE_API_URL = environment.BASE_API_URL;
  private BASE_API_URL_static = environment.BASE_API_URL_static;

  private _controllerName: string = "Product/";
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

  GetAllProductBySupplierId(_obj: any): Observable<any> {
    this._methodName = "GetAllProductBySupplierId/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAllProductBySupplierId_New(_obj: any): Observable<any> {
    this._methodName = "GetAllProductBySupplierId/";
    this._param = _obj;
    return this._http.post<any>(
      this.BASE_API_URL + "WeatherForecast/" + this._methodName, this._param
    );
  }

  GetAllProductByStatusSupplierId(_obj: any): Observable<any> {
    this._methodName = "GetAllProductByStatusSupplierId/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetProductById(_obj: any): Observable<any> {
    this._methodName = "GetProductById/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  SaveProduct(_obj: any): Observable<any> {
    this._methodName = "SaveProduct/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  SaveProductSizeColor(_obj: any): Observable<any> {
    this._methodName = "SaveProductSizeColor/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  SaveProductSizeColorImages(_obj: any): Observable<any> {
    this._methodName = "SaveProductSizeColorImages/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetProductSizeColorById(_obj: any): Observable<any> {
    this._methodName = "GetProductSizeColorById/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetProductSizeColorByCategoryId(_obj: any): Observable<any> {
    this._methodName = "GetProductSizeColorByCategoryId/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  DeleteProductSizeColor(_obj: any): Observable<any> {
    this._methodName = "DeleteProductSizeColor/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  DeleteProductImage(_obj: any): Observable<any> {
    this._methodName = "DeleteProductImage/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAllAccessory(): Observable<any> {
    this._methodName = "GetAllAccessory/";
    this._param = {};
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  SaveAccessory(_obj: any): Observable<any> {
    this._methodName = "SaveAccessory/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetProductAccessory(_obj: any): Observable<any> {
    this._methodName = "GetProductAccessory/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  SaveAssignAccessory(_obj: any): Observable<any> {
    this._methodName = "SaveAssignAccessory/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }



  GetAllApplication(_obj: any): Observable<any> {
    debugger;
    this._methodName = "GetAllApplication/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

}
