import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavPaginationComponent } from '../../../shared/components/navPagination/navPagination.component';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, NavPaginationComponent],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent {

  getData(data: any){
    console.log(data)
  }

}
