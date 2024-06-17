import Toastify from 'toastify-js';
import CommerceToolsAPI from '../commerceToolsAPI';

export default class DetailedProductModel {
  commerceToolsAPI: CommerceToolsAPI;

  constructor() {
    this.commerceToolsAPI = new CommerceToolsAPI();
  }

  showResponseMessage(text: string) {
    Toastify({
      text,
      newWindow: true,
      className: 'info',
      close: true,
      stopOnFocus: true,
      offset: {
        y: 200,
        x: 0,
      },
      duration: 5000,
    }).showToast();
  }

  async getProductByID(id: string) {
    try {
      const result = await this.commerceToolsAPI.getProductByID(id);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.showResponseMessage(error.message);
      }
      return undefined;
    }
  }

  async addToCart(productId: string) {
    const cartId = this.commerceToolsAPI.getCartId() as string;
    const currentCart = await this.commerceToolsAPI.getCart(cartId);
    const currentCartVersion = Number(currentCart?.body.version);
    const result = await this.commerceToolsAPI.addToCart(cartId, productId, 1, 1, currentCartVersion);
    return result;
  }

  async getProductInCart() {
    const cartId = this.commerceToolsAPI.getCartId() as string;
    let listProductInCart;
    const currentCard = await this.commerceToolsAPI.getCart(cartId);
    if (currentCard) {
      listProductInCart = currentCard?.body.lineItems.map((lineItem) => lineItem.productId);
    }
    return listProductInCart;
  }

  async removeItemFromProductCart(productId: string) {
    const cartId = this.commerceToolsAPI.getCartId() as string;
    const currentCart = await this.commerceToolsAPI.getCart(cartId);
    const currentCartVersion = Number(currentCart?.body.version);
    const lineItemId = currentCart?.body.lineItems.find((item) => item.productId === productId)?.id;
    if (lineItemId) {
      const result = await this.commerceToolsAPI.removeItemFromProductCart(cartId, lineItemId, currentCartVersion);
      return result;
    }
    return undefined;
  }
}
