import LoginModel from './loginModel';

export default class LoginController {
  model: LoginModel;

  constructor() {
    this.model = new LoginModel();
  }

  async login(email: string, password: string) {
    const result = await this.model.login(email, password);
    return result;
  }
}
