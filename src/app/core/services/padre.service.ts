import { Injectable } from '@angular/core';
import { CristoReyService } from './cristo-rey.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Padre } from '../models/padre.model';

@Injectable({
  providedIn: 'root'
})
export class PadreService extends CristoReyService{
  private padreUrl = 'padre/';

  constructor(private http: HttpClient) {
    super();
  }

  allPadres(): Observable<Padre[]> {
    return this.http.get<Padre[]>(this.baseUrl + this.padreUrl)
      .pipe(
        catchError(this.handleError<Padre[]>('allPadres', []))
      );
  }
  getPadre(id: number): Observable<Padre> {
    const url = `${this.baseUrl}${this.padreUrl}${id}/`;
    return this.http.get<Padre>(url)
      .pipe(
        catchError(this.handleError<Padre>(`getPadre id=${id}`))
      );
  }

  addPadre(padre: Padre): Observable<any> {
    return this.http.post(this.baseUrl + this.padreUrl, padre)
      .pipe(
        catchError(this.handleError<any>('addPadre'))
      );
  }

  updatePadre(padre: Padre): Observable<any> {
    const url = `${this.baseUrl}${this.padreUrl}${padre.id_padre}/`;
    return this.http.put(url, padre)
      .pipe(
        catchError(this.handleError<any>('updatePadre'))
      );
  }
  deletePadre(id: number): Observable<any> {
    const url = `${this.baseUrl}${this.padreUrl}${id}/`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError<any>('deletePadre'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }



}
