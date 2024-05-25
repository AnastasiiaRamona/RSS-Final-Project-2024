import CommerceToolsAPI from '../commerceToolsAPI';

export default class DetailedProductModel {
  commerceToolsAPI: CommerceToolsAPI;

  constructor() {
    this.commerceToolsAPI = new CommerceToolsAPI();
  }

  async getProductByID(id: string) {
    const result = await this.commerceToolsAPI.getProductByID(id);
    return result;
  }
}
