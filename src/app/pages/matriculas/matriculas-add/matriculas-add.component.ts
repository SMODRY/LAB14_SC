import { Component } from '@angular/core';
import { PadresComponent } from '../../admin_personal/padres/padres.component';
import { EstudiantesComponent } from '../../admin_personal/estudiantes/estudiantes.component';
import { Padre } from '../../../core/models/padre.model';
import { PadreService } from '../../../core/services/padre.service';
import { PadreAddComponent } from '../../admin_personal/padres/padre-add/padre-add.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PadreEditComponent } from '../../admin_personal/padres/padre-edit/padre-edit.component';
import { PadresListComponent } from '../../admin_personal/padres/padres-list/padres-list.component';

@Component({
  selector: 'app-matriculas-add',
  standalone: true,
  imports: [PadresComponent, EstudiantesComponent, PadreAddComponent, FormsModule, CommonModule, PadreEditComponent, PadresListComponent],
  templateUrl: './matriculas-add.component.html',
  styleUrl: './matriculas-add.component.css'
})

export class MatriculasAddComponent {
  padres: Padre[] = [];
  idPadreSeleccionado: number | null = null;
  padreSeleccionado: Padre | null = null;
  showPadreDatatable = false;
  showMadreDatatable = false;
  searchTerm: string = '';

  constructor(private padreService: PadreService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadPadres();
  }

  loadPadres(): void {
    this.padreService.allPadres().subscribe(
      data => {
        this.padres = data;
      },
      error => {
        this.toastr.error('Error al cargar los padres');
        console.error('Error al cargar los padres:', error);
      }
    );
  }

  openPadreDatatable() {
    this.showPadreDatatable = true;
    this.showMadreDatatable = false;
  }

  openMadreDatatable() {
    this.showPadreDatatable = false;
    this.showMadreDatatable = true;
  }

  onPadreSeleccionado(padre: Padre | null) {
    this.padreSeleccionado = padre;
    if (padre) {
      const campoPadre = document.getElementById('campoPadre') as HTMLInputElement;
      campoPadre.value = `${padre.dni} - ${padre.apellidos_nombres}`;
      this.idPadreSeleccionado = padre.id_padre || null;
    } else {
      this.limpiarCampoPadre();
      this.idPadreSeleccionado = null;
    }
  }

  limpiarCampoPadre() {
    const campoPadre = document.getElementById('campoPadre') as HTMLInputElement;
    campoPadre.value = '';
  }

  saveMatricula() {
    console.log('Matrícula guardada con:', this.padreSeleccionado, this.idPadreSeleccionado);
    // Aquí puedes implementar la lógica para guardar la matrícula
  }
}

