import HTMLCreation from '../HTMLCreation';
import LoginController from './loginController';

export default class Login {
  controller: LoginController;

  constructor() {
    this.controller = new LoginController();
  }

  renderPage() {
    const loginWrapper = HTMLCreation.createElement('section', { class: 'login__wrapper' }, [
      HTMLCreation.createElement(
        'form',
        {
          id: 'loginform',
          class: 'login__form',
        },
        [
          HTMLCreation.createElement('input', { type: 'text', placeholder: 'Username', class: 'login__username' }),
          HTMLCreation.createElement('input', { type: 'password', placeholder: 'Password', class: 'login__password' }),
          HTMLCreation.createElement('button', { type: 'submit', value: 'Login', class: 'login__submit-button' }),
        ]
      ),
    ]);

    const registrationButton = HTMLCreation.createElement('div', { class: 'login__registration-wrapper' }, [
      HTMLCreation.createElement('button', { class: 'login__registration-button' }, ['Registration']),
    ]);

    const main = HTMLCreation.createElement('main', {}, [loginWrapper, registrationButton]);

    const body = document.querySelector('body') as HTMLElement;
    body.append(main);
  }
}
