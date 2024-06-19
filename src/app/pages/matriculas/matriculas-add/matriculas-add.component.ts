import { Component, ViewChild } from '@angular/core';
import { PadresComponent } from '../../admin_personal/padres/padres.component';
import { EstudiantesComponent } from '../../admin_personal/estudiantes/estudiantes.component';
import { Padre } from '../../../core/models/padre.model';
import { PadreService } from '../../../core/services/padre.service';
import { PadreAddComponent } from '../../admin_personal/padres/padre-add/padre-add.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PadreEditComponent } from '../../admin_personal/padres/padre-edit/padre-edit.component';
import { PadresListComponent } from '../../admin_personal/padres/padres-list/padres-list.component';
import { EstudiantesListComponent } from '../../admin_personal/estudiantes/estudiantes-list/estudiantes-list.component';
import { MatriculaService } from '../../../core/services/matricula.service';
import { Matricula } from '../../../core/models/matricula.model';

@Component({
  selector: 'app-matriculas-add',
  standalone: true,
  imports: [PadresComponent, EstudiantesComponent, PadreAddComponent, FormsModule, CommonModule, PadreEditComponent, PadresListComponent, EstudiantesListComponent],
  templateUrl: './matriculas-add.component.html',
  styleUrl: './matriculas-add.component.css'
})
export class MatriculasAddComponent {
  padres: Padre[] = [];
  idPadreSeleccionado: number | null = null;
  padreSeleccionado: Padre | null = null;
  showPadreDatatable = false;
  alumnosSeleccionados: any[] = [];
  showAlumnosList = false;

  cod_matricula: string = '';
  fecha_matricula: string = '';
  periodo: string = '';
  concepto_pago: string = '';

  @ViewChild(PadresListComponent) padresListComponent!: PadresListComponent;
  @ViewChild(EstudiantesListComponent) estudiantesListComponent!: EstudiantesListComponent;

  constructor(
    private padreService: PadreService,
    private toastr: ToastrService,
    private matriculaService: MatriculaService
  ) {}

  ngOnInit(): void {
    this.loadPadres();
  }

  loadPadres(): void {
    this.padreService.allPadres().subscribe(
      data => {
        this.padres = data;
      },
      error => {
        this.toastr.error('Error al cargar los padres');
        console.error('Error al cargar los padres:', error);
      }
    );
  }

  openPadreDatatable(): void {
    this.showPadreDatatable = true;
    this.showAlumnosList = false;
  }

  openAlumnosList(): void {
    this.showAlumnosList = true;
    this.showPadreDatatable = false;
  }

  onPadreSeleccionado(padre: Padre): void {
    this.padreSeleccionado = padre;
    if (padre) {
      this.idPadreSeleccionado = padre.id_padre !== undefined ? padre.id_padre : null;
      const campoPadre = document.getElementById('campoPadre') as HTMLInputElement;
      campoPadre.value = `${padre.dni} - ${padre.apellidos_nombres}`;
      this.showPadreDatatable = false;
    } else {
      this.limpiarCampoPadre();
      this.idPadreSeleccionado = null;
    }
  }

  limpiarCampoPadre(): void {
    const campoPadre = document.getElementById('campoPadre') as HTMLInputElement;
    campoPadre.value = '';
  }

  saveMatricula(): void {
    if (!this.padreSeleccionado || !this.idPadreSeleccionado || this.alumnosSeleccionados.length === 0) {
      this.toastr.error('Debe seleccionar un padre y al menos un alumno para la matrícula.');
      return;
    }

    // Aquí puedes colocar console.log para verificar los datos antes de enviar la solicitud HTTP
    console.log('Datos antes de enviar la matrícula:', {
      cod_matricula: this.cod_matricula,
      fecha_matricula: this.fecha_matricula,
      periodo: this.periodo,
      concepto_pago: this.concepto_pago,
      id_padre: this.idPadreSeleccionado,
      alumnos: this.alumnosSeleccionados.map(alumno => alumno.id_alumno)
    });

    const nuevaMatricula: Matricula = {
      cod_matricula: this.cod_matricula,
      fecha_matricula: this.fecha_matricula,
      periodo: this.periodo,
      concepto_pago: this.concepto_pago,
      id_padre_id: this.padreSeleccionado?.id_padre,
      padre_nombre: this.padreSeleccionado?.apellidos_nombres,
      alumnos: this.alumnosSeleccionados.map(alumno => alumno.id_alumno)
    };

    this.matriculaService.addMatricula(nuevaMatricula).subscribe(
      (respuesta: any) => {
        this.toastr.success('Matrícula guardada exitosamente');
      },
      (error: any) => {
        this.toastr.error('Error al guardar la matrícula');
        console.error('Error al guardar la matrícula:', error);
        console.log('Detalles del error:', error.error); // Aquí imprimimos el error completo
      }
    );
  }

  openPadreAddModal(): void {
    this.padresListComponent.abrirModalAdd();
  }

  onAlumnoSeleccionado(alumno: any): void {
    this.alumnosSeleccionados.push(alumno);
    this.showAlumnosList = false; // Ocultar la lista de alumnos después de seleccionar uno
  }

  onAlumnoGuardado(nuevoAlumno: any): void {
    this.alumnosSeleccionados.push(nuevoAlumno);
  }

  eliminarAlumnoSeleccionado(index: number): void {
    this.alumnosSeleccionados.splice(index, 1);
  }
}
