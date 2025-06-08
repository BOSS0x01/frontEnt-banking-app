import {booleanAttribute, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-form-select',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-select.component.html',
  standalone: true,
  styleUrl: './form-select.component.css'
})
export class FormSelectComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() name!: string;
  @Input() required?: boolean = false;
  @Input() disabled = false;
  @Input() control: any;

  value: string | null = null;

  @Output() valueChange = new EventEmitter<string>();

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getErrorMessage(): string {
    if (!this.control || !this.control.errors) return '';

    if (this.control.errors['required']) {
      return `${this.label ?? 'This field'} is required.`;
    }
    return 'Invalid field';
  }

}
