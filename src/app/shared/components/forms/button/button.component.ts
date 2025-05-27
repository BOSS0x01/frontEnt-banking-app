import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  standalone: true,
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() customClass = '';
  @Input() disabled!: boolean ;
}
