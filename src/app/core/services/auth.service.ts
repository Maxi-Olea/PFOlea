import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  //userData!: User | null;

  userData: User | null = {
    id: 1,
    username: 'molea',
    name: 'Maxi',
    lastname: 'Olea',
    rol: 'admin'
  };

  baseUrl: string = 'https://62aa1e323b314385544268cd.mockapi.io/users/';

  constructor(
    private _http: HttpClient
  ) { }

  private handleError(error: HttpErrorResponse) {
    //Manejo de errores http frontend
    if(error) {
      console.warn(`Error de backend: ${error.status}, cuerpo del error: ${error.message}`);
    }
    return throwError('Error de comunicación Http');
  }

  getIsLoggedIn(): Observable<boolean> {
    return of(this.isLoggedIn)
  }

  setIsLoggedIn(isLogged: boolean, user: User | null) {
    this.isLoggedIn = isLogged;
    if(user) {
      this.userData = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        rol: user.rol
      }
    } else {
      this.userData = user;
    }
  }

  logOff() {
    this.isLoggedIn = false;
  }

  getUsers():Observable<User[]> { //Devuelve un array de los usuarios y sus roles
    return this._http.get<User[]>(this.baseUrl)
    .pipe(catchError(this.handleError));
  }

  getUserData():Observable<User | null> {
    return of(this.userData);
  }

}
