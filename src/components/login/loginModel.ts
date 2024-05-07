import CommerceToolsAPI from '../commerceToolsAPI';

export default class LoginModel {
  async login(email: string, password: string) {
    try {
      const commerceToolsAPI = new CommerceToolsAPI();
      const response = await commerceToolsAPI.login(email, password);
      return response;
    } catch (error) {
      return new Error('Unsuccessful login');
    }
  }
}
