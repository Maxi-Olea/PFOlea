import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Inscription } from '../interfaces/inscription.interface';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  baseUrl: string = 'https://62aa1e323b314385544268cd.mockapi.io/inscriptions/';

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

  getInscriptionsByStudentId(studentId: number): Observable<Inscription[]> {
    return this._http.get<Inscription[]>(`${this.baseUrl}?studentId=${studentId}`)
    .pipe(catchError(this.handleError));
  }

  getInscriptionsByCourseId(courseId: number): Observable<Inscription[]> {
    return this._http.get<Inscription[]>(`${this.baseUrl}?courseId=${courseId}`)
    .pipe(catchError(this.handleError));
  }

  addInscription(inscription: Inscription): Observable<Inscription> {
    return this._http.post<Inscription>(this.baseUrl, inscription)
    .pipe(catchError(this.handleError));
  }

  deleteInscription(id: number): Observable<Inscription> {
    return this._http.delete<Inscription>(this.baseUrl + id)
    .pipe(catchError(this.handleError))
  }
}
