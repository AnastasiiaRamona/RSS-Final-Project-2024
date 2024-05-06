import RegistrationModel from './registrationModel';

export default class RegistrationController {
  model: RegistrationModel;

  constructor() {
    this.model = new RegistrationModel();
  }

  async getRegistration(email: string, password: string) {
    const result = await this.model.register(email, password);
    return result;
  }
}
