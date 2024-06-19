import { Injectable } from '@angular/core';
import { CristoReyService } from './cristo-rey.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
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
    const { codigo, ...dataWithoutCodigo } = padre; // Excluir `codigo`
    return this.http.post(this.baseUrl + this.padreUrl, dataWithoutCodigo)
      .pipe(
        catchError(this.handleError<any>('addPadre'))
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


  updatePadre(padre: Padre): Observable<any> {
    const url = `${this.baseUrl}padre/${padre.id_padre}/`; // Ajusta la URL según tu configuración de router
    return this.http.put(url, padre)
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar el padre:', error);
          return throwError(error);
        })
      );
  }

}

