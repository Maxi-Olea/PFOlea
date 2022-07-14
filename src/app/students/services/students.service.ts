import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Student } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  baseUrl: string = 'https://62aa1e323b314385544268cd.mockapi.io/students/';

  studentToEdit!: Student | null;

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

  getStudents():Observable<Student[]> {
    return this._http.get<Student[]>(this.baseUrl)
    .pipe(catchError(this.handleError));
  }

  getStudentById(id: number): Observable<Student> {
    return this._http.get<Student>(this.baseUrl + id)
    .pipe(catchError(this.handleError));
  }

  deleteStudentById(id: number): Observable<Student> {
    return this._http.delete<Student>(this.baseUrl + id)
    .pipe(catchError(this.handleError));
  }

  editStudentById(id:number, student: Student): Observable<Student> {
    return this._http.put<Student>(this.baseUrl + id, student)
    .pipe(catchError(this.handleError));
  }

  addStudent(student: Student): Observable<Student> {
    return this._http.post<Student>(this.baseUrl, student)
    .pipe(catchError(this.handleError));
  }

  getStudentToEdit():Observable<Student | null> {
    return of(this.studentToEdit);
  }

  setStudentToEdit(student: Student | null) {
    return new Promise((resolve, reject) => {
      if(student || student === null) {
        this.studentToEdit = student;
        return resolve(true)
      }else {
        return reject({ message: 'No se pudo setear el studentToEdit' })
      }
    });
  }

}
