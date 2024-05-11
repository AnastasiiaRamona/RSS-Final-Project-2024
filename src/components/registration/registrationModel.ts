import CommerceToolsAPI from '../commerceToolsAPI';

export default class RegistrationModel {
  async register(email: string, password: string, firstName: string, lastName: string, dateOfBirth: string) {
    try {
      const commerceToolsAPI = new CommerceToolsAPI();
      const response = await commerceToolsAPI.register(email, password, firstName, lastName, dateOfBirth);
      return response;
    } catch (error) {
      return new Error('Unsuccessful registration');
    }
  }
}
