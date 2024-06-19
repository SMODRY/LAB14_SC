import { Injectable } from '@angular/core';
import { CristoReyService } from './cristo-rey.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends CristoReyService{
  private alumnoUrl = 'alumno/';

  constructor(private http: HttpClient) {
    super()
   }

   allAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.baseUrl + this.alumnoUrl)
      .pipe(
        catchError(this.handleError<Alumno[]>('allAlumnos', []))
      );
  }

  getAlumno(id: number): Observable<Alumno> {
    const url = `${this.baseUrl}${this.alumnoUrl}${id}/`;
    return this.http.get<Alumno>(url)
      .pipe(
        catchError(this.handleError<Alumno>(`getAlumno id=${id}`))
      );
  }

  addAlumno(alumno: Alumno): Observable<Alumno> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Alumno>(this.baseUrl + this.alumnoUrl, alumno, httpOptions)
      .pipe(
        catchError(this.handleError<Alumno>('addAlumno'))
      );
  }

  updateAlumno(alumno: Alumno): Observable<any> {
    const url = `${this.baseUrl}${this.alumnoUrl}${alumno.id_alumno}/`;
    return this.http.put(url, alumno)
      .pipe(
        catchError(this.handleError<any>('updateAlumno'))
      );
  }

  deleteAlumno(id: number): Observable<any> {
    const url = `${this.baseUrl}${this.alumnoUrl}${id}/`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError<any>('deleteAlumno'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
