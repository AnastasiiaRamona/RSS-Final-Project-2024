import QuantityUpdater from '../quantityUpdater';
import BasketModel from './basketModel';

export default class BasketController {
  model: BasketModel;

  quantityUpdater: QuantityUpdater;

  constructor() {
    this.model = new BasketModel();
    this.quantityUpdater = new QuantityUpdater();
  }

  async getCart() {
    const cart = await this.model.getCart();
    const cartData = cart?.body;
    return cartData;
  }

  async removeItemFromProductCart(productId: string) {
    if (productId) {
      await this.model.removeItemFromProductCart(productId);
      await this.quantityUpdater.updateQuantity();
    }
  }

  async updateQuantity(productId: string, quantity: number) {
    const result = await this.model.updateQuantity(productId, quantity);
    return result;
  }

  async getDiscountCodeByCode(promoCode: string) {
    const discountCode = await this.model.getDiscountCodeByCode(promoCode);
    return discountCode;
  }

  async updateCartWithPromoCode(discountId: string) {
    const result = await this.model.updateCartWithPromoCode(discountId);
    return result;
  }

  findOutTheDiscountPercentage(totalPrice: number, discountOnTotalPrice: number) {
    const multiplier = 1 - discountOnTotalPrice / (totalPrice + discountOnTotalPrice);
    return multiplier;
  }

  async clearCart() {
    await this.model.clearCart();
    await this.quantityUpdater.updateQuantity();
  }
}
