import HTMLCreation from '../HTMLCreation';
import dogPath from '../../assets/dog.png';
import catPath from '../../assets/cat.png';
import './header.scss';

export default class Header {
  isButtonLoginClicked: boolean = false;

  renderHeader(isLoggedIn: boolean) {
    const textButton = isLoggedIn ? 'Log out' : 'Login';

    const header = HTMLCreation.createElement('header', { class: 'upper-dashboard' }, [
      HTMLCreation.createElement('div', { class: 'heading-and-image' }, [
        HTMLCreation.createElement('img', { class: 'cat-image', src: catPath, alt: 'cat' }),
        HTMLCreation.createElement('div', { class: 'heading' }, [
          HTMLCreation.createElement('h1', { class: 'title' }, ['Paws & Claws 🐾']),
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
      loginButton.textContent = '⬅ Back';
    }
  }

  changeRegistrationButtonToBackButton() {
    const registrationButton = document.querySelector('.upper-dashboard__register-button');
    if (registrationButton) {
      registrationButton.textContent = '⬅ Back';
    }
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
    const backButton = HTMLCreation.createElement('button', { class: 'back-button' }, ['⬅ Back']);
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
  }
}
