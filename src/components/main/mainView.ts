import HTMLCreation from '../HTMLCreation';
import MainController from './mainController';

export default class Main {
  controller: MainController;

  constructor() {
    this.controller = new MainController();
  }

  renderPage() {
    HTMLCreation.createElement('h1', { class: 'title' }, ['Online-shop']); // For example
    const a = this.controller; // For example
    return a;
  }

  addEventListeners() {
    const a = this.controller; // For example
    return a;
  }
}
