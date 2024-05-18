import HTMLCreation from '../HTMLCreation';
import dogPath from '../../assets/dog.png';
import catPath from '../../assets/cat.png';
import pawPath from '../../assets/paw.png';

export default class Header {
  isButtonLoginClicked: boolean = false;

  backButtonTextContent: string = '⬅ Back';

  renderHeader(isLoggedIn: boolean) {
    const textButton = isLoggedIn ? 'Log out' : 'Login';

    const header = HTMLCreation.createElement('header', { class: 'upper-dashboard' }, [
      HTMLCreation.createElement('div', { class: 'heading-and-image' }, [
        HTMLCreation.createElement('img', { class: 'cat-image', src: catPath, alt: 'cat' }),
        HTMLCreation.createElement('div', { class: 'heading' }, [
          HTMLCreation.createElement('h1', { class: 'title' }, [
            'Paws & Claws',
            HTMLCreation.createElement('img', {
              class: 'paw__image',
              src: pawPath,
              alt: 'paw',
            }),
          ]),
          HTMLCreation.createElement('h2', { class: 'subtitle' }, ['Online Pet Shop']),
        ]),
      ]),
      HTMLCreation.createElement('div', { class: 'upper-dashboard__buttons' }, [
        HTMLCreation.createElement('button', { class: 'upper-dashboard__logout-button' }, [`${textButton}`]),
        HTMLCreation.createElement('button', { class: 'upper-dashboard__register-button' }, ['Register']),
        HTMLCreation.createElement('img', {
          class: 'upper-dashboard__image',
          src: dogPath,
          alt: 'dog',
        }),
      ]),
    ]);
    return header;
  }

  changeLoginButtonToBackButton() {
    const loginButton = document.querySelector('.upper-dashboard__logout-button');
    if (loginButton) {
      loginButton.textContent = this.backButtonTextContent;
    }
  }

  changeRegistrationButtonToBackButton() {
    const registrationButton = document.querySelector('.upper-dashboard__register-button');
    if (registrationButton) {
      registrationButton.textContent = this.backButtonTextContent;
    }
  }

  addBurgerButton() {
    const buttonsDiv = document.querySelector('.upper-dashboard__buttons');
    const burgerButton = HTMLCreation.createElement('button', { class: 'upper-dashboard__burger-menu' }, [
      HTMLCreation.createElement('div', { class: 'upper-dashboard__burger-menu__first-part' }),
      HTMLCreation.createElement('div', { class: 'upper-dashboard__burger-menu__second-part' }),
    ]);
    buttonsDiv?.appendChild(burgerButton);

    const firstPart = document.querySelector('.upper-dashboard__burger-menu__first-part') as HTMLElement;
    const secondPart = document.querySelector('.upper-dashboard__burger-menu__second-part') as HTMLElement;
    const leftDashboard = document.querySelector('.left-dashboard') as HTMLElement;

    burgerButton.addEventListener('click', () => {
      if (firstPart.classList.contains('active')) {
        firstPart.classList.remove('active');
        secondPart.classList.remove('active');
        leftDashboard.classList.remove('active');
      } else {
        firstPart.classList.add('active');
        secondPart.classList.add('active');
        leftDashboard.classList.add('active');
      }
    });
  }

  addLoginButton() {
    const buttonsDiv = document.querySelector('.upper-dashboard__buttons');
    const loginButton = HTMLCreation.createElement('button', { class: 'button-for-check' }, ['Login']);
    buttonsDiv?.appendChild(loginButton);

    loginButton.addEventListener('click', () => {
      const mainPageEvent = new CustomEvent('mainPageEvent');
      document.body.dispatchEvent(mainPageEvent);
    });
  }

  addMainPageButton() {
    const buttonsDiv = document.querySelector('.upper-dashboard__buttons');
    const mainPageButton = HTMLCreation.createElement('button', { class: 'main-page-button' }, ['Main page 🏠']);
    buttonsDiv?.appendChild(mainPageButton);

    mainPageButton.addEventListener('click', () => {
      const mainPageEvent = new CustomEvent('mainPageEvent');
      document.body.dispatchEvent(mainPageEvent);
    });
  }

  addBackButton() {
    const buttonsDiv = document.querySelector('.upper-dashboard__buttons');
    const backButton = HTMLCreation.createElement('button', { class: 'back-button' }, [this.backButtonTextContent]);
    buttonsDiv?.appendChild(backButton);

    backButton.addEventListener('click', () => {
      const backEvent = new CustomEvent('backEvent');
      document.body.dispatchEvent(backEvent);
    });
  }

  addEventListeners() {
    const loginButton = document.querySelector('.upper-dashboard__logout-button');
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        if (loginButton.textContent === 'Log out') {
          const loginEvent = new CustomEvent('loginEvent');
          document.body.dispatchEvent(loginEvent);
          localStorage.clear();
        } else if (loginButton.textContent === 'Login') {
          const loginEvent = new CustomEvent('loginEvent');
          document.body.dispatchEvent(loginEvent);
        } else {
          const backEvent = new CustomEvent('backEvent');
          document.body.dispatchEvent(backEvent);
        }
      });
    }

    const registrationButton = document.querySelector('.upper-dashboard__register-button');
    if (registrationButton) {
      registrationButton.addEventListener('click', () => {
        if (registrationButton.textContent === 'Register') {
          const registrationEvent = new CustomEvent('registrationEvent');
          document.body.dispatchEvent(registrationEvent);
        } else {
          const backEvent = new CustomEvent('backEvent');
          document.body.dispatchEvent(backEvent);
        }
      });
    }

    const title = document.querySelector('.title');
    if (title) {
      title.addEventListener('click', () => {
        const mainPageEvent = new CustomEvent('mainPageEvent');
        document.body.dispatchEvent(mainPageEvent);
      });
    }
  }
}
