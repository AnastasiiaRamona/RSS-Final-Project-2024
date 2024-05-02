import LoginModel from './loginModel';

export default class LoginController {
  model: LoginModel;

  constructor() {
    this.model = new LoginModel();
  }
}