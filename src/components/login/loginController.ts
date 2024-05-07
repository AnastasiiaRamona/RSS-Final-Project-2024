/* eslint-disable class-methods-use-this */
import LoginModel from './loginModel';

export default class LoginController {
  model: LoginModel;

  constructor() {
    this.model = new LoginModel();
  }

  validateForm(emailInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    const firstNameValid = this.model.validateEmail(emailInput.value);
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
      input.classList.add('login__input-invalid');
    } else {
      input.classList.remove('login__input-invalid');
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
    button.classList.toggle('login__button-active', this.validateForm(nameInput, passwordInput));
  }

  controlPassword(event: Event, passwordInput: HTMLElement) {
    event.preventDefault();
    const input = event.currentTarget as HTMLInputElement;
    input.classList.toggle('login__password-hide');
    if (input.classList.contains('login__password-hide')) {
      passwordInput.setAttribute('type', 'password');
    } else passwordInput.setAttribute('type', 'text');
  }
}
