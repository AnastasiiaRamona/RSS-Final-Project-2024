import HTMLCreation from '../HTMLCreation';
import LoginController from './loginController';

export default class Login {
  controller: LoginController;

  constructor() {
    this.controller = new LoginController();
  }

  renderPage() {
    const main = HTMLCreation.createElement('main', { class: 'title' }, ['Online-shop']); // For example
    return main;
  }

  addEventListeners() {
    const a = this.controller; // For example
    return a;
  }
}
