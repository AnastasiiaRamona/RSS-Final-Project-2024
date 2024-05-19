import HTMLCreation from '../HTMLCreation';
import MainController from './mainController';

export default class Main {
  controller: MainController;

  constructor() {
    this.controller = new MainController();
  }

  renderPage() {
    const mainField = HTMLCreation.createElement('main', { class: 'main-field' }, [
      HTMLCreation.createElement('section', { class: 'main-area' }, [
        HTMLCreation.createElement('p', { class: 'main-area__text' }, [
          `Welcome to Paws & Claws, your ultimate destination for online pet shopping!`,
        ]),
      ]),
      HTMLCreation.createElement('section', { class: 'left-dashboard' }, [
        HTMLCreation.createElement('button', { class: 'left-dashboard__button clicked' }, ['Main page 🏠']),
        HTMLCreation.createElement('button', { class: 'left-dashboard__button' }, ['Catalog Product 📋']),
        HTMLCreation.createElement('button', { class: 'left-dashboard__button' }, ['User Profile 👤']),
        HTMLCreation.createElement('button', { class: 'left-dashboard__button' }, ['Basket 🧺']),
        HTMLCreation.createElement('button', { class: 'left-dashboard__button' }, ['About Us 🤙']),
      ]),
    ]);
    return mainField;
  }

  addEventListeners() {
    const a = this.controller; // For example
    return a;
  }
}
