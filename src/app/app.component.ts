import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualScrollTreeComponent } from './virtual-scroll-tree/virtual-scroll-tree.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    VirtualScrollTreeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
