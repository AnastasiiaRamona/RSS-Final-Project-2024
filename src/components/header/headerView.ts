import HTMLCreation from '../HTMLCreation';
import dogPath from '../../assets/dog.png';
import catPath from '../../assets/cat.png';
import './header.scss';

export default class Header {
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

  addEventListeners() {
    const loginButton = document.querySelector('.upper-dashboard__logout-button');
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        if (loginButton.textContent === 'Log out') {
          const logOutEvent = new Event('logOutEvent');
          loginButton.dispatchEvent(logOutEvent);
        } else {
          const loginEvent = new Event('loginEvent');
          loginButton.dispatchEvent(loginEvent);
        }
      });
    }
  }
}
