import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { GradoAcademico } from '../../../core/models/grado-academico.model';
import { GradoAcademicoService } from '../../../core/services/grado-academico.service';
import { GradoAcademicoAddComponent } from './grado-academico-add/grado-academico-add.component';
import { GradoAcademicoEditComponent } from './grado-academico-edit/grado-academico-edit.component';
import { GradoAcademicoDeleteComponent } from './grado-academico-delete/grado-academico-delete.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';

@Component({
  selector: 'app-grado-academico',
  standalone: true,
  imports: [CommonModule,
    FormsModule, FilterPipe,
    GradoAcademicoAddComponent,
    GradoAcademicoEditComponent,
    GradoAcademicoDeleteComponent],
  templateUrl: './grado-academico.component.html',
  styleUrl: './grado-academico.component.css'
})
export class GradoAcademicoComponent implements OnInit {
  grados: GradoAcademico[] = [];
  searchTerm: string = '';
  selectedGrado: GradoAcademico | null = null;
  grado: GradoAcademico | null = null;

  @ViewChild(GradoAcademicoAddComponent) modal!: GradoAcademicoAddComponent;  // Referencia al componente hijo
  @ViewChild(GradoAcademicoEditComponent) modalEdit!: GradoAcademicoEditComponent;
  @ViewChild(GradoAcademicoDeleteComponent) modalDelete!: GradoAcademicoDeleteComponent;

  constructor(private gradoEducativoService:GradoAcademicoService) {}
  private toastr = inject(ToastrService);

  mostrarModal = false;

  ngOnInit(): void {
    this.loadGrados();
    this.allGrados();
  }

  recargar(): void {
    this.allGrados();
  }

  allGrados(): void {
    this.gradoEducativoService.allGrados().subscribe(
      (data) => {
        this.grados = data;
      },
      (error) => {
        this.toastr.error('Error fetching grados');
        console.error('Error fetching grados:', error);
      }
    );
  }

  loadGrados(): void {
    this.gradoEducativoService.allGrados().subscribe(
      data => {
        this.grados = data;
      },
      error => {
        this.toastr.error('Error al cargar los grados');
        console.error('Error al cargar los grados:', error);
      }
    );
  }

  abrirModalAdd() {
    this.modal.abrirModalAdd();
  }

  onGradoGuardado() {
    this.allGrados();
    this.loadGrados();
  }

  abrirModalEdit(grado: GradoAcademico) {
    this.selectedGrado = { ...grado };
    this.modalEdit.grado = this.selectedGrado;
    this.modalEdit.abrirModal();
  }


  abrirModalDelete(grado: GradoAcademico) {
    this.grado = { ...grado };
    this.modalDelete.grado = this.grado;
    this.modalDelete.abrirModal();
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  onGradoActualizado() {
    this.allGrados();
  }
}
