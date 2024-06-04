import HTMLCreator from '../HTMLCreator';
import dogPath from '../../assets/dog.png';
import catPath from '../../assets/cat.png';
import pawPath from '../../assets/paw.png';

export default class Header {
  private backButtonTextContent: string = '⬅ Back';

  renderHeader(isLoggedIn: boolean) {
    const textButton = isLoggedIn ? 'Log out' : 'Login';

    const upperDashboard = HTMLCreator.createElement('header', { class: 'upper-dashboard' }, [
      HTMLCreator.createElement('div', { class: 'heading-and-image' }, [
        HTMLCreator.createElement('img', { class: 'cat-image', src: catPath, alt: 'cat' }),
        HTMLCreator.createElement('div', { class: 'heading' }, [
          HTMLCreator.createElement('h1', { class: 'title' }, [
            'Paws & Claws',
            HTMLCreator.createElement('img', {
              class: 'paw__image',
              src: pawPath,
              alt: 'paw',
            }),
          ]),
          HTMLCreator.createElement('h2', { class: 'subtitle' }, ['Online Pet Shop']),
        ]),
      ]),
      HTMLCreator.createElement('div', { class: 'upper-dashboard__buttons' }, [
        HTMLCreator.createElement('button', { class: 'upper-dashboard__logout-button' }, [`${textButton}`]),
        HTMLCreator.createElement('button', { class: 'upper-dashboard__register-button' }, ['Register']),
        HTMLCreator.createElement('img', {
          class: 'upper-dashboard__image',
          src: dogPath,
          alt: 'dog',
        }),
      ]),
    ]);

    const header = HTMLCreator.createElement('header', { class: 'header' }, [
      upperDashboard,
      this.renderLeftDashboard(),
    ]);

    return header;
  }

  renderLeftDashboard() {
    const userProfileButton = HTMLCreator.createElement(
      'button',
      { class: 'left-dashboard__button user-profile-button inactive', disabled: 'true' },
      ['User Profile 👤']
    );

    if (localStorage.getItem('userPetShopId')) {
      userProfileButton.removeAttribute('disabled');
      userProfileButton.classList.remove('inactive');
    }

    const mainButton = HTMLCreator.createElement('button', { class: 'left-dashboard__button main-button' }, [
      'Main page 🏠',
    ]) as HTMLButtonElement;

    const leftDashboard = HTMLCreator.createElement('section', { class: 'left-dashboard' }, [
      mainButton,
      HTMLCreator.createElement('button', { class: 'left-dashboard__button catalog-button' }, ['Catalog Product 📋']),
      userProfileButton,
      HTMLCreator.createElement('button', { class: 'left-dashboard__button' }, ['Basket 🧺']),
      HTMLCreator.createElement('button', { class: 'left-dashboard__button' }, ['About Us 🤙']),
    ]);

    return leftDashboard;
  }

  changeLoginButtonToTheLogOutButton(isLogged: boolean) {
    const loginButton = document.querySelector('.upper-dashboard__logout-button');
    const userPageButton = document.querySelector('.user-profile-button');
    if (loginButton && userPageButton) {
      if (isLogged) {
        loginButton.textContent = 'Log out';
        userPageButton.removeAttribute('disabled');
        userPageButton.classList.remove('inactive');
      } else {
        loginButton.textContent = 'Login';
        userPageButton?.setAttribute('disabled', 'true');
        userPageButton?.classList.add('inactive');
      }
    }
  }

  addBurgerButton() {
    const buttonsDiv = document.querySelector('.upper-dashboard__buttons');
    const burgerButton = HTMLCreator.createElement('button', { class: 'upper-dashboard__burger-menu' }, [
      HTMLCreator.createElement('div', { class: 'upper-dashboard__burger-menu__first-part' }),
      HTMLCreator.createElement('div', { class: 'upper-dashboard__burger-menu__second-part' }),
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

  addEventListeners() {
    const loginButton = document.querySelector('.upper-dashboard__logout-button') as HTMLButtonElement;
    const registrationButton = document.querySelector('.upper-dashboard__register-button') as HTMLButtonElement;
    const mainButton = document.querySelector('.main-button') as HTMLButtonElement;
    const catalogButton = document.querySelector('.catalog-button') as HTMLButtonElement;
    const userProfileButton = document.querySelector('.user-profile-button') as HTMLButtonElement;

    if (loginButton) {
      loginButton.addEventListener('click', () => {
        if (loginButton.textContent === 'Log out') {
          const loginEvent = new CustomEvent('loginEvent');
          document.body.dispatchEvent(loginEvent);
          localStorage.clear();
          const isLoggedIn = !!localStorage.getItem('userToken');
          this.changeLoginButtonToTheLogOutButton(isLoggedIn);
        } else if (loginButton.textContent === 'Login') {
          const loginEvent = new CustomEvent('loginEvent');
          document.body.dispatchEvent(loginEvent);
        }
      });
    }

    if (registrationButton) {
      registrationButton.addEventListener('click', () => {
        const registrationEvent = new CustomEvent('registrationEvent');
        document.body.dispatchEvent(registrationEvent);
      });
    }

    const title = document.querySelector('.title');
    if (title) {
      title.addEventListener('click', () => {
        const mainPageEvent = new CustomEvent('mainPageEvent');
        document.body.dispatchEvent(mainPageEvent);
      });
    }

    mainButton?.addEventListener('click', () => {
      const mainPageEvent = new CustomEvent('mainPageEvent');
      document.body.dispatchEvent(mainPageEvent);
    });

    catalogButton?.addEventListener('click', () => {
      const catalogEvent = new CustomEvent('catalogEvent');
      document.body.dispatchEvent(catalogEvent);
    });

    userProfileButton?.addEventListener('click', () => {
      const userProfileEvent = new CustomEvent('userProfileEvent');
      document.body.dispatchEvent(userProfileEvent);
    });
  }
}
