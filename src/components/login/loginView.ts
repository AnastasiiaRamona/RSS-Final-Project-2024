/* eslint-disable class-methods-use-this */
import HTMLCreation from '../HTMLCreation';
import LoginController from './loginController';

export default class Login {
  controller: LoginController;

  constructor() {
    this.controller = new LoginController();
  }

  static renderPage() {
    const loginWrapper = HTMLCreation.createElement('section', { class: 'login__wrapper' }, [
      HTMLCreation.createElement(
        'form',
        {
          id: 'loginform',
          class: 'login__form form',
        },
        [
          HTMLCreation.createElement('input', { type: 'text', placeholder: 'Email', class: 'login__email input' }),
          HTMLCreation.createElement('input', {
            type: 'password',
            placeholder: 'Password',
            class: 'login__password input',
          }),
          HTMLCreation.createElement(
            'button',
            { type: 'submit', form: 'loginform', class: 'login__submit-button button' },
            [`LOGIN`]
          ),
          HTMLCreation.createElement('button', { class: 'login__registration-button button' }, ['Registration']),
        ]
      ),
    ]);

    const main = HTMLCreation.createElement('main', {}, [loginWrapper]);
    const body = document.querySelector('body') as HTMLElement;
    body.append(main);
    return main;
  }

  addEventListeners() {
    const nameInput = document.querySelector('.login__email') as HTMLInputElement;
    const passwordInput = document.querySelector('.login__password') as HTMLInputElement;
    const submitButtonInput = document.querySelector('.login__submit-button') as HTMLInputElement;
    nameInput?.addEventListener('input', (event) => {
      this.controller.updateButtonValidity(submitButtonInput, nameInput, passwordInput);
      this.controller.validateEmailInput(event);
    });

    passwordInput?.addEventListener('input', (event) => {
      this.controller.updateButtonValidity(submitButtonInput, nameInput, passwordInput);
      this.controller.validatePasswordInput(event);
    });
  }
}
