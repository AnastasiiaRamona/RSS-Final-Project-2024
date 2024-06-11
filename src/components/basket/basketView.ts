import HTMLCreator from '../HTMLCreator';
import BasketController from './basketController';

export default class Basket {
  controller: BasketController;

  cartId: string | null = localStorage.getItem('cartPetShopId');

  constructor() {
    this.controller = new BasketController();
  }

  async renderPage() {
    const main = HTMLCreator.createElement('main', { class: 'basket-main' }, ['Здесь будет корзина']);
    if (this.cartId) {
      await this.controller.getCart(this.cartId);
    }
    return main;
  }
}
