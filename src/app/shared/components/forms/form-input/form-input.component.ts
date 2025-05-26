import {
  booleanAttribute,
  Component,
  forwardRef,
  Input,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
  standalone: true
})
export class FormInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string | null = null;
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input({transform: booleanAttribute}) required = false;
  @Input() name = '';
  @Input() control: AbstractControl  | null = null;

  value: string = '';
  disabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  ngOnInit(): void {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  getErrorMessage(): string {
    if (!this.control || !this.control.errors) return '';

    if (this.control.errors['required']) {
      return `${this.label ?? 'This field'} is required.`;
    }

    if (this.control.errors['email']) {
      return `Please enter a valid email address.`;
    }

    // Add more error types as needed
    return 'Invalid field';
  }
}
