import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GradoAcademico } from '../../../../core/models/grado-academico.model';
import { GradoAcademicoService } from '../../../../core/services/grado-academico.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grado-academico-delete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grado-academico-delete.component.html',
  styleUrl: './grado-academico-delete.component.css'
})
export class GradoAcademicoDeleteComponent {
  @Input() grado: GradoAcademico | null = null;
  @Output() cerrarModalEvent = new EventEmitter<void>();
  @Output() eliminarGradoEvent = new EventEmitter<void>();

  isOpen = false;

  constructor(
    private gradoAcademicoService: GradoAcademicoService,
    private toastr: ToastrService
  ) {}

  abrirModal() {
    this.isOpen = true;
  }

  cerrarModal() {
    this.isOpen = false;
    this.cerrarModalEvent.emit();
  }

  eliminarGrado() {
    if (this.grado && this.grado.id_grdacademico !== undefined) {
      this.gradoAcademicoService.deleteGrado(this.grado.id_grdacademico).subscribe(
        () => {
          this.toastr.success('Grado eliminado exitosamente');
          this.cerrarModal();
          this.eliminarGradoEvent.emit();
        },
        (error) => {
          this.toastr.error('Error al eliminar el grado');
          console.error('Error al eliminar el grado:', error);
        }
      );
    } else {
      console.error('ID del grado académico no definido');
    }
  }
}
