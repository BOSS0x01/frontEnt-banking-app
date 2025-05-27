import { Component ,Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-panel',
  imports: [
    NgClass
  ],
  templateUrl: './panel.component.html',
  standalone: true,
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  @Input() title: string = "";
  @Input() containerClass = '';
}
