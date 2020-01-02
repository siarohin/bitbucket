import { AbstractControl } from "@angular/forms";

/**
 * Custom validator
 */
export class CustomValidator {
  static validateNumber(control: AbstractControl): { [key: string]: any } | null {
    const valid: boolean = /^\d+$/.test(control.value);
    return valid ? null : { invalidNumber: { valid: false, value: control.value } };
  }
}
