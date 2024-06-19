import { NivelEducativoAddComponent } from './../nivel-educativo-add/nivel-educativo-add.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NivelAcademico } from '../../../../core/models/nivel-academico.model';
import { ToastrService } from 'ngx-toastr';
import { NivelEducativoService } from '../../../../core/services/nivel-educativo.service';

@Component({
  selector: 'app-nivel-educativo-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nivel-educativo-edit.component.html',
  styleUrl: './nivel-educativo-edit.component.css'
})
export class NivelEducativoEditComponent {

  @Input() nivel: NivelAcademico | null = null;
  @Output() cerrarModalEvent = new EventEmitter<void>();
  @Output() actualizarNivelEvent = new EventEmitter<void>();

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

  updateNivelNombre(event: any) {
    if (this.nivel) {
      this.nivel.nombre = event.target.value;
    }
  }
  actualizarNivel() {
    if (this.nivel && this.nivel.nombre.trim()) {
      const nivel = this.nivel;
      this.nivelEducativoService.checkNivelExists(nivel.nombre).subscribe(exists => {
        if (exists) {
          this.toastr.error('El nombre del nivel académico ya existe');
        } else {
          this.nivelEducativoService.updateNivel(nivel).subscribe(
            () => {
              this.toastr.success('Nivel actualizado exitosamente');
              this.cerrarModal();
              this.actualizarNivelEvent.emit();
            },
            error => {
              this.toastr.error('Error al actualizar el nivel');
              console.error('Error al actualizar el nivel:', error);
            }
          );
        }
      });
    } else {
      this.toastr.warning('El nombre del nivel académico no puede estar vacío');
    }
  }
}
