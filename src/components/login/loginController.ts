/* eslint-disable class-methods-use-this */
import LoginModel from './loginModel';

export default class LoginController {
  model: LoginModel;

  constructor() {
    this.model = new LoginModel();
  }

  validateForm(nameInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    const firstNameValid = this.model.validateEmail(nameInput.value);
    const lastNameValid = this.model.validatePassword(passwordInput.value);
    return firstNameValid && lastNameValid;
  }

  validateEmailInput(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const isInputValid = this.model.validateEmail(input.value);
    if (isInputValid) {
      input.setCustomValidity('');
      this.updateInputValidity(input, true);
      return;
    }
    const errorMessage = this.model.createEmailValidationMessage(input.value);
    input.setCustomValidity(errorMessage);
    input.reportValidity();
    this.updateInputValidity(input, false);
  }

  validatePasswordInput(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const isInputValid = this.model.validatePassword(input.value);
    if (isInputValid) {
      input.setCustomValidity('');
      this.updateInputValidity(input, true);
      return;
    }
    const errorMessage = this.model.createPasswordValidationMessage(input.value);
    input.setCustomValidity(errorMessage);
    input.reportValidity();
    this.updateInputValidity(input, false);
  }

  updateInputValidity(input: HTMLInputElement, isValid: boolean) {
    if (!isValid) {
      input.classList.add('input-invalid');
    } else {
      input.classList.remove('input-invalid');
    }
  }

  updateButtonValidity(
    button: HTMLInputElement | null,
    nameInput: HTMLInputElement | null,
    passwordInput: HTMLInputElement | null
  ) {
    if (!button || !nameInput || !passwordInput) {
      return;
    }
    button?.classList.toggle('active', this.validateForm(nameInput, passwordInput));
  }
}
