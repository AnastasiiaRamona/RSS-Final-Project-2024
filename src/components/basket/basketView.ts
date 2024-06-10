import HTMLCreator from '../HTMLCreator';
import BasketController from './basketController';

export default class Basket {
  controller: BasketController;

  constructor() {
    this.controller = new BasketController();
  }

  renderPage() {
    const main = HTMLCreator.createElement('main', { class: 'basket-main' }, ['Здесь будет корзина']);
    return main;
  }
}
