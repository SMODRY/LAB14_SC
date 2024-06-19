export interface Matricula {
  id_matricula?: number;
  cod_matricula: string;
  fecha_matricula: string;
  periodo: string;
  concepto_pago: string;
  id_padre_id?: number;
  padre_nombre: string;
  alumnos: number[]; // Aquí guardarás los IDs de los alumnos seleccionados

}

