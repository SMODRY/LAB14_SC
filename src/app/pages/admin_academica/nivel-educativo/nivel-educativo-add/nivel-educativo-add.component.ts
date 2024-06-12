import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NivelAcademico } from '../../../../core/models/nivel-academico.model';
import { ToastrService } from 'ngx-toastr';  // Importa el servicio Toastr
import { NivelEducativoService } from '../../../../core/services/nivel-educativo.service';

@Component({
  selector: 'app-nivel-educativo-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nivel-educativo-add.component.html',
  styleUrl: './nivel-educativo-add.component.css',
})
export class NivelEducativoAddComponent {

  @Output() cerrarModalEvent = new EventEmitter<void>();
  @Output() nivelGuardadoEvent = new EventEmitter<void>();
  isOpen = false;
  nivel: string = '';

  constructor(private nivelEducativoService: NivelEducativoService, private toastr: ToastrService) {}

  abrirModalAdd() {
    this.isOpen = true;
  }

  cerrarModal() {
    this.isOpen = false;
    this.cerrarModalEvent.emit();
  }

  guardarNivel() {
    const nuevoNivel: NivelAcademico = { nombre: this.nivel };

    this.nivelEducativoService.addNivel(nuevoNivel).subscribe(
      () => {
        this.toastr.success('Nivel educativo guardado exitosamente');
        this.nivelGuardadoEvent.emit();
        this.cerrarModal();
      },
      error => {
        this.toastr.error('Error al guardar el nivel educativo');
        console.error('Error al guardar el nivel educativo:', error);
      }
    );
  }

}
