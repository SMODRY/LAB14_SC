import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError,  map, of } from 'rxjs';
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

  checkGradoExists(descripcion: string, id_nivel: number): Observable<boolean> {
    const url = `${this.baseUrl}${this.gradoUrl}`;
    console.log(`Verificando existencia del grado académico con descripción: ${descripcion} y id_nivel: ${id_nivel}`);
    return this.http.get<GradoAcademico[]>(url).pipe(
      map(grados => {
        // Convertir la descripción a minúsculas para comparación insensible a mayúsculas
        const lowerDescripcion = descripcion.toLowerCase();
        const matchingGrados = grados.filter(grado =>
          grado.descripcion.toLowerCase() === lowerDescripcion && grado.id_nivel === id_nivel
        );
        console.log(`Grados encontrados:`, matchingGrados);
        return matchingGrados.length > 0;
      }),
      catchError(error => {
        console.error('Error en checkGradoExists:', error);
        return of(false);
      })
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
