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
    emailInput: HTMLInputElement | null,
    passwordInput: HTMLInputElement | null,
    errorText: HTMLInputElement | null
  ) {
    if (!button || !emailInput || !passwordInput) {
      return;
    }
    button.classList.toggle('login__button-active', this.validateForm(emailInput, passwordInput));
    errorText?.classList.add('login__error-hide');
    if (this.validateForm(emailInput, passwordInput)) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', 'true');
    }
  }

  controlPassword(event: Event, passwordInput: HTMLElement) {
    event.preventDefault();
    const input = event.currentTarget as HTMLInputElement;
    input.classList.toggle('login__password-hide');
    if (input.classList.contains('login__password-hide')) {
      passwordInput.setAttribute('type', 'password');
    } else passwordInput.setAttribute('type', 'text');
  }

  async login(event: Event, email: string, password: string) {
    event.preventDefault();
    let result: string;
    const response = await this.model.login(email, password);
    if (response) {
      result = 'loginSuccess';
    } else {
      const emailStatus = await this.model.emailCheck(email);
      if (emailStatus) {
        result = 'errorPassword';
      } else {
        result = 'errorEmail';
      }
    }
    return result;
  }
}
