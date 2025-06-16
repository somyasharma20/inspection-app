import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import { Role } from '@core/models/role';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private BASE_API_URL = environment.BASE_API_URL;
  private BASE_API_URL_static = environment.BASE_API_URL_static;

  private _controllerName: string = "auth/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {} = {};


  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private users = [
    {
      id: 1,
      img: 'assets/images/user/admin.jpg',
      username: 'admin',
      password: 'admin@123',
      firstName: 'admin',
      lastName: 'admin',
      role: Role.Admin,
      token: 'admin-token',
    },
    {
      id: 2,
      img: 'assets/images/user/teacher.jpg',
      username: 'teacher@school.org',
      password: 'teacher@123',
      firstName: 'Ashton',
      lastName: 'Cox',
      role: Role.Teacher,
      token: 'teacher-token',
    },
    {
      id: 3,
      img: 'assets/images/user/student.jpg',
      username: 'student@school.org',
      password: 'student@123',
      firstName: 'Ashton',
      lastName: 'Cox',
      role: Role.Student,
      token: 'student-token',
    },
  ];

  constructor(private http: HttpClient) {


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


    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  ValidLogin(_obj: any): Observable<any> {
    this._methodName = "ValidLogin/";
    this._param = _obj;
    return this.http.post<any>(
        this._url + this._methodName, this._param
    );
}

  login(username: string, password: string) {

    const user = this.users.find((u) => u.username === username && u.password === password);

    if (!user) {
      return this.error('Username or password is incorrect');
    } else {
      //localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return this.ok({
        id: user.id,
        img: user.img,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: user.token,
      });
    }
  }
  ok(body?: {
    id: number;
    img: string;
    username: string;
    firstName: string;
    lastName: string;
    token: string;
  }) {
    return of(new HttpResponse({ status: 200, body }));
  }
  error(message: string) {
    return throwError(message);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }
}
