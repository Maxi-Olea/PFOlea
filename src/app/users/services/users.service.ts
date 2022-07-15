import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/core/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isLoggedIn:boolean = false;
  //isLoggedIn:boolean = true;


  userData!:User | null;
  //userData:User | null = {id: 1, username: 'Admin', name: 'Maxi', lastname: 'Olea', rol: 'admin'} //user mockeado para pruebas
  usersData:User[] = [];
  userToEdit!:User | null;

  usersUrl = 'https://62aa1e323b314385544268cd.mockapi.io/users/';

  constructor(
    private http: HttpClient
  ) {}

  private handleError(error: HttpErrorResponse) {
    //Manejo de errores http frontend
    if(error) {
      console.warn(`Error de backend: ${error.status}, cuerpo del error: ${error.message}`);
    }
    return throwError('Error de comunicación Http');
  }

  getUsers():Observable<User[]> { //Devuelve un array de los usuarios y sus roles
    return this.http.get<User[]>(this.usersUrl)
    .pipe(catchError(this.handleError));
  }

  getUserById(id: number):Observable<User> {
    return this.http.get<User>(this.usersUrl + id)
    .pipe(catchError(this.handleError));
  }

  addUser(user: User):Observable<User> {
    return this.http.post<User>(this.usersUrl, user)
    .pipe(catchError(this.handleError));
  }

  editUser(id:number, user:User):Observable<User> {
    return this.http.put<User>(this.usersUrl + id, user)
    .pipe(catchError(this.handleError));
  }

  deleteUser(id:number):Observable<User> {
    return this.http.delete<User>(this.usersUrl + id)
    .pipe(catchError(this.handleError));
  }

  getUserToEdit():Observable<User | null> {
    return of(this.userToEdit);
  }

  setUserToEdit(user:User | null):Promise<any> {
    return new Promise((resolve, reject) => {
      if(user || user === null) {
        this.userToEdit = user;
        return resolve(true)
      }else {
        return reject({ message: 'No se pudo setear el userToEdit' })
      }
    })
  }

}
