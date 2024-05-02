import HTMLCreation from "../HTMLCreation";
import RegistrationController from "./registrationController";

export default class Registration {
  controller: RegistrationController;

  constructor() {
    this.controller = new RegistrationController();
  }

  renderPage() {
    HTMLCreation.createElement('h1', { class: 'title'}, ['Online-shop']); // For example
  }

  addEventListeners() {

  }
}