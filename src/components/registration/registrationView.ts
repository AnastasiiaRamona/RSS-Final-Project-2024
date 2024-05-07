import HTMLCreation from '../HTMLCreation';
import RegistrationController from './registrationController';

export default class Registration {
  controller: RegistrationController;

  constructor() {
    this.controller = new RegistrationController();
  }

  renderPage() {
    const main = HTMLCreation.createElement('main', { class: 'title' }, ['Online-shop Registration']); // For example
    return main;
  }

  addEventListeners() {
    const a = this.controller; // For example
    return a;
  }
}
