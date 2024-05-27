import CommerceToolsAPI from '../commerceToolsAPI';

export default class UserProfileModel {
  commerceToolsAPI: CommerceToolsAPI;

  constructor() {
    this.commerceToolsAPI = new CommerceToolsAPI();
  }

  async getCustomerById(id: string) {
    const result = await this.commerceToolsAPI.getCustomerByID(id);
    return result;
  }
}
