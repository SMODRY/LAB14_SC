import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { Padre } from '../../../../core/models/padre.model';
import { PadreEditComponent } from '../padre-edit/padre-edit.component';
import { PadreDeleteComponent } from '../padre-delete/padre-delete.component';
import { PadreService } from '../../../../core/services/padre.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';
import { ToastrService } from 'ngx-toastr';
import { EncabezadoDinamicoDirective } from '../../../../shared/directives/encabezado-dinamico.directive';
import { PadreAddComponent } from '../padre-add/padre-add.component';

@Component({
    selector: 'app-padres-list',
    standalone: true,
    templateUrl: './padres-list.component.html',
    styleUrls: ['./padres-list.component.css'],  // Cambié 'styleUrl' a 'styleUrls'
    imports: [CommonModule, FormsModule, FilterPipe, PadreEditComponent, PadreDeleteComponent, EncabezadoDinamicoDirective, PadreAddComponent],
})
export class PadresListComponent implements OnInit, OnChanges {
  @Input() enableSelection: boolean = false;
  @Input() padres: Padre[] = [];
  @Output() addPadre = new EventEmitter<void>();
  @Output() padreSeleccionadoEvent = new EventEmitter<Padre>();
  @Output() selectPadre = new EventEmitter<Padre>();
  @Output() editPadre = new EventEmitter<Padre>();
  @Output() deletePadre = new EventEmitter<Padre>();

  searchText: string = '';
  selectedPadre: Padre | null = null;  // Cambié el nombre de la variable para evitar conflictos

  @ViewChild(PadreAddComponent) modalAdd!: PadreAddComponent;
  @ViewChild(PadreEditComponent) modalEdit!: PadreEditComponent;
  @ViewChild(PadreDeleteComponent) modalDelete!: PadreDeleteComponent;

  encabezados: string[] = [
    'ID', 'Código', 'Apellidos y Nombres', 'Parentesco', 'DNI', 'Ocupación', 'Centro de Trabajo',
    'Dirección', 'Teléfono Celular', 'Estado Civil', 'Fecha de Nacimiento', 'Acciones'
  ];

  constructor(private padreService: PadreService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadPadres();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['padres']) {
      this.loadPadres();
    }
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

  abrirModalEdit(padre: Padre) {
    this.selectedPadre = { ...padre };
    this.modalEdit.padre = this.selectedPadre;
    this.modalEdit.abrirModal();
  }

  abrirModalDelete(padre: Padre) {
    this.selectedPadre = { ...padre };
    this.modalDelete.padre = this.selectedPadre;
    this.modalDelete.abrirModal();
  }

  recargar() {
    this.loadPadres();
  }

  abrirModalAdd(): void {
    this.modalAdd.abrirModalAdd();
  }

  onPadreGuardado(): void {
    this.recargar();
  }

  onAddPadre() {
    this.addPadre.emit();
  }

  onSelectPadre(padre: Padre, event: Event): void {
    this.selectPadre.emit(padre);
  }
  onEditPadre(padre: Padre): void {
    this.editPadre.emit(padre);
  }

  onDeletePadre(padre: Padre): void {
    this.deletePadre.emit(padre);
  }
}
