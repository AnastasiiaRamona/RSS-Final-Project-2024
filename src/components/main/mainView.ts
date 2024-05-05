import HTMLCreation from '../HTMLCreation';
import MainController from './mainController';

export default class Main {
  controller: MainController;

  constructor() {
    this.controller = new MainController();
  }

  renderHeader() {
    const header = HTMLCreation.createElement('header', { class: 'upper-dashboard' }, [
      HTMLCreation.createElement('button', { class: 'upper-dashboard__logout-button' }, ['Log out']),
      HTMLCreation.createElement('button', { class: 'upper-dashboard__register-button' }, ['Register a new user']),
    ]);
    return header;
  }

  // renderPage() {

  // }

  addEventListeners() {
    const a = this.controller; // For example
    return a;
  }
}
