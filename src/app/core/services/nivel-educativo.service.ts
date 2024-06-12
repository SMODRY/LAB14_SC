import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CristoReyService } from './cristo-rey.service';
import { Observable, catchError, of } from 'rxjs';
import { NivelAcademico } from '../models/nivel-academico.model';

@Injectable({
  providedIn: 'root'
})

export class NivelEducativoService extends CristoReyService {

  private endpoint = 'nivel-academico/';

  constructor(private http: HttpClient) {
    super();
  }

  allNiveles(): Observable<NivelAcademico[]> {
    return this.http.get<NivelAcademico[]>(this.baseUrl + this.endpoint)
      .pipe(
        catchError(this.handleError<NivelAcademico[]>('allNiveles', []))
      );
  }

  getNivel(id: number): Observable<NivelAcademico> {
    const url = `${this.baseUrl}${this.endpoint}${id}/`;
    return this.http.get<NivelAcademico>(url)
      .pipe(
        catchError(this.handleError<NivelAcademico>(`getNivel id=${id}`))
      );
  }

  addNivel(nivel: NivelAcademico): Observable<any> {
    return this.http.post(this.baseUrl + this.endpoint, nivel)
      .pipe(
        catchError(this.handleError<any>('addNivel'))
      );
  }

  updateNivel(nivel: NivelAcademico): Observable<any> {
    const url = `${this.baseUrl}${this.endpoint}${nivel.id_nivelacademico}/`;
    return this.http.put(url, nivel)
      .pipe(
        catchError(this.handleError<any>('updateNivel'))
      );
  }

  deleteNivel(id: number): Observable<any> {
    const url = `${this.baseUrl}${this.endpoint}${id}/`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError<any>('deleteNivel'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
