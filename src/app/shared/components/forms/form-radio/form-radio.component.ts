import {Component, Input} from '@angular/core';
import {ControlValueAccessor, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-form-radio',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-radio.component.html',
  standalone: true,
  styleUrl: './form-radio.component.css'
})
export class FormRadioComponent  implements ControlValueAccessor {
  @Input() name!: string;
  @Input() label?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() control: any;
  @Input() options: { value: string; label: string }[] = [];

  value: string = '';

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

  handleChange(value: string) {
    this.value = value;
    this.onChange(value);
  }

  getErrorMessage(): string {
    if (!this.control || !this.control.errors) return '';
    const errors = this.control.errors;
    if (errors['required']) return 'this field is required.';
    return 'Invalid field';
  }
}
