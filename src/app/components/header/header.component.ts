import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarService } from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(readonly sidebarService: SidebarService) {}

}
