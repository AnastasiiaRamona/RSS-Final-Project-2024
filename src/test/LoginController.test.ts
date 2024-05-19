import LoginModel from '../components/login/loginModel';
import LoginController from '../components/login/loginController';

jest.mock('../components/login/loginModel');

describe('LoginController', () => {
  let loginController: LoginController;
  let buttonElement: HTMLInputElement | null;
  let emailInputElement: HTMLInputElement | null;
  let passwordInputElement: HTMLInputElement | null;
  let errorTextElement: HTMLInputElement | null;

  beforeAll(() => {
    (LoginModel as jest.Mock).mockImplementation(() => null);
  });

  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <input id="emailInput" type="text" class="login__input">
        <input id="passwordInput" type="password" class="login__input">
        <button id="submitButton" class="login__button" disabled></button>
        <div id="errorText" class="login__error"></div>
      </div>
    `;
    loginController = new LoginController();
    buttonElement = document.getElementById('submitButton') as HTMLInputElement;
    emailInputElement = document.getElementById('emailInput') as HTMLInputElement;
    passwordInputElement = document.getElementById('passwordInput') as HTMLInputElement;
    errorTextElement = document.getElementById('errorText') as HTMLInputElement;
  });

  it('should update button validity correctly', () => {
    loginController.validateForm = jest.fn().mockReturnValue(true);

    loginController.updateButtonValidity(buttonElement, emailInputElement, passwordInputElement, errorTextElement);

    expect(buttonElement?.classList.contains('login__button-active')).toBe(true);
    expect(buttonElement?.disabled).toBe(false);
  });

  it('should disable button and show error text when form is invalid', () => {
    loginController.validateForm = jest.fn().mockReturnValue(false);

    loginController.updateButtonValidity(buttonElement, emailInputElement, passwordInputElement, errorTextElement);

    expect(buttonElement?.classList.contains('login__button-active')).toBe(false);
    expect(buttonElement?.disabled).toBe(true);
  });
});
