import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PadreService } from '../../../../core/services/padre.service';
import { ToastrService } from 'ngx-toastr';
import { Padre } from '../../../../core/models/padre.model';

@Component({
  selector: 'app-padre-add',
  standalone: true,
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './padre-add.component.html',
  styleUrl: './padre-add.component.css',
})
export class PadreAddComponent {

  @Output() cerrarModalEvent = new EventEmitter<void>();
  @Output() padreGuardadoEvent = new EventEmitter<void>();
  isOpen = false;

  padre: Padre = {
    codigo: '',
    apellidos_nombres: '',
    parentesco: '',
    dni: '',
    ocupacion: '',
    centro_trabajo: '',
    direccion: '',
    telefono_celular: '',
    estado_civil: '',
    fecha_nacimiento: ''
  };
  constructor(private padreService: PadreService, private toastr: ToastrService) {}

  abrirModalAdd() {
    this.isOpen = true;
  }

  cerrarModal() {
    this.isOpen = false;
    this.cerrarModalEvent.emit();
  }

  guardarPadre() {
    this.padreService.addPadre(this.padre).subscribe(
      () => {
        this.toastr.success('Padre guardado exitosamente');
        this.padreGuardadoEvent.emit();
        this.cerrarModal();
      },
      error => {
        this.toastr.error('Error al guardar el padre');
        console.error('Error al guardar el padre', error);
      }
    );
  }
  
}
