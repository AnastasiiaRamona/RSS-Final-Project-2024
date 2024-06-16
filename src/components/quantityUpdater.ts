import CommerceToolsAPI from './commerceToolsAPI';

export default class QuantityUpdater {
  commerceToolsAPI: CommerceToolsAPI;

  constructor() {
    this.commerceToolsAPI = new CommerceToolsAPI();
  }

  async updateQuantity() {
    const basketButton = document.querySelector('.basket-button') as HTMLButtonElement;
    const cartId = this.commerceToolsAPI.getCartId();
    if (cartId) {
      const cart = await this.commerceToolsAPI.getCart(cartId);
      const quantityOfItems = cart?.body.lineItems.length;
      const basketButtonText = basketButton.querySelector('p');

      if (basketButtonText) {
        if (quantityOfItems && quantityOfItems > 0) {
          basketButtonText.textContent = `Cart (${quantityOfItems})`;
        } else {
          basketButtonText.textContent = 'Cart';
        }
      }
    }
  }

  clearQuantity() {
    const basketButton = document.querySelector('.basket-button') as HTMLButtonElement;
    const basketButtonText = basketButton.querySelector('p') as HTMLParagraphElement;
    basketButtonText.textContent = 'Cart';
  }
}
