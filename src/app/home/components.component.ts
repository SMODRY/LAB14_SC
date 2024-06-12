import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { components } from './components';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './components.component.html',
  styles: ''
})
export class ComponentsComponent implements OnInit{
  components = components;

  ngOnInit(): void {
    initFlowbite();
    console.log(components)
  }
}
