import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GradoAcademico } from '../../../../core/models/grado-academico.model';
import { GradoAcademicoService } from '../../../../core/services/grado-academico.service';
import { ToastrService } from 'ngx-toastr';
import { NivelAcademico } from '../../../../core/models/nivel-academico.model';
import { NivelEducativoService } from '../../../../core/services/nivel-educativo.service';

@Component({
  selector: 'app-grado-academico-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grado-academico-edit.component.html',
  styleUrl: './grado-academico-edit.component.css'
})
export class GradoAcademicoEditComponent implements OnInit{
  @Input() grado: GradoAcademico | null = null;
  @Output() cerrarModalEvent = new EventEmitter<void>();
  @Output() actualizarGradoEvent = new EventEmitter<void>();

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
    this.cargarDatos();
  }

  cargarNiveles(): void {
    this.nivelEducativoService.allNiveles().subscribe(niveles => {
      this.niveles = niveles;
    });
  }

  cargarDatos(): void {
    if (this.grado !== null && this.grado !== undefined) {
      this.descripcion = this.grado.descripcion;
      this.nivelSeleccionado = this.niveles.find(nivel => nivel.id_nivelacademico === this.grado?.id_nivel) || null;
    }
  }


  abrirModal(): void {
    this.isOpen = true;
    this.cargarDatos();
  }

  cerrarModal(): void {
    this.isOpen = false;
    this.cerrarModalEvent.emit();
  }

  actualizarGrado(): void {
    if (this.grado && this.descripcion && this.nivelSeleccionado) {
      this.grado.descripcion = this.descripcion;
      this.grado.id_nivel = this.nivelSeleccionado.id_nivelacademico!;

      this.gradoAcademicoService.updateGrado(this.grado).subscribe(
        () => {
          this.toastr.success('Grado académico actualizado exitosamente');
          this.actualizarGradoEvent.emit();
          this.cerrarModal();
        },
        (error) => {
          this.toastr.error('Error al actualizar el grado académico');
          console.error('Error al actualizar el grado académico:', error);
        }
      );
    }
  }
}
