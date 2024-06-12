import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { GradoAcademico } from '../models/grado-academico.model';
import { CristoReyService } from './cristo-rey.service';

@Injectable({
  providedIn: 'root'
})
export class GradoAcademicoService extends CristoReyService{

  private gradoUrl = 'grado-academico/';

  constructor(private http: HttpClient) {
    super()
  }

  allGrados(): Observable<GradoAcademico[]> {
    return this.http.get<GradoAcademico[]>(this.baseUrl + this.gradoUrl)
      .pipe(
        catchError(this.handleError<GradoAcademico[]>('allGrados', []))
      );
  }

  getGrado(id: number): Observable<GradoAcademico> {
    const url = `${this.baseUrl}${this.gradoUrl}${id}/`;
    return this.http.get<GradoAcademico>(url)
      .pipe(
        catchError(this.handleError<GradoAcademico>(`getNivel id=${id}`))
      );
  }

  addGrado(grado: GradoAcademico): Observable<GradoAcademico> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<GradoAcademico>(this.baseUrl + this.gradoUrl, grado, httpOptions)
      .pipe(
        catchError(this.handleError<GradoAcademico>('addGrado'))
      );
  }

  updateGrado(nivel: GradoAcademico): Observable<any> {
    const url = `${this.baseUrl}${this.gradoUrl}${nivel.id_grdacademico}/`;
    return this.http.put(url, nivel)
      .pipe(
        catchError(this.handleError<any>('updateGrado'))
      );
  }

  deleteGrado(id: number): Observable<any> {
    const url = `${this.baseUrl}${this.gradoUrl}${id}/`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError<any>('deleteGrado'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
