import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../../../../core/models/alumno.model';
import { AlumnoService } from '../../../../core/services/alumno.service';
import { ToastrService } from 'ngx-toastr';
import { NivelAcademico } from '../../../../core/models/nivel-academico.model';
import { GradoAcademico } from '../../../../core/models/grado-academico.model';
import { NivelEducativoService } from '../../../../core/services/nivel-educativo.service';
import { GradoAcademicoService } from '../../../../core/services/grado-academico.service';

@Component({
  selector: 'app-estudiantes-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiantes-add.component.html',
  styleUrl: './estudiantes-add.component.css'
})
export class EstudiantesAddComponent implements OnInit {

  niveles: NivelAcademico[] = [];
  nivelSeleccionado: NivelAcademico | null = null;

  grados: GradoAcademico[] = [];
  gradoSeleccionado: GradoAcademico | null = null;

  alumno: Alumno = {
    codigo: '',
    dni: '',
    nombres: '',
    apellidos: '',
    nivel: 0,
    sexo: '',
    fecha_nacimiento: '',
    grado: 0,
    seccion: '',
    domicilio_actual: '',
    referencia: '',
    tipo_seguro: '',
    discapacidad: ''
  };

  isOpen = false;

  @Output() alumnoGuardadoEvent = new EventEmitter<Alumno>();
  @Output() cerrarModalEvent = new EventEmitter<void>();

  constructor(
    private nivelEducativoService: NivelEducativoService,
    private gradoAcademicoService: GradoAcademicoService,
    private alumnoService: AlumnoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarNiveles();
    this.cargarGrados();
  }

  cargarNiveles(): void {
    this.nivelEducativoService.allNiveles().subscribe(niveles => {
      this.niveles = niveles;
      if (this.niveles.length > 0) {
        this.nivelSeleccionado = this.niveles[0];
      }
    });
  }

  cargarGrados(): void {
    this.gradoAcademicoService.allGrados().subscribe(
      grados => {
        this.grados = grados;
        if (this.grados.length > 0) {
          this.gradoSeleccionado = this.grados[0];
        } else {
          this.gradoSeleccionado = null;
        }
      },
      error => {
        console.error('Error al cargar los grados:', error);
      }
    );
  }
  
  abrirModalAdd(): void {
    this.isOpen = true;
  }

  cerrarModal(): void {
    this.isOpen = false;
    this.limpiarCampos();
    this.cerrarModalEvent.emit();
  }

  limpiarCampos(): void {
    if (this.niveles.length > 0) {
      this.nivelSeleccionado = this.niveles[0];
    }
    if (this.grados.length > 0) {
      this.gradoSeleccionado = this.grados[0];
    }
  }


  guardarAlumno(): void {
    if (this.nivelSeleccionado && this.gradoSeleccionado) {
      this.alumno.nivel = this.nivelSeleccionado.id_nivelacademico || 0; // Asigna el ID del nivel seleccionado o 0 si es null
      this.alumno.grado = this.gradoSeleccionado.id_grdacademico || 0; // Asigna el ID del grado seleccionado o 0 si es null

      this.alumnoService.addAlumno(this.alumno).subscribe(
        nuevoAlumno => {
          this.toastr.success('Alumno guardado exitosamente');
          this.alumnoGuardadoEvent.emit(nuevoAlumno);
          this.cerrarModal();
        },
        error => {
          this.toastr.error('Error al guardar el alumno');
          console.error('Error al guardar el alumno', error);
        }
      );
    } else {
      this.toastr.error('Debe seleccionar un nivel y un grado para el alumno');
    }
  }
}
