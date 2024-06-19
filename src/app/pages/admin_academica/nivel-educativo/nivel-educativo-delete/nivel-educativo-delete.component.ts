import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NivelAcademico } from '../../../../core/models/nivel-academico.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NivelEducativoService } from '../../../../core/services/nivel-educativo.service';

@Component({
  selector: 'app-nivel-educativo-delete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nivel-educativo-delete.component.html',
  styleUrl: './nivel-educativo-delete.component.css'
})
export class NivelEducativoDeleteComponent {
  
  @Input() nivel: NivelAcademico | null = null;
  @Output() cerrarModalEvent = new EventEmitter<void>();
  @Output() eliminarNivelEvent = new EventEmitter<void>();

  isOpen = false;

  constructor(
    private nivelEducativoService: NivelEducativoService,
    private toastr: ToastrService
  ) {}

  abrirModal() {
    this.isOpen = true;
  }

  cerrarModal() {
    this.isOpen = false;
    this.cerrarModalEvent.emit();
  }

  eliminarNivel() {
    if (this.nivel && this.nivel.id_nivelacademico !== undefined) {
      this.nivelEducativoService.deleteNivel(this.nivel.id_nivelacademico).subscribe(
        () => {
          this.toastr.success('Nivel eliminado exitosamente');
          this.cerrarModal();
          this.eliminarNivelEvent.emit();
        },
        (error) => {
          this.toastr.error('Error al eliminar el nivel');
          console.error('Error al eliminar el nivel:', error);
        }
      );
    } else {
      console.error('ID del nivel académico no definido');
    }
  }
}
