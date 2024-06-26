import HTMLCreator from '../HTMLCreator';
import LoginController from './loginController';
import parrotPath from '../../assets/parrot.webp';

export default class Login {
  controller: LoginController;

  constructor() {
    this.controller = new LoginController();
  }

  renderPage() {
    const loginWrapper = HTMLCreator.createElement('section', { class: 'login__wrapper' }, [
      HTMLCreator.createElement(
        'form',
        {
          id: 'loginForm',
          class: 'login__form form',
        },
        [
          HTMLCreator.createElement('input', { type: 'text', placeholder: 'Email', class: 'login__email input' }),
          HTMLCreator.createElement('p', { class: 'login__email-error login__error-hide' }, [
            `\u26A0\uFE0F There are no registered users with this email address. Check your email address or register.`,
          ]),
          HTMLCreator.createElement('div', { class: 'login__password-wrapper' }, [
            HTMLCreator.createElement('input', {
              type: 'password',
              placeholder: 'Password',
              class: 'login__password-input input',
            }),
            HTMLCreator.createElement('button', { class: 'login__password-control login__password-hide' }),
          ]),
          HTMLCreator.createElement('p', { class: 'login__password-error login__error-hide' }, [
            `\u26A0\uFE0F The password is incorrect, please check the password is correct. The password is case sensitive, please check your caps lock.`,
          ]),
          HTMLCreator.createElement(
            'button',
            { type: 'submit', form: 'loginForm', class: 'login__submit-button button', disabled: 'true' },
            [`Login`]
          ),
        ]
      ),
    ]);
    const iconPassword = loginWrapper.querySelector('.login__password-control') as HTMLElement;
    iconPassword.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill = black" clip-rule="evenodd" d="M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z" fill="#000000"/>
    </svg>`;
    const imageParrot = HTMLCreator.createElement('img', {
      class: 'login__main-container__image',
      src: parrotPath,
      alt: 'parrot',
    });
    const sectionContainer = HTMLCreator.createElement('section', { class: 'login__main-container' }, [
      imageParrot,
      loginWrapper,
    ]);
    const main = HTMLCreator.createElement('main', { class: 'login__main' }, [sectionContainer]);
    return main;
  }

  addEventListeners() {
    const emailInput = document.querySelector('.login__email') as HTMLInputElement;
    const passwordInput = document.querySelector('.login__password-input') as HTMLInputElement;
    const submitButtonInput = document.querySelector('.login__submit-button') as HTMLInputElement;
    const passwordButtonControl = document.querySelector('.login__password-control') as HTMLInputElement;
    const emailError = document.querySelector('.login__email-error') as HTMLInputElement;
    const passwordError = document.querySelector('.login__password-error') as HTMLInputElement;

    emailInput.addEventListener('input', (event) => {
      this.controller.updateButtonValidity(submitButtonInput, emailInput, passwordInput, emailError);
      this.controller.validateEmailInput(event);
    });

    passwordInput.addEventListener('input', (event) => {
      this.controller.updateButtonValidity(submitButtonInput, emailInput, passwordInput, passwordError);
      this.controller.validatePasswordInput(event);
    });

    passwordButtonControl.addEventListener('click', (event) => {
      this.controller.controlPassword(event, passwordInput);
    });

    submitButtonInput.addEventListener('click', async (event) => {
      const resultLogin = await this.controller.login(event, emailInput.value, passwordInput.value);
      this.checkLogin(resultLogin);
    });
  }

  checkLogin(resultLogin: string) {
    const emailInput = document.querySelector('.login__email') as HTMLInputElement;
    const passwordInput = document.querySelector('.login__password-input') as HTMLInputElement;
    const emailError = document.querySelector('.login__email-error') as HTMLInputElement;
    const passwordError = document.querySelector('.login__password-error') as HTMLInputElement;

    switch (resultLogin) {
      case 'loginSuccess':
        break;
      case 'errorEmail':
        emailInput.classList.add('login__input-invalid');
        emailError.classList.remove('login__error-hide');
        break;
      case 'errorPassword':
        passwordInput.classList.add('login__input-invalid');
        passwordError.classList.remove('login__error-hide');
        break;
      default:
    }
  }
}
