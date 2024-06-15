import BasketModel from './basketModel';

export default class BasketController {
  model: BasketModel;

  constructor() {
    this.model = new BasketModel();
  }

  async getCart() {
    const cart = await this.model.getCart();
    const cartData = cart?.body;
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

  async getDiscountCodeByCode(promoCode: string) {
    const discountCode = await this.model.getDiscountCodeByCode(promoCode);
    return discountCode;
  }

  async updateCartWithPromoCode(discountId: string) {
    const result = await this.model.updateCartWithPromoCode(discountId);
    return result;
  }

  findOutTheDiscountPercentage(totalPrice: number, discountTotalPrice: number) {
    const percentage = (discountTotalPrice * 100) / totalPrice;
    return percentage;
  }
}
