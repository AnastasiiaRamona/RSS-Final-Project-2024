import HTMLCreation from '../HTMLCreation';

export default class Main {
  renderPage() {
    const mainField = HTMLCreation.createElement('main', { class: 'main-field' }, [
      HTMLCreation.createElement('section', { class: 'main-area' }, [
        HTMLCreation.createElement('p', { class: 'main-area__text' }, [
          `Welcome to Paws & Claws, your ultimate destination for online pet shopping!`,
        ]),
      ]),
      HTMLCreation.createElement('section', { class: 'left-dashboard' }, [
        HTMLCreation.createElement('button', { class: 'left-dashboard__button main-button clicked' }, ['Main page 🏠']),
        HTMLCreation.createElement('button', { class: 'left-dashboard__button catalog-button' }, [
          'Catalog Product 📋',
        ]),
        HTMLCreation.createElement('button', { class: 'left-dashboard__button user-profile-button' }, [
          'User Profile 👤',
        ]),
        HTMLCreation.createElement('button', { class: 'left-dashboard__button' }, ['Basket 🧺']),
        HTMLCreation.createElement('button', { class: 'left-dashboard__button' }, ['About Us 🤙']),
      ]),
    ]);
    return mainField;
  }

  addEventListeners() {
    const catalogButton = document.querySelector('.catalog-button');
    catalogButton?.addEventListener('click', () => {
      const catalogEvent = new CustomEvent('catalogEvent');
      document.body.dispatchEvent(catalogEvent);
    });
  }
}
