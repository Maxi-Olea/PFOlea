import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseToEdit!: Course | null;

  apiUrl = 'https://62aa1e323b314385544268cd.mockapi.io/courses/';

  constructor(
    private http: HttpClient
  ) {}private handleError(error: HttpErrorResponse) {
    //Manejo de errores http frontend
    if(error) {
      console.warn(`Error de backend: ${error.status}, cuerpo del error: ${error.message}`);
    }
    return throwError('Error de comunicación Http');
  }



  getCourses():Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl)
    .pipe(catchError(this.handleError));
  }

  getCourseById(id:number):Observable<Course> {
    return this.http.get<Course>(this.apiUrl + id)
    .pipe(catchError(this.handleError));
  }

  deleteCourseById(id:number):Observable<Course> {
    return this.http.delete<Course>(this.apiUrl + id)
    .pipe(catchError(this.handleError));
  }

  editCourseById(id:number, course: Course):Observable<Course> {
    return this.http.put<Course>(this.apiUrl + id , course)
    .pipe(catchError(this.handleError));
  }

  addCourse(course: Course):Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course)
    .pipe(catchError(this.handleError));
  }

  getCourseToEdit():Observable<Course | null> {
    return of(this.courseToEdit)
  }

  setCourseToEdit(course: Course | null) {
    return new Promise((resolve, reject) => {
      if(course || course === null) {
        this.courseToEdit = course;
        return resolve(true)
      } else {
        return reject({ message: ' No se pudo setear el curso a editar' })
      }
    });
  }
  
}
