import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormResetEvent, FormsModule } from '@angular/forms';
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
  styleUrl: './grado-academico-add.component.css'
})
export class GradoAcademicoAddComponent implements OnInit{

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
    this.nivelEducativoService.allNiveles().subscribe(niveles => {
      this.niveles = niveles;
      if (this.niveles.length > 0) {
        this.nivelSeleccionado = this.niveles[0];
      }
    });
  }

  abrirModalAdd() {
    this.isOpen = true;
  }

  cerrarModal(): void {
    this.isOpen = false;
    this.limpiarCampos();
    this.cerrarModalEvent.emit();
  }

  limpiarCampos(): void {
    this.descripcion = '';
    this.nivelSeleccionado = this.niveles[0];
  }

  guardarGrado(): void {
    if (this.descripcion && this.nivelSeleccionado) {
      const nuevoGrado: GradoAcademico = {
        descripcion: this.descripcion,
        id_nivel: this.nivelSeleccionado.id_nivelacademico!,
        nivel_nombre: this.nivelSeleccionado.nombre
      };

      this.gradoAcademicoService.addGrado(nuevoGrado).subscribe(
        () => {
        this.toastr.success('Grado academico guardado exitosamente');
        this.gradoGuardadoEvent.emit();
        this.cerrarModal();
      },
      error => {
        this.toastr.error('Error al guardar el grado academico');
        console.error('Error al guardar el grado academico:', error);
      }
    );
   }
  }
}
