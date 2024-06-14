import BasketModel from './basketModel';

export default class BasketController {
  model: BasketModel;

  constructor() {
    this.model = new BasketModel();
  }

  async getCart() {
    const cart = await this.model.getCart();
    const cartData = cart?.body.lineItems;
    return cartData;
  }

  async removeProductCart(productId: string) {
    if (productId) {
      await this.model.removeProductCart(productId);
    }
  }

  async updateQuantity(productId: string, quantity: number) {
    const result = await this.model.updateQuantity(productId, quantity);
    return result;
  }
}
