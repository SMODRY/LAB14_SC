import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { NavPaginationComponent } from '../../../shared/components/navPagination/navPagination.component';
import { NivelAcademico } from '../../../core/models/nivel-academico.model';
import { NivelEducativoAddComponent } from './nivel-educativo-add/nivel-educativo-add.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NivelEducativoEditComponent } from './nivel-educativo-edit/nivel-educativo-edit.component';
import { NivelEducativoDeleteComponent } from './nivel-educativo-delete/nivel-educativo-delete.component';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { NivelEducativoService } from '../../../core/services/nivel-educativo.service';

@Component({
  selector: 'app-nivel-educativo',
  standalone: true,
  imports: [CommonModule,
    NavPaginationComponent,
    NivelEducativoAddComponent,
    NivelEducativoEditComponent,
    NivelEducativoDeleteComponent,
    FormsModule, FilterPipe],
  templateUrl: './nivel-educativo.component.html',
  styleUrl: './nivel-educativo.component.css',
})

export class NivelEducativoComponent implements OnInit {
  niveles: NivelAcademico[] = [];
  searchText: string = '';
  selectedNivel: NivelAcademico | null = null;
  nivel: NivelAcademico | null = null;

  @ViewChild(NivelEducativoAddComponent) modal!: NivelEducativoAddComponent;
  @ViewChild(NivelEducativoEditComponent) modalEdit!: NivelEducativoEditComponent;
  @ViewChild(NivelEducativoDeleteComponent) modalDelete!: NivelEducativoDeleteComponent;

  constructor(private nivelEducativoService: NivelEducativoService) {}
  private toastr = inject(ToastrService);

  mostrarModal = false;

  ngOnInit(): void {
    this.allNiveles();
    this.loadNiveles();
  }

  recargar(): void {
    this.allNiveles();
  }

  allNiveles(): void {
    this.nivelEducativoService.allNiveles().subscribe(
      (data) => {
        this.niveles = data;
      },
      (error) => {
        this.toastr.error('Error fetching niveles');
        console.error('Error fetching niveles:', error);
      }
    );
  }

  loadNiveles() {
    this.nivelEducativoService.allNiveles().subscribe(
      data => {
        this.niveles = data;
      },
      error => {
        this.toastr.error('Error al cargar los niveles');
        console.error('Error al cargar los niveles:', error);
      }
    );
  }

  abrirModalAdd() {
    this.modal.abrirModalAdd();
  }

  onNivelGuardado() {
    this.allNiveles();
    this.loadNiveles();
  }

  abrirModalEdit(nivel: NivelAcademico) {
    this.selectedNivel = { ...nivel };
    this.modalEdit.nivel = this.selectedNivel;
    this.modalEdit.abrirModal();
  }

  abrirModalDelete(nivel: NivelAcademico) {
    this.selectedNivel = { ...nivel };
    this.modalDelete.nivel = this.selectedNivel;
    this.modalDelete.abrirModal();
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  onNivelActualizado() {
    this.allNiveles();
  }

}
