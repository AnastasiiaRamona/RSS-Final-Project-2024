import HTMLCreation from "../HTMLCreation";
import LoginController from "./loginController";

export default class Login {
  controller: LoginController;

  constructor() {
    this.controller = new LoginController();
  }

  renderPage() {
    HTMLCreation.createElement('h1', { class: 'title'}, ['Online-shop']); // For example
  }

  addEventListeners() {
    
  }
}