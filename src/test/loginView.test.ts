import LoginView from '../components/login/loginView';
import LoginController from '../components/login/loginController';

jest.mock('../components/login/loginController');

describe('Test class LoginView', () => {
  const loginView = new LoginView();
  let emailInputElement: HTMLInputElement;
  let passwordInputElement: HTMLInputElement;
  let emailErrorElement: HTMLInputElement;
  let passwordErrorElement: HTMLInputElement;
  beforeAll(() => {
    (LoginController as jest.Mock).mockImplementation(() => null);
  });

  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <input class="login__email" type="text" class="login__input">
        <input class="login__password-input" type="password" class="login__input">
        <div class="login__email-error login__error-hide"></div>
        <div class="login__password-error login__error-hide"></div>
      </div>
    `;

    emailInputElement = document.querySelector('.login__email') as HTMLInputElement;
    passwordInputElement = document.querySelector('.login__password-input') as HTMLInputElement;
    emailErrorElement = document.querySelector('.login__email-error') as HTMLInputElement;
    passwordErrorElement = document.querySelector('.login__password-error') as HTMLInputElement;

    jest.spyOn(document.body, 'dispatchEvent');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should dispatch loginSuccessEvent when resultLogin is loginSuccess', () => {
    loginView.checkLogin('loginSuccess');

    expect(document.body.dispatchEvent).toHaveBeenCalledWith(expect.objectContaining({ type: 'loginSuccessEvent' }));
  });

  test('Should display email error when resultLogin is errorEmail', () => {
    loginView.checkLogin('errorEmail');

    expect(emailInputElement?.classList.contains('login__input-invalid')).toBe(true);
    expect(emailErrorElement?.classList.contains('login__error-hide')).toBe(false);
  });

  test('Should display password error when resultLogin is errorPassword', () => {
    loginView.checkLogin('errorPassword');

    expect(passwordInputElement?.classList.contains('login__input-invalid')).toBe(true);
    expect(passwordErrorElement?.classList.contains('login__error-hide')).toBe(false);
  });

  test('Should do nothing when resultLogin is not recognized', () => {
    loginView.checkLogin('unknownResult');

    expect(emailInputElement?.classList.contains('login__input-invalid')).toBe(false);
    expect(passwordInputElement?.classList.contains('login__input-invalid')).toBe(false);
    expect(emailErrorElement?.classList.contains('login__error-hide')).toBe(true);
    expect(passwordErrorElement?.classList.contains('login__error-hide')).toBe(true);
  });
});
