import CommerceToolsAPI from '../commerceToolsAPI';

export default class BasketModel {
  commerceToolsAPI: CommerceToolsAPI;

  constructor() {
    this.commerceToolsAPI = new CommerceToolsAPI();
  }

  async getCart(cartId: string) {
    const cart = await this.commerceToolsAPI.getCart(cartId);
    return cart;
  }
}
