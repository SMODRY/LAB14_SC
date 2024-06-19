import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PadreService } from '../../../../core/services/padre.service';
import { Padre } from '../../../../core/models/padre.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-padre-delete',
  standalone: true,
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './padre-delete.component.html',
  styleUrl: './padre-delete.component.css',
})
export class PadreDeleteComponent {

  @Input() padre: Padre | null = null;
  @Output() cerrarModalEvent = new EventEmitter<void>();
  @Output() eliminarPadreEvent = new EventEmitter<void>();

  isOpen = false;

  constructor(
    private padreService: PadreService,
    private toastr: ToastrService
  ) {}

  abrirModal() {
    this.isOpen = true;
  }

  cerrarModal() {
    this.isOpen = false;
    this.cerrarModalEvent.emit();
  }

  eliminarPadre() {
    if (this.padre && this.padre.id_padre !== undefined) {
      this.padreService.deletePadre(this.padre.id_padre).subscribe(
        () => {
          this.toastr.success('Padre eliminado exitosamente');
          this.cerrarModal();
          this.eliminarPadreEvent.emit();
        },
        (error) => {
          this.toastr.error('Error al eliminar el padre');
          console.error('Error al eliminar el padre:', error);
        }
      );
    } else {
      console.error('ID del padre no definido');
    }
  }
}
