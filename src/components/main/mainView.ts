import HTMLCreator from '../HTMLCreator';

export default class Main {
  renderPage() {
    const mainField = HTMLCreator.createElement('main', { class: 'main-field' }, [
      HTMLCreator.createElement('section', { class: 'main-area' }, [
        HTMLCreator.createElement('p', { class: 'main-area__text' }, [
          `Welcome to Paws & Claws, your ultimate destination for online pet shopping!`,
        ]),
      ]),
      HTMLCreator.createElement('section', { class: 'left-dashboard' }, [
        HTMLCreator.createElement('button', { class: 'left-dashboard__button main-button clicked' }, ['Main page 🏠']),
        HTMLCreator.createElement('button', { class: 'left-dashboard__button catalog-button' }, ['Catalog Product 📋']),
        HTMLCreator.createElement('button', { class: 'left-dashboard__button user-profile-button' }, [
          'User Profile 👤',
        ]),
        HTMLCreator.createElement('button', { class: 'left-dashboard__button' }, ['Basket 🧺']),
        HTMLCreator.createElement('button', { class: 'left-dashboard__button' }, ['About Us 🤙']),
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
