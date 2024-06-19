import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PadreService } from '../../../../core/services/padre.service';
import { Padre } from '../../../../core/models/padre.model';

@Component({
  selector: 'app-padre-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './padre-edit.component.html',
  styleUrls: ['./padre-edit.component.css']
})
export class PadreEditComponent {

  @Input() padre: Padre | null = null;
  @Output() cerrarModalEvent = new EventEmitter<void>();
  @Output() actualizarPadreEvent = new EventEmitter<void>();

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

  updatePadre(event: Event, field: keyof Padre) {
    const input = event.target as HTMLInputElement;
    if (this.padre) {
      // Type assertion to bypass type error
      (this.padre[field] as unknown as string) = input.value;
    }
  }

  actualizarPadre() {
    if (this.padre) {
      this.padreService.updatePadre(this.padre).subscribe(
        () => {
          this.toastr.success('Padre actualizado exitosamente');
          this.cerrarModal();
          this.actualizarPadreEvent.emit();
        },
        (error) => {
          this.toastr.error('Error al actualizar el padre');
          console.error('Error al actualizar el padre:', error);
        }
      );
    }
  }
}
