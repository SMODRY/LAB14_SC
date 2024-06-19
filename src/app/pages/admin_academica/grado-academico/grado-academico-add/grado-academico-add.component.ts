import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NivelAcademico } from '../../../../core/models/nivel-academico.model';
import { NivelEducativoService } from '../../../../core/services/nivel-educativo.service';
import { GradoAcademicoService } from '../../../../core/services/grado-academico.service';
import { GradoAcademico } from '../../../../core/models/grado-academico.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grado-academico-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grado-academico-add.component.html',
  styleUrls: ['./grado-academico-add.component.css']
})
export class GradoAcademicoAddComponent implements OnInit {

  @Output() cerrarModalEvent = new EventEmitter<void>();
  @Output() gradoGuardadoEvent = new EventEmitter<void>();
  isOpen = false;
  descripcion: string = '';
  niveles: NivelAcademico[] = [];
  nivelSeleccionado: NivelAcademico | null = null;

  constructor(
    private nivelEducativoService: NivelEducativoService,
    private gradoAcademicoService: GradoAcademicoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarNiveles();
  }

  cargarNiveles(): void {
    this.nivelEducativoService.allNiveles().subscribe(
      niveles => {
        this.niveles = niveles;
        if (this.niveles.length > 0) {
          this.nivelSeleccionado = this.niveles[0];
        } else {
          this.nivelSeleccionado = null;
        }
      },
      error => {
        console.error('Error al cargar los niveles académicos:', error);
        this.toastr.error('Error al cargar los niveles académicos');
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
    this.descripcion = '';
    if (this.niveles.length > 0) {
      this.nivelSeleccionado = this.niveles[0];
    } else {
      this.nivelSeleccionado = null;
    }
  }


  guardarGrado(): void {
    if (this.descripcion && this.nivelSeleccionado) {
      const nuevoGrado: GradoAcademico = {
        descripcion: this.descripcion,
        id_nivel: this.nivelSeleccionado.id_nivelacademico!,
        nivel_nombre: this.nivelSeleccionado.nombre
      };
      this.gradoAcademicoService.checkGradoExists(this.descripcion.toLowerCase(), this.nivelSeleccionado.id_nivelacademico!).subscribe(exists => {
        if (exists) {
          this.toastr.error('El grado con esa descripción ya existe en el nivel seleccionado.');
        } else {
          this.gradoAcademicoService.addGrado(nuevoGrado).subscribe(
            () => {
              this.toastr.success('Grado académico guardado exitosamente');
              this.gradoGuardadoEvent.emit();
              this.cerrarModal();
            },
            error => {
              this.toastr.error('Error al guardar el grado académico');
              console.error('Error al guardar el grado académico:', error);
            }
          );
        }
      });
    } else {
      this.toastr.warning('La descripción del grado académico no puede estar vacía y debe seleccionar un nivel.');
    }
  }
}









