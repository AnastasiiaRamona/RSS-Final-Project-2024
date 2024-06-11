import HTMLCreator from '../HTMLCreator';
import dogPath from '../../assets/dog.webp';
import catPath from '../../assets/cat.webp';
import pawPath from '../../assets/paw.webp';
import catalogIconSrc from '../../assets/catalog-icon.webp';
import basketIconSrc from '../../assets/basket-icon.webp';
import userProfileIconSrc from '../../assets/user-icon.webp';
import mainIconSrc from '../../assets/main-icon.webp';
import aboutUsIconSrc from '../../assets/about-us-icon.webp';

export default class Header {
  renderHeader(isLoggedIn: boolean) {
    const textButton = isLoggedIn ? 'Log out' : 'Login';

    const upperDashboard = HTMLCreator.createElement('section', { class: 'upper-dashboard' }, [
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
      { class: 'left-dashboard__button user-profile-button' },
      [
        HTMLCreator.createElement('p', { class: 'left-dashboard__text' }, ['User Profile']),
        HTMLCreator.createElement('img', {
          class: 'left-dashboard__image',
          src: userProfileIconSrc,
          alt: 'user profile icon',
        }),
      ]
    );

    const mainButton = HTMLCreator.createElement('button', { class: 'left-dashboard__button main-button' }, [
      HTMLCreator.createElement('p', { class: 'left-dashboard__text' }, ['Main']),
      HTMLCreator.createElement('img', { class: 'left-dashboard__image', src: mainIconSrc, alt: 'main icon' }),
    ]) as HTMLButtonElement;

    const leftDashboard = HTMLCreator.createElement('section', { class: 'left-dashboard' }, [
      mainButton,
      HTMLCreator.createElement('button', { class: 'left-dashboard__button catalog-button' }, [
        HTMLCreator.createElement('p', { class: 'left-dashboard__text' }, ['Catalog Product']),
        HTMLCreator.createElement('img', { class: 'left-dashboard__image', src: catalogIconSrc, alt: 'catalog icon' }),
      ]),
      userProfileButton,
      HTMLCreator.createElement('button', { class: 'left-dashboard__button basket-button' }, [
        HTMLCreator.createElement('p', { class: 'left-dashboard__text' }, ['Cart']),
        HTMLCreator.createElement('img', { class: 'left-dashboard__image', src: basketIconSrc, alt: 'basket icon' }),
      ]),
      HTMLCreator.createElement('button', { class: 'left-dashboard__button about-us-button' }, [
        HTMLCreator.createElement('p', { class: 'left-dashboard__text' }, ['About Us']),
        HTMLCreator.createElement('img', { class: 'left-dashboard__image', src: aboutUsIconSrc, alt: 'about us icon' }),
      ]),
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

  checkUserProfileButton(isLogged: boolean, userPageButton: HTMLButtonElement) {
    if (userPageButton) {
      const button = userPageButton;
      if (isLogged) {
        button.style.display = 'flex';
      } else {
        button.style.display = 'none';
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
    const aboutUsButton = document.querySelector('.about-us-button') as HTMLButtonElement;
    const basketButton = document.querySelector('.basket-button') as HTMLButtonElement;

    if (loginButton) {
      loginButton.addEventListener('click', () => {
        if (loginButton.textContent === 'Log out') {
          const loginEvent = new CustomEvent('loginEvent');
          document.body.dispatchEvent(loginEvent);
          localStorage.removeItem('userPetShopId');
          localStorage.removeItem('userToken');
          const isLoggedIn = !!localStorage.getItem('userToken');
          this.changeLoginButtonToTheLogOutButton(isLoggedIn);
          this.checkUserProfileButton(isLoggedIn, userProfileButton);
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

    aboutUsButton?.addEventListener('click', () => {
      const aboutUsEvent = new CustomEvent('aboutUsEvent');
      document.body.dispatchEvent(aboutUsEvent);
    });

    basketButton?.addEventListener('click', () => {
      const basketEvent = new CustomEvent('basketEvent');
      document.body.dispatchEvent(basketEvent);
    });
  }
}
