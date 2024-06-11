import BasketModel from './basketModel';

export default class BasketController {
  model: BasketModel;

  constructor() {
    this.model = new BasketModel();
  }

  async getCart(cartId: string) {
    const cart = await this.model.getCart(cartId);
    return cart;
  }
}
