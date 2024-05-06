import HTMLCreation from '../HTMLCreation';
import MainController from './mainController';
import './main.scss';
import dogPath from '../../assets/dog.png';
import catPath from '../../assets/cat.png';

export default class Main {
  controller: MainController;

  constructor() {
    this.controller = new MainController();
  }

  renderHeader() {
    const header = HTMLCreation.createElement('header', { class: 'upper-dashboard' }, [
      HTMLCreation.createElement('div', { class: 'heading-and-image' }, [
        HTMLCreation.createElement('img', { class: 'cat-image', src: catPath, alt: 'cat' }),
        HTMLCreation.createElement('div', { class: 'heading' }, [
          HTMLCreation.createElement('h1', { class: 'title' }, ['Paws & Claws 🐾']),
          HTMLCreation.createElement('h2', { class: 'subtitle' }, ['Online Pet Shop']),
        ]),
      ]),
      HTMLCreation.createElement('div', { class: 'upper-dashboard__buttons' }, [
        HTMLCreation.createElement('button', { class: 'upper-dashboard__logout-button' }, ['Login']),
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

  renderFooter() {
    const footer = HTMLCreation.createElement('footer', { class: 'footer-dashboard' }, [
      HTMLCreation.createElement('div', { class: 'footer-dashboard__links' }, [
        HTMLCreation.createElement('p', { class: 'footer-dashboard__links__text' }, ['NLC TEAM 🦥']),
        HTMLCreation.createElement('a', { href: 'https://github.com/AnastasiiaRamona', target: '_blank' }, [
          'anastasiiaramona',
        ]),
        HTMLCreation.createElement('a', { href: 'https://github.com/aleks6699', target: '_blank' }, ['aleks6699']),
        HTMLCreation.createElement('a', { href: 'https://github.com/MartiP54', target: '_blank' }, ['MartiP54']),
      ]),
      HTMLCreation.createElement('p', { class: 'footer-dashboard__text' }, ['2024']),
    ]);

    return footer;
  }

  renderPage() {
    const header = this.renderHeader();
    document.body.appendChild(header);

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

    const footer = this.renderFooter();

    document.body.appendChild(mainField);
    document.body.appendChild(footer);
  }

  addEventListeners() {
    const a = this.controller; // For example
    return a;
  }
}
