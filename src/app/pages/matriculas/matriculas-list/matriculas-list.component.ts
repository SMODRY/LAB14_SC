import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';

@Component({
  selector: 'app-matriculas-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe],
  templateUrl: './matriculas-list.component.html',
  styleUrl: './matriculas-list.component.css'
})
export class MatriculasListComponent {
  searchTerm: string = '';

}
